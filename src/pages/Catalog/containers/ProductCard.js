import React from 'react'
import Flex from '@/components/Flex'
import Text from '@/components/Text'
import Button from '@/components/Button'
import styled from 'styled-components'
import Label from '@/components/Label'
import theme from '@/styles/theme'

const ProductCard = () => {
  return (
    <div>
      <Thumbnail>
        <img src="https://imager-next.freetls.fastly.net/images/resized/480/a76b985a-a3a3-4321-b212-284bce616fdd" alt="Product Image"/>
      </Thumbnail>
      <CardBody jc="space-between" ai="flex-start">
        <div>
          <ProductName>Zaweynia Plain Collar Mini Dress</ProductName>
          <Label>
            <Text variant="caption">
              M, L, XL
            </Text>
          </Label>
          <Text variant="title-sm" bold={true}>169.000</Text>
        </div>
        <div>
          <CardAction>
            <div>
              <img src={require('@/assets/images/favorite_border.svg')} />
            </div>
            <Button>BELI</Button>
          </CardAction>
          <ProductStock variant="caption" color={theme.color.purple}>Stok tinggal 3</ProductStock>
        </div>
      </CardBody>
    </div>
  )
}

const CardBody = styled(Flex)`
  padding: 10px 15px;
`

const ProductName = styled(Text)`
  margin-bottom: 5px;
`

const ProductStock = styled(Text)`
  margin-top: 10px;
  text-align: right;
`

const CardAction = styled(Flex)`
  > button {
    margin-left: 20px;
  }
`

const Thumbnail = styled('div')`
  > img {
    max-width: 100%;
    height: auto;
  }
`

export default ProductCard
