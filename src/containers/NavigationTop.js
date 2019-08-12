import React from 'react'
import styled from 'styled-components'
import Container from '@/components/Container'
import Flex from '@/components/Flex'

const Root = styled('div')`
  height: 60px;
  width: 100%;
  
  background: ${(props) => props.theme.color.white};
  box-shadow: 0px 1px 3px 2px ${(props) => props.theme.color.grey};
  
  position: fixed;
`

const NavigationTop = () => (
  <Root>
    <Container>
      <Flex jc="space-between">
        <div>
          <img src={require('@/assets/images/keyboard_backspace.svg')} />
        </div>
        <p>Dress</p>
        <div>
          <img src={require('@/assets/images/shopping_cart.svg')} />
        </div>
      </Flex>
    </Container>
  </Root>
)

export default NavigationTop
