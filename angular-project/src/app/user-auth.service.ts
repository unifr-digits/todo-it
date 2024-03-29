import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_BASE_URL = 'https://127.0.0.1:52439/api/v1/';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private static jwt = '';

  constructor(private readonly httpClient: HttpClient) {}

  public async login(email: string, password: string) {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    };

    const object = { email: email, password: password };
    try {
      const response: any = await this.httpClient.post<string>(API_BASE_URL + 'login', object, httpOptions).toPromise();
      UserAuthService.jwt = response;
    } catch (error) {
      console.log(error.error);
      throw new Error(error.error);
    }
  }

  public async signup(email: string, password: string, name: string) {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    };

    const object = { email: email, password: password, name: name };
    try {
      await this.httpClient.post<string>(API_BASE_URL + 'register', object, httpOptions).toPromise();
    } catch (error) {
      console.log(error.error);
      throw new Error(error.error);
    }
  }

  public static getJwt(): string {
    return UserAuthService.jwt;
  }
}
