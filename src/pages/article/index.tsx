import * as React from 'react';
import { ArticleList } from '../../components/Loadables';
import { IArticle } from '../../models/article.model';

import './style.less';

interface State {
  articles: IArticle[];
}

export default class ArticleHome extends React.Component<{ logged: boolean }> {

  public render() {
    return (
      <>
        <ArticleList />
      </>
    );
  }
}