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
      name: "Vincent Porter",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
      status: "offline",
      statusMessage: "left 7 mins ago",
    },
    {
      name: "Aiden Chavez",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar2.png",
      status: "online",
      statusMessage: "online",
      active: true
    },
    {
      name: "Mike Thomas",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar3.png",
      status: "online",
      statusMessage: "online"
    },
    {
      name: "Christian Kelly",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar7.png",
      status: "offline",
      statusMessage: "left 10 hours ago"
    },
    {
      name: "Monica Ward",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar8.png",
      status: "online",
      statusMessage: "online"
    },
    {
      name: "Dean Henry",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar3.png",
      status: "offline",
      statusMessage: "offline since Oct 28"
    }
  ];
}
