import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('StorageService', () => {
	let service: DateService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
