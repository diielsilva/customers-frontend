export interface InsertAddressDTO {
    houseNumber: string,
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    cep?: string
}