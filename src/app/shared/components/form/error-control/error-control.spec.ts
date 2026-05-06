import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorControl } from './error-control';

describe('ErrorControl', () => {
  let component: ErrorControl;
  let fixture: ComponentFixture<ErrorControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorControl],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
