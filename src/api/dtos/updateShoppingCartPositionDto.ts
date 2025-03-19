import { UUID } from "crypto";


export type updateShoppingCartPositionDto = {
    productId: UUID,
    amount: number,
}