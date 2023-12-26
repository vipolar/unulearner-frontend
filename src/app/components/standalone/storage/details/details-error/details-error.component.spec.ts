import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsErrorComponent } from './details-error.component';

describe('DetailsErrorComponent', () => {
  let component: DetailsErrorComponent;
  let fixture: ComponentFixture<DetailsErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsErrorComponent]
    });
    fixture = TestBed.createComponent(DetailsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
