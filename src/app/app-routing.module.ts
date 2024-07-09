import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminGuard } from './guards/admin-guard';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CartComponent } from './cart/cart.component';
import { BasketComponent } from './basket/basket.component';
import { AddressComponent } from './address/address.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { PdCreateComponent } from './pd-create/pd-create.component';
import { CtCreateComponent } from './ct-create/ct-create.component';
import { AccountComponent } from './account/account.component';
import { SuccessComponent } from './success/success.component';
import { MySparisService } from './services/mysparis.service';
import { MysparisComponent } from './mysparis/mysparis.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'products/:productId', component: ProductComponent },
  { path: 'products/category/:categoryId', component: ProductListComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'cart', component: BasketComponent },
  { path: 'address', component: AddressComponent },
  { path: 'creditcard', component: CreditcardComponent },
  { path: 'createPrd', component: PdCreateComponent ,canActivate: [AdminGuard]},
  { path: 'createCat', component:  CtCreateComponent ,canActivate: [AdminGuard]},
  { path: 'account', component:  AccountComponent},
  { path: 'success', component:  SuccessComponent},
  { path: 'myorders', component:  MysparisComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
