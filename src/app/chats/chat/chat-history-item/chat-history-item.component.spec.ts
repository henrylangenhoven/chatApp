import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHistoryItemComponent } from './chat-history-item.component';

describe('ChatHistoryItemComponent', () => {
  let component: ChatHistoryItemComponent;
  let fixture: ComponentFixture<ChatHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatHistoryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
