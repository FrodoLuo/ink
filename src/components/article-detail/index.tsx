import * as MarkdownIt from 'markdown-it';
import * as React from 'react';
import { IArticle } from '../../models/article.model';
import Card from '../cards';
import './style.less';

interface ArticleDetailProps {
  article: IArticle | null | undefined;
  html: string;
}

const ArticleDetail = (props: ArticleDetailProps) => {
  return (
    <Card>
      <div
        className="article back"
        onClick={(e) => {
          e.preventDefault();
          history.back();
        }}
      >
        <i className="iconfont icon-back" />
      </div>
      <div className="article">
        <h1>
          {props.article ? props.article.title : ''}
        </h1>
        <div className="card article-brief article" dangerouslySetInnerHTML={{__html: props.html}} />
      </div>
    </Card>
  );
};

export default ArticleDetail;