import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { SearchInput } from '../Inputs/Inputs';
import './style.less';

interface IProps extends DispatchProp {
  location: any;
}

class Header extends React.Component<IProps> {
  public render() {
    return (
      <>
        <header>
          <div className="nav-wrapper">
            <nav>
              <NavLink exact={true} to="/">
                文章
              </NavLink>
              <NavLink to="/album" activeClassName="active">
                照片
              </NavLink>
              <NavLink to="/clipboard">
                留言板
              </NavLink>
              <NavLink to="/aboutme">
                关于我
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