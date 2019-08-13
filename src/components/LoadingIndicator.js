import React from 'react'
import styled from 'styled-components'
import Text from '@/components/Text'
import Flex from '@/components/Flex'

const LoadingIndicator = () => {
  return (
    <Root>
      <Text variant="title-sm" bold>LOADING...</Text>
    </Root>
  )
}

const Root = styled(Flex)`
  width: 100%;
  height: 100vh;
  background: white;
`

export default LoadingIndicator
