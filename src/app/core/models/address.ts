import { Model } from "./model";

export interface Address extends Model {
    houseNumber: string,
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    cep?: string
}