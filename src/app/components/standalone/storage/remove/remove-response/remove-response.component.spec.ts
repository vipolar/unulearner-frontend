import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveResponseComponent } from './remove-response.component';

describe('RemoveResponseComponent', () => {
	let component: RemoveResponseComponent;
	let fixture: ComponentFixture<RemoveResponseComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RemoveResponseComponent]
		});
		fixture = TestBed.createComponent(RemoveResponseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
