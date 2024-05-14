import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteComponent } from './execute.component';

describe('ExecuteComponent', () => {
  let component: ExecuteComponent;
  let fixture: ComponentFixture<ExecuteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExecuteComponent]
    });
    fixture = TestBed.createComponent(ExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
