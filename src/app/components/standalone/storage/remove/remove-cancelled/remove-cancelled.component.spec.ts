import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCancelledComponent } from './remove-cancelled.component';

describe('RemoveCancelledComponent', () => {
	let component: RemoveCancelledComponent;
	let fixture: ComponentFixture<RemoveCancelledComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RemoveCancelledComponent]
		});
		fixture = TestBed.createComponent(RemoveCancelledComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
