import { Task, UserByTask, Type } from '../../common/interfaces';

export class CalendarViewerMock {
  public static readonly task: Task = {
    id: '14',
    title: 'TEST MOCK',
    start: '18-09-2022-T13:00',
    end: '18-09-2022-T20:00',
  };
  public static readonly listTaskByUser: Task[] = [
    {
      id: '14',
      title: 'TEST MOCK',
      start: '18-09-2022-T13:00',
      end: '18-09-2022-T20:00',
    },
    {
      id: '15',
      title: 'TEST MOCK',
      start: '20-09-2022-T13:00',
      end: '20-09-2022-T20:00',
    },
  ];

  public static readonly usersByTask: UserByTask[] = [
    {
      id: '14',
      name: 'User test',
      fatherLastName: 'Father Last Name Test',
      motherLastName: 'Mother Last Name',
    },
  ];

  public static readonly eventClickArg: any = {
    el: null,
    event: null,
    jsEvent: null,
    view: {
      calendar: {
        unselect() {
          return;
        },
      },
    },
  };
  // event._def.publicId, item.event._instance.range
  public static readonly eventChangeArg: any = {
    event: {
      _def: {
        publicId: 1,
      },
      _instance: {
        range: [new Date(), new Date()],
      },
      remove() {
        return;
      },
    },
  };

  public static readonly listTypes: Type[] = [
    {
      codType: 1,
      description: 'Test',
      backgroundColor: '#FFFF',
      borderColor: '#FFFF',
      start: 'START',
      end: 'END',
      display: 'RELATIVE',
    },
  ];
}
