import * as Loadable from 'react-loadable';
import Loading from './Loading';
export const Header = Loadable({
    loader: () => import('./header'),
    loading: Loading
});

export const ArticleList = Loadable({
    loader: () => import('./article-list'),
    loading: Loading
});

export const ArticleDetail = Loadable({
    loader: () => import('./article-detail'),
    loading: Loading
});