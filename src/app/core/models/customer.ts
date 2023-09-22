import { Address } from "./address";
import { Model } from "./model";
import { Phone } from "./phone";
import { Purchase } from "./purchase";

export interface Customer extends Model {
    name: string,
    phone: Phone,
    address: Address,
    purchases: Purchase[],
    birthDate: Date
}