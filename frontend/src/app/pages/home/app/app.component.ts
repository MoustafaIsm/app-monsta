import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  app: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe({
      next: (data: any) => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.app = this.router.getCurrentNavigation()?.extras.state?.['app'];
        }
      }
    });
  }
}
