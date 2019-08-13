import React from 'react'
import NavigationTop from './containers/NavigationTop'
import * as catalogService from '@/services/catalog-service'
import PropTypes from 'prop-types'
import LoadingIndicator from '@/components/LoadingIndicator'
import Container from '@/components/Container'
import Main from '@/components/Main'
import Card from '@/components/Card'
import Text from '@/components/Text'
import theme from '@/styles/theme'
import Button from '@/components/Button'
import Flex from '@/components/Flex'
import styled from 'styled-components'
import moneyFormat from '@/helpers/money-format'

const CatalogDetail = (props) => {
  const { match } = props
  const [isLoading, setLoading] = React.useState(true)
  const [product, setProduct] = React.useState(null)

  React.useEffect(() => {
    _getDetail()
  }, [])

  const _getDetail = async () => {
    try {
      setLoading(true)

      const data = await catalogService.getProductDetail(match.params.slug)
      setProduct(data)

    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Main>
      <NavigationTop isLoading={isLoading} title={product && product.name} />
      {
        isLoading && <LoadingIndicator/>
      }
      {
        !isLoading && (
          <Container>
            <Card>
              <BigImage>
                <img src={product.images[0]} />
              </BigImage>
              <Thumbnail jc="flex-start">
                {
                  product.images.map((image, index) => (
                    <div key={index} >
                      <img src={image} />
                    </div>
                  ))
                }
              </Thumbnail>
              <Content>
                <Titles>
                  <Text variant="title" bold>{product.name}</Text>
                  <Text variant="title" color={theme.color.purple}>{moneyFormat(product.price)}</Text>
                </Titles>
                <Variants>
                  <Text>Warna : { product.colors.join(', ') }</Text>
                  <Text>Ukuran : { product.sizes.join(', ') }</Text>
                </Variants>
              </Content>
              <Actions jc="space-between">
                <Button color="secondary">Simpan</Button>
                <Button block>Beli Sekarang</Button>
              </Actions>
            </Card>
          </Container>
        )
      }
    </Main>
  )
}

const BigImage = styled('div')`
  > img {
    max-width: 100%;
    height: auto;
  }
`

const Thumbnail = styled(Flex)`
  padding: 5px 20px 10px 20px;
  > div {
    width: 56px;
    height: 56px;
  
    border: 1px solid ${(props) => props.theme.color.grey}
    border-radius: 4px;
    padding: 4px;
  
    & + div {
      margin-left: 10px;
    }
    
    > img {
      width: 100%;
      height: 100%;
    }
  }
`

const Content = styled('div')`
 > div {
    padding: 15px 20px;
    border-bottom: 1px solid ${(props) => props.theme.color.grey}
 } 
`

const Titles = styled('div')`
  > div {
    line-height: 1.5;
  }
`

const Variants = styled('div')`
  > div {
    & + div {
      margin-top: 8px;
    }
  }
`

const Actions = styled(Flex)`
  padding: 10px 20px;
  > button {
    & + button {
      margin-left: 10px;
    }
  }
`

CatalogDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string
    }).isRequired
  }).isRequired
}

export default CatalogDetail
