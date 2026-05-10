<script setup>
import { ref, watch } from 'vue';
import { generateTripData } from '@/utils/mockAiPlanner';

const props = defineProps({
  isOpen: Boolean,
  query: String
});

const emit = defineEmits(['close', 'save']);

const isGenerating = ref(true);

const generatedTrip = ref({});

// Watch for the modal opening to trigger the "AI Loading" simulation
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    isGenerating.value = true;
    generatedTrip.value = generateTripData(props.query);
    // Simulate API delay for 2.5 seconds to impress the panel HAHA!
    setTimeout(() => {
      isGenerating.value = false;
    }, 2500);
  }
});
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
    <div class="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
      
      <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#2A8B8B] to-[#1e6666] text-white">
        <div class="flex items-center gap-3">
          <span class="text-2xl">✨</span>
          <h3 class="font-black tracking-widest uppercase text-sm">Lakbay AI Planner</h3>
        </div>
        <button @click="$emit('close')" class="bg-white/20 hover:bg-white/30 p-2 rounded-full transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div v-if="isGenerating" class="p-16 flex flex-col items-center justify-center text-center space-y-6 flex-grow">
        <div class="relative w-24 h-24 flex items-center justify-center">
          <div class="absolute inset-0 border-4 border-teal-100 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-[#2A8B8B] rounded-full border-t-transparent animate-spin"></div>
          <span class="text-3xl animate-pulse">🌍</span>
        </div>
        <div>
          <h4 class="text-xl font-black text-[#2A8B8B] mb-2">Analyzing Geo-Data...</h4>
          <p class="text-sm text-gray-500 font-medium">Crafting the perfect itinerary for: <br/> <span class="text-[#D97736] font-bold">"{{ query || 'Surprise Destination' }}"</span></p>
        </div>
      </div>

      <div v-else class="overflow-y-auto custom-scrollbar flex-grow p-8 bg-[#F8FAFB]">
        <div class="bg-white rounded-[2rem] p-8 border-2 border-gray-100 shadow-sm mb-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 bg-[#F4D03F] text-yellow-900 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">98% Match</div>
          
          <h2 class="text-3xl font-black text-gray-800 tracking-tighter mb-2">{{ generatedTrip.title }}</h2>
          <div class="flex gap-4 text-sm font-bold text-gray-400 mb-8">
            <span class="flex items-center gap-1"><svg class="w-4 h-4 text-[#D97736]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> {{ generatedTrip.duration }}</span>
            <span class="flex items-center gap-1"><svg class="w-4 h-4 text-[#2A8B8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> {{ generatedTrip.budgetObj?.total }} Estimated</span>
          </div>

          <div class="space-y-6">
            <div v-for="day in generatedTrip.itinerary" :key="day.day" class="relative pl-6 border-l-2 border-teal-100">
              <div class="absolute -left-[9px] top-0 w-4 h-4 bg-[#2A8B8B] rounded-full border-4 border-white shadow-sm"></div>
              <h4 class="font-black text-[#2A8B8B] text-lg mb-3">{{ day.day }}</h4>
              <ul class="space-y-3">
                <li v-for="act in day.activities" :key="act.id" class="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                  <span class="text-[#D97736] mt-0.5"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></span>
                  <span class="text-sm font-bold text-gray-600">{{ act.title }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isGenerating" class="p-6 border-t border-gray-100 flex gap-4 bg-white">
        <button @click="$emit('close')" class="flex-1 py-3.5 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition border-2 border-gray-100 uppercase tracking-widest text-xs">
          Discard
        </button>
        <button @click="$emit('save', generatedTrip)" class="flex-1 bg-[#D97736] text-white py-3.5 rounded-2xl font-black shadow-[0_8px_20px_rgba(217,119,54,0.3)] hover:bg-[#c4682c] hover:-translate-y-1 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
          Save to Trips
        </button>
      </div>

    </div>
  </div>
</template>