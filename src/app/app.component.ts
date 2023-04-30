import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./services/auth.service";
import { RouteUrl } from "./shared/route-url";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl(RouteUrl.AUTH);
    }
  }
}
