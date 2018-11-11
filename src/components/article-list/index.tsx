import * as React from 'react';
import { Subscription } from 'rxjs';
import { IArticle } from '../../models/article.model';
import ArticleService from '../../service/article.service';
import ArticleCard from './article-card';

interface State {
  articles: IArticle[];
  refreshing: boolean;
}

class ArticleList extends React.Component<any, State> {
  public state = {
    articles: new Array<IArticle>(),
    refreshing: true,
  };
  private articleSubscription: Subscription;
  public componentWillMount() {
    this.articleSubscription = ArticleService().articles.subscribe(articles => {
      this.setState({
        articles,
        refreshing: false,
      });
    });
    ArticleService().refreshArticle(this.props.keyword || null);
  }
  public componentWillUnmount() {
    this.articleSubscription.unsubscribe();
  }
  public componentWillReceiveProps(props: any) {
    ArticleService().refreshArticle(props.keyword || null);
  }
  public getMoreArticles = () => {
    this.setState({
      refreshing: true,
    });
    ArticleService().getMoreArticles(this.props.keyword || null);
  }
  public render() {
    return (
      <>
        {this.props.keyword ? (
          <div>
            搜索{decodeURI(this.props.keyword)}的结果
          </div>
        ) : null}
        {this.renderCard()}
        <div className="fetching-trigger" onClick={this.getMoreArticles}>
          Refresh More
        </div>
      </>
    );
  }
  private renderCard() {
    const list = this.state.articles.map((a: IArticle) => {
      return (<ArticleCard key={a.id} article={a} />);
    });
    return list;
  }
}

export default ArticleList;