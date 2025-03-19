import { UUID } from "crypto";

export type Category = {
  id: UUID;
  name: string;
  description: string;
  parent: Category | undefined;
};
