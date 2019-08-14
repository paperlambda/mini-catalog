import styled from 'styled-components'

const Label = styled('div')`
  background: ${(props) => props.theme.color.grey};
  color: ${(props) => props.theme.color.black};
  padding: 3px 6px;
  margin: 4px 0px;
  display: inline-block;
`

export default Label
