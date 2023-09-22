import { InsertAddressDTO } from "./insert-address.dto";

export interface InsertCustomerDTO {
    name: string,
    phone: string,
    birthDate: Date,
    address: InsertAddressDTO
}