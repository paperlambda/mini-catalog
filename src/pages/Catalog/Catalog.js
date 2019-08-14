import React from 'react'
import styled from 'styled-components'
import ProductCard from './containers/ProductCard'
import FilterModal from './containers/FilterModal'
import * as catalogService from '@/services/catalog-service'
import NavigationTop from './containers/NavigationTop'
import FlatList from './containers/FlatList'
import { Button, Card, Container, Flex, LoadingIndicator, Main, Text} from "@/components";

const Catalog = () => {
  const [showFilterModal, setFilterModal] = React.useState(false)
  const [products, setProducts] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)
  const [sortBy, setSortBy] = React.useState('created|desc')
  const [loadMore, setLoadMore] = React.useState(false)
  const [filters, setFilters] = React.useState(null)
  const [nextQuery, setNextQuery] = React.useState(null)
  const [lastPage, setLastPage] = React.useState(false)

  React.useEffect(() => {
    _getProducts()
  }, [sortBy, filters])

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
      const { data, next } = await catalogService.getProducts({ sort: sortParams, filters })

      setNextQuery(next)
      setProducts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const didScrollList = (fallback) => {
    if(lastPage){
      document.removeEventListener('scroll', fallback)
    }
    if(!loadMore) {
      _willLoadMore()
    }
  }

  const _willLoadMore = async () => {
    try {
      setLoadMore(true)
      const sortParams = sortBy.split('|')
      const { data, next } = await catalogService.getProducts({ sort: sortParams, filters }, nextQuery)

      if(data === null){
        setLastPage(true)
      } else {
        setProducts([...products, ...data])
        setNextQuery(next)
      }

    } catch (e) {
      console.error(e)
    } finally {
      setLoadMore(false)
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
              <FlatList didReachThreshold={(fallback) => didScrollList(fallback)}>
                <div id="list">
                  {
                    products && products.map((product,index) => (<ProductCard product={product} key={index}/>))
                  }
                </div>
              </FlatList>
              { loadMore && <LoadMoreIndicator><Text>Loading...</Text></LoadMoreIndicator> }
              { lastPage && <LoadMoreIndicator><Text>End of list</Text></LoadMoreIndicator> }
            </Card>
          </Container>
        )
      }
      { isLoading && <LoadingIndicator/> }
      { showFilterModal && (<FilterModal willFilter={(params) => setFilters(params)} willClose={() => _toggleShowModal()}/>) }
    </Main>
  )
}

const FilterOptions = styled('div')`
  padding: 15px;
  
  select {
    font-weight: bold;
  }
`

const LoadMoreIndicator = styled(Flex)`
  padding: 15px 0px;
  background: ${(props) => props.theme.color.grey}
`

export default Catalog
