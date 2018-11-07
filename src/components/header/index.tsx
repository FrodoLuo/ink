import * as React from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { SearchInput } from '../input-entities/Inputs';
import './style.less';

class Header extends React.Component<RouteComponentProps> {
  public state = {
    showNav: false,
  };
  public render() {
    return (
      <>
        <header>
          <div className="nav-wrapper">
            <div
              onClick={() => { this.setState({ showNav: false }); }}
              className={`nav-mask ${this.state.showNav ? 'active' : ''}`}
            />
            <nav className={this.state.showNav ? 'active' : ''}>
              <NavLink exact={true} to="/">
                <span>文章</span>
              </NavLink>
              <NavLink to="/album" activeClassName="active">
                <span>照片</span>
              </NavLink>
              <NavLink to="/clipboard">
                <span>留言板</span>
              </NavLink>
              <NavLink to="/aboutme">
                <span>关于我</span>
              </NavLink>
            </nav>
            <div className="search-wrapper">
              <SearchInput />
            </div>
            <div
              className="nav-btn"
              onClick={() => { this.setState({ showNav: true }); }}
            >
              <i className="iconfont icon-menu" />
            </div>
          </div>
        </header>
      </>
    );
  }
  private searchBtn(e: React.ChangeEvent) {
    console.log(e);
  }
  private searchKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      console.log('search:', e.currentTarget.value);
    }

  }
}

export default withRouter(Header);