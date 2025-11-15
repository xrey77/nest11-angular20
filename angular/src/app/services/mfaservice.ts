import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Mfaservice {
  private http = inject(HttpClient);

public sendMfaValidation(id: any, userdtls: any, token: any): Observable<any> {


  const options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`
    })
  };
    return this.http.patch(`http://localhost:3000/api/users/verifytotp/${id}` ,userdtls, options);
};
  
}
