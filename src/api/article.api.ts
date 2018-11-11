import { AxiosResponse } from 'axios';
import { IArticle } from '../models/article.model';
import { get, post, patch } from './request';

export function getArticles(page: number, keyword?: string): Promise<AxiosResponse> {
  return get(`/articles?page=${page}${keyword ? `&keyword=${keyword}` : ''}`);
}

export function getArticlesByUser(): Promise<AxiosResponse> {
  return get('/articles?filter=user');
}

export function getArticleById(id: string): Promise<AxiosResponse> {
  return get(`/articles/${id}`);
}

export function getArticleComments(id: number | string): Promise<AxiosResponse> {
  return get(`/comments`, { articleId: id });
}

export function getArticleContent(url: string): Promise<AxiosResponse> {
  return get(`/${url}`);
}

export function createArticle(title: string, tags: string, content: string): Promise<AxiosResponse> {
  return post('/articles', {
    title,
    content,
    tags,
  });
}

export function modifyArticle(article: IArticle, content: string): Promise<AxiosResponse> {
  return patch('/articles', {
    article,
    content
  });
}