import React from 'react'
import styled from 'styled-components'
import { Container, Flex, Text} from '@/components'

const NavigationTop = () => (
  <Root>
    <Container>
      <Nav jc="space-between">
        <div/>
        <Text variant="title">Dress</Text>
        <div>
          <img src={require('@/assets/images/shopping_cart.svg')} />
        </div>
      </Nav>
    </Container>
  </Root>
)

const Root = styled('div')`
  height: ${(props) => props.theme.navbarHeight}px;
  width: 100%;
  
  background: ${(props) => props.theme.color.white};
  box-shadow: 0px 0px 2px 1px ${(props) => props.theme.color.darkgrey};
  
  position: fixed;
  top: 0;
  left: 0;
`

const Nav = styled(Flex)`
  padding: 0px 20px;
  height: ${(props) => props.theme.navbarHeight}px;
`

export default NavigationTop
