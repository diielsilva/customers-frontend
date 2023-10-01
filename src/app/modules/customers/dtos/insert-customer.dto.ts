import { InsertAddressDTO } from "./insert-address.dto";

export interface InsertCustomerDTO {
    name: string,
    phoneNumber: string,
    birthDate: Date,
    address: InsertAddressDTO
}