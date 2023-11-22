import { EnglishWordlistService } from './english-wordlist.service';
import { TestBed } from '@angular/core/testing';

describe('EnglishWordlistService', () => {
	let service: EnglishWordlistService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EnglishWordlistService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
