import { CommentProps } from "../components/molecule/Comment";

export type IssueProps = {
  assigneeUrl?: string;
  assigneeAvatar?: string;
  body: string;
  time: string;
  issueUrl: string;
  id?: string;
  labels: string[];
  number: number;
  repoName: string;
  repoUrl: string;
  repoOwner: string;
  isOpen: boolean;
  title: string;
  creator: string;
  creatorUrl: string;
  isSearchResult: boolean;
};

export type IssueListProps = {
  isLoading: boolean;
  issueList: IssueProps[];
  errMsg: string;
  errStatus: number;
};

export type Filter = {
  state: string;
  labels: string;
  category: string;
  direction: string;
};

export type ShowRepo = {
  repoOwner: string;
  repoName: string;
};

export interface IssueListState extends IssueListProps {
  page: number;
  isAll: boolean;
  showRepo: ShowRepo;
  filter: Filter;
  isStateLoading: boolean;
  issueSearchKeyword: string;
  isSearchMode: boolean;
  isFilterOpen: boolean;
}

export type GetIssueListParams = {
  reLoad: boolean;
  signal?: AbortSignal;
};

export type GetIssueListPayload = {
  issueData: IssueProps[];
  page: number;
  isAll: boolean;
  reLoad: boolean;
};

export type GetIssueListResData = {
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

export type IssueRequiredInfo = {
  repoOwner: string;
  repoName: string;
  number: number;
};

export interface GetIssueDetailParam extends IssueRequiredInfo {
  signal?: AbortSignal;
}

export interface UpdateIssueEditParems extends IssueRequiredInfo {
  title?: string;
  body?: string;
  labels?: string;
}

export type UpdateStatePayload = {
  issueIndex: number;
  state: boolean;
};

export type GetIssueDetailPayLoad = {
  assigneeUrl?: string;
  assigneeAvatar?: string;
  assignees?: Assignee[];
  body: string;
  time: string;
  issueUrl: string;
  id: number;
  labels: string[];
  number: number;
  repoName: string;
  isOpen: boolean;
  title: string;
  creator: string;
  creatorUrl: string;
  creatorAvatar: string;
  commentsData: CommentProps[];
  milestone: string;
  milestoneUrl: string;
};
export interface IssueDetailState extends GetIssueDetailPayLoad {
  isLoading: boolean;
  errMsg: string;
  errStatus: number;
  isStateLoading: boolean;
  isDetailOpen: boolean;
}

export type Assignee = {
  id: number;
  avatar_url: string;
  html_url: string;
};

export type GetIssueDetailResData = {
  assignee: { avatar_url: string; html_url: string };
  assignees: Assignee[];
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

export type AddIssueState = {
  title: string;
  repo: string;
  body: string;
  repoOwner: string;
  isUploading: boolean;
  isSuccess: boolean;
  inputError: AddInputError;
  errMsg: string;
  errStatus: number;
};

export type AddIssuePayload = {
  isSuccess: boolean;
  inputError: AddInputError;
};

export type EditInputError = {
  title: boolean;
  status: boolean;
  body: boolean;
};

export type EditIssueState = {
  title: string;
  status: string;
  body: string;
  isUploading: boolean;
  isSuccess: boolean;
  inputError: EditInputError;
  errMsg: string;
  errStatus: number;
};

export type EditIssuePayload = {
  isSuccess: boolean;
  inputError: EditInputError;
};

export type RepoState = {
  id: number;
  repoName: string;
  repoOwner: string;
};

export type GetUserPayload = {
  name: string;
  avatar: string;
  userUrl: string;
  repoList: RepoState[];
};

export interface UserState extends GetUserPayload {
  isLoading: boolean;
  errMsg: string;
  errStatus: number;
  token: boolean;
}
