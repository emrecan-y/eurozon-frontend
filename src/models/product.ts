import { UUID } from "crypto";
import { Category } from "./category";

export type Product = {
  id: UUID;
  description: string;
  name: string;
  price: string;
  stock: number;
  category: Category;
};
