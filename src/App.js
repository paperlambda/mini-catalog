import React from 'react'
import Catalog from '@/pages/Catalog/Catalog'
import ErrorBoundary from '@/containers/ErrorBoundary'

const App = () => (
  <ErrorBoundary>
    <Catalog />
  </ErrorBoundary>
)

export default App
