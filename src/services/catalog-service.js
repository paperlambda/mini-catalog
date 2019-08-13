import firebase from '@/helpers/firebase'

const getProducts = () => {
  const db = firebase.firestore()
  return db.collection('products').get().then((q) => {
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
