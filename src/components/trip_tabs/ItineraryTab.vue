<script setup>
import { computed } from 'vue';

const props = defineProps({
  trip: Object
});

const itineraryDays = computed(() => {
  return props.trip?.itinerary || [
    {
      day: 'Day 1',
      activities: [
        { id: 1, title: 'Check-in', time: '14:00', location: props.trip?.location || 'Accommodation', price: null }
      ]
    }
  ];
});
</script>

<template>
  <div class="w-full">
    
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-xl font-medium text-[#2A8B8B]">Daily Schedule</h2>
      <button class="bg-[#D97736] text-white font-bold py-2.5 px-5 rounded-full hover:bg-[#c4682c] transition shadow-md text-sm flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Add Activity
      </button>
    </div>

    <div class="space-y-6">
      
      <div v-for="(dayBlock, index) in itineraryDays" :key="index">
        
        <div class="flex items-center gap-4 mb-4">
          <div class="bg-[#2A8B8B] text-white text-sm font-bold px-6 py-2 rounded-full shadow-sm shrink-0">
            {{ dayBlock.day }}
          </div>
          <div class="flex-grow h-px bg-gray-200"></div>
        </div>

        <div v-if="dayBlock.activities.length > 0" class="relative pl-6 ml-6 border-l-2 border-gray-100 space-y-5 pb-4 mt-2">
          
          <div v-for="activity in dayBlock.activities" :key="activity.id" class="relative">
            
            <div class="absolute -left-[33px] top-5 w-4 h-4 rounded-full bg-[#c49a6c] border-[3px] border-white shadow-sm z-10"></div>
            
            <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-base font-medium text-[#2A8B8B]">{{ activity.title }}</h3>
                <button class="text-[#2A8B8B] hover:bg-teal-50 p-1.5 rounded-md transition shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                </button>
              </div>
              
              <div class="space-y-1.5">
                <div class="flex items-center gap-2 text-gray-600 text-sm">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {{ activity.time }}
                </div>
                
                <div class="flex items-center gap-2 text-gray-600 text-sm">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {{ activity.location }}
                </div>
                
                <div v-if="activity.price" class="flex items-center gap-2 text-[#D97736] text-sm font-medium mt-2 pt-1">
                  {{ activity.price }}
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>

    </div>
  </div>
</template>