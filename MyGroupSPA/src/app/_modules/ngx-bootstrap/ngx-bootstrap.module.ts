import { NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, TabsModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';


const ngxBootstrap =[
 
  BrowserAnimationsModule,
  BsDropdownModule.forRoot({
    isAnimated:true,
    autoClose:true
  }),
  TabsModule.forRoot() ,
  BsDatepickerModule.forRoot(),
  PaginationModule.forRoot(),
  ButtonsModule,
  ModalModule.forRoot()

]

@NgModule({
  imports: [
    ngxBootstrap
  ],
  exports:[
    ngxBootstrap,
    ModalModule
  ],

})
export class NgxBootstrapModule{}

