import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LicenceServiceMock } from '../mocks/licence.service.mock.spec';
import { ResponseMock } from '../mocks/response.mock.spec';
import { LicenceService } from './licence.service';

fdescribe('LicenceService', () => {
  let licenceService: LicenceService;
  let httpClientSpyPost: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPatch: { patch: jasmine.Spy };
  let httpClientSpyDelete: { delete: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    licenceService = TestBed.inject(LicenceService);
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

  it('LicenceService be created', () => {
    expect(licenceService).toBeTruthy();
  });

  it('Validate getAllLicence', (done: DoneFn) => {
    httpClientSpyGet.get.and.returnValue(of(LicenceServiceMock.listLicence));
    licenceService = new LicenceService(httpClientSpyGet as any);
    licenceService.getAllLicence().subscribe((res) => {
      expect(res).toEqual(LicenceServiceMock.listLicence);
      done();
    });
  });

  it('Validate getLicencesByUser', (done: DoneFn) => {
    httpClientSpyGet.get.and.returnValue(of(LicenceServiceMock.listLicence));
    licenceService = new LicenceService(httpClientSpyGet as any);
    licenceService.getLicencesByUser().subscribe((res) => {
      expect(res).toEqual(LicenceServiceMock.listLicence);
      done();
    });
  });

  it('Validate createLicence', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    licenceService = new LicenceService(httpClientSpyPost as any);
    licenceService.createLicence(LicenceServiceMock.licence).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate updateLicence', (done: DoneFn) => {
    httpClientSpyPatch.patch.and.returnValue(of(ResponseMock.genericResponse));
    licenceService = new LicenceService(httpClientSpyPatch as any);
    licenceService.updateLicence(LicenceServiceMock.licence).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate deleteLicence', (done: DoneFn) => {
    httpClientSpyDelete.delete.and.returnValue(of(ResponseMock.genericResponse));
    licenceService = new LicenceService(httpClientSpyDelete as any);
    licenceService.deleteLicence(LicenceServiceMock.licence.id).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });
});
