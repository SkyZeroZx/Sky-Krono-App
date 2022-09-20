export interface Task {
  id: string;
  title: string;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  display?: string;
  start: string;
  end: string;
}

export interface RegisterTask {
  title: string;
  codType: number;
  description: string;
  dataRange: any[];
  user: any[];
}

export interface UserByTask {
  id: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
}

export interface UserTask {
  codUser: number;
  codTask: number;
}
