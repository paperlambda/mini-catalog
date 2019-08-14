import styled from 'styled-components'
import PropTypes from 'prop-types'

const Flex = styled('div')`
  display: flex;
  justify-content: ${(props) => props.jc};
  align-items: ${(props) => props.ai || 'center'}
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
