import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule, } from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table'; 



const material =[

  BrowserAnimationsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
  MatTableModule

  
]

@NgModule({
  imports: [
    material
  ],
  exports:[
    material
  ]
})
export class AngularMaterialModule { }

