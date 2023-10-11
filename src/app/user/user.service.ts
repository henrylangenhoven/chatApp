import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly local_storage_current_user_id_key = `currentUserId`;
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(private http: HttpClient) {}

  login(): Observable<User> {
    let currentUserId = localStorage.getItem(this.local_storage_current_user_id_key);

    if (!currentUserId) {
      return this.createNewCurrentUser();
    }

    return this.http.get(`/api/users/${currentUserId}`).pipe(
      catchError(() => this.createNewCurrentUser()),
      map((user: User) => {
        return user;
      })
    );
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

  private createNewCurrentUser(): Observable<User> {
    return this.createNewUser('', '', true).pipe(
      map((user: User) => {
        localStorage.setItem(this.local_storage_current_user_id_key, user.id!);
        return user;
      })
    );
  }

  private reloadWindow(): void {
    window.location.reload();
  }

  private getRandomNumberBetween(first: number, last: number): number {
    return Math.floor(Math.random() * last) + first;
  }
}
