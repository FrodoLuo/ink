import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Subscription } from 'rxjs';
import { ArticleDetail } from '../../components/Loadables';
import { IArticle } from '../../models/article.model';
import ArticleService from '../../service/article.service';
import MarkdownService from '../../service/markdown.service';

export default (props: RouteComponentProps<any>) => {
  return (
    <>
      <ArticleDetail id={props.match.params.id} />
    </>
  );
};