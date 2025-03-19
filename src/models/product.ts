import { UUID } from "crypto";
import { Category } from "./category";

export type Product = {
  id: UUID;
  description: string;
  name: string;
  price: string;
  stock: number;
  category: Category;
  scrUrl : string;
};

export type ProductQueryType = {
  page?: number;
  size?: number;
  category?: string;
  searchString?: string;
};
