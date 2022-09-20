import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ResponseMock } from '../mocks/response.mock.spec';
import { ScheduleServiceMock } from '../mocks/schedule.service.mock.spec';
import { ScheduleService } from './schedule.service';

fdescribe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let httpClientSpyPost: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPatch: { patch: jasmine.Spy };
  let httpClientSpyDelete: { delete: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    scheduleService = TestBed.inject(ScheduleService);
  });

  beforeEach(() => {
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPatch = jasmine.createSpyObj('HttpClient', ['patch']);
    httpClientSpyDelete = jasmine.createSpyObj('HttpClient', ['delete']);
  });

  afterEach((done: DoneFn) => {
    done();
  });

  it('ScheduleService be created', () => {
    expect(scheduleService).toBeTruthy();
  });

  it('Validate getAttendanceByUser', (done: DoneFn) => {
    httpClientSpyGet.get.and.returnValue(of(ScheduleServiceMock.listSchedule));
    scheduleService = new ScheduleService(httpClientSpyGet as any);
    scheduleService.getAllSchedule().subscribe((res) => {
      expect(res).toEqual(ScheduleServiceMock.listSchedule);
      done();
    });
  });

  it('Validate createSchedule', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    scheduleService = new ScheduleService(httpClientSpyPost as any);
    scheduleService
      .createSchedule(ScheduleServiceMock.listSchedule[0])
      .subscribe((res) => {
        expect(res).toEqual(ResponseMock.genericResponse);
        done();
      });
  });

  it('Validate updateChargue', (done: DoneFn) => {
    httpClientSpyPatch.patch.and.returnValue(of(ResponseMock.genericResponse));
    scheduleService = new ScheduleService(httpClientSpyPatch as any);
    scheduleService
      .updateSchedule(ScheduleServiceMock.updateSchedule)
      .subscribe((res) => {
        expect(res).toEqual(ResponseMock.genericResponse);
        done();
      });
  });

  it('Validate deleteSchedule', (done: DoneFn) => {
    httpClientSpyDelete.delete.and.returnValue(of(ResponseMock.genericResponse));
    scheduleService = new ScheduleService(httpClientSpyDelete as any);
    scheduleService
      .deleteSchedule(ScheduleServiceMock.listSchedule[0].id)
      .subscribe((res) => {
        expect(res).toEqual(ResponseMock.genericResponse);
        done();
      });
  });

  it('Validate getScheduleByUser', (done: DoneFn) => {
    httpClientSpyGet.get.and.returnValue(of(ScheduleServiceMock.scheduleByUser));
    scheduleService = new ScheduleService(httpClientSpyGet as any);
    scheduleService.getScheduleByUser().subscribe((res) => {
      expect(res).toEqual(ScheduleServiceMock.scheduleByUser);
      done();
    });
  });
});
