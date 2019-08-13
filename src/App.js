import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Catalog from '@/pages/Catalog/Catalog'
import ErrorBoundary from '@/containers/ErrorBoundary'
import '@/helpers/firebase'
import history from '@/helpers/history'

const App = () => (
  <ErrorBoundary>
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/" component={Catalog}/>
      </Switch>
    </Router>
  </ErrorBoundary>
)

export default App
