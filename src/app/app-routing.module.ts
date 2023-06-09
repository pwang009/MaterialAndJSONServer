import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './registration/create-registration/create-registration.component';
import { ListRegistrationComponent } from './registration/list-registration/list-registration.component';
import { DetailsComponent } from './registration/details/details.component';


const routes: Routes = [
  {path:'', redirectTo:'list', pathMatch:'full'},
  {path:'register', component: CreateRegistrationComponent},
  {path:'list', component: ListRegistrationComponent},
  {path:'detail/:id', component: DetailsComponent},
  {path:'update/:id', component: CreateRegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
