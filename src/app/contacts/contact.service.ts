import {Injectable} from '@angular/core';
import {Contact} from "./contact-item/contact.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    {
      name: 'Vanessa Tucker',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      status: 'Online',
      badge: 5
    },
    {
      name: 'William Harris',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      status: 'Online',
      badge: 2
    },
    {
      name: 'Sharon Lessman',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      status: 'Online'
    },
    {
      name: 'Christina Mason',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      status: 'Offline'
    },
    {
      name: 'Fiona Green',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      status: 'Offline'
    },
    {
      name: 'Doris Wilder',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      status: 'Offline'
    },
    {
      name: 'Haley Kennedy',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      status: 'Offline'
    },
    {
      name: 'Jennifer Chang',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      status: 'Offline'
    },
  ];

  private selectedContact: Contact;

  constructor() {
    this.selectedContact = this.contacts[0]
  }

  getContacts(): Observable<Contact[]> {
    return of(this.contacts)
  }

  setSelectedContact(contact: Contact) {
    this.selectedContact = contact;
    alert(this.selectedContact.name + ' clicked')
  }
}
