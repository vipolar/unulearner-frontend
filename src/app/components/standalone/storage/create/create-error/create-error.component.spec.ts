import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateErrorComponent } from './create-error.component';

describe('CreateErrorComponent', () => {
  let component: CreateErrorComponent;
  let fixture: ComponentFixture<CreateErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateErrorComponent]
    });
    fixture = TestBed.createComponent(CreateErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
