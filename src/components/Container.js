import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Root = styled('div')`
    max-width: 480px;
    padding: 0px 20px;
    margin: 0px auto;
    
    display: block;
`

const Container = ({ children }) => (
  <Root>
    {children}
  </Root>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
