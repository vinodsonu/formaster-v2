import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Provider} from 'mobx-react';

import stores from './stores';
import AuthenticationRoutes from './Authentication/routes';
import AdminPageRoutes from './AdminPage/routes';
import HomePage from './components/HomePage';
import DummyComponent from './Common/components/DummyComponent';

import "./App.css";


const App = () => {
  return (
    <Provider {...stores}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          {AuthenticationRoutes}
          {AdminPageRoutes}
          <Route path = '/' component = {DummyComponent}/>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
