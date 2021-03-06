import React from 'react'
import styled from 'styled-components'
import theme from '@/styles/theme'
import { ProductType } from '@/constants/propTypes'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moneyFormat from '@/helpers/money-format'
import { Button, Flex, Label, Text } from '@/components'

const ProductCard = props => {
  const { product } = props
  const stockWarningMin = 10
  const [isFavorite, setFavorite] = React.useState(false)

  const _toggleFavorite = () => {
    setFavorite(!isFavorite)
  }

  return (
    <div>
      <Thumbnail title={product.name}>
        <Link to={`/catalogs/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} />
        </Link>
      </Thumbnail>
      <CardBody jc="space-between" ai="flex-start">
        <div>
          <Link to={`/catalogs/${product.slug}`}>
            <ProductName>{product.name}</ProductName>
          </Link>
          <Label>
            <Text title="Size" variant="caption">
              {product.sizes.join(', ')}
            </Text>
          </Label>
          <Text variant="title-sm" bold={true}>
            {moneyFormat(product.price)}
          </Text>
        </div>
        <div>
          <CardAction>
            <FavoriteIcon>
              {isFavorite ? (
                <img
                  onClick={() => _toggleFavorite()}
                  src={require('@/assets/images/favorite.svg')}
                  title="Added"
                />
              ) : (
                <img
                  onClick={() => _toggleFavorite()}
                  src={require('@/assets/images/favorite_border.svg')}
                  title="Add to Wishlist"
                />
              )}
            </FavoriteIcon>
            <Button>BELI</Button>
          </CardAction>

          {product.stock <= stockWarningMin && (
            <ProductStock variant="caption" color={theme.color.purple}>
              Stok tinggal {product.stock}
            </ProductStock>
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
  height: 480px;
  > img {
    max-width: 100%;
    height: auto;
  }
`

const FavoriteIcon = styled('div')`
  > img {
    cursor: pointer;
  }
`

ProductCard.propTypes = {
  product: PropTypes.shape(ProductType)
}

export default ProductCard
