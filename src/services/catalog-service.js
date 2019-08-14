import firebase from '@/helpers/firebase'
import sortSize from '@/helpers/sort-size'

const getProducts = (params, query = null) => {
  const db = firebase.firestore()
  let products = db.collection('products')
  const { colors, sizes, price, sort = 'created', order = 'desc' } = params

  // Sorts
  if (sort === 'price' || (params.filters && params.filters.price)) {
    products = products.orderBy('price', order)
  }
  if (sort !== 'price') {
    products = products.orderBy(sort, order)
  }

  // Filters
  if (colors && colors !== '') {
    if (Array.isArray(colors) && colors.length > 0) {
      colors.forEach(color => {
        products = products.where(`colors.${color}`, '==', true)
      })
    }

    if (typeof colors === 'string') {
      products = products.where(`colors.${colors}`, '==', true)
    }
  }

  if (sizes && sizes !== '') {
    if (Array.isArray(sizes) && sizes.length > 0) {
      sizes.forEach(size => {
        products = products.where(`sizes.${size}`, '==', true)
      })
    }
    if (typeof sizes === 'string') {
      products = products.where(`sizes.${sizes}`, '==', true)
    }
  }

  if (price && price !== '') {
    products = getPriceRangeQuery(products, price)
  }

  const current = query ? query : products.limit(2)

  return current.get().then(q => {
    if (q.empty) {
      return {
        data: null,
        next: null
      }
    }

    const lastDoc = q.docs[q.docs.length - 1]
    const next = products.startAfter(lastDoc).limit(2)

    return {
      data: q.docs.map(doc => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          sizes: sortSize(Object.keys(data.sizes)),
          colors: Object.keys(data.colors)
        }
      }),
      next
    }
  })
}

const getPriceRangeQuery = (ref, params) => {
  const lessThan = /^</.test(params)
  const moreThan = /^>/.test(params)
  const between = /\d-\d/.test(params)
  if (lessThan) {
    return ref.where('price', '<', parseInt(params.split('<')[1]))
  }
  if (moreThan) {
    return ref.where('price', '>', parseInt(params.split('>')[1]))
  }
  if (between) {
    return ref
      .where('price', '>=', parseInt(params.split('-')[0]))
      .where('price', '<=', parseInt(params.split('-')[1]))
  }
}

const getProductDetail = slug => {
  const db = firebase.firestore()
  return db
    .collection('products')
    .where('slug', '==', slug)
    .limit(1)
    .get()
    .then(q => {
      const data = q.docs[0].data()
      return {
        ...data,
        id: q.docs[0].id,
        sizes: sortSize(Object.keys(data.sizes)),
        colors: Object.keys(data.colors)
      }
    })
}

const getColors = () => {
  const db = firebase.firestore()
  return db
    .collection('colors')
    .get()
    .then(q => {
      return q.docs.map(doc => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id
        }
      })
    })
}

const getSizes = () => {
  const db = firebase.firestore()
  return db
    .collection('sizes')
    .orderBy('order')
    .get()
    .then(q => {
      return q.docs.map(doc => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id
        }
      })
    })
}

export { getProducts, getProductDetail, getColors, getSizes }
