import React from 'react'
import NavigationTop from '@/containers/NavigationTop'
import Container from '@/components/Container'
import Flex from '@/components/Flex'
import Card from '@/components/Card'
import styled from 'styled-components'
import Button from '@/components/Button'
import ProductCard from './containers/ProductCard'
import FilterModal from '@/pages/Catalog/containers/FilterModal'

const Catalog = () => {
  const [showFilterModal, setFilterModal] = React.useState(false)

  const _toggleShowModal = () => {
    setFilterModal(!showFilterModal)
  }

  return (
    <Main>
      <NavigationTop />
      <Container>
        <Card>
          <FilterOptions>
            <Flex jc="flex-start">
              <select>
                <option value="">Rekomendasi</option>
                <option value="">Terbaru</option>
                <option value="">Termurah</option>
                <option value="">Termahal</option>
              </select>
              <Button color="secondary" onClick={() => _toggleShowModal()}>Filter</Button>
            </Flex>
          </FilterOptions>
          <div>
            {
              [1,2,3].map(() => (<ProductCard />))
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
`

export default Catalog
