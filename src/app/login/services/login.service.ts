import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CONSTANTS } from 'src/app/core/config/constants';
import { AccessCredentialsDTO } from '../dtos/access-credentials.dto';
import { UserCredentialsDTO } from '../dtos/user-credentials.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _url: string = `${CONSTANTS.url}/auth`;

  constructor(private client: HttpClient) { }

  public login(dto: UserCredentialsDTO): Observable<AccessCredentialsDTO> {
    return this.client.post<AccessCredentialsDTO>(this._url, dto);
  }

  public initSession(dto: AccessCredentialsDTO): void {
    localStorage.setItem('session', JSON.stringify(dto));
  }

  public hasOnlineUser(): boolean {
    return localStorage.getItem('session') != null;
  }

  public getSession(): string {
    const session: string | null = localStorage.getItem('session');

    if (session != null) {
      const dto: AccessCredentialsDTO = JSON.parse(session);
      return dto.token;
    }

    return '';
  }

  public logout(): void {
    localStorage.clear();
  }

}
