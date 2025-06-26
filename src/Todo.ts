
export interface Status {
  title: string;
  color: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: Status;
  date: Date;
}

