import React from 'react'
import PropTypes from 'prop-types'

class FlatList extends React.Component{
  constructor(props) {
    super(props)
    this.isBottomOf = this.isBottomOf.bind(this)
    this.didScroll = this.didScroll.bind(this)
  }

  componentDidMount() {
    document.addEventListener('scroll', this.didScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.didScroll)
  }

  isBottomOf(el) {
    if(el) {
      return (el.getBoundingClientRect().bottom - 300) <= window.innerHeight
    }
    return false
  }

  didScroll() {
    const { didReachThreshold } = this.props
    const wrappedElement = document.getElementById('list')
    if (this.isBottomOf(wrappedElement)) {
      didReachThreshold(this.didScroll)
    }
  }

  render() {
    const { children } = this.props
    return (
      <>
        { children }
      </>
    )
  }
}

FlatList.propTypes =  {
  children: PropTypes.node.isRequired,
  didReachThreshold: PropTypes.func.isRequired
}

export default FlatList
