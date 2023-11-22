import { KeycloakEventService } from './keycloak-event.service';
import { TestBed } from '@angular/core/testing';


describe('KeycloakEventService', () => {
	let service: KeycloakEventService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(KeycloakEventService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
