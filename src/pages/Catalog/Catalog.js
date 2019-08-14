import React from 'react'
import styled from 'styled-components'
import ProductCard from './containers/ProductCard'
import FilterModal from './containers/FilterModal'
import * as catalogService from '@/services/catalog-service'
import NavigationTop from './containers/NavigationTop'
import FlatList from './containers/FlatList'
import {
  Button,
  Card,
  Container,
  Flex,
  LoadingIndicator,
  Main,
  Text
} from '@/components'
import history from '@/helpers/history'
import {
  decodeQueryParams,
  encodeQueryParams
} from '@/helpers/query-params-format'
import PropTypes from 'prop-types'

class Catalog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilterModal: false,
      products: null,
      isLoading: false,
      sortBy: false,
      loadMore: false,
      filters: {},
      nextQuery: null,
      lastPage: false
    }
  }

  componentDidMount() {
    const queryParams = this._getQueryParams()
    this._getProducts(queryParams)
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, filters } = this.state
    if (sortBy !== prevState.sortBy) {
      this.setState({ lastPage: false })
    }
    if (filters !== prevState.filters) {
      this.setState({ lastPage: false })
      this._getProducts(filters)
    }
  }

  _toggleShowModal() {
    this.setState(prev => {
      return { showFilterModal: !prev.showFilterModal }
    })
  }

  _didSelectSortOpt(e) {
    const sortOpt = e.target.value
    this.setState(prev => {
      const [sort, order] = sortOpt.split('|')
      return {
        sortBy: sortOpt,
        filters: { ...prev.filters, sort, order }
      }
    })
  }

  _getQueryParams() {
    const { location } = this.props
    const { filters } = this.state
    if (location.search) {
      const q = decodeQueryParams(location.search)
      this.setState({
        filters: q,
        sortBy: `${q.sort}|${q.order}`
      })
      return q
    }
    return filters
  }

  async _getProducts(filters) {
    try {
      this.setState({ isLoading: true })
      history.push({
        search: `?${encodeQueryParams(filters)}`
      })
      const { data, next } = await catalogService.getProducts(filters)

      this.setState({
        nextQuery: next,
        products: data
      })
    } catch (e) {
      console.error(e)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  didScrollList(fallback) {
    const { lastPage, loadMore } = this.state
    if (lastPage) {
      document.removeEventListener('scroll', fallback)
    }
    if (!lastPage && !loadMore) {
      this._willLoadMore()
    }
  }

  async _willLoadMore() {
    try {
      const { filters, nextQuery } = this.state
      this.setState({ loadMore: true })

      const { data, next } = await catalogService.getProducts(
        filters,
        nextQuery
      )

      if (data === null) {
        this.setState({ lastPage: true })
      } else {
        this.setState(prev => {
          return {
            products: [...prev.products, ...data],
            nextQuery: next
          }
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      this.setState({ loadMore: false })
    }
  }

  setFilters(filters) {
    this.setState(prev => {
      return { filters: { ...prev.filters, ...filters } }
    })
  }

  willReset() {
    history.push({
      search: ''
    })
    this.setState({
      filters: {}
    })
  }

  render() {
    const {
      filters,
      isLoading,
      lastPage,
      loadMore,
      products,
      showFilterModal,
      sortBy
    } = this.state

    return (
      <Main>
        <NavigationTop />
        {!isLoading && (
          <Container>
            <Card>
              <FilterOptions>
                <Flex jc="flex-start" ai="flex-end">
                  <select
                    value={sortBy}
                    onChange={e => this._didSelectSortOpt(e)}
                    name="sort"
                  >
                    <option value="" style={{ display: 'none' }}>
                      URUTKAN
                    </option>
                    <option value="created|desc">Terbaru</option>
                    <option value="price|asc">Termurah</option>
                    <option value="price|desc">Termahal</option>
                  </select>
                  <Button
                    color="secondary"
                    onClick={() => this._toggleShowModal()}
                  >
                    FILTER
                  </Button>
                </Flex>
              </FilterOptions>
              <FlatList
                didReachThreshold={fallback => this.didScrollList(fallback)}
              >
                <div id="list">
                  {products &&
                    products.map((product, index) => (
                      <ProductCard product={product} key={index} />
                    ))}
                </div>
              </FlatList>
              {loadMore && (
                <LoadMoreIndicator>
                  <Text>Loading...</Text>
                </LoadMoreIndicator>
              )}
              {lastPage && (
                <LoadMoreIndicator>
                  <Text>End of list</Text>
                </LoadMoreIndicator>
              )}
            </Card>
          </Container>
        )}
        {isLoading && <LoadingIndicator />}
        {showFilterModal && (
          <FilterModal
            filters={filters}
            willReset={() => this.willReset()}
            willFilter={params => this.setFilters(params)}
            willClose={() => this._toggleShowModal()}
          />
        )}
      </Main>
    )
  }
}

const FilterOptions = styled('div')`
  padding: 15px;

  select {
    font-weight: bold;
  }
`

const LoadMoreIndicator = styled(Flex)`
  padding: 15px 0px;
  background: ${props => props.theme.color.grey};
`

Catalog.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  })
}

export default Catalog
