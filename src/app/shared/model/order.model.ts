import { ORDER_STATUS } from "../enum/order-status.enum";

export interface Order {
    username: string,
    address: string,
    code: string,
    date: number,
    description: string,
    orderId: number,
    paid: number,
    postalCode: number,
    receiverEmail: string,
    receiverName: string,
    receiverPhone: string,
    shopCardId: number,
    status: ORDER_STATUS,
    userId: number,
    trackCode: string,
}