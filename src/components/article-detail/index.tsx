import * as React from 'react';
import { Link } from 'react-router-dom';
import ArticleService from '../../service/article.service';
import MarkdownService from '../../service/markdown.service';
import { IArticle } from '../../models/article.model';
import Card from '../cards';
import './style.less';

interface ArticleDetailState {
  article: IArticle | null | undefined;
  html: string;
  loading: boolean;
}

interface ArticleDetailProps {
  id: string;
}
class ArticleDetail extends React.Component<ArticleDetailProps> {
  public state: ArticleDetailState = {
    article: null,
    html: '',
    loading: true
  };
  public componentDidMount() {
    ArticleService().getArticleById(this.props.id)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            article: res.data,
          });
        }
        return res.data;
      })
      .then(article => {
        this.setState({
          loading: true,
        });
        window.document.title = `${article.title}|FrodoLuoの筆記`;
        return ArticleService().getContentHtml(article.mdUrl);
      })
      .then((res) => {
        this.setState({
          html: MarkdownService.render(res.status === 200 ? res.data : '# 文章不存在'),
          loading: false,
        });
      });
  }
  public componentWillUnmount() {
    window.document.title = 'FrodoLuoの筆記';
  }
  public render() {
    return (
      <Card>
        {
          this.state.loading ?
            (
              <div className="loading">
                <i className="iconfont icon-loading" />
              </div>
            )
            :
            (
              <>
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
                    {this.state.article ? this.state.article.title : ''}
                  </h1>
                </div>
                <div className="article info-wrapper">
                  <span>{this.state.article ? new Date(this.state.article.updateDate).toLocaleString() : ''}</span>
                </div>
                <div className="article wrapper">
                  {this.state.loading ?
                    (<div className="loading"><i className="iconfont icon-loading" /></div>)
                    :
                    (<article className="card article-brief article" dangerouslySetInnerHTML={{ __html: this.state.html }} />)}
                </div>
                <hr />
                <div style={{ display: 'flex' }}>
                  {this.state.article ? this.state.article.tags.split(' ').map(tag => <span key={tag} className="tag"><Link to={`/?keyword=${tag}`}>{tag}</Link></span>) : null}
                </div>
              </>
            )
        }
      </Card>
    );
  }
}

export default ArticleDetail;