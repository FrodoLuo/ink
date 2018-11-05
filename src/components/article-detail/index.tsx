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
      <div className="article title-wrapper">
        <div
          className="article back"
          onClick={(e) => {
            e.preventDefault();
            history.back();
          }}
        >
          <i className="iconfont icon-back" />
        </div>
        <h1 className="article title">
          {props.article ? props.article.title : ''}
        </h1>
      </div>
      <div className="article info-wrapper">
        <span>{props.article ? new Date(props.article.updateDate).toLocaleString() : ''}</span>
      </div>
      <div className="article wrapper">
        <article className="card article-brief article" dangerouslySetInnerHTML={{ __html: props.html }} />
      </div>
    </Card>
  );
};

export default ArticleDetail;