// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBsUS5aeJXrf-iB8FrZXejwZU97VnBy2yA',
  authDomain: 'house-marketplace-app-6f050.firebaseapp.com',
  projectId: 'house-marketplace-app-6f050',
  storageBucket: 'house-marketplace-app-6f050.appspot.com',
  messagingSenderId: '816349804163',
  appId: '1:816349804163:web:a9e53dd2043aefb2824db6',
}

// Initialize Firebase
initializeApp(firebaseConfig)

export const db = getFirestore()
