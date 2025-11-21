<template>
  <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">  
    <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>

                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>

                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="environment in environments" :key="environment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ environment.name }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span :class="isEnvironmentOccupied(environment.status)" class="inline-flex text-xs leading-5 font-bold rounded-full uppercase w-[66px] justify-center font-mono">
                        {{ environment.status }}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {{ environment.user || '' }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <button 
                        v-if="environment.status === 'vacant'" 
                        @click="occupyEnvironment(environment.id)"
                        class="bg-white hover:bg-green-600 text-green-600 hover:text-white font-bold uppercase py-2 px-4 border-2 border-green-600 rounded-lg transition-colors duration-200 cursor-pointer font-mono"
                    >
                        Occupy
                    </button>

                    <button 
                        v-else
                        @click="leaveEnvironment(environment.id)"
                        class="bg-white hover:bg-red-700 text-red-700 hover:text-white font-bold uppercase py-2 px-4 border-2 border-red-700 rounded-lg transition-colors duration-200 cursor-pointer font-mono"
                    >
                        Leave
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { database } from '../firebase'
import { ref as dbRef, onValue, set, get } from 'firebase/database'

const currentUser = ref(null)
const environments = ref([])
const authorizedUsers = ref([])

const loadAuthorizedUsers = async () => {
  const usersRef = dbRef(database, 'authorizedUsers')
  const snapshot = await get(usersRef)
  if (snapshot.exists()) {
    authorizedUsers.value = Object.values(snapshot.val())
  }
}

const authenticateUser = async () => {
  // Check if user is already authenticated
  const storedUser = localStorage.getItem('environmentsUser')
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
    return
  }

  // Load authorized users from Firebase
  await loadAuthorizedUsers()

  // Ask for email
  const email = prompt('Please enter your email:')
  if (!email || !email.trim()) {
    authenticateUser() // Ask again if empty
    return
  }

  // Check if email is authorized
  const user = authorizedUsers.value.find(u => u.email.toLowerCase() === email.trim().toLowerCase())
  if (user) {
    currentUser.value = user
    localStorage.setItem('environmentsUser', JSON.stringify(user))
  } else {
    alert('Email not authorized. Please contact your administrator.')
    authenticateUser() // Ask again if not authorized
  }
}

const occupyEnvironment = (id) => {
  const env = environments.value.find(e => e.id === id)
  if (env && currentUser.value) {
    // Update Firebase
    const environmentRef = dbRef(database, `environments/${id}`)
    set(environmentRef, {
      id: env.id,
      name: env.name,
      status: 'occupied',
      user: currentUser.value.name
    })
  }
}

const leaveEnvironment = (id) => {
  const env = environments.value.find(e => e.id === id)
  if (env) {
    // Update Firebase
    const environmentRef = dbRef(database, `environments/${id}`)
    set(environmentRef, {
      id: env.id,
      name: env.name,
      status: 'vacant',
      user: null
    })
  }
}

const isEnvironmentOccupied = (status) => {
  return status === 'occupied'
    ? 'bg-red-700 text-white'
    : 'bg-green-600 text-white'
}

const initializeFirebase = () => {
  const environmentsRef = dbRef(database, 'environments')
  
  // Listen for changes in real-time
  onValue(environmentsRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      // Convert Firebase object to array
      environments.value = Object.values(data)
    } else {
      // Initialize with default data if Firebase is empty
      const defaultEnvironments = [
        { id: 1, name: 'Stage-FE', status: 'vacant', user: null },
        { id: 2, name: 'Stage-BE', status: 'vacant', user: null },
        { id: 3, name: 'Preproduction-FE', status: 'vacant', user: null },
        { id: 4, name: 'Test-FE', status: 'vacant', user: null },
        { id: 5, name: 'Test-BE', status: 'vacant', user: null }
      ]
      
      // Save default data to Firebase
      defaultEnvironments.forEach(env => {
        const envRef = dbRef(database, `environments/${env.id}`)
        set(envRef, env)
      })
    }
  })
}

onMounted(() => {
  authenticateUser()
  initializeFirebase()
})
</script>