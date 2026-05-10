<script setup>
import { computed } from 'vue';

const props = defineProps({
  trip: Object
});

const members = computed(() => {
  return props.trip?.members || [
    { id: 1, name: 'You', role: 'Host', email: 'you@example.com', avatar: 'https://i.pravatar.cc/100?u=you' }
  ];
});
</script>

<template>
  <div class="w-full space-y-6">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-bold text-[#2A8B8B]">Trip Members ({{ members.length }})</h2>
      <button class="bg-[#2A8B8B] text-white font-bold py-2 px-5 rounded-full hover:bg-[#217070] transition shadow-md text-sm flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
        Invite
      </button>
    </div>

    <div class="grid grid-cols-1 gap-3">
      <div v-for="member in members" :key="member.id" 
           class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition">
        <div class="flex items-center gap-4">
          <img :src="member.avatar" class="w-12 h-12 rounded-full border-2 border-teal-50 object-cover" />
          <div>
            <h4 class="font-bold text-gray-800 text-sm">{{ member.name }}</h4>
            <p class="text-xs text-gray-400">{{ member.email }}</p>
          </div>
        </div>
        <span :class="[
          'text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider',
          member.role === 'Host' ? 'bg-orange-100 text-[#D97736]' : 'bg-gray-100 text-gray-500'
        ]">
          {{ member.role }}
        </span>
      </div>
    </div>
  </div>
</template>