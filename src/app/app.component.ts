import {Component} from '@angular/core';
import {UserService} from "./user/user.service";
import {User} from "./user/user.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatApp';
  user?: User;

  constructor(private userService: UserService) {
    this.userService.getOrCreateUser().pipe(takeUntilDestroyed()).subscribe(value => this.user = value);
  }

  logout() {
    if (confirm('Are you sure you want to logout?'))
      this.userService.logout();
  }
}
