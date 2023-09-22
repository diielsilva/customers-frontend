import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading: boolean = false;

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public displayLoading(): void {
    this._isLoading = true;
  }

  public hiddenLoading(): void {
    this._isLoading = false;
  }
  
}
