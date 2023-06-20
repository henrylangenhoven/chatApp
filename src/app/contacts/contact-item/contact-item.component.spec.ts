import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactItemComponent } from './contact-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContactItemComponent', () => {
  let component: ContactItemComponent;
  let fixture: ComponentFixture<ContactItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactItemComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
