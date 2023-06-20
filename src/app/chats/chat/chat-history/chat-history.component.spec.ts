import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatHistoryComponent} from './chat-history.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ChatHistoryComponent', () => {
  let component: ChatHistoryComponent;
  let fixture: ComponentFixture<ChatHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatHistoryComponent], imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
