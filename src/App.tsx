
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthService from './service/auth.service';
import './App.less';
/* Layouts */
import Header from './components/header';
import SideRail from './components/side-rail';
/* Pages */
import { AuthorizedPage } from './pages';
import ArticleHome from './pages/article';
import ArticleDetail from './pages/article-detail';
import NotFoundPage from './pages/not-found';
import ManagePage from './pages/manage';
import EditPage from './pages/editor';

class App extends React.Component {
  public async componentDidMount() {
    await AuthService().signInWithTokenMethod();
  }
  public render() {
    return (
      <>
        <Route component={Header} /> {/* write like is just to rerender the component when change route*/}
        <div className="content-wrapper">
          <div className="main-content">
            <Switch>
              <Route exact={true} path="/" component={ArticleHome} />
              <Route exact={true} path="/article/:id" component={ArticleDetail} />
              <Route exact={true} path="/manage" component={AuthorizedPage(ManagePage)} />
              <Route exact={true} path="/edit" component={AuthorizedPage(EditPage)} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <div className="rail-content">
            <SideRail />
          </div>
        </div>
      </>
    );
  }
}

export default App;
