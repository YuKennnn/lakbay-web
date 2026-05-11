<script setup>
import { ref } from 'vue';

const groups = ref([
  {
    id: 'sinko',
    name: 'SINKO',
    status: 'COMPLETE',
    destination: 'Kota Beach Resort, Cebu',
    dates: 'Mar 25 - Mar 30, 2026',
    memberCount: 4,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    avatars: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3', 'https://i.pravatar.cc/150?u=4']
  },
  {
    id: '4-idiots',
    name: '4 IDIOTS',
    status: 'ONGOING',
    destination: 'Canibad Beach, Samal',
    dates: 'April 10 - 15, 2026',
    memberCount: 4,
    // THE FIX: Replace the placeholder with a real Unsplash image of a group of friends
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
    avatars: ['https://i.pravatar.cc/150?u=a', 'https://i.pravatar.cc/150?u=b', 'https://i.pravatar.cc/150?u=c', 'https://i.pravatar.cc/150?u=d']
  }
]);
</script>

<template>
  <div class="p-6 sm:p-10 max-w-7xl mx-auto animate-fade-in">
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-black text-[#2A8B8B] tracking-tight">Travel Groups</h1>
      <button class="bg-[#2A8B8B] text-white p-3 rounded-2xl shadow-lg hover:scale-105 transition active:scale-95">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke-width="3" stroke-linecap="round"/></svg>
      </button>
    </div>

    <div class="grid gap-8 lg:grid-cols-2">
      <router-link v-for="group in groups" :key="group.id" :to="`/groups/${group.id}`" 
        class="bg-white rounded-[2.5rem] border-2 border-[#2A8B8B]/10 p-8 flex flex-col md:flex-row items-center gap-8 hover:border-[#2A8B8B] transition-all group shadow-sm relative overflow-hidden">
        
        <div class="absolute top-6 right-8 flex items-center gap-2">
          <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ group.status }}</span>
          <svg class="w-4 h-4 text-[#D97736]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>

        <div class="w-44 h-44 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
          <img :src="group.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>

        <div class="flex-grow text-center md:text-left">
          <h2 class="text-3xl font-black text-gray-700 mb-4 tracking-tighter">{{ group.name }}</h2>
          
          <div class="space-y-3 mb-6">
            <div class="flex items-center justify-center md:justify-start gap-3">
              <div class="p-2 bg-teal-50 rounded-lg text-[#2A8B8B]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-width="2.5"/></svg>
              </div>
              <span class="font-black text-[#D97736] text-lg tracking-tighter">{{ group.destination }}</span>
            </div>
          </div>

          <div class="flex items-center justify-center md:justify-start gap-3">
            <div class="flex -space-x-3">
              <img v-for="(img, i) in group.avatars" :key="i" :src="img" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
            </div>
            <span class="text-sm font-black text-gray-500">{{ group.memberCount }} members</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>