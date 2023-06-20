import { Injectable } from '@angular/core';
import { Contact } from './contact-item/contact.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts$: Observable<Contact[]> = this.http.get('/api/contacts') as Observable<Contact[]>;

  private readonly selectedContact: BehaviorSubject<Contact>;

  constructor(private http: HttpClient) {
    // TODO: remove defualt and handle login
    this.selectedContact = new BehaviorSubject<Contact>({
      name: 'Vanessa Tucker',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      status: 'Online',
      badge: 5,
    });

    this.contacts$.subscribe((contacts: Contact[]) => {
      this.setSelectedContact(contacts[0]);
    });
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
