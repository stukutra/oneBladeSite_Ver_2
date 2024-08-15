import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularImageTextComponent } from './circular-image-text.component';

describe('CircularImageTextComponent', () => {
  let component: CircularImageTextComponent;
  let fixture: ComponentFixture<CircularImageTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircularImageTextComponent]
    });
    fixture = TestBed.createComponent(CircularImageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
