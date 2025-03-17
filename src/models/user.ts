import { UUID } from "crypto";
import { Address, AddressSchema } from "./address";
import { z } from "zod";

export type User = {
  id: UUID;
  role: string;
  email: string;
  password: string;
  surname: string;
  name: string;
  dateOfBirth: Date;
  dateOfCreation: Date;
  address: Address;
};

export const RegisterUserSchema = z
  .object({
    email: z
      .string()
      .email("Ungültige E-Mail-Adresse")
      .min(1, "E-Mail ist erforderlich"),
    password: z
      .string()
      .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein"),
    passwordConfirm: z
      .string()
      .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein"),
    surname: z.string().min(1, "Nachname ist erforderlich"),
    name: z.string().min(1, "Vorname ist erforderlich"),
    dateOfBirth: z
      .date()
      .refine((date) => date <= new Date(), {
        message: "Geburtsdatum kann nicht in der Zukunft liegen",
      })
      .refine(
        (date) => {
          const currentDate = new Date();
          const age18Date = new Date(
            currentDate.setFullYear(currentDate.getFullYear() - 18),
          );
          return date <= age18Date;
        },
        { message: "Der Benutzer muss mindestens 18 Jahre alt sein." },
      ),
    address: AddressSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwörter müssen übereinstimmen",
    path: ["passwordConfirm"],
  });

export const LoginUserSchema = z.object({
  email: z
    .string()
    .email("Ungültige E-Mail-Adresse")
    .min(1, "E-Mail ist erforderlich"),
  password: z.string().min(1, "Passwort ist erforderlich"),
});
