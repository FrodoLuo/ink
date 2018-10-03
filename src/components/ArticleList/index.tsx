import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { IArticle } from '../../models/article';
import ArticleCard from '../Cards/article-card';


class ArticleList extends React.Component<any> {
  public componentDidMount() {
    this.props.dispatch({
      type: 'getArticles'
    });
  }
  public render() {
    console.log(this.props);
    return (
      <>
        {this.renderCard()}
      </>
    );
  }
  private renderCard() {
    const list = this.props.articles.map((a: IArticle) => {
      return (<ArticleCard key={a.id} article={a} />);
    });
    return list;
  }
}

export default connect((store: any) => store.article)(ArticleList);