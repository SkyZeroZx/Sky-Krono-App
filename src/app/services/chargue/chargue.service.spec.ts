import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ChargueService } from './chargue.service';

fdescribe('ChargueService', () => {
  let chargueService: ChargueService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    chargueService = TestBed.inject(ChargueService);
  });

  it('ChargueService be created', () => {
    expect(chargueService).toBeTruthy();
  });
});
