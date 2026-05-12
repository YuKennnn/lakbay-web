<script setup>
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps({ isOpen: Boolean, tripName: String });
const emit = defineEmits(['close']);

const email = ref('');
const isSending = ref(false);
const isSent = ref(false);
const showError = ref(false);
const inviteLink = ref(`https://lakbay.app/join/TRIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
const copied = ref(false);

const validateEmail = (val) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(val);
};

const handleInvite = () => {
  if (!email.value) return;
  
  if (!validateEmail(email.value)) {
    showError.value = true;
    setTimeout(() => showError.value = false, 3000);
    return;
  }

  isSending.value = true;
  setTimeout(() => {
    isSending.value = false;
    isSent.value = true;
    setTimeout(() => {
      emit('close');
      isSent.value = false;
      email.value = '';
    }, 2000);
  }, 1500);
};

const copyLink = () => {
  navigator.clipboard.writeText(inviteLink.value);
  copied.value = true;
  setTimeout(() => copied.value = false, 2000);
};

watch(() => props.isOpen, (val) => {
  if (val) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = '';
});

onUnmounted(() => document.body.style.overflow = '');
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="emit('close')"></div>
      
      <div class="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 animate-slide-up">
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-2xl font-black text-[#2A8B8B] tracking-tight">Invite to Trip</h3>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{{ tripName }}</p>
            </div>
            <button @click="emit('close')" class="p-2 hover:bg-gray-100 rounded-full transition">
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div v-if="!isSent" class="space-y-6">
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Send via Email</label>
              <div class="flex gap-2 relative">
                <input v-model="email" type="email" placeholder="friend@example.com" 
                  :class="[
                    'flex-grow bg-gray-50 border-2 rounded-2xl px-5 py-4 outline-none focus:bg-white transition font-bold text-gray-700',
                    showError ? 'border-red-400' : 'border-gray-100 focus:border-[#2A8B8B]'
                  ]">
                <button @click="handleInvite" :disabled="!email || isSending" 
                  class="bg-[#2A8B8B] text-white px-6 rounded-2xl font-black hover:bg-[#217070] transition flex items-center justify-center">
                  <svg v-if="isSending" class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  <span v-else>Send</span>
                </button>
              </div>
              <p v-if="showError" class="text-[10px] text-red-500 font-bold mt-2 ml-1 animate-pulse">Invalid user</p>
            </div>

            <div class="flex items-center gap-4">
              <div class="h-px bg-gray-100 flex-1"></div>
              <span class="text-[10px] text-gray-300 font-black tracking-widest">OR</span>
              <div class="h-px bg-gray-100 flex-1"></div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Share Invite Link</label>
              <div class="bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 flex items-center justify-between group">
                <p class="text-xs font-bold text-gray-500 truncate mr-4">{{ inviteLink }}</p>
                <button @click="copyLink" :class="[
                  'shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                  copied ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-100 text-[#2A8B8B] hover:border-[#2A8B8B] shadow-sm'
                ]">
                  {{ copied ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>
          </div>

          <div v-else class="py-10 text-center animate-fade-in">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h4 class="text-2xl font-black text-gray-800 mb-2">Invite Sent!</h4>
            <p class="text-sm text-gray-500 font-medium">Your friend will receive an email shortly.</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
