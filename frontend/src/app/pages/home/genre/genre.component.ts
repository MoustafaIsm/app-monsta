import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genre: any;
  store: string = '';
  date: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe({
      next: (data: any) => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          const state = this.router.getCurrentNavigation()?.extras.state;
          this.genre = state?.['genre'];
          this.store = state?.['store'];
          this.date = state?.['date'];
        }
      }
    });

  }

  ngOnInit(): void {
  }

}
