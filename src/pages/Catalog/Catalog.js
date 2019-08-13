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
import NavigationTop from '@/containers/NavigationTop'

const Catalog = () => {
  const [showFilterModal, setFilterModal] = React.useState(false)
  const [products, setProducts] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)
  const [sortBy, setSortBy] = React.useState('created|desc')

  React.useEffect(() => {
    _getProducts()
  }, [sortBy])

  const _toggleShowModal = () => {
    setFilterModal(!showFilterModal)
  }

  const _didSelectSortOpt = (e) => {
    const sortOpt = e.target.value
    setSortBy(sortOpt)
  }

  const _getProducts = async () => {
    try {
      setLoading(true)

      const sortParams = sortBy.split('|')
      const data = await catalogService.getProducts({ sort: sortParams })

      setProducts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Main>
      <NavigationTop/>
      {
        !isLoading && (
          <Container>
            <Card>
              <FilterOptions>
                <Flex jc="flex-start" ai="flex-end">
                  <select value={sortBy} onChange={(e) => _didSelectSortOpt(e)} name="sort">
                    <option value="" style={{ display: 'none' }}>URUTKAN</option>
                    <option value="created|desc">Terbaru</option>
                    <option value="price|asc">Termurah</option>
                    <option value="price|desc">Termahal</option>
                  </select>
                  <Button color="secondary" onClick={() => _toggleShowModal()}>FILTER</Button>
                </Flex>
              </FilterOptions>
              <div>
                {
                  products && products.map((product) => (<ProductCard product={product} key={product.id}/>))
                }
              </div>
            </Card>
          </Container>
        )
      }
      {
        isLoading && <LoadingIndicator/>
      }
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
