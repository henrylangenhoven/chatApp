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

  getOrCreateUser(): Observable<User> {
    return this.user$.pipe(
      switchMap((value) => {
        if (!!value && !!value.id) {
          return of(value);
        }

        return (this.http.get(`/api/users/${this.getUserId()}`) as Observable<User>).pipe(
          catchError((err) => {
            console.error('failed to get user with id', this.getUserId(), err);
            return of(null);
          }),
          switchMap((value1) => {
            if (!!value1) {
              this.user$ = of(value1);
              return of(value1);
            }

            let name = prompt('Please enter your name') || 'Harry Potter';
            let avatarUrl =
              prompt('Please enter your avatar url') || 'https://bootdey.com/img/Content/avatar/avatar1.png';

            return this.http.post('/api/users', {
              id: this.getUserId(),
              name,
              avatarUrl,
              createdDate: new Date(),
              isOnline: true,
            }) as Observable<User>;
          })
        );
      })
    );
  }

  isOnline(userId: string): boolean {
    return true; // TODO: implement
  }

  logout(): void {
    localStorage.removeItem(`userId`);
    this.user$ = of({});
    window.location.reload();
  }
}
