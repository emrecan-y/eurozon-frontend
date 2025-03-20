import { UUID } from "crypto";
import { Product } from "./product";

export type Order = {
  orderNumber: number;
  purchasedOn: string;
  status: string;
  totalPrice: string;
  orderPositions: OrderPosition[];
};

export type OrderPosition = {
  id: UUID;
  amount: number;
  productPriceOnPurchase: string;
  product: Product;
};
