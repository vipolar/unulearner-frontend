import { EnglishWordlistComponent } from './english-wordlist.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('EnglishWordlistComponent', () => {
	let component: EnglishWordlistComponent;
	let fixture: ComponentFixture<EnglishWordlistComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EnglishWordlistComponent]
		});
		fixture = TestBed.createComponent(EnglishWordlistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
