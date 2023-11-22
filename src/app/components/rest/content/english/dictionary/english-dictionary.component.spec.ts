import { EnglishDictionaryComponent } from './english-dictionary.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('EnglishDictionaryComponent', () => {
	let component: EnglishDictionaryComponent;
	let fixture: ComponentFixture<EnglishDictionaryComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EnglishDictionaryComponent]
		});
		fixture = TestBed.createComponent(EnglishDictionaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
