import * as React from 'react';
import { Subscription } from 'rxjs';
import { IArticle } from '../../models/article.model';
import ArticleService from '../../service/article.service';
import ArticleCard from './article-card';

interface State {
  articles: IArticle[];
}

class ArticleList extends React.Component<any> {
  public state: State = {
    articles: []
  };
  private articleSubscription: Subscription;
  public componentWillMount() {
    this.articleSubscription = ArticleService().articles.subscribe(articles => {
      this.setState({
        articles
      });
    });
    ArticleService().refreshArticle();
  }
  public componentWillUnmount() {
    this.articleSubscription.unsubscribe();
  }
  public render() {
    return (
      <>
        {this.renderCard()}
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