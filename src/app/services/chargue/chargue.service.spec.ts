import { TestBed } from '@angular/core/testing';

import { ChargueService } from './chargue.service';

describe('ChargueService', () => {
  let service: ChargueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
