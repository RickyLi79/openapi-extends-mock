export type IPassportUser = {
  provider: string,
  id:number,
  account: string,
  nickname: string
};

export type IPageQuery = { page: number, limit: number };
