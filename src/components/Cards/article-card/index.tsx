import * as React from 'react';

import mockAvatar from '../../../assets/img/Horo.full.191598.jpg';
import { IArticle } from '../../../models/article';
import Card from '../Card';
import './style.less';

import Preview from '../../../assets/img/Horo.full.191598.jpg';

interface ArticleCardProps {
  article: IArticle;
}

export default ({ article }: ArticleCardProps) => {
  return (
    <Card>
      <div className="card author-wrapper">
        <span className="avatar-wrapper"><img src={mockAvatar} /></span>
        <span className="name-wrapper">{article.author.name}</span>
      </div>
      <h1><a href={`#/article/${article.id}`}>{article.title}</a></h1>
      <div className="card article-brief article">
        <img src={Preview} />
        <p>
          This is a Paragraph talking about the info of the new feature come with the JavaScript library called stack storing.
        </p>
      </div>
      <hr />
      <div className="card article-footer">
        <span>
          最后编辑于{article.updateDate.toLocaleString()}
        </span>
        <span>
          {article.comments}
          <i className="iconfont icon-commented" />
        </span>
      </div>
    </Card>
  );
};