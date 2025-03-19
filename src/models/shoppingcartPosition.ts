import { UUID } from "crypto";
import { Product } from "./product";

export type ShoppingCartPosition = {
  id: UUID;
  amount: number;
  product: Product;
};
