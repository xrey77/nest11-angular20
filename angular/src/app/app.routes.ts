import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Profile } from './profile/profile';
import { Prodlist } from './prodlist/prodlist';
import { Prodcatalog } from './prodcatalog/prodcatalog';
import { Prodsearch } from './prodsearch/prodsearch';
// import { ErrorPageComponent } from './error-page-component/error-page-component';

export const routes: Routes = [
    {
        path: '',
        component: Home, title: 'Apple Inc.'
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'contact',
        component: Contact
    },
    {
        path: 'profile',
        component: Profile
    },
    {
        path: 'productlist',
        component: Prodlist
    },
    {
        path: 'productcatalog',
        component: Prodcatalog
    },
    {
        path: 'productsearch',
        component: Prodsearch
    },
    // {
    //     path: '**',
    //     component: ErrorPageComponent
    // }

];
