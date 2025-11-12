<template>
  <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">  
    <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>

                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>

                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="environment in environments" :key="environment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ environment.name }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="isEnvironmentOccupied(environment.status)" class="inline-flex text-xs leading-5 font-bold rounded-full uppercase w-[66px] justify-center font-mono">
                        {{ environment.status }}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ environment.user || 'Available' }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button v-if="environment.status === 'vacant'" class="bg-white hover:bg-green-600 text-green-600 hover:text-white font-bold uppercase py-2 px-4 border-2 border-green-600 rounded-lg transition-colors duration-200 cursor-pointer">
                        Occupy
                    </button>нпм
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const environments = ref([
  { id: 1, name: 'Stage-FE', status: 'occupied', user: 'John Smith' },
  { id: 2, name: 'Stage-BE', status: 'occupied', user: 'Sarah Johnson' },
  { id: 3, name: 'Preproduction-FE', status: 'occupied', user: 'Mike Chen' },
  { id: 4, name: 'Test-FE', status: 'vacant', user: null },
  { id: 5, name: 'Test-BE', status: 'occupied', user: 'Emma Wilson' }
])

const isEnvironmentOccupied = (status) => {
  return status === 'occupied'
    ? 'bg-red-700 text-white'
    : 'bg-green-600 text-white'
}
</script>