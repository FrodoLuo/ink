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
  loading: boolean;
}

class ArticleDetailPage extends React.Component<RouteComponentProps<any>> {
  public state: State = {
    html: '',
    currentArticle: null,
    loading: false,
  };
  public componentWillMount() {
    ArticleService().getArticleById(this.props.match.params.id)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            currentArticle: res.data,
          });
        }
        return res.data;
      })
      .then(article => {
        this.setState({
          loading: true,
        });
        return ArticleService().getContentHtml(article.mdUrl);
      })
      .then((res) => {
        this.setState({
          html: MarkdownService.render(res.status === 200 ? res.data : '# 文章不存在'),
          loading: false,
        });
      });
  }

  public render() {
    return (
      <>
        <ArticleDetail loading={this.state.loading} article={this.state.currentArticle} html={this.state.html} />
      </>
    );
  }
}

export default ArticleDetailPage;