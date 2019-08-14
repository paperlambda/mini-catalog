import * as firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCYOdShMlb5WpO4dDrwptOYHcIAMW1JQ6c',
  authDomain: 'sorabel-ta.firebaseapp.com',
  databaseURL: 'https://sorabel-ta.firebaseio.com',
  projectId: 'sorabel-ta',
  storageBucket: 'sorabel-ta.appspot.com',
  messagingSenderId: '732926879523',
  appId: '1:732926879523:web:0e3055a1154bdf3f'
}

firebase.initializeApp(config)

export default firebase
