import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = ({ children }) => (
  <Root>
    {children}
  </Root>
)

const Root = styled('div')`
    max-width: 480px;
    margin: 0px auto;
    
    display: block;
`

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
