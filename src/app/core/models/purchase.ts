import { Customer } from "./customer";
import { Model } from "./model";

export interface Purchase extends Model {
    customer: Customer,
    date: Date
}