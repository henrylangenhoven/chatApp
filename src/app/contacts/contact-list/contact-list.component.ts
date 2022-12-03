import {Component} from '@angular/core';
import {Contact} from "../contact-item/contact.model";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  public contacts: Contact[] = [
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
}
