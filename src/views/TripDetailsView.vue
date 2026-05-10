<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTrips } from '@/composables/useTrips';

// Import your 5 tab components
import ItineraryTab from '@/components/trip_tabs/ItineraryTab.vue';
import RouteTab from '@/components/trip_tabs/RouteTab.vue';
import BudgetTab from '@/components/trip_tabs/BudgetTab.vue';
import MembersTab from '@/components/trip_tabs/MembersTab.vue';
import TasksTab from '@/components/trip_tabs/TasksTab.vue';

const route = useRoute();
const router = useRouter();
const { trips } = useTrips();

// The currently selected tab
const activeTab = ref('Itinerary');

// The list of tabs to render the buttons
const tabs = ['Itinerary', 'Route', 'Budget', 'Members', 'Tasks'];

// Compute the current trip based on the route query id
const trip = computed(() => {
  const id = Number(route.query.id);
  if (id) {
    const found = trips.value.find(t => t.id === id);
    if (found) {
      return {
        ...found,
        name: found.title,
      };
    }
  }
  // Fallback if no ID is passed or trip not found
  return {
    name: 'Kota Beach Resort',
    location: 'Bantayan Cebu, Philippines',
    date: 'Dec 20-25, 2025',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
  };
});
</script>

<template>
  <div class="min-h-screen bg-[#Fdfbf9] pb-24 flex flex-col items-center">
    
    <div class="max-w-5xl mx-auto px-4 sm:px-6 w-full">

      <div class="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden mt-8 mb-6 shadow-md flex flex-col justify-between py-5 sm:py-6">
        <img :src="trip.image" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
        
        <div class="relative z-10 w-full h-full flex flex-col justify-between">
          
          <div class="flex justify-between items-center w-full px-4 sm:px-6">
            <button @click="router.back()" class="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2.5 rounded-full text-white transition shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </button>
            <button class="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2.5 rounded-full text-white transition shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </button>
          </div>

          <div class="text-white px-4 sm:px-6 pt-8">
            <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md">{{ trip.name }}</h1>
            <div class="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-100 drop-shadow-md">
              <span class="flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> {{ trip.location }}</span>
              <span class="flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> {{ trip.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border-b border-gray-100 overflow-x-auto custom-scrollbar sticky top-0 z-20">
        <div class="flex px-2 min-w-max">
          <button 
            v-for="tab in tabs" 
            :key="tab" 
            @click="activeTab = tab"
            :class="[
              'px-6 py-4 font-bold text-sm transition-colors relative',
              activeTab === tab ? 'text-lakbay-teal' : 'text-gray-400 hover:text-gray-600'
            ]"
          >
            {{ tab }}
            <div v-if="activeTab === tab" class="absolute bottom-0 left-0 right-0 h-1 bg-lakbay-teal rounded-t-full"></div>
          </button>
        </div>
      </div>

      <div class="py-6 md:py-8 w-full">
        <ItineraryTab v-if="activeTab === 'Itinerary'" :trip="trip" />
        <RouteTab v-if="activeTab === 'Route'" :trip="trip" />
        <BudgetTab v-if="activeTab === 'Budget'" :trip="trip" />
        <MembersTab v-if="activeTab === 'Members'" :trip="trip" />
        <TasksTab v-if="activeTab === 'Tasks'" :trip="trip" />
      </div>

    </div>
  </div>
</template>