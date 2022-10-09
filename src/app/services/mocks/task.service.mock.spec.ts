import { RegisterTask, UserByTask, UserTask } from '../../common/interfaces';

export class TaskServiceMock {
  public static readonly userByTask: UserByTask[] = [
    {
      id: '1',
      name: 'NAME USER 1',
      fatherLastName: 'FATHER 1',
      motherLastName: 'MOTHER 1',
    },
    {
      id: '2',
      name: 'NAME USER 2',
      fatherLastName: 'FATHER 2',
      motherLastName: 'MOTHER 2',
    },
  ];

  public static readonly deleteTaskId: number = 1;

  public static readonly registerTask: RegisterTask = {
    title: 'title mock',
    codType: 1,
    description: 'description mock',
    dataRange: [new Date(), new Date()],
    user: [],
  };

  public static readonly userTask: UserTask = {
    codUser: 0,
    codTask: 0,
  };
}
