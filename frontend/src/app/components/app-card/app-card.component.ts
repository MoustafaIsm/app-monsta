import { Component, Input, OnInit } from '@angular/core';
import { AppMonstaService } from 'src/app/services/appMonsta/app-monsta.service';
import { convertStringToArray } from 'src/utilities/functions';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent implements OnInit {
  @Input() app: any;
  @Input() store: string = '';
  @Input() date: string = '';

  constructor(private router: Router, private appMonstaSvice: AppMonstaService) { }

  ngOnInit(): void {
    this.getPublisherName(this.app.publisher_id);
  }

  getPublisherName(publisherId: string) {
    this.appMonstaSvice.getPublisherName(this.store, this.date).subscribe({
      next: (data: any) => {
        data.forEach((item: any) => {
          if (item.id === publisherId) {
            this.app.publisher_name = item.name;
          }
        });
      },
      error: (err: any) => {
        if (err.status === 200) {
          const data = convertStringToArray(err.error?.text);
          data.forEach((item: any) => {
            if (item.id === publisherId) {
              this.app.publisher_name = item.name;
            }
          });
        } else {
          console.log(err);
        }
      }
    });
  }

  openAppDetails() {
    const navigationExtras: NavigationExtras = {
      state: {
        app: this.app,
      }
    };
    this.router.navigate(['/home/app'], navigationExtras);
  }

}
