import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss'],
    standalone: false
})
export class ChatMessageComponent {
  @ViewChild('messageBox') messageBox: ElementRef<HTMLInputElement> = {} as ElementRef;
  @Output() newMessageSent = new EventEmitter<string>();
  message: string = '';

  focusMessageBox(): void {
    //  TODO: implement this
    setTimeout(() => {
      this.messageBox.nativeElement.focus();
    }, 0);
  }

  send() {
    this.newMessageSent.emit(this.message);
    this.message = '';
  }
}
