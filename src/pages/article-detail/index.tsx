import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Subscription } from 'rxjs';
import { ArticleDetail } from '../../components/Loadables';
import { IArticle } from '../../models/article.model';
import ArticleService from '../../service/article.service';
import MarkdownService from '../../service/markdown.service';

interface State {
  html: string;
  currentArticle: IArticle | null;
}

class ArticleDetailPage extends React.Component<RouteComponentProps<any>> {
  public state: State = {
    html: '',
    currentArticle: null,
  };
  private articleSubscription: Subscription;
  public componentWillMount() {
    this.articleSubscription =
      ArticleService().articles.subscribe(articles => {
        const article = articles.find(i => i.id == this.props.match.params.id);
        console.log(article);
        this.setState({
          currentArticle: article,
        });
        if (article) {
          ArticleService().getContentHtml(article.mdUrl)
            .then((res) => {
              this.setState({
                html: MarkdownService.render(res.data)
              });
            });
        }
      });
  }
  public componentWillUnmount() {
    console.log('unsubsribe');
    this.articleSubscription.unsubscribe();
  }
  public render() {
    return (
      <>
        <ArticleDetail article={this.state.currentArticle} html={this.state.html} />
      </>
    );
  }
}

export default ArticleDetailPage;