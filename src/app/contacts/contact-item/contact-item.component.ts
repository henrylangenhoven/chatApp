import {Component, Input} from '@angular/core';
import {Contact} from "./contact.model";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent {
  @Input() public contact: Contact = {
    name: "Dummy",
    avatarUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
    status: "Online",
    badge: 5
  };

  clicked() {
    alert(this.contact.name + ' clicked')
  }
}
