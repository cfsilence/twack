import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../app.config";

@Injectable()
export class AuthService {
  private serviceBase: string = AppConfig.serverBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  authenticate(username: string) {
    return this.http.get(`${this.serviceBase}/token/${username}`);
  }

  refreshToken() {
    this.authenticate(localStorage.getItem('twackUsername')).subscribe( (auth: any) => {
      localStorage.setItem('twackToken', auth.token);
    });
  }
}
