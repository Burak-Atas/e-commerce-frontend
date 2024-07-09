import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { AuthComponent } from './auth/auth.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationComponent } from './notification/notification.component';
import { BasketComponent } from './basket/basket.component';
import { AddressComponent } from './address/address.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { PdCreateComponent } from './pd-create/pd-create.component';
import { CtCreateComponent } from './ct-create/ct-create.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './account/account.component';
import { SuccessComponent } from './success/success.component';
import { MysparisComponent } from './mysparis/mysparis.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductComponent,
    CategoryListComponent,
    HomeComponent,
    AuthComponent,
    NotificationComponent,
    BasketComponent,
    AddressComponent,
    CreditcardComponent,
    PdCreateComponent,
    CtCreateComponent,
    FooterComponent,
    AccountComponent,
    SuccessComponent,
    MysparisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
