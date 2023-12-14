import { CreateDirectoryComponent } from './create-directory.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CreateDirectoryComponent', () => {
	let component: CreateDirectoryComponent;
	let fixture: ComponentFixture<CreateDirectoryComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CreateDirectoryComponent]
		});
		fixture = TestBed.createComponent(CreateDirectoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
