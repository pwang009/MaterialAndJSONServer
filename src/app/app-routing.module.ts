import { NgModule, Component, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './registration/create-registration/create-registration.component';
import { ListRegistrationComponent } from './registration/list-registration/list-registration.component';


const routes: Routes = [
  {path:'', redirectTo:'register', pathMatch:'full'},
  {path:'register', component: CreateRegistrationComponent},
  {path:'list', component: ListRegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
