export type TaskProps = {
  assigneeUrl: string;
  assigneeAvatar?: string;
  time: string;
  issueUrl: string;
  id?: string;
  labels: string[];
  number: number;
  repo: string;
  repoUrl: string;
  isOpen: boolean;
  issue: string;
  creator: string;
  creatorUrl: string;
};

export type TaskListProps = {
  isLoading: boolean;
  taskList: TaskProps[];
  errMsg?: String;
};

export interface TaskListStatus extends TaskListProps {
  page: number;
  isAll: boolean;
  filter: Filter;
}

export type Filter = {
  state: string;
  labels: string;
  category: string;
  direction: string;
};
