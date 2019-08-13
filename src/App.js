import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import '@/helpers/firebase'
import history from '@/helpers/history'
import Catalog from '@/pages/Catalog/Catalog'
import ErrorBoundary from '@/containers/ErrorBoundary'
import CatalogDetail from '@/pages/CatalogDetail/CatalogDetail'

const App = () => (
  <ErrorBoundary>
    <Router history={history}>
      <Switch>
        <Route exact path="/catalogs" component={Catalog}/>
        <Route exact path="/catalogs/:slug" component={CatalogDetail}/>
        <Route component={Catalog} />
      </Switch>
    </Router>
  </ErrorBoundary>
)

export default App
