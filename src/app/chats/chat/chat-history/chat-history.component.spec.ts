import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHistoryComponent } from './chat-history.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ElementRef } from '@angular/core';

describe('ChatHistoryComponent', () => {
  let component: ChatHistoryComponent;
  let fixture: ComponentFixture<ChatHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatHistoryComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to bottom after view initialization', () => {
    const scrollSpy = spyOn(component, 'scrollToBottom');
    component.ngAfterViewInit();
    expect(scrollSpy).toHaveBeenCalled();
  });

  it('should scroll to bottom when scrollToBottom is called', () => {
    const nativeElementSpy = spyOn(component.bottomElement.nativeElement, 'scrollIntoView');
    component.scrollToBottom();
    expect(nativeElementSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('should handle error when bottomElement is not defined', () => {
    component.bottomElement = {} as ElementRef;
    expect(() => component.scrollToBottom()).not.toThrow();
  });
});
