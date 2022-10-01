import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AttendanceServiceMock } from '../mocks/attendance.service.mock.spec';
import { ResponseMock } from '../mocks/response.mock.spec';
import { AttendanceService } from './attendance.service';

fdescribe('AttendanceService', () => {
  let attendanceService: AttendanceService;
  let httpClientSpyPost: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPatch: { patch: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    attendanceService = TestBed.inject(AttendanceService);
  });

  beforeEach(() => {
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPatch = jasmine.createSpyObj('HttpClient', ['patch']);
  });

  afterEach((done: DoneFn) => {
    done();
  });

  it('AttendanceService be created', () => {
    expect(attendanceService).toBeTruthy();
  });

  it('Validate getAttendanceByUser', (done: DoneFn) => {
    httpClientSpyGet.get.and.returnValue(of(AttendanceServiceMock.mockAttendance));
    attendanceService = new AttendanceService(httpClientSpyGet as any);
    attendanceService.getAttendanceByUser().subscribe((res) => {
      expect(res).toEqual(AttendanceServiceMock.mockAttendance);
      done();
    });
  });

  it('Validate getHistoryAttendanceUser', (done: DoneFn) => {
    httpClientSpyGet.get.and.returnValue(
      of(AttendanceServiceMock.mockAttendanceHistoryUser),
    );
    attendanceService = new AttendanceService(httpClientSpyGet as any);
    attendanceService.getHistoryAttendanceUser().subscribe((res) => {
      expect(res).toEqual(AttendanceServiceMock.mockAttendanceHistoryUser);
      done();
    });
  });

  it('Validate registerEntryAttendance', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    attendanceService = new AttendanceService(httpClientSpyPost as any);
    attendanceService
      .registerEntryAttendance(AttendanceServiceMock.attendanceDescription)
      .subscribe((res) => {
        expect(res).toEqual(ResponseMock.genericResponse);
        done();
      });
  });

  it('Validate registerExitAttendance', (done: DoneFn) => {
    httpClientSpyPatch.patch.and.returnValue(of(ResponseMock.genericResponse));
    attendanceService = new AttendanceService(httpClientSpyPatch as any);
    attendanceService.registerExitAttendance().subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });
});
