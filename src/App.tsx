
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.less';
/* Layouts */
import Header from './components/Header';
/* Pages */
import Article from './pages/article';



class App extends React.Component {
  public render() {
    return (
      <>
        <Route component={Header} /> {/* write like is just to rerender the component when change route*/}
        <div className="content-wrapper">
          <div className="main-content">
            <Switch>
              <Route exact={true} path="/" component={Article} />
              <Route path="/album" component={Article} />
            </Switch>
          </div>
          <div className="rail-content">
            123
        </div>
        </div>
      </>
    );
  }
}

export default App;
