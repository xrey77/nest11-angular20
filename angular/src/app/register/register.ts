import { Component, signal, afterNextRender } from '@angular/core';
import { Registerservice } from '../services/registerservice';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})

export class Register {

  registrationMessage = signal('');
  
  registrationForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private registrationService: Registerservice,
  ) { 
      afterNextRender(() => {
        // This code runs only in the browser, after the next render cycle
        console.log('Window object is safe to use here:', window.location.href);
      });  
  }

  submitRegistrationForm() {
    if(this.registrationForm.valid)
    {
      this.registrationMessage.set('please wait...');
       this.registrationService.sendRegistrationRequest(this.registrationForm.value).subscribe({
        next: (res: any) => {
          this.registrationMessage.set(res.message);
          setTimeout(() => {
            this.registrationMessage.set('');
          }, 3000);

        },
        error: (err: any) => {
          this.registrationMessage.set(err.error.message);
          setTimeout(() => {
            this.registrationMessage.set('');
          }, 3000);

        }        
      });     
    }
  }

  closeRegistration() {
    $("#reset").trigger('click');
  }

}
