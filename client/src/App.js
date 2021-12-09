import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import * as Pages from './pages';
import * as PagesRoutes from './routes';

import './App.css';
import { Component } from 'react';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path={PagesRoutes.signup} element={<Pages.Signup />} />
            <Route exact path={PagesRoutes.login} element={<Pages.Login />} />
            <Route exact path={PagesRoutes.projects} element={<Pages.Projects />} />
            <Route path='*' element={<Pages.NotFound />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
