import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatComponent, ChatHeaderComponent, ChatHistoryComponent, ChatMessageComponent],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
