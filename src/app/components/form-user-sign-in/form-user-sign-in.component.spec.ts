import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserSignInComponent } from './form-user-sign-in.component';

describe('FormUserSignInComponent', () => {
  let component: FormUserSignInComponent;
  let fixture: ComponentFixture<FormUserSignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUserSignInComponent]
    });
    fixture = TestBed.createComponent(FormUserSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
