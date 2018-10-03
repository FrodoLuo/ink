import * as Loadable from 'react-loadable';
import Loading from './Loading';
export const Header = Loadable({
    loader: () => import('./Header'),
    loading: Loading
});