<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isProcessing = ref(false);
const isSuccess = ref(false);
const errorMessage = ref('');

const paymentInfo = ref({
  email: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  name: '',
  country: 'Philippines',
  zip: ''
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

// Watch for error message to clear it after 3 seconds
watch(errorMessage, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  }
});

onMounted(() => {
  paymentInfo.value.email = localStorage.getItem('user_email') || '';
  paymentInfo.value.name = localStorage.getItem('user_fullname') || '';

  if (route.query.plan) {
    selectedPlan.value.name = route.query.plan === 'Plus' ? 'Lakbay+ PLUS' : 'Lakbay+ PRO';
    selectedPlan.value.price = route.query.price || (route.query.plan === 'Plus' ? '₱99' : '₱199');
    if (route.query.plan === 'Plus') {
       selectedPlan.value.features = ['Ad-free travel planning', 'Basic AI Matcher', 'Up to 3 Active Group Trips'];
    }
  }
});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.(com|edu\.ph|yahoo\.com|net|org)$/;
  return re.test(String(email).toLowerCase());
};

const validateCard = (num) => {
  const cleanNum = num.replace(/\s+/g, '');
  return cleanNum.length === 16;
};

const handlePayment = () => {
  errorMessage.value = '';

  if (!validateEmail(paymentInfo.value.email)) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }

  if (!validateCard(paymentInfo.value.cardNumber)) {
    errorMessage.value = "Please enter a valid 16-digit card number.";
    return;
  }
  if (!paymentInfo.value.expiry || !paymentInfo.value.cvc) {
    errorMessage.value = "Please complete card details.";
    return;
  }

  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
    isSuccess.value = true;
    setTimeout(() => {
      router.push('/trips');
    }, 2500);
  }, 2500);
};

const formatCardNumber = (e) => {
  let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  let formattedValue = '';
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) formattedValue += ' ';
    formattedValue += value[i];
  }
  paymentInfo.value.cardNumber = formattedValue.substring(0, 19);
};

const formatExpiry = (e) => {
  let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (value.length > 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  paymentInfo.value.expiry = value.substring(0, 5);
};

const goBack = () => {
  router.push('/subscription');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50/30 py-8 sm:py-12 lg:py-12 px-4 font-sans antialiased text-gray-800">
    
    <!-- Success Modal Overlay -->
    <div v-if="isSuccess" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/95 backdrop-blur-md animate-fade-in">
      <div class="text-center max-w-xs">
        <div class="w-16 h-16 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2 tracking-tight">Payment Success!</h2>
        <p class="text-sm text-gray-500 font-medium mb-8">Your adventure has been upgraded.</p>
        <div class="animate-pulse text-[#2A8B8B] font-bold uppercase tracking-widest text-[10px]">Initializing Experience...</div>
      </div>
    </div>

    <div class="max-w-xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8 sm:mb-10 lg:mb-8">
        <div class="flex items-center gap-4">
          <button @click="goBack" class="p-2 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all shadow-sm group">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 class="text-2xl sm:text-3xl lg:text-2xl font-bold text-[#2A8B8B]">Checkout</h1>
        </div>
        <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-gray-50 shadow-sm">
          <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Secure Checkout</span>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        
        <!-- Order Summary Card -->
        <div class="bg-[#2A8B8B] rounded-3xl p-6 sm:p-8 lg:p-6 text-white shadow-xl relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                   <img src="@/assets/images/lakbay_logo.png" class="w-7 h-7 object-contain" />
                </div>
                <div>
                  <h4 class="text-lg font-bold tracking-tight mb-0.5 leading-none lg:text-base">{{ selectedPlan.name }}</h4>
                  <p class="text-teal-100/70 font-bold uppercase tracking-widest text-[9px]">Monthly Subscription</p>
                </div>
              </div>
              <div class="text-right">
                 <span class="text-xl font-bold lg:text-lg">{{ selectedPlan.price }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center">
               <span class="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Total Amount Due</span>
               <span class="text-3xl font-bold tracking-tighter text-[#D97736] lg:text-2xl">{{ selectedPlan.price }}</span>
            </div>
          </div>
        </div>

        <!-- Main Form Area -->
        <div class="space-y-6 lg:space-y-4">
          
          <!-- Animated Error Message -->
          <transition name="fade">
            <div v-if="errorMessage" class="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex items-center gap-3 animate-shake shadow-sm lg:p-3">
              <svg class="w-5 h-5 shrink-0 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="text-xs font-bold uppercase tracking-wide lg:text-[10px]">{{ errorMessage }}</span>
            </div>
          </transition>

          <!-- Contact Section -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm lg:p-6">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block lg:mb-3">Account Email</label>
            <input 
              v-model="paymentInfo.email"
              type="email" 
              placeholder="name@email.com"
              class="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-5 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all font-bold text-gray-700 text-sm lg:py-2.5"
            />
          </div>

          <!-- Payment Section -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm lg:p-6">
            <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 lg:mb-4">Card Details</h3>
            
            <div class="space-y-5 lg:space-y-4">
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-gray-400 uppercase ml-1">Card Information (Visa/Mastercard)</label>
                <div class="relative">
                  <input 
                    v-model="paymentInfo.cardNumber"
                    @input="formatCardNumber"
                    type="text" 
                    placeholder="4242 4242 4242 4242"
                    maxlength="19"
                    class="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-5 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all font-mono font-bold text-gray-700 tracking-wider text-sm lg:py-2.5"
                  />
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1.5 opacity-40">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" class="h-3 lg:h-2.5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-3 lg:h-2.5" />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-[9px] font-bold text-gray-400 uppercase ml-1">Expiry</label>
                  <input 
                    v-model="paymentInfo.expiry"
                    @input="formatExpiry"
                    type="text" 
                    placeholder="MM / YY"
                    maxlength="5"
                    class="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-5 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all font-mono font-bold text-gray-700 text-sm lg:py-2.5"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-[9px] font-bold text-gray-400 uppercase ml-1">CVC</label>
                  <input 
                    v-model="paymentInfo.cvc"
                    type="password" 
                    placeholder="•••"
                    maxlength="3"
                    class="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-5 outline-none focus:border-[#2A8B8B] focus:bg-white transition-all font-mono font-bold text-gray-700 text-sm lg:py-2.5"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4 lg:pt-2">
            <button 
              @click="handlePayment"
              :disabled="isProcessing"
              class="w-full bg-[#D97736] text-white font-bold py-4 sm:py-5 lg:py-3.5 rounded-2xl shadow-lg hover:bg-[#c4682c] transition-all flex items-center justify-center gap-3 text-sm sm:text-base lg:text-sm"
            >
              <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-white lg:h-4 lg:w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ isProcessing ? 'Processing Transaction...' : 'Pay ' + selectedPlan.price }}</span>
            </button>

            <p class="text-center text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-6 opacity-60">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              SECURE BANK-LEVEL ENCRYPTION
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
.animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(1px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-1.5px, 0, 0); } 40%, 60% { transform: translate3d(1.5px, 0, 0); } }
</style>

