import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseComponent } from './close.component';

describe('FailureComponent', () => {
  let component: CloseComponent;
  let fixture: ComponentFixture<CloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseComponent]
    });
    fixture = TestBed.createComponent(CloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
