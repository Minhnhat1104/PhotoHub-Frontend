export interface User {
  id: number;
  username: string;
  password: string;
  admin?: boolean;
  accessToken: string;
}

export interface Paging {
  page: number;
  size: number;
}

export interface LabelValue<T = string, V = string> {
  label: T;
  value: V;
}
