import { Component, afterNextRender } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  constructor() {
    afterNextRender(() => {
      // This code runs only in the browser, after the next render cycle
      console.log('Window object is safe to use here:', window.location.href);
    });
  }

}

