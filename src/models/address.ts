import { UUID } from "crypto";
import { z } from "zod";

export type Address = {
  id: UUID;
  country: string;
  town: string;
  postalCode: string;
  street: string;
  streetNumber: string;
};

export const AddressSchema = z.object({
  country: z.string().min(1, "Country is requiered"),
  town: z.string().min(1, "City is required"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  street: z.string().min(1, "Street is required"),
  streetNumber: z.string().min(1, "Street number is required"),
});
