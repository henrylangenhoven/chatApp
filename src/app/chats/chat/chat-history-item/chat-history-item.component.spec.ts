import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHistoryItemComponent } from './chat-history-item.component';

describe('ChatHistoryItemComponent', () => {
  let component: ChatHistoryItemComponent;
  let fixture: ComponentFixture<ChatHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatHistoryItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit newMessageAppears after view initialization', () => {
    const emitSpy = spyOn(component.newMessageAppears, 'emit');
    component.ngAfterViewInit();
    expect(emitSpy).toHaveBeenCalled();
  });
});
