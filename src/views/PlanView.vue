<script setup>
import { ref, onMounted } from 'vue';
import { destinationsData } from '@/assets/destinations.js';
import UserReviews from './UserReviews.vue';

// Import Modals
import DestinationPanel from '@/components/modals/DestinationPanel.vue';
import NewTripModal from '@/components/modals/NewTrip.vue';
import JoinGroupModal from '@/components/modals/JoinGroup.vue';
// import ScanReceiptModal from '@/components/modals/ScanReceipt.vue';
// Import the AI Modal
import AiItinerary from '@/components/modals/AiItinerary.vue';

const destinations = ref(destinationsData);
const userName = ref('Traveler');

onMounted(() => {
  userName.value = localStorage.getItem('user_fullname') || 'Traveler';
});

const activeModal = ref(null); 
const selectedDestination = ref(null); 
const isDetailsOpen = ref(false);

// Search Query State
const aiSearchQuery = ref('');

const closeModal = () => { activeModal.value = null; };
const openDetails = (dest) => { selectedDestination.value = dest; isDetailsOpen.value = true; };
const closeDetails = () => { isDetailsOpen.value = false; };

// Function to handle AI request
const handleAskAI = () => {
  if (aiSearchQuery.value.trim() === '') return; // Don't trigger if empty
  activeModal.value = 'aiResult';
};
</script>

<template>
  <div class="pb-24 pt-10 min-h-screen bg-[#F8FAFB]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="bg-gradient-to-r from-[#2A8B8B] to-[#1e6666] rounded-[3rem] p-8 lg:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mb-10 relative overflow-hidden">
        <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
        
        <div class="md:w-1/2 relative z-10 text-center md:text-left">
          <h2 class="text-3xl md:text-5xl font-black mb-3 flex items-center justify-center md:justify-start gap-3 tracking-tighter">Kamusta, {{ userName }}!</h2>
          <p class="text-white/90 text-lg font-medium">Plan your next group adventure.</p>
        </div>
        
        <div class="md:w-1/2 w-full max-w-lg relative z-10">
          <div class="bg-white rounded-full p-2 flex flex-col sm:flex-row items-center shadow-2xl border-4 border-white/20 gap-2 sm:gap-0 focus-within:ring-4 focus-within:ring-[#D97736]/30 transition-all">
            
            <input 
              v-model="aiSearchQuery"
              @keyup.enter="handleAskAI"
              type="text" 
              placeholder="E.g., 3 days in Palawan for 4 people..." 
              class="flex-grow w-full bg-transparent border-none outline-none px-6 py-3 sm:py-0 text-gray-800 font-bold placeholder-gray-400 text-center sm:text-left"
            >
            
            <button 
              @click="handleAskAI"
              class="w-full sm:w-auto bg-[#D97736] text-white text-sm font-black uppercase tracking-widest py-4 px-8 rounded-full hover:bg-[#c4682c] hover:scale-105 transition-all shadow-md whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path>
              </svg>
              Ask AI
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12">
        <button @click="activeModal = 'newTrip'" class="w-full sm:w-auto bg-white text-[#2A8B8B] border border-[#2A8B8B]/30 py-3 px-8 rounded-full font-bold text-sm shadow-sm hover:bg-teal-50 transition">+ Create New Trip</button>
        <button @click="activeModal = 'joinGroup'" class="w-full sm:w-auto bg-white text-[#2A8B8B] border border-[#2A8B8B]/30 py-3 px-8 rounded-full font-bold text-sm shadow-sm hover:bg-teal-50 transition">Join Group</button>
        </div>

      <div class="mb-12">
        <h3 class="text-2xl text-[#2A8B8B] font-bold mb-6">Suggested Destinations</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="dest in destinations" :key="dest.id" @click="openDetails(dest)" class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer">
            <div class="relative h-48">
              <img :src="dest.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span class="absolute top-3 right-3 bg-[#2A8B8B] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">{{ dest.match }} match</span>
            </div>
            <div class="p-5">
              <h4 class="font-bold text-[#2A8B8B] text-lg truncate mb-1">{{ dest.name }}</h4>
              <p class="text-xs text-gray-400">{{ dest.location }}</p>
              <div class="flex justify-between items-center mt-4 border-t border-gray-50 pt-4">
                <span class="text-[#D97736] font-bold text-base">{{ dest.price }}</span>
                <span v-if="dest.lokal" class="bg-[#F4D03F]/20 text-yellow-800 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">Lokal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div> 
    
    <DestinationPanel :is-open="isDetailsOpen" :destination="selectedDestination" @close="closeDetails" @create-trip="closeDetails(); activeModal = 'newTrip'" />
    <NewTripModal :is-open="activeModal === 'newTrip'" @close="closeModal" />
    <JoinGroupModal :is-open="activeModal === 'joinGroup'" @close="closeModal" />
    <AiItinerary
      :is-open="activeModal === 'aiResult'" 
      :query="aiSearchQuery" 
      @close="closeModal" 
      @save="closeModal(); $router.push('/trips')" 
    />

  </div>
</template>