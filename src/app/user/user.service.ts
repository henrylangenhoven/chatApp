import {Injectable} from '@angular/core';
import * as uuid from "uuid";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userId: string;
  private user?: User;

  constructor() {

    this.userId = this.getUserId();
  }

  getUserId(): string {
    if (!!this.userId) {
      return this.userId;
    }

    let userIdFromStorage = localStorage.getItem(`userId`);
    if (!userIdFromStorage) {
      let value = uuid.v4();
      try {
        localStorage.setItem(`userId`, value);
        userIdFromStorage = value;
      } catch (e) {
        console.error(`Unable to save userId to localStorage`, e);
        userIdFromStorage = '';
      }
    }

    return userIdFromStorage;
  }

  getOrCreateUser() {
    if (!!this.user) {
      return this.user;
    }

    // let name = prompt("Please enter your name") || "Harry Potter";
    // let avatarUrl = prompt("Please enter your avatar url") || "https://bootdey.com/img/Content/avatar/avatar1.png";
    let name = "Harry Potter";
    let avatarUrl = "https://bootdey.com/img/Content/avatar/avatar1.png";

    this.user = {
      id: this.getUserId(),
      name,
      avatarUrl,
      createdDate: new Date(),
      isOnline: true
    }

    return this.user;
  }
}
