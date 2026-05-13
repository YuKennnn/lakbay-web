<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  trip: Object
});

const localTasks = ref([...(props.trip?.tasks || [])]);
if (localTasks.value.length === 0) {
  localTasks.value = [
    { id: 1, title: 'Reserve island hopping tour', assignee: 'YuKen', completed: false, dueDate: 'Dec 18', avatar: 'https://i.pravatar.cc/100?u=yuken' }
  ];
}

const isAddingTask = ref(false);
const newTask = ref({ title: '', assignee: '', dueDate: '' });

const toggleTask = (task) => {
  task.completed = !task.completed;
};

const addTask = () => {
  if (!newTask.value.title) return;
  const member = props.trip?.members?.find(m => m.name === newTask.value.assignee) || props.trip?.members?.[0];
  
  localTasks.value.unshift({
    id: Date.now(),
    title: newTask.value.title,
    assignee: newTask.value.assignee || 'YuKen',
    completed: false,
    dueDate: newTask.value.dueDate || 'TBD',
    avatar: member?.avatar || 'https://i.pravatar.cc/100?u=yuken'
  });
  
  isAddingTask.value = false;
  newTask.value = { title: '', assignee: '', dueDate: '' };
};

const pendingTasks = computed(() => localTasks.value.filter(t => !t.completed));
const completedTasks = computed(() => localTasks.value.filter(t => t.completed));
</script>

<template>
  <div class="w-full space-y-8 animate-fade-in relative">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-black text-[#2A8B8B] tracking-tight">Tasks & Assignments</h2>
        <p class="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Delegate and track responsibilities</p>
      </div>
      <button @click="isAddingTask = true" class="bg-[#D97736] text-white font-black py-2.5 px-6 rounded-full hover:bg-[#c4682c] hover:scale-105 transition shadow-lg text-xs flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
        Add Task
      </button>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded-[2.5rem] border-2 border-orange-50 shadow-sm">
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Pending</p>
        <p class="text-4xl font-black text-[#D97736] tracking-tighter">{{ pendingTasks.length }}</p>
      </div>
      <div class="bg-white p-6 rounded-[2.5rem] border-2 border-teal-50 shadow-sm">
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Completed</p>
        <p class="text-4xl font-black text-[#2A8B8B] tracking-tighter">{{ completedTasks.length }}</p>
      </div>
    </div>

    <div class="space-y-6">
      <div v-if="pendingTasks.length > 0" class="space-y-4">
        <div class="flex items-center gap-2 mb-2 ml-1">
          <div class="w-2 h-2 rounded-full bg-[#D97736] shadow-sm animate-pulse"></div>
          <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">In Progress ({{ pendingTasks.length }})</h3>
        </div>

        <div v-for="task in pendingTasks" :key="task.id" 
             class="bg-white p-5 rounded-[2rem] border-2 border-gray-50 shadow-sm flex items-start gap-5 hover:border-[#2A8B8B]/30 transition-all group">
          <button @click="toggleTask(task)" class="w-8 h-8 rounded-xl border-2 border-gray-100 mt-1 flex items-center justify-center hover:border-[#2A8B8B] hover:bg-teal-50/30 transition shrink-0">
            <div class="w-4 h-4 rounded-md bg-transparent group-hover:bg-[#2A8B8B]/10 transition"></div>
          </button>
          <div class="flex-grow min-w-0">
            <h4 class="font-black text-gray-700 text-sm mb-4 leading-tight truncate">{{ task.title }}</h4>
            <div class="flex flex-wrap gap-3">
              <div class="flex items-center gap-2 bg-teal-50/50 px-3 py-1.5 rounded-xl border border-teal-100 shadow-sm">
                <img :src="task.avatar" class="w-5 h-5 rounded-lg object-cover shadow-sm" />
                <span class="text-[10px] font-black text-[#2A8B8B] uppercase tracking-wider">{{ task.assignee }}</span>
              </div>
              <div class="bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-100 flex items-center gap-2 shadow-sm">
                <span class="text-[10px] font-black text-[#D97736] uppercase tracking-wider">Due: {{ task.dueDate || 'TBD' }}</span>
                <svg class="w-3.5 h-3.5 text-[#D97736]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="completedTasks.length > 0" class="space-y-4 pt-6 border-t-2 border-dashed border-gray-100">
        <div class="flex items-center gap-2 mb-2 ml-1">
          <div class="w-2 h-2 rounded-full bg-[#2A8B8B]"></div>
          <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Done ({{ completedTasks.length }})</h3>
        </div>
        
        <div v-for="task in completedTasks" :key="`comp-${task.id}`" 
             class="bg-gray-50/50 opacity-60 p-5 rounded-[2rem] border-2 border-transparent flex items-start gap-5 transition-all">
          <button @click="toggleTask(task)" class="w-8 h-8 rounded-xl bg-[#2A8B8B] flex items-center justify-center mt-1 shadow-md shadow-teal-100 shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          </button>
          <div class="flex-grow min-w-0">
            <h4 class="font-black text-gray-500 text-sm mb-4 line-through italic truncate">{{ task.title }}</h4>
            <div class="flex flex-wrap gap-2">
              <div class="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200">
                <span class="text-[10px] font-black text-gray-400 uppercase tracking-wider">{{ task.assignee }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="localTasks.length === 0" class="py-20 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem]">
        <p class="font-black text-gray-400 text-lg uppercase tracking-tight">No tasks assigned yet</p>
        <p class="text-xs text-gray-300 font-bold uppercase mt-2">Delegate tasks to start planning</p>
      </div>
    </div>

    <!-- Add Task Modal (Simple version) -->
    <Teleport to="body">
      <div v-if="isAddingTask" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="isAddingTask = false"></div>
        <div class="bg-white w-full max-w-sm rounded-[2.5rem] p-8 relative z-10 shadow-2xl animate-slide-up">
          <h3 class="text-2xl font-black text-[#2A8B8B] mb-6 tracking-tight">Add New Task</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Task Title</label>
              <input v-model="newTask.title" type="text" placeholder="e.g. Book resort" 
                class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-[#2A8B8B] transition font-bold text-sm">
            </div>
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Assignee</label>
              <select v-model="newTask.assignee" class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-[#2A8B8B] transition font-bold text-sm appearance-none cursor-pointer">
                <option value="">Select Member</option>
                <option v-for="m in trip?.members" :key="m.name" :value="m.name">{{ m.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Due Date</label>
              <input v-model="newTask.dueDate" type="text" placeholder="e.g. Dec 20" 
                class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-[#2A8B8B] transition font-bold text-sm">
            </div>
            <button @click="addTask" class="w-full bg-[#D97736] text-white font-black py-4 rounded-2xl shadow-lg hover:bg-[#c4682c] transition-all mt-4 uppercase tracking-widest text-xs">
              Save Task
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>