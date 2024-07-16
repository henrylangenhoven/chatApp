import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ChatComponent } from './chats/chat/chat.component';
import { ChatHeaderComponent } from './chats/chat/chat-header/chat-header.component';
import { ChatHistoryComponent } from './chats/chat/chat-history/chat-history.component';
import { ChatMessageComponent } from './chats/chat/chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ContactListComponent,
        ChatComponent,
        ChatHeaderComponent,
        ChatHistoryComponent,
        ChatMessageComponent,
      ],
      imports: [FormsModule],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    spyOn(window, 'prompt').and.returnValue('test');
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
