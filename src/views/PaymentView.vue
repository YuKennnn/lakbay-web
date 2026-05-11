<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const paymentMethod = ref('card'); // 'card', 'gcash', 'maya'
const isProcessing = ref(false);

const cardDetails = ref({
  number: '',
  expiry: '',
  cvc: '',
  name: ''
});

const selectedPlan = ref({
  name: 'Lakbay+ PRO',
  price: '₱199',
  period: 'month',
  features: [
    'Unlimited Group Trips',
    'Advanced AI Itinerary Builder',
    'Offline Maps & Itinerary'
  ]
});

const goBack = () => {
  router.push('/subscription');
};

const handlePayment = () => {
  isProcessing.value = true;
  // Simulate payment processing
  setTimeout(() => {
    isProcessing.value = false;
    alert('Payment Successful! Welcome to Lakbay+ PRO.');
    router.push('/plan');
  }, 2000);
};

const formatCardNumber = (e) => {
  let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  let formattedValue = '';
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) formattedValue += ' ';
    formattedValue += value[i];
  }
  cardDetails.value.number = formattedValue.substring(0, 19);
};

const formatExpiry = (e) => {
  let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (value.length > 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  cardDetails.value.expiry = value.substring(0, 5);
};
</script>

<template>
  <div class="min-h-screen bg-[#Fdfbf9] py-12 px-4 sm:px-6 font-sans">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <button @click="goBack" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">Complete Your Payment</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Payment Details (Left) -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Payment Methods -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Payment Method</h3>
            <div class="grid grid-cols-3 gap-3">
              <button 
                @click="paymentMethod = 'card'"
                :class="['flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all', 
                         paymentMethod === 'card' ? 'border-[#2A8B8B] bg-teal-50/50' : 'border-gray-100 hover:border-gray-200']"
              >
                <svg class="w-6 h-6 mb-2" :class="paymentMethod === 'card' ? 'text-[#2A8B8B]' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-xs font-bold" :class="paymentMethod === 'card' ? 'text-[#2A8B8B]' : 'text-gray-500'">Card</span>
              </button>
              
              <button 
                @click="paymentMethod = 'gcash'"
                :class="['flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all', 
                         paymentMethod === 'gcash' ? 'border-[#2A8B8B] bg-teal-50/50' : 'border-gray-100 hover:border-gray-200']"
              >
                <div class="w-6 h-6 mb-2 flex items-center justify-center font-black text-sm" :class="paymentMethod === 'gcash' ? 'text-[#2A8B8B]' : 'text-gray-400'">G</div>
                <span class="text-xs font-bold" :class="paymentMethod === 'gcash' ? 'text-[#2A8B8B]' : 'text-gray-500'">GCash</span>
              </button>

              <button 
                @click="paymentMethod = 'maya'"
                :class="['flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all', 
                         paymentMethod === 'maya' ? 'border-[#2A8B8B] bg-teal-50/50' : 'border-gray-100 hover:border-gray-200']"
              >
                <div class="w-6 h-6 mb-2 flex items-center justify-center font-black text-sm" :class="paymentMethod === 'maya' ? 'text-[#2A8B8B]' : 'text-gray-400'">M</div>
                <span class="text-xs font-bold" :class="paymentMethod === 'maya' ? 'text-[#2A8B8B]' : 'text-gray-500'">Maya</span>
              </button>
            </div>
          </div>

          <!-- Card Form -->
          <div v-if="paymentMethod === 'card'" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5 animate-fade-in">
            <div class="space-y-2">
              <label class="text-xs font-bold text-gray-500 uppercase">Cardholder Name</label>
              <input 
                v-model="cardDetails.name"
                type="text" 
                placeholder="Juan Dela Cruz"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2A8B8B] focus:ring-0 transition-colors font-medium outline-none"
              />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold text-gray-500 uppercase">Card Number</label>
              <div class="relative">
                <input 
                  v-model="cardDetails.number"
                  @input="formatCardNumber"
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  maxlength="19"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2A8B8B] focus:ring-0 transition-colors font-mono outline-none"
                />
                <div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                  <div class="w-6 h-4 bg-gray-200 rounded-sm"></div>
                  <div class="w-6 h-4 bg-gray-300 rounded-sm"></div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-xs font-bold text-gray-500 uppercase">Expiry Date</label>
                <input 
                  v-model="cardDetails.expiry"
                  @input="formatExpiry"
                  type="text" 
                  placeholder="MM/YY"
                  maxlength="5"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2A8B8B] focus:ring-0 transition-colors font-mono outline-none"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold text-gray-500 uppercase">CVC</label>
                <input 
                  v-model="cardDetails.cvc"
                  type="text" 
                  placeholder="•••"
                  maxlength="3"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2A8B8B] focus:ring-0 transition-colors font-mono outline-none"
                />
              </div>
            </div>

            <div class="pt-4">
              <button 
                @click="handlePayment"
                :disabled="isProcessing"
                class="w-full bg-[#D97736] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#c4682c] transition-all flex items-center justify-center gap-2"
              >
                <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isProcessing ? 'Processing...' : 'Pay ' + selectedPlan.price }}
              </button>
            </div>
          </div>

          <!-- GCash/Maya Mockup -->
          <div v-else class="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center animate-fade-in">
            <div class="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-[#2A8B8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 class="text-xl font-bold text-gray-800 mb-2">Connect to {{ paymentMethod === 'gcash' ? 'GCash' : 'Maya' }}</h4>
            <p class="text-gray-500 mb-8 max-w-xs">You will be redirected to the app to securely authorize the payment.</p>
            <button 
              @click="handlePayment"
              :disabled="isProcessing"
              class="w-full max-w-xs bg-[#2A8B8B] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#1e6666] transition-all"
            >
              {{ isProcessing ? 'Connecting...' : 'Proceed to ' + (paymentMethod === 'gcash' ? 'GCash' : 'Maya') }}
            </button>
          </div>

          <p class="text-center text-xs text-gray-400 font-medium flex items-center justify-center gap-2">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg>
            Secure 256-bit SSL Encrypted Payment
          </p>
        </div>

        <!-- Order Summary (Right) -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
            <div class="p-6 border-b border-gray-100">
              <h3 class="font-bold text-gray-800">Order Summary</h3>
            </div>
            
            <div class="p-6 space-y-6">
              <div class="flex items-start gap-4">
                <div class="bg-[#F4EBE1] p-2 rounded-lg shrink-0">
                  <img src="@/assets/images/lakbay_logo.png" alt="Logo" class="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">{{ selectedPlan.name }}</h4>
                  <p class="text-xs text-gray-500">Premium Subscription</p>
                </div>
                <div class="ml-auto">
                  <span class="font-bold text-[#2A8B8B]">{{ selectedPlan.price }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <div v-for="feature in selectedPlan.features" :key="feature" class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 text-[#2A8B8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </div>
              </div>

              <div class="pt-6 border-t border-gray-100 space-y-4">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Subtotal</span>
                  <span class="font-medium text-gray-800">{{ selectedPlan.price }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">VAT (12%)</span>
                  <span class="font-medium text-gray-800">₱0.00</span>
                </div>
                <div class="flex justify-between text-lg font-extrabold pt-2">
                  <span class="text-gray-800">Total</span>
                  <span class="text-[#D97736]">{{ selectedPlan.price }}</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 text-center">
              <p class="text-[10px] text-gray-400 font-medium">Billed monthly. Cancel anytime through your profile settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

input::placeholder {
  color: #CBD5E0;
}
</style>
