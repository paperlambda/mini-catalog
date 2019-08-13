import React from 'react'
import Flex from '@/components/Flex'
import Text from '@/components/Text'
import Button from '@/components/Button'
import styled from 'styled-components'
import Label from '@/components/Label'
import theme from '@/styles/theme'
import {ProductType} from '@/constants/propTypes'
import PropTypes from 'prop-types'

const ProductCard = (props) => {
  const { product } = props
  const stockWarningMin = 10

  return (
    <div>
      <Thumbnail>
        <img src={product.images[0]} alt={product.name}/>
      </Thumbnail>
      <CardBody jc="space-between" ai="flex-start">
        <div>
          <ProductName>{product.name}</ProductName>
          <Label>
            <Text variant="caption">
              {product.sizes.join(', ')}
            </Text>
          </Label>
          <Text variant="title-sm" bold={true}>{product.price}</Text>
        </div>
        <div>
          <CardAction>
            <div>
              <img src={require('@/assets/images/favorite_border.svg')} alt="Add to Wishlist" />
            </div>
            <Button>BELI</Button>
          </CardAction>

          { product.stock <= stockWarningMin && (
            <ProductStock variant="caption" color={theme.color.purple}>Stok tinggal {product.stock}</ProductStock>
          )}
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

ProductCard.propTypes = {
  product: PropTypes.shape(ProductType)
}

export default ProductCard
