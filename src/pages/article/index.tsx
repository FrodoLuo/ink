import * as React from 'react';
import ArticleList from '../../components/ArticleList';

import './style.less';

export default class Article extends React.Component<{ logged: boolean }> {
  public render() {
    return (
      <>
        <ArticleList />
      </>
    );
  }
}