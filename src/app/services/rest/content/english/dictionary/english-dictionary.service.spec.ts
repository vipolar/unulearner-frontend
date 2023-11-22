import { EnglishDictionaryService } from './english-dictionary.service';
import { TestBed } from '@angular/core/testing';

describe('EnglishDictionaryService', () => {
	let service: EnglishDictionaryService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EnglishDictionaryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
