import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, UserByTask, RegisterTask, UserTask } from 'src/app/common/interfaces/task';
import { Response } from '../../common/interfaces/response';
import { Type } from 'src/app/common/interfaces/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.API_URL}/task`);
  }

  getTaskByUser(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.API_URL}/task/user`);
  }

  getUsersByTask(codTask: Object): Observable<UserByTask[]> {
    return this.http.get<UserByTask[]>(`${environment.API_URL}/task/task_user/${codTask}`);
  }

  createNewTask(task: RegisterTask): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/task/`, task);
  }

  updateTask(task: any): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/task`, task);
  }

  deleteUserToTask(userToTask: UserTask): Observable<Response> {
    return this.http.delete<Response>(
      `${environment.API_URL}/task?codUser=${userToTask.codUser}&codTask=${userToTask.codTask}`,
    );
  }

  addUserToTask(userToTask: UserTask): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/task/add_user`, userToTask);
  }

  deleteTask(task: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/task/remove_task/${task}`);
  }

  /********************* SERVICIOS TYPE ******************************** */

  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${environment.API_URL}/type`);
  }
}
