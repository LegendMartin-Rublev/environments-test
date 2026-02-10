<template>
  <div class="min-h-screen bg-gray-200 pt-4">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-2 font-mono">Oddspedia Environments</h1>
    
    <p v-if="currentUserName" class="text-xl text-center text-gray-700 mb-4">Hi {{ currentUserName }}</p>
    
    <TableEnvironments @user-authenticated="handleUserAuthenticated" />
  </div>
</template><script setup>
import { ref } from 'vue'
import TableEnvironments from './components/TableEnvironments.vue'

const currentUserName = ref(null)

const handleUserAuthenticated = (userName) => {
  currentUserName.value = userName
}
</script>


