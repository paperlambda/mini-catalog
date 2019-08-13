import PropTypes from 'prop-types'

export const ProductType = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  color: PropTypes.array.isRequired,
  sizes: PropTypes.array.isRequired
}
