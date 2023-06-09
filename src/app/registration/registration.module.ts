import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { ListRegistrationComponent } from './list-registration/list-registration.component';
import { MaterialModule } from '../material.module';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateRegistrationComponent,
    ListRegistrationComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})

export class RegistrationModule { }
