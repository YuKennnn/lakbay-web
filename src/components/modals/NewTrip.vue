<script setup>
import { defineProps, defineEmits, watch, onUnmounted } from 'vue';

const props = defineProps({ isOpen: Boolean });
defineEmits(['close']);

// Lock background scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Cleanup if component is destroyed
onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 p-4">
    <div class="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in relative max-h-[90vh] flex flex-col">
      
      <div class="bg-gradient-to-r from-[#2A8B8B] to-[#1e6666] px-8 py-6 flex justify-between items-center text-white shrink-0">
        <div>
          <h3 class="font-black text-xl tracking-tight">Plan New Trip</h3>
          <p class="text-[10px] uppercase tracking-widest font-bold opacity-80">Start a new journey</p>
        </div>
        <button @click="$emit('close')" class="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <div class="p-8 overflow-y-auto custom-scrollbar">
        <div class="space-y-6">
          <div>
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Trip Title</label>
            <div class="relative group">
              <input type="text" placeholder="e.g., Summer Cebu Adventure" class="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all text-sm text-gray-700 font-bold placeholder:font-medium">
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Destination</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-300 group-focus-within:text-[#2A8B8B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <input type="text" placeholder="e.g., Cebu, Philippines" class="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all text-sm text-gray-700 font-bold placeholder:font-medium">
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Start Date</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-300 group-focus-within:text-[#2A8B8B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <input type="date" class="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all text-sm text-gray-700 font-bold">
              </div>
            </div>
            <div class="flex-1">
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">End Date</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-300 group-focus-within:text-[#2A8B8B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <input type="date" class="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all text-sm text-gray-700 font-bold">
              </div>
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Initial Budget</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span class="text-gray-300 font-black group-focus-within:text-[#2A8B8B] transition-colors">₱</span>
              </div>
              <input type="number" placeholder="10,000" class="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all text-sm text-gray-700 font-bold placeholder:font-medium">
            </div>
          </div>

          <button class="w-full bg-[#D97736] text-white font-black py-4.5 rounded-2xl shadow-xl shadow-orange-100 hover:bg-[#c4682c] hover:-translate-y-1 transition-all mt-4 uppercase tracking-widest text-xs">
            Start Adventure
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
e>