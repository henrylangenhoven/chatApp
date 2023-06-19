import {Component} from '@angular/core';
import {UserService} from "./user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatApp';

  constructor(private userService: UserService) { // TODO: remove this once user service is used somewhere else
  }
}
