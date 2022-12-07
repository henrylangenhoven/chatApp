import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from "../../contacts/contact-item/contact.model";
import {ContactService} from "../../contacts/contact.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public contact: Contact = {} as Contact;

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.contactService.getSelectedContact()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(contact => this.contact = contact)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
