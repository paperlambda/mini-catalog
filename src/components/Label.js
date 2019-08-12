import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Label = (props) => {
  const { children } = props
  return (
    <Root>
      { children }
    </Root>
  )
}

const Root = styled('div')`
  background: ${(props) => props.theme.color.grey};
  color: ${(props) => props.theme.color.black};
  padding: 3px 6px;
  margin: 4px 0px;
  display: inline-block;
`

Label.propTypes = {
  children: PropTypes.node.isRequired
}

export default Label
