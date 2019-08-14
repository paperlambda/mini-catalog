const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL']

const sortSize = array => {
  return array.sort((a, b) => {
    return sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
  })
}

export default sortSize
