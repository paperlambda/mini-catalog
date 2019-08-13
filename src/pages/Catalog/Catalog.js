import React from 'react'
import Container from '@/components/Container'
import Flex from '@/components/Flex'
import Card from '@/components/Card'
import styled from 'styled-components'
import Button from '@/components/Button'
import ProductCard from './containers/ProductCard'
import FilterModal from './containers/FilterModal'
import * as catalogService from '@/services/catalog-service'
import LoadingIndicator from '@/components/LoadingIndicator'
import NavigationTop from './containers/NavigationTop'
import Main from '@/components/Main'
import Text from '@/components/Text'

const Catalog = () => {
  const [showFilterModal, setFilterModal] = React.useState(false)
  const [products, setProducts] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)
  const [sortBy, setSortBy] = React.useState('created|desc')
  const [loadMore, setLoadMore] = React.useState(false)

  React.useEffect(() => {
    if(products){
      document.addEventListener('scroll', didScroll)
    }
    return () => document.removeEventListener('scroll', didScroll)
  }, [products])

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

  const _willLoadMore = async () => {
    try {
      setLoadMore(true)
      const sortParams = sortBy.split('|')
      const data = await catalogService.getProducts({ sort: sortParams })
      if (products) {
        setProducts([...products, ...data])
      } else {
        setProducts(data)
      }
      document.addEventListener('scroll', didScroll)

    } catch (e) {
      console.error(e)
    } finally {
      setLoadMore(false)
    }
  }

  const isBottomOf = (el) => {
    if(el) {
      return (el.getBoundingClientRect().bottom - 200) <= window.innerHeight
    }
    return false
  }

  const didScroll = () => {
    const wrappedElement = document.getElementById('list')
    if (isBottomOf(wrappedElement)) {
      _willLoadMore(true)
      document.removeEventListener('scroll', didScroll)
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
              <div id="list">
                {
                  products && products.map((product) => (<ProductCard product={product} key={product.id}/>))
                }
              </div>
              { loadMore && <Flex><Text>Loading...</Text></Flex> }
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

const FilterOptions = styled('div')`
  padding: 15px;
  
  select {
    font-weight: bold;
  }
`

export default Catalog
