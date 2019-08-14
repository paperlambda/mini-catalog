import React from 'react'
import NavigationTop from './containers/NavigationTop'
import * as catalogService from '@/services/catalog-service'
import PropTypes from 'prop-types'
import theme from '@/styles/theme'
import styled from 'styled-components'
import moneyFormat from '@/helpers/money-format'
import { Button, Card, Container, Flex, LoadingIndicator, Main, Text} from "@/components";

const CatalogDetail = (props) => {
  const { match } = props
  const [isLoading, setLoading] = React.useState(true)
  const [product, setProduct] = React.useState(null)
  const [selectedImage, setSelectedImage] = React.useState(0)

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

  const _didSelectThumbnail = (index) => {
    setSelectedImage(index)
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
                <img src={product.images[selectedImage]} />
              </BigImage>
              <Thumbnail jc="flex-start">
                <Belt>
                  {
                    product.images.map((image, index) => (
                      <div onClick={() => _didSelectThumbnail(index)} key={index} className={[selectedImage === index && 'active']}>
                        <img src={image} />
                      </div>
                    ))
                  }
                </Belt>
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

const Thumbnail = styled('div')`
  padding: 5px 20px 10px 20px;
  width: 100vw;
  overflow-x: auto;
`

const Belt = styled('div')`
  width: 100%;
  white-space: nowrap;
  
  > div {
    display: inline-block;
    width: 56px;
    height: 56px;
  
    border: 1px solid ${(props) => props.theme.color.grey}
    border-radius: 4px;
    padding: 4px;
    margin-right: 15px;
    
    &.active{
      border-color: ${(props) => props.theme.color.purple};
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
    text-transform: capitalize;
  
    & + div {
      margin-top: 8px;
    }
  }
`

const Actions = styled(Flex)`
  padding: 20px 20px;
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
