import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const auth = firebase
  .initializeApp({
    apiKey: 'AIzaSyDzzXLQDqUsILUtdZGXAXIfszNA9eDNvgg',
    authDomain: 'chatrr-a96cc.firebaseapp.com',
    projectId: 'chatrr-a96cc',
    storageBucket: 'chatrr-a96cc.appspot.com',
    messagingSenderId: '347043430222',
    appId: '1:347043430222:web:afa4acc1bcb082bc86a81f',
  })
  .auth()
