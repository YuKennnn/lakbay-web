<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTrips } from '@/composables/useTrips';

const router = useRouter();
const route = useRoute();
const { trips } = useTrips();

const tripId = computed(() => parseInt(route.params.id));
const trip = computed(() => trips.value.find(t => t.id === tripId.value));

const members = computed(() => trip.value?.members || []);
const memories = ref([...(trip.value?.memories || [])]);

const expenses = computed(() => {
  if (!trip.value?.budgetObj) return [];
  const b = trip.value.budgetObj;
  return [
    { category: 'Accommodation', sub: 'Hotels & Lodging', amount: b.accommodation || 0, icon: '🏨' },
    { category: 'Food & Dining', sub: 'Meals & Snacks', amount: b.food || 0, icon: '🍽️' },
    { category: 'Transportation', sub: 'Flights & Taxi', amount: b.transport || 0, icon: '🚗' },
    { category: 'Activities', sub: 'Tours & Fees', amount: b.activities || 0, icon: '🎟️' }
  ];
});

const totalSpent = computed(() => {
  return expenses.value.reduce((acc, ex) => acc + ex.amount, 0);
});

const perPerson = computed(() => {
  if (members.value.length === 0) return 0;
  return Math.floor(totalSpent.value / members.value.length);
});

const selectedMemory = ref(null);
const fileInput = ref(null);

const triggerUpload = () => {
  fileInput.value.click();
};

const handleUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const type = file.type.startsWith('video') ? 'video' : 'image';
  const url = URL.createObjectURL(file);
  
  const newMemory = {
    id: Date.now(),
    type,
    url,
    location: trip.value?.location || 'Current Trip',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    duration: type === 'video' ? '0:00' : undefined
  };

  memories.value.unshift(newMemory);
};

const openFullscreen = (memory) => {
  selectedMemory.value = memory;
  document.body.style.overflow = 'hidden';
};

const closeFullscreen = () => {
  selectedMemory.value = null;
  document.body.style.overflow = '';
};
</script>

<template>
  <div v-if="trip" class="pb-24 pt-10 min-h-screen bg-[#F8FAFB]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      <div class="flex items-center justify-between mb-12">
        <div class="flex items-center gap-5">
          <button @click="router.back()" class="p-4 bg-white border-2 border-gray-200 hover:border-lakbay-teal rounded-3xl transition-all shadow-md group shrink-0">
            <svg class="w-6 h-6 text-gray-600 group-hover:text-lakbay-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <h1 class="text-3xl sm:text-4xl font-black text-gray-800 uppercase tracking-tighter break-words">{{ trip.title }}</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        
        <div class="lg:col-span-5 bg-white rounded-[3rem] border-2 border-gray-100 p-8 shadow-sm">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-3 h-8 bg-lakbay-teal rounded-full shadow-sm"></div>
            <h3 class="text-sm font-black text-lakbay-teal uppercase tracking-[0.3em]">Trip Members</h3>
          </div>
          
          <div class="grid gap-4">
            <div v-for="m in members" :key="m.name" 
                 class="flex items-center justify-between p-5 bg-[#FDFBF9] rounded-[2rem] border-2 border-gray-100 hover:border-lakbay-teal/40 hover:shadow-lg transition-all group">
              <div class="flex items-center gap-4 min-w-0">
                <img :src="m.avatar" class="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-sm shrink-0" />
                <div class="min-w-0">
                  <p class="font-black text-gray-800 text-xl tracking-tight break-words leading-tight">{{ m.name }}</p>
                  <p class="text-[11px] text-gray-400 font-black uppercase tracking-widest">{{ m.role }}</p>
                </div>
              </div>
              <span v-if="m.role === 'Host'" class="text-[10px] font-black text-lakbay-teal bg-teal-50 px-4 py-2 rounded-2xl border-2 border-teal-100 uppercase">Host</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7 bg-white rounded-[3rem] border-2 border-gray-100 p-8 shadow-sm">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-3 h-8 bg-lakbay-teal rounded-full shadow-sm"></div>
            <h3 class="text-sm font-black text-lakbay-teal uppercase tracking-[0.3em]">Trip Receipt</h3>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div class="bg-orange-50/50 p-10 rounded-[2.5rem] border-4 border-orange-100 text-center shadow-md">
              <p class="text-xs font-black text-lakbay-orange uppercase tracking-[0.2em] mb-2">Total Expenses</p>
              <p class="text-4xl sm:text-5xl font-black text-gray-800 tracking-tighter">₱{{ totalSpent.toLocaleString() }}</p>
            </div>
            <div class="bg-teal-50/50 p-10 rounded-[2.5rem] border-4 border-teal-100 text-center shadow-md">
              <p class="text-xs font-black text-lakbay-teal uppercase tracking-[0.2em] mb-2">Per Person</p>
              <p class="text-4xl sm:text-5xl font-black text-gray-800 tracking-tighter">₱{{ perPerson.toLocaleString() }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="ex in expenses" :key="ex.category" 
                 class="bg-[#FDFBF9] rounded-[2.5rem] border-2 border-gray-100 p-8 flex flex-col justify-between hover:border-lakbay-orange/50 hover:shadow-xl transition-all h-full group">
              <div class="flex items-center gap-5 mb-6">
                <div class="w-16 h-16 bg-white border-2 border-gray-100 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                  {{ ex.icon }}
                </div>
                <div>
                  <p class="font-black text-lakbay-teal text-xl">{{ ex.category }}</p>
                  <p class="text-[11px] text-lakbay-orange font-black uppercase tracking-widest">{{ ex.sub }}</p>
                </div>
              </div>
              <p class="font-black text-gray-800 text-3xl tracking-tighter text-right">₱{{ ex.amount.toLocaleString() }}</p>
            </div>
          </div>
        </div>

      </div>

      <div class="bg-white rounded-[3rem] border-2 border-gray-100 p-8 shadow-sm">
        
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center gap-3">
            <div class="w-3 h-8 bg-[#D97736] rounded-full shadow-sm"></div>
            <h3 class="text-sm font-black text-[#D97736] uppercase tracking-[0.3em]">Group Memories</h3>
          </div>
          
          <input type="file" ref="fileInput" class="hidden" accept="image/*,video/*" @change="handleUpload" />
          <button @click="triggerUpload" class="flex items-center gap-2 bg-orange-50 text-lakbay-orange hover:bg-orange-100 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest border border-orange-100 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke-width="3" stroke-linecap="round"/></svg>
            Add Memory
          </button>
        </div>

        <div v-if="memories.length > 0" class="flex gap-6 overflow-x-auto custom-scrollbar pb-6 pt-2 px-2 -mx-2">
          <div v-for="memory in memories" :key="memory.id" @click="openFullscreen(memory)"
               class="relative w-64 h-80 shrink-0 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
            
            <img :src="memory.url" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div v-if="memory.type === 'video'" class="absolute inset-0 flex items-center justify-center">
              <div class="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:bg-lakbay-orange/80 group-hover:border-lakbay-orange transition-colors">
                <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
              </div>
              <span class="absolute bottom-24 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-lg">{{ memory.duration }}</span>
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-5">
              <p class="text-white font-black text-lg leading-tight mb-1 drop-shadow-md">{{ memory.location }}</p>
              <div class="flex items-center gap-1.5 text-white/80">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2"/></svg>
                <span class="text-xs font-bold">{{ memory.date }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="py-12 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
          <p class="font-black text-gray-400 text-lg">No memories yet. Add your first memory!</p>
        </div>
      </div>

    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
     <p class="font-black text-gray-400 text-2xl">Trip not found</p>
  </div>

  <!-- FULLSCREEN VIEWER -->
  <Teleport to="body">
    <div v-if="selectedMemory" class="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10 animate-fade-in">
      <button @click="closeFullscreen" class="absolute top-8 right-8 z-[210] p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>

      <div class="max-w-5xl w-full h-full flex flex-col items-center justify-center relative">
        <div class="w-full h-full flex items-center justify-center">
          <video v-if="selectedMemory.type === 'video'" :src="selectedMemory.url" controls autoplay class="max-w-full max-h-[80vh] rounded-3xl shadow-2xl border-4 border-white/10"></video>
          <img v-else :src="selectedMemory.url" class="max-w-full max-h-[80vh] rounded-3xl shadow-2xl object-contain border-4 border-white/10" />
        </div>
        
        <div class="absolute bottom-0 left-0 right-0 text-center pb-10">
          <h2 class="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tighter">{{ selectedMemory.location }}</h2>
          <p class="text-white/60 font-bold uppercase tracking-[0.2em] text-sm">{{ selectedMemory.date }}</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}
</style>