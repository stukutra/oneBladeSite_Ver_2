import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBackgroundComponent } from './full-background.component';

describe('FullBackgroundComponent', () => {
  let component: FullBackgroundComponent;
  let fixture: ComponentFixture<FullBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullBackgroundComponent]
    });
    fixture = TestBed.createComponent(FullBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
