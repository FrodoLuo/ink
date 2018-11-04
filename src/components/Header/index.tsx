import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import ArticleService from '../../service/article.service';
import { SearchInput } from '../input-entities/Inputs';
import './style.less';

class Header extends React.Component {
  public render() {
    return (
      <>
        <header>
          <div className="nav-wrapper">
            <nav>
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

export default Header;