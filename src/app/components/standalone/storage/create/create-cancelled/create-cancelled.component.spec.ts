import { CreateCancelledComponent } from './create-cancelled.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CreateCancelledComponent', () => {
	let component: CreateCancelledComponent;
	let fixture: ComponentFixture<CreateCancelledComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CreateCancelledComponent]
		});
		fixture = TestBed.createComponent(CreateCancelledComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
