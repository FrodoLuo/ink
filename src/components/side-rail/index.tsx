import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Card from '../cards';
import './style.less';
import AuthService from '../../service/auth.service';
import { InkForm, field, btn } from '../input-entities/Form';

export default () => {
  return (
    <>
      <Card>
        <div className="side">
          {/* <h3>最近</h3> */}
          <h3>归档</h3>
          <div className="side-content"><Link to={`/?keyword=笔记`}>笔记</Link></div>
          <div className="side-content"><Link to={`/?keyword=日记`}>日记</Link></div>
          <h3>友情链接</h3>
          <div className="side-content">
            <a href="https://samperson1997.github.io/" target="_blank">Blog of Samperson</a>
          </div>
          <hr />
          <div>
            <small>All Content by Luo Yuzhou 2018</small>
          </div>
        </div>
      </Card>
      <div className="tail-buttons">
        <a href="https://github.com/FrodoLuo" target="_blank">
          <div className="btn">
            <i className="iconfont icon-github" />
          </div>
        </a>
        <a href="https://weibo.com/u/5713934942" target="_blank">
          <div className="btn">
            <i className="iconfont icon-weblog" />
          </div>
        </a>
        <ManageEntry />
      </div>
      <div className="side-banner">
        <a href="https://www.vultr.com/?ref=7411925" target="_blank">
          <img src="https://www.vultr.com/media/badge_onwhite.svg" />
        </a>
      </div>
    </>
  );
};


class RawManageEntry extends React.Component<RouteComponentProps> {
  public state = {
    show: false,
    error: '',
    requesing: false,
  };
  public showSignIn = () => {
    if (AuthService().user.getValue() != null) {
      if (this.props.location.pathname !== '/manage') {
        this.props.history.push('/manage');
      }
      return;
    }
    if (!this.state.show) {
      this.setState({
        show: true,
      });
    }
  }
  public hideSignIn = () => {
    this.setState({
      show: false,
    });
  }
  public signIn = async (form: any) => {
    this.setState({ requesing: true });
    const { userName, password } = form;
    const pass = await AuthService().signInMethod(userName, password);
    this.setState({ requesing: false });
    if (pass) {
      this.props.history.push('/manage');
      this.setState({
        show: false,
      });
    } else {
      this.setState({
        error: '用户名或密码错误',
      });
    }
  }
  public render() {
    return (
      <div className={`${this.state.show ? 'pad' : 'btn'}`} onClick={this.showSignIn}>
        {
          this.state.show ?
            (<>
              <h2 className="sign-in-title"><i onClick={this.hideSignIn} className="iconfont icon-close btn" />验证</h2>
              <div className="form-wrapper">
                <InkForm onSubmit={this.signIn}>
                  {[
                    field({ name: 'userName', type: 'text', icon: 'smile', fieldType: 'field', required: true, }),
                    field({ name: 'password', type: 'password', icon: 'password', fieldType: 'field', required: true }),
                    btn({ text: '确定', type: 'submit', loading: this.state.requesing })
                  ]}
                </InkForm>
                <div className="signIn-error">
                  {this.state.error}
                </div>
              </div>
            </>)
            :
            <i className="iconfont icon-manage" />
        }
      </div>
    );
  }
}
const ManageEntry = withRouter(RawManageEntry);