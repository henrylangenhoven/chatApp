import {Component} from '@angular/core';
import {UserService} from "./user/user.service";
import {User} from "./user/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatApp';
  user?: User;

  constructor(private userService: UserService) { // TODO: remove this once user service is used somewhere else
    this.user = this.userService.getOrCreateUser();
    console.log(this.user)
  }
}
