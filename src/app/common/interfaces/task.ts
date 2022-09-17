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
  dataRange: [];
  user: [];
}

 
export interface UserByTask {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}
export interface UserTask{
  codUser: number;
  codTask: number;
}