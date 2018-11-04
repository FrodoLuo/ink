import { AxiosResponse } from 'axios';
import { BehaviorSubject, from, Observable, Subscriber } from 'rxjs';
import { getArticleComments, getArticleContent, getArticles, getArticlesByUser } from '../api/article.api';
import { IArticle } from '../models/article.model';
class ArticleService {

  get articles() { return this.articles$; }
  public static getInstance = () => {
    if (ArticleService.instance === null) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }

  private static instance: ArticleService | null = null;

  private articles$ = new BehaviorSubject<IArticle[]>([]);

  constructor() {
    console.log('service create');
    this.refreshArticle();
  }

  public getContentHtml(url: string) { return getArticleContent(url); }

  public refreshArticle() {
    getArticles()
      .then((res: AxiosResponse) => {
        this.articles$.next(res.data);
      });
  }

  public refreshArticleOfUser() {
    getArticlesByUser()
      .then(res => {
        this.articles$.next(res.data);
      });
  }

}

export default ArticleService.getInstance;