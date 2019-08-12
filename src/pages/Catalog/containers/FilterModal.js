import React from 'react'
import Text from '@/components/Text'
import Button from '@/components/Button'
import styled from 'styled-components'
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
          </Options>
          <Options>
            <Text bold>Pilih ukuran</Text>
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

const ModalContent = styled('div')`
  background: ${(props) => props.theme.color.white};
  width: 240px;
  height: 100vh;
  
  position: fixed;
  top: 0;
  right: 0;
  left: auto;
  z-index: 10;
`

const ModalHead = styled('div')`
  background: ${(props) => props.theme.color.grey};
  text-align: center;
  padding: 8px 0px;
`

const ModalBody = styled('div')`
  
`

const Options = styled('div')`
  padding: 10px 10px;
  & + div {
    border-top: 1px solid ${(props) => props.theme.color.grey};
  }
  
  > div {
    &:first-child{
      margin-bottom: 8px;
    }
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
