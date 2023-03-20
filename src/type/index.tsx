import { CommentProps } from "../components/molecule/Comment";

export type TaskProps = {
  assigneeUrl?: string;
  assigneeAvatar?: string;
  body: string;
  time: string;
  issueUrl: string;
  id?: string;
  labels: string[];
  number: number;
  repo: string;
  repoUrl: string;
  isOpen: boolean;
  title: string;
  creator: string;
  creatorUrl: string;
  isSearchResult: boolean;
};

export type TaskListProps = {
  isLoading: boolean;
  taskList: TaskProps[];
  errMsg?: String;
};

export type Filter = {
  state: string;
  labels: string;
  category: string;
  direction: string;
};

export interface TaskListStatus extends TaskListProps {
  page: number;
  isAll: boolean;
  filter: Filter;
  isStateLoading: boolean;
  taskSearchKeyword: string;
  isSearchMode: boolean;
}

export type GetTaskListParams = {
  reLoad: boolean;
};

export type GetTaskListPayload = {
  error: boolean;
  errMsg: string;
  issueData: TaskProps[];
  page: number;
  isAll: boolean;
  reLoad: boolean;
};

export type GetTaskListResData = {
  assignee: { avatar_url?: string; html_url?: string };
  body: string;
  created_at: string;
  html_url: string;
  id: string;
  labels: any[];
  number: number;
  repository: { name: string; html_url: string };
  repository_url: string;
  state: string;
  title: string;
  user: { login: string; html_url: string };
};

export type UpdateTaskParams = {
  owner: string;
  repo: string;
  number: number;
};

export interface UpdateTaskEditParems extends UpdateTaskParams {
  title?: string;
  body?: string;
  labels?: string;
}

export type UpdateStatePayload = {
  taskIndex: number;
  state: boolean;
};

export interface TaskDetailState extends TaskProps {
  commentsData: CommentProps[];
  milestone: string;
  milestoneUrl: string;
}
