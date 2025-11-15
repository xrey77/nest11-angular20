import { Component, afterNextRender ,signal} from '@angular/core';
import { Mfaservice } from '../services/mfaservice';
import { Logoutservice } from '../services/logoutservice';
import { SessionStorage } from '../services/session-storage';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-mfa',
  imports: [ReactiveFormsModule],
  templateUrl: './mfa.html',
  styleUrl: './mfa.scss'
})

export class Mfa {
  message = signal('');
  isDisabled: boolean = false;
  userId: any = '';
  userToken: any = '';

  constructor(
    private mfaService: Mfaservice,
    private logoutService: Logoutservice,
    private sessionStorageService: SessionStorage
  ) { 
      afterNextRender(() => {
        // This code runs only in the browser, after the next render cycle
        console.log('Window object is safe to use here:', window.location.href);
      });  
  }

  mfaForm = new FormGroup({
    otpcode: new FormControl('', [Validators.required]),
  });

  submitMfaForm() {
    const uid = this.sessionStorageService.getItem('USERID');
    if (uid) {
      this.userId = uid;
    }

    const uToken = this.sessionStorageService.getItem('TOKEN');
    if (uToken) {
      this.userToken = uToken;
    }

    if(this.mfaForm.valid)
    {
       this.message.set('please wait...');
       const formData = {
        'token': this.mfaForm.get('otpcode')?.value
       }
       this.mfaService.sendMfaValidation(this.userId, formData, this.userToken).subscribe({
         next: (res: any) => {
          
              this.message.set(res.message);
              this.sessionStorageService.setItem("USERNAME", res.username);  
              setTimeout(() => {
                this.message.set('');
                $("#reset").trigger('click')
                location.reload();
              }, 6000);
            
          },
          error: (err: any) => {
            this.message.set(err.error.message);
            setTimeout(() => {
              $("#reset").trigger('click')
              this.message.set('');
              this.isDisabled = false;
            }, 3000);
            return;
          }
      });
    
    }
  }    

  closeMfa() {
    $("#reset").trigger('click');
    setTimeout(() => {
      this.logoutService.logoutUser();
    }, 3000);
  }

}
