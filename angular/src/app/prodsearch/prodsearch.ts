import { Component, signal, afterNextRender } from '@angular/core';
import { Productservice } from '../services/productservice';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-prodsearch',
  imports: [ReactiveFormsModule, Footer],
  templateUrl: './prodsearch.html',
  styleUrl: './prodsearch.scss'
})

export class Prodsearch {
  searchkey: any;
  message: any;
  products: any;
  totalrec: number = 0;
  page: any = 1;
  totpage: any;
  keyword: any;


  productsearchForm = new FormGroup({
    searchkey: new FormControl('', [Validators.required]),
  });


  constructor(
    private productsService: Productservice
  ) { 
    afterNextRender(() => {
      // This code runs only in the browser, after the next render cycle
      console.log('Window object is safe to use here:', window.location.href);
    });  
  }

  async submitSearchForm() {
    
    if (this.productsearchForm.valid) {
      this.keyword = this.productsearchForm.get('searchkey')?.value;
      const productObservable = await this.productsService.sendSearchRequest(this.page, this.keyword); 
      productObservable.subscribe((res: any) => {
        this.products = res.data;
        this.page = res.currentPage;
        this.totpage = res.totalPages;
        this.totalrec = res.totalItems;

        const itemCount: number = this.products.length;
        if (itemCount === 0) {
          this.message = 'Product not found.';
        }
        
        window.setTimeout(() => {
          this.message = '';
        }, 1000);
  
      }, (err: any) => {
          this.message = err.error.message;
          window.setTimeout(() => {
            this.message = '';
          }, 3000);
      });
    }
  }

  async submitSearchPage(pg: any, key: any) {    
    if (this.productsearchForm.valid) {
      const productObservable = await this.productsService.sendSearchRequest(this.page, key);
      productObservable.subscribe((res: any) => {
        this.products = res.data;
        this.page = res.currentPage;
        this.totpage = res.totalPages;
        this.totalrec = res.totalItems;
        window.setTimeout(() => {
          this.message = '';
        }, 1000);
  
      }, (err: any) => {
          this.message = err.error.message;
          window.setTimeout(() => {
            this.message = '';
          }, 3000);
      });
    }
    
  }


  lastPage(event: any) {
    event.preventDefault();    
    this.page = this.totpage;
    return this.submitSearchPage(this.page, this.keyword);
  }

  nextPage(event: any) {
    event.preventDefault();    
    if (this.page == this.totpage) {
      this.page = this.totpage;
      return;
    }
    this.page++;
    return this.submitSearchPage(this.page, this.keyword);
  }

  prevPage(event: any) {
    event.preventDefault();    
    if (this.page == 1) {
      return;
    }
    this.page = this.page - 1;
    return this.submitSearchPage(this.page, this.keyword);
  }

  firstPage(event: any) {
    event.preventDefault();    
    this.page = 1;
    return this.submitSearchPage(this.page, this.keyword);
  }

  toDecimal(nos: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(nos);
  }


}
