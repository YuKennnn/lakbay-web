<script setup>
import { computed } from 'vue';
import { useTrips } from '@/composables/useTrips';

const { trips } = useTrips();

const groups = computed(() => {
  return trips.value.map(trip => ({
    id: trip.id,
    name: trip.title.toUpperCase(),
    status: trip.status.toUpperCase(),
    destination: trip.location,
    date: trip.date,
    memberCount: trip.members.length,
    image: trip.image,
    avatars: trip.members.slice(0, 4).map(m => m.avatar)
  }));
});
</script>

<template>
  <div class="pb-24 pt-10 min-h-screen bg-gray-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex justify-between items-center mb-8 sm:mb-10">
        <h1 class="text-2xl sm:text-3xl font-bold text-[#2A8B8B]">Travel Groups</h1>
        <div class="p-2 sm:p-3 bg-white rounded-xl border border-gray-200 text-[#2A8B8B] shadow-sm">
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>

      <div v-if="groups.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <p class="font-bold text-gray-500 text-lg">No groups found. Plan a trip to start a group!</p>
      </div>

      <div v-else class="grid gap-6 lg:grid-cols-2">
        <router-link v-for="group in groups" :key="group.id" :to="`/groups/${group.id}`" 
          class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 lg:p-6 flex flex-col md:flex-row items-center gap-6 sm:gap-8 hover:shadow-md transition-all group shadow-sm relative overflow-hidden">
          
          <div class="w-32 h-32 sm:w-44 sm:h-44 lg:w-36 lg:h-36 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md relative">
            <img :src="group.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>

          <div class="flex-grow text-center md:text-left">
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
              <h2 class="text-xl sm:text-2xl lg:text-xl font-bold text-gray-800 tracking-tight break-words">{{ group.name }}</h2>
              <div class="flex items-center justify-center md:justify-start gap-2">
                <span :class="[
                  'text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm shrink-0',
                  group.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                  group.status === 'ONGOING' ? 'bg-blue-100 text-blue-700' : 
                  'bg-orange-100 text-[#D97736]'
                ]">{{ group.status }}</span>
                <svg class="w-4 h-4 text-gray-300 group-hover:text-[#D97736] transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </div>
            
            <div class="space-y-2 mb-6">
              <div class="flex items-center justify-center md:justify-start gap-2">
                <div class="p-1.5 bg-teal-50 rounded-lg text-[#2A8B8B] shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-width="2.5"/></svg>
                </div>
                <span class="font-bold text-[#D97736] text-sm sm:text-base lg:text-sm tracking-tight">{{ group.destination }}</span>
              </div>
              <p class="text-[10px] sm:text-xs text-gray-500 pl-1">{{ group.date }}</p>
            </div>

            <div class="flex items-center justify-center md:justify-start gap-3 border-t border-gray-50 pt-4">
              <div class="flex -space-x-2">
                <img v-for="(img, i) in group.avatars" :key="i" :src="img" class="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
              </div>
              <span class="text-[10px] sm:text-xs font-bold text-gray-400">{{ group.memberCount }} members</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>