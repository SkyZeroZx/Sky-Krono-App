import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChargueServiceMock } from '../mocks/chargue.service.mock.spec';
import { ResponseMock } from '../mocks/response.mock.spec';
import { ChargueService } from './chargue.service';

fdescribe('ChargueService', () => {
  let chargueService: ChargueService;
  let httpClientSpyPost: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPatch: { patch: jasmine.Spy };
  let httpClientSpyDelete: { delete: jasmine.Spy };
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    chargueService = TestBed.inject(ChargueService);
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

  it('ChargueService be created', () => {
    expect(chargueService).toBeTruthy();
  });

  it('Validate getAllChargue', (done: DoneFn) => {
    httpClientSpyGet.get.and.returnValue(of(ChargueServiceMock.listChargue));
    chargueService = new ChargueService(httpClientSpyGet as any);
    chargueService.getAllChargue().subscribe((res) => {
      expect(res).toEqual(ChargueServiceMock.listChargue);
      done();
    });
  });

  it('Validate createChargue', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    chargueService = new ChargueService(httpClientSpyPost as any);
    chargueService.createChargue(ChargueServiceMock.listChargue[0]).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate updateChargue', (done: DoneFn) => {
    httpClientSpyPatch.patch.and.returnValue(of(ResponseMock.genericResponse));
    chargueService = new ChargueService(httpClientSpyPatch as any);
    chargueService.updateChargue(ChargueServiceMock.updateChargue).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate deleteChargue', (done: DoneFn) => {
    httpClientSpyDelete.delete.and.returnValue(of(ResponseMock.genericResponse));
    chargueService = new ChargueService(httpClientSpyDelete as any);
    chargueService
      .deleteChargue(ChargueServiceMock.listChargue[0].id)
      .subscribe((res) => {
        expect(res).toEqual(ResponseMock.genericResponse);
        done();
      });
  });
});
