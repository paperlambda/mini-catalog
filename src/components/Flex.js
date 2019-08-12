import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Flex = (props) => {
  const { children } = props

  return (
    <Root {...props}>
      {children}
    </Root>
  )
}

const Root = styled('div')`
  display: flex;
  justify-content: ${(props) => props.jc};
  align-items: ${(props) => props.ai}
`

Flex.propTypes = {
  jc: PropTypes.string,
  ai: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Flex.defaultProps = {
  jc: 'center',
  ai: 'center',
}

export default Flex
