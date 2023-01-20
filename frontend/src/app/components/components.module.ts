import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { GenreCardComponent } from './genre-card/genre-card.component';
import { AppCardComponent } from './app-card/app-card.component';


@NgModule({
  declarations: [
    GenreCardComponent,
    AppCardComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GenreCardComponent,
    AppCardComponent
  ]
})
export class ComponentsModule { }
