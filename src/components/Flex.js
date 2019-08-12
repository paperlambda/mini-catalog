import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Root = styled('div')`
  display: flex;
  justify-content: ${(props) => props.jc};
  align-items: ${(props) => props.ai}
`

const Flex = (props) => {
  const { jc, ai, children } = props

  return (
    <Root jc={jc} ai={ai}>
      {children}
    </Root>
  )
}

Flex.propTypes = {
  jc: PropTypes.string,
  ai: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Flex.defaultProps = {
  jc: 'center',
  ai: 'center',
}

export default Flex
