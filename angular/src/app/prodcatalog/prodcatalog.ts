import { Component } from '@angular/core';
import { Productservice } from '../services/productservice';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-prodcatalog',
  imports: [Footer],
  templateUrl: './prodcatalog.html',
  styleUrl: './prodcatalog.scss'
})
export class Prodcatalog {

  message: any;
  page: number = 1;
  totpage: any;
  totalrecs: any;
  products: any;

  constructor(
    private productsService: Productservice
  ) { 
    this.productList(this.page);
  }

  async productList(page: any) {
    const productObservable = await this.productsService.sendProductRequest(page); 
    productObservable.subscribe((res: any) => {
      this.page = res.currentPage;
      this.totpage = res.totalPages;
      this.products = res.data;
      this.totalrecs = res.totalItems;
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

  lastPage(event: any) {
    event.preventDefault();    
    this.page = this.totpage;
    this.productList(this.page);
    return;    
  }

  nextPage(event: any) {
    event.preventDefault();    
    if (this.page == this.totpage) {
      return;
    }
    this.page++;
    return this.productList(this.page);
  }

  prevPage(event: any) {
    event.preventDefault();    
    if (this.page == 1) {
      return;
    }
    this.page = this.page - 1;
    this.productList(this.page);
    return;    

  }

  firstPage(event: any) {
    event.preventDefault();    
    this.page = 1;
    this.productList(this.page);
    return;    
  }  

  toDecimal(nos: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(nos);
  }


}
