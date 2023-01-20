import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { GenreCardComponent } from './genre-card/genre-card.component';


@NgModule({
  declarations: [
    GenreCardComponent

  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GenreCardComponent
  ]
})
export class ComponentsModule { }
