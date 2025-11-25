import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDUIZX3qm7fU2dCkxOTLb7WAYn9Sd7luIg",
  authDomain: "oddspedia-environments.firebaseapp.com",
  databaseURL: "https://oddspedia-environments-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "oddspedia-environments",
  storageBucket: "oddspedia-environments.firebasestorage.app",
  messagingSenderId: "325602923286",
  appId: "1:325602923286:web:21589d40f6e83a64cd7637"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app)
