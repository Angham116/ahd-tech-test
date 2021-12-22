import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as Pages from './pages';
import * as PagesRoutes from './routes';

import './App.css';
import { Component } from 'react';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path={PagesRoutes.signup}>
            <Pages.Signup />
            </Route>
            <Route exact path={PagesRoutes.login}>
              <Pages.Login />
            </Route>

            <Route exact path={PagesRoutes.projects}>
              <Pages.Projects />
            </Route>
            <Route path='*'>
              <Pages.NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
