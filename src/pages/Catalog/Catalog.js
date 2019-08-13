import React from 'react'
import Container from '@/components/Container'
import Flex from '@/components/Flex'
import Card from '@/components/Card'
import styled from 'styled-components'
import Button from '@/components/Button'
import ProductCard from './containers/ProductCard'
import FilterModal from '@/pages/Catalog/containers/FilterModal'
import * as catalogService from '@/services/catalog-service'
import LoadingIndicator from '@/components/LoadingIndicator'

const Catalog = () => {
  const [showFilterModal, setFilterModal] = React.useState(false)
  const [products, setProducts] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    _getProducts()
  }, [])

  const _toggleShowModal = () => {
    setFilterModal(!showFilterModal)
  }

  const _getProducts = async () => {
    try {
      setLoading(true)
      const data = await catalogService.getProducts()
      setProducts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Main>
        <LoadingIndicator/>
      </Main>
    )
  }

  return (
    <Main>
      <Container>
        <Card>
          <FilterOptions>
            <Flex jc="flex-start" ai="flex-end">
              <select name="sort">
                <option value="" style={{ display: 'none' }}>URUTKAN</option>
                <option value="">Terbaru</option>
                <option value="">Termurah</option>
                <option value="">Termahal</option>
              </select>
              <Button color="secondary" onClick={() => _toggleShowModal()}>FILTER</Button>
            </Flex>
          </FilterOptions>
          <div>
            {
              products && products.map((product) => (<ProductCard product={product} key={product}/>))
            }
          </div>
        </Card>
      </Container>
      { showFilterModal && (<FilterModal willClose={() => _toggleShowModal()}/>) }
    </Main>
  )
}

const Main = styled('div')`
  padding-top: ${(props) => props.theme.navbarHeight}px;
`

const FilterOptions = styled('div')`
  padding: 15px;
  
  select {
    font-weight: bold;
  }
`

export default Catalog
