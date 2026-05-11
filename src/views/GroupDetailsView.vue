<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const members = ref([
  { name: 'Stephanie', role: 'Organizer', img: 'https://i.pravatar.cc/150?u=s' },
  { name: 'Arjean', role: 'Member', img: 'https://i.pravatar.cc/150?u=a' },
  { name: 'Kenneth', role: 'Member', img: 'https://i.pravatar.cc/150?u=k' },
  { name: 'YuKen', role: 'Member', img: 'https://i.pravatar.cc/150?u=y' }
]);

const expenses = ref([
  { category: 'Accommodation', sub: 'Hotels & Lodging', amount: 10180, icon: '🏨' },
  { category: 'Food & Dining', sub: 'Meals & Snacks', amount: 7635, icon: '🍽️' },
  { category: 'Transportation', sub: 'Flights & Taxi', amount: 5200, icon: '🚗' },
  { category: 'Activities', sub: 'Tours & Fees', amount: 2435, icon: '🎟️' }
]);

// EXPANDED: 15 Memories (Mix of photos and videos)
const memories = ref([
  { id: 1, type: 'video', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', location: 'Canibad Beach', date: 'Apr 12, 2026', duration: '0:15' },
  { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80', location: 'Resort Pool', date: 'Apr 12, 2026' },
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80', location: 'Sunset View', date: 'Apr 12, 2026' },
  { id: 4, type: 'video', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80', location: 'Roadtrip', date: 'Apr 13, 2026', duration: '1:02' },
  { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1539139113444-e43401f3b3ef?auto=format&fit=crop&w=600&q=80', location: 'Group Dinner', date: 'Apr 13, 2026' },
  { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80', location: 'Morning Coffee', date: 'Apr 13, 2026' },
  { id: 7, type: 'video', url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80', location: 'Coffee Shop', date: 'Apr 14, 2026', duration: '0:30' },
  { id: 8, type: 'image', url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80', location: 'Beach Walk', date: 'Apr 14, 2026' },
  { id: 9, type: 'image', url: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=600&q=80', location: 'Island Hopping', date: 'Apr 14, 2026' },
  { id: 10, type: 'video', url: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=600&q=80', location: 'Snorkeling', date: 'Apr 15, 2026', duration: '2:15' },
  { id: 11, type: 'image', url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80', location: 'Hidden Lagoon', date: 'Apr 15, 2026' },
  { id: 12, type: 'image', url: 'https://images.unsplash.com/photo-1473496169904-658ba37448eb?auto=format&fit=crop&w=600&q=80', location: 'Cliff Diving', date: 'Apr 15, 2026' },
  { id: 13, type: 'image', url: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a0a?auto=format&fit=crop&w=600&q=80', location: 'Group Selfie', date: 'Apr 15, 2026' },
  { id: 14, type: 'video', url: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=600&q=80', location: 'Campfire', date: 'Apr 15, 2026', duration: '0:45' },
  { id: 15, type: 'image', url: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=600&q=80', location: 'Heading Home', date: 'Apr 16, 2026' }
]);
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
    location: 'Current Trip',
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
  <div class="pb-24 pt-10 min-h-screen bg-[#F8FAFB]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      <div class="flex items-center justify-between mb-12">
        <div class="flex items-center gap-5">
          <button @click="router.back()" class="p-4 bg-white border-2 border-gray-200 hover:border-lakbay-teal rounded-3xl transition-all shadow-md group">
            <svg class="w-6 h-6 text-gray-600 group-hover:text-lakbay-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <h1 class="text-4xl font-black text-gray-800 uppercase tracking-tighter">4 IDIOTS</h1>
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
              <div class="flex items-center gap-4">
                <img :src="m.img" class="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-sm" />
                <div>
                  <p class="font-black text-gray-800 text-xl tracking-tight">{{ m.name }}</p>
                  <p class="text-[11px] text-gray-400 font-black uppercase tracking-widest">{{ m.role }}</p>
                </div>
              </div>
              <span v-if="m.role === 'Organizer'" class="text-[10px] font-black text-lakbay-teal bg-teal-50 px-4 py-2 rounded-2xl border-2 border-teal-100 uppercase">Organizer</span>
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
              <p class="text-5xl font-black text-gray-800 tracking-tighter">₱25,450</p>
            </div>
            <div class="bg-teal-50/50 p-10 rounded-[2.5rem] border-4 border-teal-100 text-center shadow-md">
              <p class="text-xs font-black text-lakbay-teal uppercase tracking-[0.2em] mb-2">Per Person</p>
              <p class="text-5xl font-black text-gray-800 tracking-tighter">₱8,483</p>
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

        <div class="flex gap-6 overflow-x-auto custom-scrollbar pb-6 pt-2 px-2 -mx-2">
          
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
      </div>

    </div>
  </div>

  <!-- FULLSCREEN VIEWER -->
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
        <h2 class="text-3xl font-black text-white mb-2 tracking-tighter">{{ selectedMemory.location }}</h2>
        <p class="text-white/60 font-bold uppercase tracking-[0.2em] text-sm">{{ selectedMemory.date }}</p>
      </div>
    </div>
  </div>
</template>