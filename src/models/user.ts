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

export const UserSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    surname: z.string().min(1, "Surname is required"),
    name: z.string().min(1, "Name is required"),
    dateOfBirth: z
      .date()
      .refine((date) => date <= new Date(), {
        message: "Date of birth cannot be in the future",
      })
      .refine(
        (date) => {
          const currentDate = new Date();
          const age18Date = new Date(
            currentDate.setFullYear(currentDate.getFullYear() - 18),
          );
          return date <= age18Date;
        },
        { message: "User needs to be atleast 18 years old." },
      ),
    address: AddressSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
