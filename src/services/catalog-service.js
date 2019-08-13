import firebase from '@/helpers/firebase'

const getProducts = (params) => {
  const db = firebase.firestore()
  let products = db.collection('products')

  if (params.sort) {
    const [sortBy, sortDirection = 'asc'] = params.sort
    products = products.orderBy(sortBy, sortDirection)
  }

  return products.get().then((q) => {
    return q.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data
      }
    })
  })
}

const getProductDetail = (slug) => {
  const db = firebase.firestore()
  return db.collection('products').where('slug', '==' ,slug).limit(1).get().then((q) => {
    const data = q.docs[0].data()
    return {
      id: q.docs[0].id,
      ...data
    }
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
  getProductDetail
}
