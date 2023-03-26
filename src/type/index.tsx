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
  repoOwner: string;
  isOpen: boolean;
  title: string;
  creator: string;
  creatorUrl: string;
  isSearchResult: boolean;
};

export type TaskListProps = {
  isLoading: boolean;
  taskList: TaskProps[];
  errMsg?: string;
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
  isFilterOpen: boolean;
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
  repository?: {
    name: string;
    html_url: string;
    owner: { login: string };
  };
  repository_url: string;
  state: string;
  title: string;
  user: { login: string; html_url: string };
};

export type TaskRequiredInfo = {
  owner: string;
  repo: string;
  number: number;
};

export interface UpdateTaskEditParems extends TaskRequiredInfo {
  title?: string;
  body?: string;
  labels?: string;
}

export type UpdateStatePayload = {
  taskIndex: number;
  state: boolean;
};

export type GetTaskDetailPayLoad = {
  assigneeUrl?: string;
  assigneeAvatar?: string;
  body: string;
  time: string;
  issueUrl: string;
  id: number;
  labels: string[];
  number: number;
  repo: string;
  isOpen: boolean;
  title: string;
  creator: string;
  creatorUrl: string;
  creatorAvatar: string;
  commentsData: CommentProps[];
  milestone: string;
  milestoneUrl: string;
};
export interface TaskDetailState extends GetTaskDetailPayLoad {
  isLoading: boolean;
  errMsg: string;
  isStateLoading: boolean;
  isDetailOpen: boolean;
}

export type GetTaskDetailResData = {
  assignee: { avatar_url: string; html_url: string };
  body: string;
  created_at: string;
  html_url: string;
  id: number;
  state: string;
  title: string;
  user: { login: string; html_url: string; avatar_url: string };
  labels: { name: string }[];
  comments_data: CommentType[];
  milestone: { title: string; html_url: string };
};

export type CommentType = {
  id: number;
  body: string;
  user: { avatar_url: string; login: string; html_url: string };
  created_at: string;
};

export type AddInputError = {
  title: boolean;
  repo: boolean;
  body: boolean;
};

export type AddTaskState = {
  title: string;
  repo: string;
  body: string;
  isUploading: boolean;
  isSuccess: boolean;
  inputError: AddInputError;
  errMsg: string;
};

export type AddTaskPayload = {
  isSuccess: boolean;
  inputError: AddInputError;
};

export type EditInputError = {
  title: boolean;
  status: boolean;
  body: boolean;
};

export type EditTaskState = {
  title: string;
  status: string;
  body: string;
  isUploading: boolean;
  isSuccess: boolean;
  inputError: EditInputError;
  errMsg: string;
};

export type EditTaskPayload = {
  isSuccess: boolean;
  inputError: EditInputError;
};

export type RepoState = {
  id: number;
  name: string;
  repoOwner: string;
};

export type GetUserPayload = {
  name: string;
  avatar: string;
  userUrl: string;
  repoList: RepoState[];
};

export type ShowRepo = {
  repoOwner: string;
  name: string;
};

export interface userState extends GetUserPayload {
  isLoading: boolean;
  errMsg: string;
  showRepo: ShowRepo;
}
