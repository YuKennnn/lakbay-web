<script setup>
import { ref, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close']);
const router = useRouter();

const groupCode = ref('');
const isJoining = ref(false);
const isSuccess = ref(false);

const handleJoin = () => {
  if (!groupCode.value) return;
  
  isJoining.value = true;
  // Simulate API call
  setTimeout(() => {
    isJoining.value = false;
    isSuccess.value = true;
    
    // Redirect after a short delay
    setTimeout(() => {
      emit('close');
      router.push('/trips');
      // Reset state for next time
      setTimeout(() => {
        isSuccess.value = false;
        groupCode.value = '';
      }, 500);
    }, 1500);
  }, 2000);
};

const handlePaste = async () => {
  try {
    const text = await navigator.clipboard.readText();
    groupCode.value = text.toUpperCase();
  } catch (err) {
    // Fallback if clipboard API is not available/permitted
    groupCode.value = 'LAKBAY-2026';
  }
};

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" @click="$emit('close')"></div>
    
    <div class="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-slide-up relative z-10 max-h-[90vh] flex flex-col">
      
      <div class="bg-gradient-to-r from-[#2A8B8B] to-[#1e6666] px-8 py-6 flex justify-between items-center text-white shrink-0">
        <div>
          <h3 class="font-black text-xl tracking-tight">Join Group</h3>
          <p class="text-[10px] uppercase tracking-widest font-bold opacity-80">Enter your adventure code</p>
        </div>
        <button @click="$emit('close')" class="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <div class="p-8 overflow-y-auto custom-scrollbar">
        <div v-if="!isSuccess">
          <div class="flex items-center gap-2 mb-4">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Group Code</label>
          </div>
          
          <div class="flex gap-3 mb-8">
            <div class="relative flex-grow group">
              <input 
                v-model="groupCode"
                type="text" 
                placeholder="E.G., CEBU2024" 
                class="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl pl-5 pr-24 py-4 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all text-sm text-gray-700 uppercase font-black tracking-widest placeholder:font-bold placeholder:tracking-normal"
              >
              <button 
                @click="handlePaste"
                class="absolute right-2 top-2 bottom-2 bg-gray-200 text-gray-600 text-[10px] px-4 rounded-xl hover:bg-gray-300 transition font-black uppercase tracking-widest"
              >
                Paste
              </button>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4 mb-8">
            <div class="h-px bg-gray-100 flex-1"></div>
            <span class="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase">Or</span>
            <div class="h-px bg-gray-100 flex-1"></div>
          </div>

          <button class="w-full border-2 border-gray-100 bg-white text-gray-700 font-black py-4 rounded-2xl shadow-sm hover:border-[#2A8B8B]/30 hover:bg-gray-50 transition flex justify-center items-center gap-3 mb-6 group">
            <div class="p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#2A8B8B]/10 transition text-gray-400 group-hover:text-[#2A8B8B]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
            </div>
            <span class="text-sm">Join via Magic Link</span>
          </button>
          
          <button 
            @click="handleJoin"
            :disabled="!groupCode || isJoining"
            class="w-full bg-[#2A8B8B] text-white font-black py-4.5 rounded-2xl shadow-xl shadow-teal-100 hover:bg-[#217070] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none flex justify-center items-center gap-3"
          >
            <svg v-if="isJoining" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-xs uppercase tracking-widest">{{ isJoining ? 'Finding Adventure...' : 'Join Adventure' }}</span>
          </button>
        </div>

        <!-- Success View -->
        <div v-else class="py-10 text-center animate-fade-in">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h4 class="text-2xl font-black text-gray-800 mb-2">Welcome to the Squad!</h4>
          <p class="text-sm text-gray-500 font-medium px-4">You've successfully joined the group. Redirecting you to your trips...</p>
        </div>

        <div class="border-t border-gray-100 mt-8 pt-8">
          <p class="text-center text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-4">Planning your own?</p>
          <button class="w-full bg-orange-50 text-[#D97736] font-black py-4 rounded-2xl border-2 border-orange-100 hover:bg-orange-100 transition-colors flex justify-center items-center gap-2 text-xs uppercase tracking-widest">
            Generate Host Link
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
