import { Injectable } from '@angular/core';
import { Contact } from './contact-item/contact.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts$: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);

  private readonly selectedContact: BehaviorSubject<Contact> = new BehaviorSubject<Contact>({} as Contact);

  constructor(private userService: UserService, private http: HttpClient) {
    this.http.get('/api/contacts').subscribe((contacts) => {
      this.contacts$.next(contacts as Contact[]);
      (contacts as Contact[]).forEach((contact) => {
        this.userService.createNewUser(contact.name, contact.avatarUrl, false);
      });
    });

    this.contacts$.subscribe((contacts: Contact[]) => this.setSelectedContact(contacts[0]));
  }

  getContacts(): Observable<Contact[]> {
    return this.contacts$;
  }

  getFilteredContacts(filterValue: string): Observable<Contact[]> {
    return !!filterValue
      ? this.contacts$.pipe(
          map((value) =>
            value.filter((value) => value.name.trim().toLowerCase().indexOf(filterValue.trim().toLowerCase()) !== -1)
          )
        )
      : this.getContacts();
  }

  setSelectedContact(contact: Contact) {
    this.selectedContact.next(contact);
  }

  getSelectedContact(): Observable<Contact> {
    return this.selectedContact;
  }
}
