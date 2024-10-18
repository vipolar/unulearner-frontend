import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionOptionComponent } from './exception-option.component';

describe('ExceptionOptionComponent', () => {
  let component: ExceptionOptionComponent;
  let fixture: ComponentFixture<ExceptionOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExceptionOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExceptionOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
