export type TaskProps = {
  assignee_url: string;
  assignee_avatar?: string;
  time: string;
  issue_url: string;
  id?: string;
  labels: string[];
  number: number;
  repo: string;
  repo_url: string;
  isOpen: boolean;
  issue: string;
  creator: string;
  creator_url: string;
};
