import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ResponseMock } from '../mocks/response.mock.spec';
import { TypesServiceMock } from '../mocks/types.service.mock.spec';
import { TypeService } from './type.service';

fdescribe('TypeService', () => {
  let typeService: TypeService;
  let httpClientSpyPost: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPatch: { patch: jasmine.Spy };
  let httpClientSpyDelete: { delete: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    typeService = TestBed.inject(TypeService);
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

  it('TypeService be created', () => {
    expect(typeService).toBeTruthy();
  });

  it('Validate getAllTypes', (done: DoneFn) => {
    httpClientSpyGet.get.and.returnValue(of(TypesServiceMock.listTypes));
    typeService = new TypeService(httpClientSpyGet as any);
    typeService.getAllTypes().subscribe((res) => {
      expect(res).toEqual(TypesServiceMock.listTypes);
      done();
    });
  });

  it('Validate createType', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    typeService = new TypeService(httpClientSpyPost as any);
    typeService.createType(TypesServiceMock.type).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate updateType', (done: DoneFn) => {
    httpClientSpyPatch.patch.and.returnValue(of(ResponseMock.genericResponse));
    typeService = new TypeService(httpClientSpyPatch as any);
    typeService.updateType(TypesServiceMock.type).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate deleteType', (done: DoneFn) => {
    httpClientSpyDelete.delete.and.returnValue(of(ResponseMock.genericResponse));
    typeService = new TypeService(httpClientSpyDelete as any);
    typeService.deleteType(TypesServiceMock.type.codType).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });
});
