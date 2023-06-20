import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact-item/contact.model';
import { ContactService } from '../contact.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public filterValue: string = '';
  public contacts$: Observable<Contact[]> = of([]);

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService.getContacts();
  }

  filterContacts() {
    this.contacts$ = this.contactService.getFilteredContacts(this.filterValue);
  }
}
