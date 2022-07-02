import { Component } from '@angular/core';
import { AuthService } from '@shared-apps/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isAccessToken()) {
      this.authService.isLoggedIn$.next(false);
      this.router.navigate(['/login']).then();
    } else {

    }
  }

}
