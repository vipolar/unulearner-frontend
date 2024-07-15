import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageNodeComponent } from './storage-node.component';

describe('DeniedComponent', () => {
  let component: StorageNodeComponent;
  let fixture: ComponentFixture<StorageNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorageNodeComponent]
    });
    fixture = TestBed.createComponent(StorageNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
