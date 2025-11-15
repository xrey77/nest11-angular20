import { Component, OnInit, afterNextRender } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { SessionStorage } from '../services/session-storage';
import { Login } from "../login/login";
import { Register } from "../register/register";
import { Logoutservice } from '../services/logoutservice';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterLinkWithHref, Login, Register],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss'
})

export class NavMenu implements OnInit {

   userName: string = '';
   profilepic: string = '';
  
  constructor(
    private sessionStorageService: SessionStorage,
    private logoutService: Logoutservice
    ) { 
        afterNextRender(() => {
          // This code runs only in the browser, after the next render cycle
          console.log('Window object is safe to use here:', window.location.href);
        });    
    }
  
    ngOnInit(): void {
        try {
        const uname = this.sessionStorageService.getItem('USERNAME');
        if (uname) {
          this.userName = uname;
        }
      } catch(error) {}

      try {
        const userpic = this.sessionStorageService.getItem('USERPIC');
        if (userpic) {
          this.profilepic = userpic;
        }
      } catch(error) {}
    }
  
  
  logOut(){
    this.sessionStorageService.removeItem('USERNAME');
    this.sessionStorageService.removeItem('USERPIC');
    this.sessionStorageService.removeItem('USERID');
    this.sessionStorageService.removeItem('TOKEN');
    this.sessionStorageService.clear();
    setTimeout(() => {
      this.logoutService.logoutUser();
    }, 3000);

    location.reload();
  }


}
