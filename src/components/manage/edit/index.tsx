import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { InkInput, TextArea, TagInput } from 'src/components/input-entities/Inputs';
import Card from 'src/components/cards';
import InkButton from 'src/components/input-entities/Button';
import './style.less';
import MarkdownService from 'src/service/markdown.service';
import ArticleService from 'src/service/article.service';

interface EditorProps extends RouteComponentProps {
  modify: boolean;
  id?: string;
}
class Editor extends React.Component<EditorProps> {
  public state = {
    title: '',
    source: '',
    html: '',
    tags: '',
    preview: false,
    submitting: false,
    originArticle: null,
  };
  public componentWillMount() {
    if (this.props.modify && this.props.id) {
      ArticleService().getArticleById(this.props.id)
        .then((res: any) => {
          if (res.status === 200) {
            this.setState({
              title: res.data.title,
              originArticle: res.data,
              tags: res.data.tags,
            });
            return ArticleService().getContentHtml(res.data.mdUrl);
          } else {
            throw new Error('404');
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              source: res.data
            });
          }
        });
    }
  }
  public togglePreview = () => {
    this.setState({
      preview: !this.state.preview,
    });
  }
  public renderHtml = () => {
    return MarkdownService.render(this.state.source);
  }
  public submit = () => {
    this.setState({
      submitting: true
    });
    if (this.props.modify) {
      const article = {
        ...this.state.originArticle || {},
        source: this.state.source,
        title: this.state.title,
        tags: this.state.tags,
      };
      ArticleService().modifyArticle(article, this.state.source)
        .then(res => {
          if (res.status === 200) {
            console.log('success');
            this.setState({
              submitting: false
            });
          }
        });
    } else {
      const article = {
        source: this.state.source,
        title: this.state.title,
        tags: this.state.tags,
      };
      ArticleService().postArticle(article.title, article.tags, article.source).then((res) => {
        switch (res.status) {
          case 200:
            this.props.history.push(`/article/${res.data.id}`);
        }
      });
    }
  }
  public handleTagChange = (tags: string) => {
    this.setState({
      tags
    });
  }
  public render() {
    return (
      <Card>
        <div className="editor-info-wrapper">
          <div>
            <InkInput placeholder="标题" onChange={(value) => { this.setState({ title: value }); }} value={this.state.title} />
          </div>
        </div>
        <div className="editor-wrapper">
          <div className="editor-button-wrapper">
            <InkButton
              onClick={this.togglePreview}
              type={this.state.preview ? 'primary' : ''}
            >预览</InkButton>
          </div>
          <div className="editor">
            <div className={this.state.preview ? '' : 'hide'}>
              <article dangerouslySetInnerHTML={{ __html: this.renderHtml() }} />
              <div className="preview-hint">预览</div>
            </div>
            <div className={this.state.preview ? 'hide' : ''}>
              <TextArea value={this.state.source} onChange={(value) => { this.setState({ source: value }); }} />
            </div>
          </div>
        </div>
        <div className="editor-input-wrapper">
          <TagInput initialTags={this.state.tags} onChange={this.handleTagChange} />
        </div>
        <InkButton loading={this.state.submitting} type="primary" onClick={this.submit}>提交</InkButton>
      </Card>);
  }
}

export default withRouter(Editor);