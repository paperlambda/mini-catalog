import PropTypes from 'prop-types'
import theme from '@/styles/theme'
import styled, { css } from 'styled-components'

const Text = styled('div')`
  color: ${props => props.color};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')}
    ${props => {
      switch (props.variant) {
        case 'title':
          return css`
            font-size: 1.15rem;
            line-height: 1.8;
          `
        case 'title-sm':
          return css`
            font-size: 1rem;
            line-height: 1.6;
          `
        case 'paragraph':
          return css`
            font-size: 0.9rem;
          `
        case 'caption':
          return css`
            font-size: 0.7rem;
          `
      }
    }};
`

Text.propTypes = {
  variant: PropTypes.oneOf(['title', 'title-sm', 'paragraph', 'caption']),
  color: PropTypes.string,
  bold: PropTypes.bool
}

Text.defaultProps = {
  variant: 'paragraph',
  color: theme.color.black,
  bold: false
}

export default Text
