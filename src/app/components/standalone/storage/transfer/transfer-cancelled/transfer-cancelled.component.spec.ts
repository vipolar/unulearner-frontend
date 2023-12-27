import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCancelledComponent } from './transfer-cancelled.component';

describe('TransferCancelledComponent', () => {
	let component: TransferCancelledComponent;
	let fixture: ComponentFixture<TransferCancelledComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TransferCancelledComponent]
		});
		fixture = TestBed.createComponent(TransferCancelledComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
