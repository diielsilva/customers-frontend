import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from 'src/app/core/config/constants';
import { Purchase } from 'src/app/core/models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private readonly _url: string = `${CONSTANTS.url}/purchases`;

  constructor(private client: HttpClient) { }

  public save(customerId: number): Observable<void> {
    return this.client.post<void>(`${this._url}/${customerId}`, null);
  }

  public findAllByCustomerId(customerId: number): Observable<Purchase[]> {
    return this.client.get<Purchase[]>(`${this._url}/${customerId}`);
  }

  public delete(customerId: number, purchaseId: number): Observable<void> {
    return this.client.delete<void>(`${this._url}/${customerId}/${purchaseId}`);
  }
}
