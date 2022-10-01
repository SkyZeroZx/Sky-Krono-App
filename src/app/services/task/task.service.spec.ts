import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ResponseMock } from '../mocks/response.mock.spec';
import { TaskServiceMock } from '../mocks/task.service.mock.spec';
import { TaskService } from './task.service';

fdescribe('TaskService', () => {
  let taskService: TaskService;
  let httpClientSpyPost: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPatch: { patch: jasmine.Spy };
  let httpClientSpyDelete: { delete: jasmine.Spy };
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    taskService = TestBed.inject(TaskService);
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

  it('TaskService be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('Validate createNewTask', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    taskService = new TaskService(httpClientSpyPost as any);
    taskService.createNewTask(TaskServiceMock.registerTask).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate updateTask', (done: DoneFn) => {
    httpClientSpyPatch.patch.and.returnValue(of(ResponseMock.genericResponse));
    taskService = new TaskService(httpClientSpyPatch as any);
    taskService.updateTask(TaskServiceMock.registerTask).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate deleteUserToTask', (done: DoneFn) => {
    httpClientSpyDelete.delete.and.returnValue(of(ResponseMock.genericResponse));
    taskService = new TaskService(httpClientSpyDelete as any);
    taskService.deleteUserToTask(TaskServiceMock.userTask).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate addUserToTask', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    taskService = new TaskService(httpClientSpyPost as any);
    taskService.addUserToTask(TaskServiceMock.userTask).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate deleteTask', (done: DoneFn) => {
    httpClientSpyDelete.delete.and.returnValue(of(ResponseMock.genericResponse));
    taskService = new TaskService(httpClientSpyDelete as any);
    taskService.deleteTask(TaskServiceMock.deleteTaskId).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });
});
