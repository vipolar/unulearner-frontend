import { TestBed } from '@angular/core/testing';

import { KeycloakEventService } from './keycloak-event.service';

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
