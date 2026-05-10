<script setup>
import { computed } from 'vue';

const props = defineProps({
  trip: Object
});

const budget = computed(() => {
  return props.trip?.budgetObj || {
    total: props.trip?.totalBudget || '₱0',
    spent: props.trip?.spent || '₱0',
    remaining: '₱0',
    percentSpent: props.trip?.budgetPercent || 0,
    members: props.trip?.members?.length || 1
  };
});
</script>

<template>
  <div class="w-full space-y-6">
    
    <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
      <h2 class="text-xl font-bold text-[#2A8B8B] mb-8">Budget Overview</h2>
      
      <div class="flex justify-center mb-10">
        <div class="relative w-48 h-48 rounded-full flex items-center justify-center shadow-inner"
             :style="`background: conic-gradient(#D97736 0% ${budget.percentSpent}%, #F4D03F ${budget.percentSpent}% 100%);`">
          <div class="absolute w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span class="text-4xl font-extrabold text-gray-700">{{ budget.percentSpent }}%</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-xs font-bold text-gray-500 mb-1">Total Budget</p>
          <p class="text-lg font-medium text-[#2A8B8B]">{{ budget.total }}</p>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-500 mb-1">Spent</p>
          <p class="text-lg font-medium text-[#D97736]">{{ budget.spent }}</p>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-500 mb-1">Remaining</p>
          <p class="text-lg font-medium text-[#2A8B8B]">{{ budget.remaining }}</p>
        </div>
      </div>
    </div>

    <div class="bg-[#Fdfbf9] rounded-[2rem] shadow-sm border border-orange-100 p-6 flex items-center justify-between">
      <div>
        <h3 class="text-lg font-bold text-[#2A8B8B] mb-1">Per-Person Share</h3>
        <p class="text-sm text-gray-500">Split among {{ budget.members }} members</p>
      </div>
      <button class="bg-[#D97736] w-12 h-12 rounded-full text-white flex items-center justify-center shadow-md hover:bg-[#c4682c] transition hover:scale-105">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
      </button>
    </div>

  </div>
</template>