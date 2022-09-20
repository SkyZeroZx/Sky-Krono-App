import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

fdescribe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    userService = TestBed.inject(UserService);
  });

  it('UserService be created', () => {
    expect(userService).toBeTruthy();
  });
});
