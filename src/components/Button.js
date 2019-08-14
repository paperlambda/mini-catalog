import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled('button')`
  ${props => {
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
          border: 1px solid ${props => props.theme.color.darkgrey};
        `
      case 'inverted':
        return css`
          background: white;
          color: ${props.theme.color.purple};
          border: none;
        `
      default:
        return css`
          background: ${props.theme.color.purple};
          color: white;
          border: none;
        `
    }
  }}
  
  width: ${props => (props.block ? '100%' : 'auto')}
  
  font-family: 'Noto Sans', sans-serif;
  height: ${props => props.theme.controlHeight}px;
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
  block: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'inverted'])
}

Button.defaultProps = {
  color: 'primary',
  block: false
}

export default Button
