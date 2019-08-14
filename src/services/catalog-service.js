import firebase from '@/helpers/firebase'
import sortSize from '@/helpers/sort-size'

const getProducts = (params) => {
  const db = firebase.firestore()
  let products = db.collection('products')

  if (params.filters) {
    const { colors, sizes, price } = params.filters

    if (colors && colors.length > 0) {
      colors.forEach((color) => {
        products = products.where('colors', 'array-contains', color)
      })
    }

    if (sizes && sizes.length > 0) {
      sizes.forEach((size) => {
        products = products.where('sizes', 'array-contains', size)
      })
    }

    if (price) {
      products = products.orderBy('price')
      products = getPriceRangeQuery(products,price)
    }
  }

  if (params.sort) {
    const [sortBy, sortDirection = 'asc'] = params.sort
    products = products.orderBy(sortBy, sortDirection)
  }



  return products.get().then((q) => {
    return q.docs.map((doc) => {
      const data = doc.data()
      return {
        ...data,
        id: doc.id,
        sizes: sortSize(Object.keys(data.sizes)),
        colors: Object.keys(data.colors)
      }
    })
  })
}

const getPriceRangeQuery = (ref, params) => {
  const lessThan = /^</.test(params)
  const moreThan = /^>/.test(params)
  const between = /\d-\d/.test(params)
  if (lessThan) {
    return ref.where('price', '<', params.split('<')[1])
  }
  if (moreThan) {
    return ref.where('price', '>', params.split('>')[1])
  }
  if (between) {
    return ref.where('price', '>', params.split('>')[0]).where('price','<', params.split('<')[2])
  }
}

const getProductDetail = (slug) => {
  const db = firebase.firestore()
  return db.collection('products').where('slug', '==' ,slug).limit(1).get().then((q) => {
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
  return db.collection('colors').get().then((q) => {
    return q.docs.map((doc) => {
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
  return db.collection('sizes').orderBy('order').get().then((q) => {
    return q.docs.map((doc) => {
      const data = doc.data()
      return {
        ...data,
        id: doc.id
      }
    })
  })
}

const _mockData = [
  {
    name: 'Periranza Brukat A-Line Mini Dress',
    price: 180000,
    images: [
      'https://imager-next.freetls.fastly.net/images/resized/480/576f40c6-4e95-4f7f-a3d0-dc2345a9e42f',
      'https://imager-next.freetls.fastly.net/images/resized/480/576f40c6-4e95-4f7f-a3d0-dc2345a9e42f',
      'https://imager-next.freetls.fastly.net/images/resized/480/576f40c6-4e95-4f7f-a3d0-dc2345a9e42f'
    ],
    sizes: ['S','M','L','XL'],
    colors: ['black', 'navy'],
    stock: 20,
    slug: 'periranza-brukat-a-line-mini-dress'
  },
  {
    name: 'Winyhra Flowery Flare Maxi Dress',
    price: 130000,
    images: [
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe',
      'https://imager-next.freetls.fastly.net/images/resized/480/53b01391-dd6b-4cf5-830f-84d93291acfe'
    ],
    sizes: ['L','XL'],
    colors: ['navy'],
    stock: 5,
    slug: 'winyhra-flowery-flare-maxi-dress'
  }
]

const _addMockData = () => {
  const db = firebase.firestore()
  _mockData.forEach((data) => {
    db.collection('products').add(data)
  })
}

export {
  getProducts,
  getProductDetail,
  getColors,
  getSizes
}
