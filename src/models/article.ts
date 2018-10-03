export interface IArticle{
  author: {
    avatarURL: string
    name: string
  };
  comments: number;
  contentUrl: string;
  id: number;
  title: string;
  updateDate: Date;
}