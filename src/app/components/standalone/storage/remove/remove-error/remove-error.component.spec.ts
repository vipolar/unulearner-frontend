import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveErrorComponent } from './remove-error.component';

describe('RemoveErrorComponent', () => {
	let component: RemoveErrorComponent;
	let fixture: ComponentFixture<RemoveErrorComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RemoveErrorComponent]
		});
		fixture = TestBed.createComponent(RemoveErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
