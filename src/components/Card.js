import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Card = (props) => {
  const { children } = props

  return (
    <Root>
      { children }
    </Root>
  )
}

const Root = styled('div')`
  background: ${(props) => props.theme.color.white};
`

Card.propTypes = {
  children: PropTypes.node.isRequired
}

export default Card
