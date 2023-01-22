import { Component, Input, OnInit } from '@angular/core';
import { AppMonstaService } from 'src/app/services/appMonsta/app-monsta.service';
import { convertStringToArray } from 'src/utilities/functions';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent implements OnInit {
  @Input() app: any;
  @Input() store: string = '';
  @Input() date: string = '';

  constructor(private appMonstaSvice: AppMonstaService) { }

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
          let placeholder = 'Unknown publisher'
          data.forEach((item: any) => {
            if (item.id === publisherId) {
              this.app.publisher_name = item.name;
              placeholder = '';
            }
          });
          if (placeholder !== '') {
            this.app.publisher_name = placeholder;
          }

        } else {
          console.log(err);
        }
      }
    });
  }

}
