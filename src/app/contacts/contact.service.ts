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

  private contacts: User[] = [];
  private readonly currentUserId = this.userService.getCurrentUserId();
  private readonly selectedContact: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(
    private userService: UserService,
    private http: HttpClient,
  ) {
    this.currentUserId = this.userService.getCurrentUserId();

    this.http
      .get('/api/users')
      .pipe(map((users) => users as User[]))
      .subscribe((contacts) => {
        this.contacts = contacts as User[];
        this.contacts$.next(contacts as User[]);
      });

    this.contacts$.subscribe((contacts: User[]) => this.setSelectedContact(contacts[0]));
  }

  getContacts(): Observable<User[]> {
    return this.contacts$.pipe(map((users) => users.filter((user) => user.id !== this.currentUserId)));
  }

  getContactById(id: string): User | undefined {
    return this.contacts.filter((contact) => contact.id === id)[0];
  }

  getFilteredContacts(filterValue: string): Observable<User[]> {
    return !!filterValue
      ? this.contacts$.pipe(
          map((users) => users.filter((user) => user.id !== this.currentUserId)),
          map((value: User[]) =>
            value.filter(
              (value: User) =>
                !!value?.name!! && value.name.trim().toLowerCase().indexOf(filterValue.trim().toLowerCase()) !== -1,
            ),
          ),
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
