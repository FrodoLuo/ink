import { AxiosResponse } from 'axios';
import { IArticle } from '../models/article.model';
import { get, post } from './request';

export function getArticles(): Promise<AxiosResponse> {
  return get('/articles');
}

export function getArticlesByUser(): Promise<AxiosResponse> {
  return get('/articles?filter=user');
}

export function getArticleComments(id: number | string): Promise<AxiosResponse> {
  return get(`/comments`, { articleId: id });
}

export function getArticleContent(url: string): Promise<AxiosResponse> {
  return get(`/${url}`);
}

export function createArticle(title: string, content: string): Promise<AxiosResponse> {
  return post('/articles', {
    title,
    content,
    tags: 'test',
  });
}