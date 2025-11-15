import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Profile } from '../interface/profile';

interface ActivateMfa {
  twofactorenabled: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class Profileservice {
  
  private http = inject(HttpClient)
    
  public getUserbyId(id: any, token: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };    
    return this.http.get(`http://localhost:3000/api/users/getuserid/${id}`, options);
  }

  public ActivateMFA(id: string, enabled: ActivateMfa, token: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };    
    return this.http.patch(`http://localhost:3000/api/users/mfa/activate/${id}`, enabled, options);
  }

  public UploadPicture(id: any, profilepic: any, token: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }; 
    return this.http.patch<any>(`http://localhost:3000/api/users/uploadpicture/${id}`, profilepic, options);
  }

  public sendProfileRequest(id: any, userdtls: any, token: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };    
    return this.http.patch<Profile>(`http://localhost:3000/api/users/updateprofile/${id}`, userdtls, options);
  }  

  public sendNewpasswordRequest(id: string, userdtls: any, token: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };    
    return this.http.patch<Profile>(`http://localhost:3000/api/users/changepassword/${id}`, userdtls, options);
  }  
  
}
