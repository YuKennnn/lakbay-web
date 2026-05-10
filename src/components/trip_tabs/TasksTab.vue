<script setup>
import { computed } from 'vue';

const props = defineProps({
  trip: Object
});

const tasks = computed(() => {
  return props.trip?.tasks || [
    { id: 1, title: 'Reserve island hopping tour', assignee: 'You', status: 'Pending', dueDate: 'Dec 18', avatar: 'https://i.pravatar.cc/100?u=steph' }
  ];
});

const pendingCount = computed(() => tasks.value.filter(t => !t.completed && t.status !== 'Completed').length);
const completedCount = computed(() => tasks.value.filter(t => t.completed || t.status === 'Completed').length);
</script>

<template>
  <div class="w-full space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-bold text-[#2A8B8B]">Tasks & Assignments</h2>
        <p class="text-xs text-gray-400 mt-1">Delegate and track responsibilities</p>
      </div>
      <button class="bg-[#D97736] text-white font-bold py-2.5 px-5 rounded-full hover:bg-[#c4682c] transition shadow-md text-sm flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Add Task
      </button>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase mb-1">Pending</p>
        <p class="text-3xl font-extrabold text-[#D97736]">{{ pendingCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase mb-1">Completed</p>
        <p class="text-3xl font-extrabold text-[#2A8B8B]">{{ completedCount }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-2 h-2 rounded-full bg-[#D97736]"></div>
        <h3 class="text-sm font-bold text-gray-700 uppercase tracking-wider">Pending ({{ pendingCount }})</h3>
      </div>

      <div v-for="task in tasks.filter(t => !t.completed && t.status !== 'Completed')" :key="task.id" 
           class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div class="w-6 h-6 rounded-full border-2 border-gray-200 mt-1 cursor-pointer hover:border-[#2A8B8B] transition"></div>
        <div class="flex-grow">
          <h4 class="font-bold text-gray-800 text-sm mb-3">{{ task.title }}</h4>
          <div class="flex flex-wrap gap-2">
            <div class="flex items-center gap-2 bg-teal-50/50 px-3 py-1.5 rounded-full border border-teal-100">
              <img :src="task.avatar" class="w-5 h-5 rounded-full object-cover" />
              <span class="text-[11px] font-bold text-[#2A8B8B]">{{ task.assignee }}</span>
            </div>
            <div class="bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 flex items-center gap-1.5">
              <span class="text-[11px] font-bold text-[#D97736]">Due: {{ task.dueDate || 'TBD' }}</span>
              <svg class="w-3 h-3 text-[#D97736]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Completed Section if needed -->
    <div v-if="completedCount > 0" class="space-y-4 pt-4 border-t border-dashed border-gray-200">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-2 h-2 rounded-full bg-[#2A8B8B]"></div>
        <h3 class="text-sm font-bold text-gray-700 uppercase tracking-wider">Completed ({{ completedCount }})</h3>
      </div>
      
      <div v-for="task in tasks.filter(t => t.completed || t.status === 'Completed')" :key="`comp-${task.id}`" 
           class="bg-gray-50/50 opacity-70 p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div class="w-6 h-6 rounded-full bg-[#2A8B8B] flex items-center justify-center mt-1">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <div class="flex-grow">
          <h4 class="font-bold text-gray-800 text-sm mb-3 line-through">{{ task.title }}</h4>
          <div class="flex flex-wrap gap-2">
            <div class="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <span class="text-[11px] font-bold text-gray-500">{{ task.assignee }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>