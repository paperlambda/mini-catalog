import React from 'react'
import PropTypes from 'prop-types'
import Flex from '@/components/Flex'
import styled from 'styled-components'
import Text from '@/components/Text'

class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <Root>
          <div>
            <Text variant="title-sm">Something went wrong!</Text>
            <Text>Please contact developer <a href="javascript:void(0)">dev@tech</a></Text>
          </div>
        </Root>
      )
    }

    return children
  }
}

const Root = styled(Flex)`
  width: 100%;
  height: 100vh;
  background: white;
`

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorBoundary
