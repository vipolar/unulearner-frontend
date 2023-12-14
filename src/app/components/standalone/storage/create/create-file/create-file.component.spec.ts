import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFileComponent } from './create-file.component';

describe('CreateFileComponent', () => {
  let component: CreateFileComponent;
  let fixture: ComponentFixture<CreateFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFileComponent]
    });
    fixture = TestBed.createComponent(CreateFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
