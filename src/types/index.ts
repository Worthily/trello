export type cards = Array<{
  id: string;
  header: string;
  text: string;
  checked: boolean;
  author: string;
  status: string;
}>;

export type columns = Array<{
  id: string;
  header: string;
}>;

export type comments = Array<{
  id: string;
  author: string;
  text: string;
  card: string;
}>;

export type user = string;
