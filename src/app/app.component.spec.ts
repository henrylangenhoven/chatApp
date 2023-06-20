import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ChatComponent } from './chats/chat/chat.component';
import { ChatHeaderComponent } from './chats/chat/chat-header/chat-header.component';
import { ChatHistoryComponent } from './chats/chat/chat-history/chat-history.component';
import { ChatMessageComponent } from './chats/chat/chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [
        AppComponent,
        ContactListComponent,
        ChatComponent,
        ChatHeaderComponent,
        ChatHistoryComponent,
        ChatMessageComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'chatApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('chatApp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('  ');
  });
});
