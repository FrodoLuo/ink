import { User } from "./user.model";

export interface IArticle{
  user: User;
  mdUrl: string;
  id: number;
  title: string;
  updateDate: Date;
  brief: string;
  tags: string;
}