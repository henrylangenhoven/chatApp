import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userId: string;
  private user$: Observable<User> = of({});

  constructor(private http: HttpClient) {
    this.userId = this.getCurrentUserId();
  }

  getCurrentUserId(): string {
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

  getCurrentUserOrCreate(): Observable<User> {
    return this.user$.pipe(
      switchMap((value) => {
        if (!!value && !!value.id) {
          return of(value);
        }

        return (this.http.get(`/api/users/${this.getCurrentUserId()}`) as Observable<User>).pipe(
          catchError((err) => {
            console.error('failed to get user with id', this.getCurrentUserId(), err);
            return of(null);
          }),
          switchMap((user) => {
            if (!!user) {
              this.user$ = of(user);
              return of(user);
            }

            return this.createNewUser('', '', true);
          })
        );
      })
    );
  }

  createNewUser(name: string, avatarUrl: string, isOnline: boolean): Observable<User> {
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

  isOnline(userId: string): boolean {
    return true; // TODO: implement
  }

  logout(): void {
    localStorage.removeItem(`userId`);
    this.user$ = of({});
    window.location.reload();
  }

  private getRandomNumberBetween(first: number, last: number) {
    return Math.floor(Math.random() * last) + first;
  }
}
