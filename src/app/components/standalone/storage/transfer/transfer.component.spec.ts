import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferComponent } from './transfer.component';

describe('TransferComponent', () => {
	let component: TransferComponent;
	let fixture: ComponentFixture<TransferComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TransferComponent]
		});
		fixture = TestBed.createComponent(TransferComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
