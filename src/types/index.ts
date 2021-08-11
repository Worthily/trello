export type cards = {
  id: string;
  header: string;
  text: string;
  checked: boolean;
  author: string;
  status: string;
};

export type columns = {
  id: string;
  header: string;
};

export type comments = {
  id: string;
  author: string;
  text: string;
  card: string;
};

export type user = string;
