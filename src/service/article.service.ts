import { AxiosResponse } from 'axios';
import { BehaviorSubject, from, Observable, Subscriber } from 'rxjs';
import {
  getArticleById,
  getArticleContent,
  getArticles,
  getArticlesByUser,
  createArticle,
  modifyArticle,
} from '../api/article.api';
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

  private currentPage = 0;

  public getContentHtml(url: string) { return getArticleContent(url); }

  public refreshArticle() {
    this.currentPage = 0;
    getArticles(0)
      .then((res: AxiosResponse) => {
        this.currentPage += 1;
        this.articles$.next(res.data);
      });
  }

  public getArticleById(id: string) { return getArticleById(id); }

  public refreshArticleOfUser() {
    getArticlesByUser()
      .then(res => {
        if (res.status === 200) {
          this.articles$.next(res.data);
        }
      });
  }

  public postArticle(title: string, tags:string, content: string) {
    return createArticle(title, tags, content);
  }

  public modifyArticle(article: any, content: string) {
    return modifyArticle(article, content);
  }

  public getMoreArticles() {
    getArticles(this.currentPage)
      .then((res: AxiosResponse) => {
        if (res.data.length > 0) {
          this.currentPage += 1;
          this.articles$.next(this.articles$.getValue().concat(res.data));
        }
      });
  }
}

export default ArticleService.getInstance;