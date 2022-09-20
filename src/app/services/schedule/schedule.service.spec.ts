import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ScheduleService } from './schedule.service';

fdescribe('ScheduleService', () => {
  let scheduleService: ScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    scheduleService = TestBed.inject(ScheduleService);
  });

  it('ScheduleService be created', () => {
    expect(scheduleService).toBeTruthy();
  });
});
