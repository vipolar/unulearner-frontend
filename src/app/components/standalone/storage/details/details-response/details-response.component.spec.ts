import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsResponseComponent } from './details-response.component';

describe('DetailsResponseComponent', () => {
  let component: DetailsResponseComponent;
  let fixture: ComponentFixture<DetailsResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsResponseComponent]
    });
    fixture = TestBed.createComponent(DetailsResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
