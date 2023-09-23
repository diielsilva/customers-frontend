import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from 'src/app/core/config/constants';
import { Pageable } from 'src/app/core/helpers/pageable';
import { Customer } from 'src/app/core/models/customer';
import { InsertCustomerDTO } from '../dtos/insert-customer.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly _url: string = `${CONSTANTS.url}/customers`;

  constructor(private client: HttpClient) { }

  public save(customer: InsertCustomerDTO): Observable<Customer> {
    return this.client.post<Customer>(this._url, customer);
  }

  public findAll(page: number): Observable<Pageable<Customer>> {
    return this.client.get<Pageable<Customer>>(`${this._url}?page=${page}`);
  }

  public findByName(page: number, name: string): Observable<Pageable<Customer>> {
    return this.client.get<Pageable<Customer>>(`${this._url}/search?page=${page}&name=${name}`);
  }

  public update(id: number, dto: InsertCustomerDTO): Observable<Customer> {
    return this.client.put<Customer>(`${this._url}/${id}`, dto);
  }

  public delete(id: number): Observable<void> {
    return this.client.delete<void>(`${this._url}/${id}`);
  }

}
