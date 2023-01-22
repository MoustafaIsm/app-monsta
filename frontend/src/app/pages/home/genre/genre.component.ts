import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppMonstaService } from 'src/app/services/appMonsta/app-monsta.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genre: any;
  store: string = '';
  date: string = '';
  appDetails: any[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private appMonstaService: AppMonstaService) {
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
    this.getAppsDetails();
  }

  getAppsDetails() {
    // this.genre?.ranks.forEach((item: string) => {
    //   this.appMonstaService.getAppDetails(this.store, item, this.genre.country).subscribe({
    //     next: (data: any) => {
    //       this.appDetails.push(data);
    //     }
    //   });
    // });

    this.appMonstaService.getAppDetails(this.store, this.genre.ranks[0], this.genre.country).subscribe({
      next: (data: any) => {
        this.appDetails.push(data);
      }
    });
  }

}
