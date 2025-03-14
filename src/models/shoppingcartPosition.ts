import { UUID } from "crypto";
import { User } from "./user";
import { Product } from "./product";

export type ShoppingCartPosition = {
  id: UUID;
  amount: number;
  User: User;
  Product: Product;
};
