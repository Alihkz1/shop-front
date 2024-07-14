import { ROLE } from "../enum/role.enum";

export interface User {
    userId: number;
    name: string;
    phone: string;
    email: string;
    password: string;
    role: ROLE;
    loginCount: number;
    orderCount: number;
    totalBuy: number;
}