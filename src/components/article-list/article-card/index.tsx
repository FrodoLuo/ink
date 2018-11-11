import * as MarkdownIt from 'markdown-it';
import * as React from 'react';
import { Link } from 'react-router-dom';

import mockAvatar from '../../../assets/img/Horo.full.191598.jpg';
import { IArticle } from '../../../models/article.model';
import Card from '../../cards';
import './style.less';

import Preview from '../../../assets/img/Horo.full.191598.jpg';

interface ArticleCardProps {
  article: IArticle;
}

export default ({ article }: ArticleCardProps) => {
  return (
    <Card>
      <div className="card author-wrapper">
        {/* <span className="avatar-wrapper"><img src={mockAvatar} /></span> */}
        <span className="name-wrapper">{article.user.name}</span>
      </div>
      <h1><Link to={`/article/${article.id}`}>{article.title}</Link></h1>
      <article className="card article-brief" dangerouslySetInnerHTML={{ __html: MarkdownIt().render(article.brief) }} />
      <hr />
      <div className="card article-footer">
        <span>
          最后编辑于{new Date(article.updateDate).toLocaleString()}
        </span>
        {/* <span>
          {article.comments}
          0
          <i className="iconfont icon-commented" />
        </span> */}
        <span className="tags">{article.tags.split(' ').map(tag => {
          return (
            <span key={tag} className="tag"><Link to={`/?keyword=${tag}`}>{tag}</Link></span>
          );
        })}</span>
      </div>
    </Card>
  );
};