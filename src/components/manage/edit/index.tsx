import * as React from 'react';
import { InkInput, TextArea } from 'src/components/input-entities/Inputs';
import InkButton from 'src/components/input-entities/Button';
import './style.less';
import MarkdownService from 'src/service/markdown.service';

export default class Editor extends React.Component {
  public state = {
    title: '',
    source: '',
    html: '',
    preview: false
  };
  public togglePreview = () => {
    this.setState({
      preview: !this.state.preview,
    });
  }
  public renderHtml = () => {
    return MarkdownService.render(this.state.source);
  }
  public render() {
    return (<>
      <div className="editor-info-wrapper">
        <div>
          <span>标题</span>
          <InkInput onChange={(value) => { this.setState({ title: value }); }} />
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
      <InkButton type="primary">提交</InkButton>
    </>);
  }
}