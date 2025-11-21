import { database } from './firebase.js'
import { ref as dbRef, set } from 'firebase/database'

// Initial authorized users - Add or modify users here
const authorizedUsers = {
  1: { 
    email: 'martin.rublev@l1.com', 
    name: 'Martin Rublev' 
  },
  2: { 
    email: 'deyan.chakarov@l1.com', 
    name: 'Deyan Chakarov' 
  },
  3: { 
    email: 'ivo.georgiev@l1.com', 
    name: 'Ivo Georgiev' 
  },
  4: { 
    email: 'petar.valchev@l1.com', 
    name: 'Petar Valchev' 
  },
  5: { 
    email: 'kris.kulev@l1.com', 
    name: 'Kris Kulev' 
  }
}

// Initialize authorized users in Firebase
const usersRef = dbRef(database, 'authorizedUsers')
set(usersRef, authorizedUsers)
  .then(() => {
    console.log('✅ Authorized users initialized successfully!')
    console.log('Users added:')
    Object.values(authorizedUsers).forEach(user => {
      console.log(`  - ${user.name} (${user.email})`)
    })
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Error initializing users:', error)
    process.exit(1)
  })
