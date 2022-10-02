import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllNewsComponent} from "./all-news/all-news.component";
import {FavoriteNewsComponent} from "./favorite-news/favorite-news.component";
import {CreateNewsComponent} from "./create-news/create-news.component";
import {LoyautComponent} from "./loyaut/loyaut.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./sign-up/signup.component";


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'loyaut', component: LoyautComponent, children:[
      {path:'news', component: AllNewsComponent},
      {path:'favorite', component: FavoriteNewsComponent},
      {path:'create', component: CreateNewsComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
