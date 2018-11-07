import { get, post } from './request';

export function getComments(page: number) {
  return get(`/comments?page=${page}`);
}

export function postComment(author: string, content: string) {
  return post('/comments', { author, content });
}