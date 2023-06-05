import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { ListRegistrationComponent } from './list-registration/list-registration.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [CreateRegistrationComponent, ListRegistrationComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class RegistrationModule { }
