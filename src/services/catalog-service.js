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

export {
  getProducts
}
