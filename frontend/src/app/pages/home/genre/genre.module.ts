import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreComponent } from './genre.component';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    GenreComponent
  ],
  imports: [
    CommonModule,
    GenreRoutingModule,
    ComponentsModule
  ]
})
export class GenreModule { }
