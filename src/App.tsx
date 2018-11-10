
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthService from './service/auth.service';
import './App.less';
/* Layouts */
import Header from 'src/components/header';
import SideRail from 'src/components/side-rail';
/* Pages */
import { AuthorizedPage } from './pages';
import ArticleHome from 'src/pages/article';
import ArticleDetail from 'src/pages/article-detail';
import NotFoundPage from 'src/pages/not-found';
import ManagePage from 'src/pages/manage';
import EditPage from 'src/pages/edit-article';
import CreatePage from 'src/pages/new-article';
import Comments from './pages/comments';

class App extends React.Component {
  public async componentDidMount() {
    await AuthService().signInWithTokenMethod();
  }
  public render() {
    return (
      <>
        <Header />
        <div className="content-wrapper">
          <div className="main-content">
            <Switch>
              <Route exact={true} path="/" component={ArticleHome} />
              <Route exact={true} path="/article/:id" component={ArticleDetail} />
              <Route exact={true} path="/message" component={Comments} />
              <Route exact={true} path="/manage" component={AuthorizedPage(ManagePage)} />
              <Route exact={true} path="/edit" component={AuthorizedPage(CreatePage)} />
              <Route exact={true} path="/edit/:id" component={AuthorizedPage(EditPage)} modify={true} />
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
