import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const Button = (props) => {
  const { children } = props
  return (
    <Root {...props}>
      { children }
    </Root>
  )
}

const Root = styled('button')`
  ${(props) => {
    switch (props.color) {
    case 'primary':
      return css`
          background: ${props.theme.color.purple};
          color: white;
          border: none;
        `
    case 'secondary':
      return css`
          background: ${props.theme.color.white};
          color: ${props.theme.color.black};
          border: 1px solid ${(props) => props.theme.color.grey}
        `
    }
  }}
  
  font-family: 'Noto Sans', sans-serif;
  height: ${(props) => props.theme.controlHeight}px;
  padding: 0px 15px;
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1.2;
  border-radius: 8px;
  
  cursor: pointer;
  pointer-events: auto;
  box-sizing: border-box;
  outline: none;
`

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Button.defaultProps = {
  color: 'primary'
}

export default Button
