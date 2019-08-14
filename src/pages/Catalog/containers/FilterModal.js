import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import * as catalogService from '@/services/catalog-service'
import { Button, Flex, Text, LoadingIndicator } from '@/components'

const FilterModal = props => {
  const { willClose, willFilter } = props
  const [priceRange, setPriceRange] = React.useState('')
  const [colors, setColors] = React.useState(null)
  const [sizes, setSizes] = React.useState(null)
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    _getResources()
    _lockBodyScroll()
    return () => _unlockBodyScroll()
  }, [])

  const _getResources = async () => {
    try {
      setLoading(true)
      const sizeData = await catalogService.getSizes()
      setSizes(sizeData.map(d => ({ ...d, active: false })))

      const colorData = await catalogService.getColors()
      setColors(colorData.map(d => ({ ...d, active: false })))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const resetFilter = () => {
    setColors(colors.map(c => ({ ...c, active: false })))
    setSizes(sizes.map(s => ({ ...s, active: false })))
    setPriceRange('')

    setFilter()
  }

  const setFilter = () => {
    const filters = {
      sizes: sizes.filter(s => s.active === true).map(s => s.key) || null,
      colors: colors.filter(c => c.active === true).map(c => c.code) || null,
      price: priceRange
    }

    willFilter(filters)
    willClose()
  }

  const _toggleSize = key => {
    const findAndToggle = sizes.map(size => {
      if (size.key === key) {
        return {
          ...size,
          active: !size.active
        }
      }

      return size
    })

    setSizes(findAndToggle)
  }

  const _toggleColor = id => {
    const findAndToggle = colors.map(color => {
      if (color.id === id) {
        return {
          ...color,
          active: !color.active
        }
      }

      return color
    })

    setColors(findAndToggle)
  }

  const _lockBodyScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const _unlockBodyScroll = () => {
    document.body.style.overflow = 'auto'
  }

  return (
    <Modal>
      <MutedBg onClick={() => willClose()} />
      <ModalContent>
        <ModalHead>
          <Text variant="title-sm">Filter</Text>
        </ModalHead>
        {isLoading && <LoadingIndicator />}
        {!isLoading && (
          <ModalBody>
            <Options>
              <Text bold>Rentang Harga</Text>
              <select
                onChange={e => setPriceRange(e.target.value)}
                value={priceRange}
              >
                <option value="">Semua Harga</option>
                <option value="<50000">Di bawah 50 ribu</option>
                <option value="50000-100000">50 - 100 ribu</option>
                <option value="100000-200000">100 - 200 ribu</option>
                <option value=">200000>">Di atas 200 ribu</option>
              </select>
            </Options>
            <Options>
              <Text bold>Pilih warna</Text>
              <Flex jc="flex-start">
                {colors &&
                  colors.map((color, index) => (
                    <ColorPalette
                      className={[color.active && 'active']}
                      onClick={() => _toggleColor(color.id)}
                      title={color.label}
                      key={index}
                      color={color.code}
                    />
                  ))}
              </Flex>
            </Options>
            <Options>
              <Text bold>Pilih ukuran</Text>
              <SizeList jc="flex-start">
                {sizes &&
                  sizes.map((size, index) => (
                    <SizeOption
                      className={[size.active && 'active']}
                      onClick={() => _toggleSize(size.key)}
                      key={index}
                    >
                      {size.key}
                    </SizeOption>
                  ))}
              </SizeList>
            </Options>
          </ModalBody>
        )}

        <ModalFoot jc="space-between">
          <Button onClick={() => resetFilter()} color="inverted" block>
            RESET
          </Button>
          <Button onClick={() => setFilter()} block>
            FILTER
          </Button>
        </ModalFoot>
      </ModalContent>
    </Modal>
  )
}

const Modal = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`

const MutedBg = styled('div')`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
`

const slide = keyframes`
  0% {
    right: -240px;
  }
  100% {
    right: 0px;
  }
`

const ModalContent = styled('div')`
  background: ${props => props.theme.color.white};
  width: 240px;
  height: 100vh;

  animation: ${slide} 0.2s cubic-bezier(0, 0, 0.2, 1);
  animation-fill-mode: forwards;

  position: fixed;
  top: 0;
  right: -240px;
  left: auto;
  z-index: 10;
`

const ModalHead = styled('div')`
  background: ${props => props.theme.color.grey};
  text-align: center;
  padding: 8px 0px;
`

const ModalBody = styled('div')``

const Options = styled('div')`
  padding: 10px 10px 20px;
  & + div {
    border-top: 1px solid ${props => props.theme.color.darkgrey};
  }

  > div {
    &:first-child {
      margin-bottom: 8px;
    }
  }
`

const ColorPalette = styled('label')`
  cursor: pointer;
  background: ${props => props.color};
  box-shadow: 0px 1px 2px 0px ${props => props.theme.color.darkgrey};

  width: 32px;
  height: 32px;
  border: 2px solid white;
  border-radius: 50%;
  margin-right: 8px;

  &.active {
    text-align: center;
    vertical-align: middle;
    font-size: 20px;
    color: white;

    &:before {
      content: '\\2713';
    }
  }
`

const SizeList = styled(Flex)`
  flex-wrap: wrap;
`

const SizeOption = styled('label')`
  cursor: pointer;
  border: 1px solid ${props => props.theme.color.darkgrey};
  color: ${props => props.theme.color.black};
  background: white;

  padding: 2px 8px;
  margin-right: 8px;
  margin-bottom: 8px;

  &.active {
    background: ${props => props.theme.color.grey};
  }
`

const ModalFoot = styled(Flex)`
  background: ${props => props.theme.color.grey};
  padding: 8px 10px;
  width: 100%;

  position: absolute;
  bottom: 0;
  top: auto;
  > button {
    width: 49%;
  }
`

FilterModal.propTypes = {
  filters: PropTypes.object.isRequired,
  willClose: PropTypes.func.isRequired,
  willFilter: PropTypes.func.isRequired
}

export default FilterModal
