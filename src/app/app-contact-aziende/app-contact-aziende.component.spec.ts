import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContactAziendeComponent } from './app-contact-aziende.component';

describe('AppContactAziendeComponent', () => {
  let component: AppContactAziendeComponent;
  let fixture: ComponentFixture<AppContactAziendeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppContactAziendeComponent]
    });
    fixture = TestBed.createComponent(AppContactAziendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
