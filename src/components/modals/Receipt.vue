<script setup>
import { defineProps, defineEmits, watch, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  trip: Object
});

defineEmits(['close']);

const downloadPdf = () => {
  // We use window.print() as a simple way to invoke the browser's "Save as PDF" feature.
  // In a real production app, this could use libraries like html2pdf.js or pdfmake.
  window.print();
};

// Lock background scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 animate-fade-in">
    <div class="bg-white w-[94%] sm:w-full max-w-[350px] sm:max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-slide-up relative">
      
      <!-- Receipt Header Area -->
      <div class="p-4 sm:p-6 border-b border-dashed border-gray-300 flex justify-between items-start bg-amber-50/50">
        <div>
          <h3 class="font-black text-gray-800 text-lg sm:text-xl uppercase tracking-widest">Receipt</h3>
          <p class="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">Transaction #{{ Math.floor(Math.random() * 90000) + 10000 }}</p>
        </div>
        <button @click="$emit('close')" class="bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 transition border border-gray-100">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Receipt Content -->
      <div class="overflow-y-auto flex-grow p-6 sm:p-8 bg-amber-50/50 custom-scrollbar font-mono text-[13px] sm:text-sm text-gray-700">
        
        <div class="text-center mb-6">
          <h2 class="font-bold text-base sm:text-lg text-gray-900 leading-tight">{{ trip?.title || 'Trip Receipt' }}</h2>
          <p class="text-[11px] sm:text-xs text-gray-500">{{ trip?.location || 'Location' }}</p>
          <p class="text-[11px] sm:text-xs text-gray-500 mt-1">{{ trip?.date || 'Date' }}</p>
        </div>

        <div class="border-t border-dashed border-gray-300 py-4 space-y-3">
          <div class="flex justify-between">
            <span>Roundtrip Flights (x2)</span>
            <span>₱12,000</span>
          </div>
          <div class="flex justify-between">
            <span>Accommodation (5N)</span>
            <span>₱8,500</span>
          </div>
          <div class="flex justify-between">
            <span>Island Tours</span>
            <span>₱2,500</span>
          </div>
          <div class="flex justify-between">
            <span>Env. & Terminal Fees</span>
            <span>₱550</span>
          </div>
          <div class="flex justify-between">
            <span>Food & Beverage</span>
            <span>₱2,000</span>
          </div>
        </div>

        <div class="border-t border-dashed border-gray-300 py-4 space-y-2">
          <div class="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>₱25,550</span>
          </div>
          <div class="flex justify-between text-gray-500">
            <span>VAT (12%)</span>
            <span>Included</span>
          </div>
        </div>

        <div class="border-t-2 border-gray-800 py-4">
          <div class="flex justify-between items-center font-bold text-base sm:text-lg text-gray-900">
            <span>TOTAL SPENT</span>
            <span>{{ trip?.spent || '₱25,550' }}</span>
          </div>
        </div>

        <div class="text-center mt-6 text-xs text-gray-400">
          <p>Thank you for using Lakbay+</p>
          <p class="mt-1">Paid in Full</p>
          <div class="mt-4 flex justify-center text-gray-300">
            <!-- Simulated Barcode -->
            <svg class="h-8 w-48" viewBox="0 0 100 20" fill="currentColor" preserveAspectRatio="none">
              <path d="M0 0h2v20H0zm4 0h6v20H4zm8 0h2v20h-2zm4 0h4v20h-4zm6 0h8v20h-8zm10 0h2v20h-2zm4 0h6v20h-6zm8 0h2v20h-2zm4 0h4v20h-4zm6 0h2v20h-2zm4 0h6v20h-6zm8 0h2v20h-2zm4 0h4v20h-4zm6 0h8v20h-8z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="p-4 sm:p-6 border-t border-dashed border-gray-300 flex gap-3 bg-amber-50/50">
        <button @click="downloadPdf" class="flex-1 bg-white border border-gray-200 py-3 sm:py-3.5 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm text-xs sm:text-sm">
          Print PDF
        </button>
        <button class="flex-1 bg-[#D97736] text-white py-3 sm:py-3.5 rounded-xl font-bold shadow-md hover:bg-[#c4682c] hover:-translate-y-0.5 transition-all text-xs sm:text-sm">
          Share Receipt
        </button>
      </div>

      <!-- Jagged Edge Decoration at Bottom -->
      <div class="absolute bottom-0 left-0 right-0 h-2 bg-transparent" style="background-image: radial-gradient(circle at 5px 0, transparent 6px, #ffffff 6px); background-size: 10px 10px; background-repeat: repeat-x;"></div>
    </div>
  </div>
</template>