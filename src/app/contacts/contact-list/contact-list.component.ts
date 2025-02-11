import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Observable, of } from 'rxjs';
import { User } from '../../user/user.model';
import { FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe } from '@angular/common';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  imports: [FormsModule, NgFor, ContactItemComponent, AsyncPipe],
})
export class ContactListComponent implements OnInit {
  public filterValue: string = '';
  public contacts$: Observable<User[]> = of([]);

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService.getContacts();
  }

  filterContacts() {
    this.contacts$ = this.contactService.getFilteredContacts(this.filterValue);
  }
}
