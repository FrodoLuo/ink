import * as React from 'react';
import { Link } from 'react-router-dom';
import ArticleService from 'src/service/article.service';
import InkButton from 'src/components/input-entities/Button';
import { IArticle } from 'src/models/article.model';
import './style.less';
import { Subscription } from 'rxjs';
export default class ArticleManage extends React.Component {
  public state = {
    articles: [],
    currentPage: 0,
  };
  private subscription: Subscription;
  public componentWillMount() {
    this.subscription = ArticleService().articles.subscribe(articles => {
      this.setState({
        articles
      });
    });
    ArticleService().refreshArticleOfUser();
  }
  public componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  public renderArticleList = () => {
    const list = this.state.articles.map((i: IArticle) => {
      return (
        <tr key={i.id}>
          <td><Link to={`/article/${i.id}`}>{i.title}</Link></td>
          <td className="date">{new Date(i.updateDate).toLocaleString()}</td>
          {/* <td>Coming Soon</td> */}
          <td className="action">
            <span><a>编辑</a></span>
            <span><a>删除</a></span>
          </td>
        </tr>
      );
    });
    return list;
  }
  public render() {
    return (
      <>
        <h2>文章</h2>
        <div className="article-manage-wrapper">
          <div className="article-manage-btn-wrapper">
            <InkButton type="primary">新文章</InkButton>
          </div>
          <div className="article-manage-list-wrapper">
            <table cellSpacing="0">
              <tbody>
                <tr>
                  <th>标题</th>
                  <th>修改日期</th>
                  {/* <th>分类</th> */}
                  <th className="action">操作</th>
                </tr>
                {this.renderArticleList()}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}