import { post, get } from './request';

export function signIn(userName: string, password: string) {
  return post('/user', {
    userName,
    password
  });
}

export function signInWithToken() {
  return get('/user');
}