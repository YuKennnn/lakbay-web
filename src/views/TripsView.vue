<script setup>
import { ref, computed } from 'vue';
import ReceiptModal from '@/components/modals/Receipt.vue';
import { useTrips } from '@/composables/useTrips';

const activeTab = ref('All');
const tabs = ['All', 'Upcoming', 'Ongoing', 'Completed'];

// Receipt Modal State
const isReceiptOpen = ref(false);
const selectedTrip = ref(null);

const { trips } = useTrips();

const filteredTrips = computed(() => {
  if (activeTab.value === 'All') return trips.value;
  return trips.value.filter(trip => trip.status === activeTab.value);
});

const totalSpentDisplay = computed(() => {
  const sum = filteredTrips.value.reduce((acc, trip) => {
    return acc + parseInt(trip.spent.replace(/[^\d]/g, '') || 0);
  }, 0);
  return `₱${sum.toLocaleString()}`;
});

const openReceipt = (trip) => {
  selectedTrip.value = trip;
  isReceiptOpen.value = true;
};
</script>

<template>
  <div class="pb-24 pt-10 min-h-screen bg-gray-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <h1 class="text-3xl font-bold text-[#2A8B8B]">Your Trips</h1>
        <div class="bg-white rounded-xl flex items-center px-4 py-2 border border-gray-200 shadow-sm w-full sm:w-72">
          <input type="text" placeholder="Search trips..." class="bg-transparent border-none outline-none w-full text-sm text-gray-700">
        </div>
      </div>

      <div class="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
        <div class="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
                  :class="['px-6 py-2 rounded-lg text-sm font-semibold transition', 
                           activeTab === tab ? 'bg-white text-[#D97736] shadow-sm' : 'text-gray-500 hover:text-gray-700']">
            {{ tab }}
          </button>
        </div>
        <div class="bg-orange-50 border border-orange-100 rounded-xl p-4 w-full lg:w-56 text-right shadow-sm">
          <p class="text-xs text-[#D97736] font-semibold uppercase tracking-wide mb-1">Total Spent</p>
          <p class="text-2xl font-bold text-gray-800">{{ totalSpentDisplay }}</p>
        </div>
      </div>

      <div v-if="filteredTrips.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <p class="font-bold text-gray-500 text-lg">No {{ activeTab.toLowerCase() }} trips found</p>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        <div v-for="trip in filteredTrips" :key="trip.id" class="bg-white rounded-xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col h-full group">
          <div class="w-full h-28 sm:h-48 relative shrink-0 overflow-hidden">
            <img :src="trip.image" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span :class="[
              'absolute top-2 left-2 sm:top-3 sm:left-3 backdrop-blur-md text-white text-[8px] sm:text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full',
              trip.status === 'Completed' ? 'bg-green-600/60' : trip.status === 'Ongoing' ? 'bg-blue-600/60' : 'bg-orange-600/60'
            ]">{{ trip.status }}</span>
          </div>

          <div class="p-3 sm:p-5 flex flex-grow flex-col justify-between">
            <div>
              <h3 class="font-bold text-gray-800 text-sm sm:text-lg mb-0.5 sm:mb-1 truncate">{{ trip.title }}</h3>
              <p class="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-4">{{ trip.date }}</p>
              <div class="mb-2 sm:mb-4">
                <div class="flex justify-between text-[10px] sm:text-xs mb-1">
                  <span class="font-semibold text-gray-600">Budget Progress</span>
                  <span class="font-bold text-[#2A8B8B]">{{ trip.budgetPercent }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-1.5 sm:h-2">
                  <div class="bg-[#2A8B8B] h-1.5 sm:h-2 rounded-full transition-all duration-500" :style="{ width: trip.budgetPercent + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-1.5 sm:gap-2 mt-1 sm:mt-2">
              <router-link :to="{ path: trip.link, query: { id: trip.id, status: trip.status } }" class="flex-grow bg-white border border-gray-200 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold text-gray-600 hover:bg-gray-50 transition text-center">
                {{ trip.status === 'Upcoming' ? 'View Plan' : 'View Itinerary' }}
              </router-link>
              
              <button 
                v-if="trip.status === 'Completed'" 
                @click="openReceipt(trip)"
                class="bg-[#D97736]/10 text-[#D97736] px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold hover:bg-[#D97736]/20 transition flex items-center justify-center gap-1 sm:gap-2"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ReceiptModal :is-open="isReceiptOpen" :trip="selectedTrip" @close="isReceiptOpen = false" />
  </div>
</template>