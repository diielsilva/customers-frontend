import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/app/core/config/constants';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _isError: boolean = false;
  private _messages: string[] = [];
  private _title: string = '';

  public get messages(): string[] {
    return this._messages;
  }

  public get isError(): boolean {
    return this._isError;
  }

  public get title(): string {
    return this._title;
  }

  public successMessage(title: string, message: string): void {
    this._isError = false;
    this._title = title;
    this._messages = [message];
    this.clearMessages();
  }

  public errorMessage(title: string, response: HttpErrorResponse): void {
    this._isError = true;
    this._title = title;
    this._messages = response.error.message ? [response.error.message, ...response.error.details] : [CONSTANTS.message];
    this.clearMessages();
  }

  private clearMessages(): void {
    setTimeout(() => {
      this._messages = [];
    }, 3000);
  }
}
