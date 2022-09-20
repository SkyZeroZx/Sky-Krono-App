import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

fdescribe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    taskService = TestBed.inject(TaskService);
  });

  it('TaskService be created', () => {
    expect(taskService).toBeTruthy();
  });
});
