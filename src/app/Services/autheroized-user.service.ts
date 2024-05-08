import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutheroizedUserService {
  constructor(private http: HttpClient) {}
    forgotPassword(email: string): Observable<any> {
      // Send a request to your backend to initiate the password reset process
      return this.http.post<any>('api/forgot-password', { email });
    }
}
