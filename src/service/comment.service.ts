import { getComments, postComment } from 'src/api/comment.api';
import { BehaviorSubject } from 'rxjs';
import { Comment } from 'src/models/comment.model';

class CommentService {
  get comments() { return this.comments$; }
  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }
  private static instance: CommentService;
  private page: number = 0;
  private comments$ = new BehaviorSubject<Comment[]>([]);
  constructor() {
    this.getMoreComments();
  }
  public getMoreComments() {
    getComments(this.page)
      .then(res => {
        if (res.status === 200) {
          this.comments$.next(this.comments$.getValue().concat(res.data));
          if (res.data.length > 0) {
            this.page += 1;
          }
        }
      });
  }
  public postComment(author: string, content: string) {
    return postComment(author, content)
      .then((res) => {
        if (res.status === 200) {
          const list = this.comments$.getValue();
          list.unshift(res.data);
          this.comments$.next(list);
        }
      });
  }
}

export default CommentService.getInstance;