import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private readonly selectedContact: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(private userService: UserService, private http: HttpClient) {
    this.http.get('/api/users').subscribe((contacts) => {
      this.contacts$.next(contacts as User[]);
      (contacts as User[]).forEach((contact) => {
        // this.userService.createNewUser(contact.name, contact.avatarUrl, false);
      });
    });

    this.contacts$.subscribe((contacts: User[]) => this.setSelectedContact(contacts[0]));
  }

  getContacts(): Observable<User[]> {
    return this.contacts$;
  }

  getFilteredContacts(filterValue: string): Observable<User[]> {
    return !!filterValue
      ? this.contacts$.pipe(
          map((value) =>
            value.filter(
              (value) =>
                !!value?.name!! && value.name.trim().toLowerCase().indexOf(filterValue.trim().toLowerCase()) !== -1
            )
          )
        )
      : this.getContacts();
  }

  setSelectedContact(contact: User) {
    this.selectedContact.next(contact);
  }

  getSelectedContact(): Observable<User> {
    return this.selectedContact;
  }
}
