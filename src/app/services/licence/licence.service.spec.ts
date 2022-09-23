import { TestBed } from '@angular/core/testing';

import { LicenceService } from './licence.service';

describe('LicenceService', () => {
  let service: LicenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
