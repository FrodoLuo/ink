import * as Loadable from 'react-loadable';
import Loading from '../Loading';

export const ArticleManage = Loadable({
  loader: () => import('./articles'),
  loading: Loading
});

export const Editor = Loadable({
  loader: () => import('./edit'),
  loading: Loading,
});