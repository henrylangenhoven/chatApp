import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly local_storage_current_user_id_key = `currentUserId`;
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(private http: HttpClient) {}

  login(): Observable<User> {
    let currentUserId = localStorage.getItem(this.local_storage_current_user_id_key);
    let currentUser: User;
    if (!!currentUserId) {
      this.http.get(`/api/users/${currentUserId}`).subscribe((user) => {
        currentUser = user as User;
        this.user$.next(currentUser);
      });
    } else {
      this.createNewUser('', '', true).subscribe((user) => {
        currentUser = user as User;
        if (!currentUser) return;

        currentUserId = currentUser.id!!;
        localStorage.setItem(this.local_storage_current_user_id_key, currentUserId);

        this.user$.next(currentUser);
      });
    }

    return this.user$;
  }

  logout(): void {
    localStorage.removeItem(this.local_storage_current_user_id_key);
    this.user$.next({} as any);
    this.reloadWindow();
  }

  createNewUser(name: string, avatarUrl: string, isOnline: boolean = false): Observable<User> {
    if (!name) {
      name = prompt('Please enter your name') || 'Harry Potter';
    }

    if (!avatarUrl) {
      avatarUrl =
        prompt('Please enter your avatar url. Leave empty for defaults') ||
        `https://bootdey.com/img/Content/avatar/avatar${this.getRandomNumberBetween(1, 8)}.png`;
    }

    return this.http.post('/api/users', {
      id: uuid.v4(),
      name,
      avatarUrl,
      createdDate: new Date(),
      isOnline,
    }) as Observable<User>;
  }

  private reloadWindow() {
    window.location.reload();
  }

  private getRandomNumberBetween(first: number, last: number) {
    return Math.floor(Math.random() * last) + first;
  }
}
