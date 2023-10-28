import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserSignUpComponent } from './form-user-sign-up.component';

describe('FormUserSignUpComponent', () => {
  let component: FormUserSignUpComponent;
  let fixture: ComponentFixture<FormUserSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUserSignUpComponent]
    });
    fixture = TestBed.createComponent(FormUserSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
