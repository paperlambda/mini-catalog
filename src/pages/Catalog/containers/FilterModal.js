import React from 'react'
import Text from '@/components/Text'
import Button from '@/components/Button'
import styled, {keyframes} from 'styled-components'
import Flex from '@/components/Flex'
import PropTypes from 'prop-types'

const FilterModal = (props) => {
  const { willClose } = props

  React.useEffect(() => {
    _lockBodyScroll()
    return () => _unlockBodyScroll()
  }, [])

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

        <ModalBody>
          <Options>
            <Text bold>Rentang Harga</Text>
            <select>
              <option value="">Semua Harga</option>
              <option value="">Di bawah 50 ribu</option>
              <option value="">50 - 100 ribu</option>
              <option value="">100 - 200 ribu</option>
              <option value="">Di atas 200 ribu</option>
            </select>
          </Options>
          <Options>
            <Text bold>Pilih warna</Text>
            <Flex jc="flex-start">
              <ColorPalette color="red" />
              <ColorPalette color="green" />
              <ColorPalette color="blue" />
            </Flex>
          </Options>
          <Options>
            <Text bold>Pilih ukuran</Text>
            <Flex jc="flex-start">
              <SizeOption>S</SizeOption>
              <SizeOption>M</SizeOption>
              <SizeOption>L</SizeOption>
              <SizeOption>XL</SizeOption>
              <SizeOption>XXL</SizeOption>
            </Flex>
          </Options>
        </ModalBody>

        <ModalFoot jc="space-between">
          <Button color="inverted" block>Reset</Button>
          <Button block>Filter</Button>
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
  background: rgba(0,0,0,0.4);
  
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
  background: ${(props) => props.theme.color.white};
  width: 240px;
  height: 100vh;
  
  animation: ${slide} 0.2s cubic-bezier(0.0, 0.0, 0.2, 1);;
  animation-fill-mode: forwards;
  
  position: fixed;
  top: 0;
  right: -240px;
  left: auto;
  z-index: 10;
`

const ModalHead = styled('div')`
  background: ${(props) => props.theme.color.grey};
  text-align: center;
  padding: 8px 0px;
`

const ModalBody = styled('div')``

const Options = styled('div')`
  padding: 10px 10px 20px;
  & + div {
    border-top: 1px solid ${(props) => props.theme.color.darkgrey};
  }
  
  > div {
    &:first-child{
      margin-bottom: 8px;
    }
  }
`

const ColorPalette = styled('label')`
  background: ${(props) => props.color};
  box-shadow: 0px 1px 2px 0px ${(props) => props.theme.color.darkgrey};
  
  width: 32px;
  height: 32px;
  border: 2px solid white;
  border-radius: 50%;
  
  &::focus{
    opactiy: 0.3;
  }
  
  & + label {
    margin-left: 8px;
  }
`

const SizeOption = styled('label')`
  border: 1px solid ${(props) => props.theme.color.darkgrey};
  color: ${(props) => props.theme.color.black};
  background: white;
  
  padding: 2px 8px;
  
  & + label {
    margin-left: 8px;
  }
`

const ModalFoot = styled(Flex)`
  background: ${(props) => props.theme.color.grey};
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
  willClose: PropTypes.func.isRequired
}

export default FilterModal
