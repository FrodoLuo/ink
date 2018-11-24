import * as React from 'react';
import { ArticleList } from '../../components/Loadables';
import './style.less';
import { RouteComponentProps } from 'react-router';

export default (props: RouteComponentProps) => {
  const keyword = props.location.search.match(/keyword=(.*)/);
  document.title = 'FrodoLuoの筆記';
  if (keyword) {
    return (
      <ArticleList keyword={keyword[1]} />
    );
  } else {
    return (
      <>
        <ArticleList />
      </>
    );
  }
};