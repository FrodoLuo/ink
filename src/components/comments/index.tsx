import * as React from 'react';
import { Comment } from 'src/models/comment.model';
import { Subscription } from 'rxjs';
import CommentService from 'src/service/comment.service';
import Card from 'src/components/cards';
import { InkForm, field, btn, textArea } from '../input-entities/Form';
import { withRouter, RouteComponentProps } from 'react-router';

interface State {
  comments: Comment[];
  loading: boolean;
}

class Comments extends React.Component<RouteComponentProps> {
  public state = {
    comments: [],
    loading: false,
  };
  private subscription: Subscription;
  public componentWillMount() {
    this.subscription = CommentService().comments.subscribe(comments => {
      this.setState({
        comments
      });
    });
  }

  public componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  public getMoreComments() {
    CommentService().getMoreComments();
  }

  public renderComment = () => {
    const comments = this.state.comments.map(
      (comment: Comment) => {
        return (
          <div className="comment-single" key={comment.id}>
            <Card>
              <h4>{comment.author}</h4>
              <p>{comment.content}</p>
              <small>{new Date(comment.updateDate).toLocaleString()}</small>
            </Card>
          </div>
        );
      }
    );
    return comments;
  }
  public submit = (form: any) => {
    console.log(form);
    this.setState({
      loading: true,
    });
    CommentService().postComment(form.author, form.content)
      .then(res => {
        this.setState({
          loading: false,
        });
        this.props.history.go(0);
      });
  }
  public render() {
    return (
      <>
        <Card>
          <InkForm onSubmit={this.submit}>
            {[
              textArea({ name: 'content', fieldType: 'textarea', required: true }),
              field({ name: 'author', placeholder: '署下大名!', type: 'text', fieldType: 'field', required: true }),
              btn({ text: '留言', type: 'submit', styleType: 'primary', loading: this.state.loading }),
            ]}
          </InkForm>
        </Card>
        {this.renderComment()}
        <div className="fetching-trigger" onClick={this.getMoreComments}>
          Refresh
        </div>
      </>
    );
  }
}

export default withRouter(Comments);