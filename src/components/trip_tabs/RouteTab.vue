<script setup>
import { computed } from 'vue';

const props = defineProps({
  trip: Object
});

const routeInfo = computed(() => {
  return props.trip?.route || {
    start: 'Origin',
    end: props.trip?.location || 'Destination',
    distance: 'Unknown',
    duration: 'N/A',
    mapImage: 'https://maps.googleapis.com/maps/api/staticmap?center=Cebu,Philippines&zoom=8&size=800x600&maptype=roadmap&key=YOUR_API_KEY',
    stops: [
      { id: 1, name: 'Origin', type: 'Start', icon: '📍' },
      { id: 2, name: props.trip?.location || 'Destination', type: 'End', icon: '📍' }
    ]
  };
});

const openGoogleMaps = () => {
  const query = encodeURIComponent(props.trip?.location || 'Philippines');
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
};
</script>

<template>
  <div class="w-full space-y-6 animate-fade-in">
    <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative group">
      <div class="h-80 sm:h-[450px] relative">
        <img 
          :src="routeInfo.mapImage" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          alt="Route Map"
        />
        
        <div class="absolute inset-0 bg-black/10"></div>
        
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div class="relative flex flex-col items-center">
            <div class="bg-white px-3 py-1.5 rounded-lg shadow-xl mb-2 flex items-center gap-2 border border-gray-100 animate-bounce">
              <span class="text-xs font-bold text-gray-800">{{ trip?.name || trip?.location || 'Destination' }}</span>
            </div>
            <svg class="w-10 h-10 text-red-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>

        <button @click="" class="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-[#2A8B8B] px-4 py-2.5 rounded-xl shadow-lg font-bold text-sm flex items-center gap-2 hover:bg-white transition active:scale-95">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 7m0 10V7m0 0l-6-3"></path>
          </svg>
          View in Maps
        </button>

        <div class="absolute bottom-6 left-6 right-6 flex gap-3">
          <div class="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex-1 border border-white/20">
            <p class="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Total Distance</p>
            <p class="text-lg font-black text-[#2A8B8B]">{{ routeInfo.distance }}</p>
          </div>
          <div class="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex-1 border border-white/20">
            <p class="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Travel Time</p>
            <p class="text-lg font-black text-[#D97736]">{{ routeInfo.duration }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4 px-2">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-6 bg-[#2A8B8B] rounded-full"></div>
        <h3 class="text-xl font-bold text-[#2A8B8B]">Waypoints</h3>
      </div>

      <div class="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
        <div class="space-y-0">
          <div v-for="(stop, index) in routeInfo.stops" :key="stop.id" class="flex items-stretch gap-6 group">
            <div class="flex flex-col items-center w-8">
              <div class="w-8 h-8 rounded-full bg-teal-50 text-[#2A8B8B] flex items-center justify-center font-bold text-xs border border-teal-100 group-hover:bg-[#2A8B8B] group-hover:text-white transition-colors">
                {{ index + 1 }}
              </div>
              <div v-if="index !== routeInfo.stops.length - 1" class="w-1 flex-grow bg-gradient-to-b from-teal-100 to-transparent my-2 rounded-full opacity-50"></div>
            </div>
            
            <div class="pb-10 flex-grow">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-base font-bold text-gray-800">{{ stop.name }}</p>
                  <p class="text-xs font-semibold text-[#2A8B8B] uppercase tracking-wide mt-0.5">{{ stop.type }}</p>
                </div>
                <span class="text-xl">{{ stop.icon }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 pt-6 border-t border-dashed border-gray-200 flex items-center justify-center gap-2 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="text-sm font-medium italic">Destination reached at {{ trip?.location || 'Location' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>