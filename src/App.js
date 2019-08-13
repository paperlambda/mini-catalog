import React from 'react'
import Catalog from '@/pages/Catalog/Catalog'
import ErrorBoundary from '@/containers/ErrorBoundary'
import '@/helpers/firebase'
import NavigationTop from '@/containers/NavigationTop'

const App = () => (
  <ErrorBoundary>
    <NavigationTop />
    <Catalog />
  </ErrorBoundary>
)

export default App
