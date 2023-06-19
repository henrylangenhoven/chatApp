import {Injectable} from '@angular/core';
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userId: string;

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
}
