import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferResponseComponent } from './transfer-response.component';

describe('TransferResponseComponent', () => {
	let component: TransferResponseComponent;
	let fixture: ComponentFixture<TransferResponseComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TransferResponseComponent]
		});
		fixture = TestBed.createComponent(TransferResponseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
