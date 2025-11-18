import { database } from './firebase.js'
import { ref as dbRef, set } from 'firebase/database'

// Initial environments data
const initialEnvironments = {
  1: { id: 1, name: 'Stage-FE', status: 'vacant', user: null },
  2: { id: 2, name: 'Stage-BE', status: 'vacant', user: null },
  3: { id: 3, name: 'Preproduction-FE', status: 'vacant', user: null },
  4: { id: 4, name: 'Test-FE', status: 'vacant', user: null },
  5: { id: 5, name: 'Test-BE', status: 'vacant', user: null }
}

// Initialize database
const environmentsRef = dbRef(database, 'environments')
set(environmentsRef, initialEnvironments)
  .then(() => {
    console.log('✅ Database initialized successfully!')
    console.log('Initial data:', initialEnvironments)
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Error initializing database:', error)
    process.exit(1)
  })
