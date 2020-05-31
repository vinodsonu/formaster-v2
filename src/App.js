import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import stores from './Common/stores'
import AuthenticationRoutes from './Authentication/routes'
import AdminPageRoutes from './AdminPage/routes'
import DummyComponent from './Common/components/DummyComponent'
import UserRoutes from './PreviewManagement/routes'

import './App.css'

const App = () => {
   return (
      <Provider {...stores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               {AuthenticationRoutes}
               {AdminPageRoutes}
               {UserRoutes}
               <Route path='/' component={DummyComponent} />
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
