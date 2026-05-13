<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activePlan = ref('Pro');

// Data for the plans based on your Figma design
const plans = {
  Plus: {
    title: 'Lakbay+ PLUS',
    price: '₱99',
    period: '/month',
    subtext: 'Billed monthly. Cancel anytime.',
    savings: null,
    buttonText: 'Get Plus',
    features: [
      'Ad-free travel planning',
      'Basic AI Destination Matcher',
      'Up to 3 Active Group Trips',
      'Standard Email Support'
    ]
  },
  Pro: {
    title: 'Lakbay+ PRO',
    price: '₱199',
    period: '/month',
    subtext: 'Just ₱17/day',
    savings: '⚡ Save ₱1,089 (30% off)',
    buttonText: 'Upgrade to Pro',
    features: [
      'Everything in PLUS, plus:',
      'Unlimited Group Trips & Collaborators',
      'Advanced AI Itinerary Builder',
      'Offline Maps & Itinerary Access',
      'Priority 24/7 Support'
    ]
  }
};

const currentPlan = computed(() => plans[activePlan.value]);

// NEW: Data for the Comparison Table
const comparisonData = ref([
  { feature: 'Maximum Trips', basic: '3 trips', premium: 'Unlimited' },
  { feature: 'AI Suggestions', basic: '5/day', premium: 'Unlimited' },
  { feature: 'Route Optimization', basic: '—', premium: 'Included', isCheck: true },
  { feature: 'Offline Maps', basic: '—', premium: 'Included', isCheck: true },
  { feature: 'Priority Support', basic: '—', premium: 'Included', isCheck: true },
]);
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 pb-24">
    
    <div class="bg-gradient-to-r from-[#2A8B8B] to-[#1e6666] pt-12 sm:pt-20 lg:pt-14 pb-24 sm:pb-32 lg:pb-28 px-4 relative overflow-hidden rounded-b-[2rem] sm:rounded-b-[4rem] shadow-xl transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-white opacity-10 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-6 sm:mb-8 shadow-sm">
          <svg class="w-3 h-3 sm:w-4 sm:h-4 text-[#F4D03F]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          Exclusive Offer
        </div>

        <div class="flex justify-center mb-6 sm:mb-8">
          <div class="bg-white/95 p-3 sm:p-4 lg:p-3 rounded-2xl shadow-xl border border-white/20">
            <img src="@/assets/images/lakbay_logo.png" alt="Lakbay Logo" class="w-12 h-12 sm:w-16 sm:h-16 lg:w-12 lg:h-12 object-contain" />
          </div>
        </div>
        
        <h1 class="text-3xl sm:text-5xl lg:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
          {{ currentPlan.title }}
        </h1>
        <p class="text-white/90 text-sm sm:text-lg lg:text-base max-w-2xl mx-auto font-medium px-4">
          The ultimate companion for your global adventures. Unlock the full potential of smarter travel.
        </p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 lg:-mt-14 relative z-20">
      
      <div class="flex justify-center mb-8">
        <div class="bg-white p-1 rounded-full shadow-lg border border-gray-100 flex items-center w-full max-w-[280px] sm:max-w-[320px]">
          <button @click="activePlan = 'Plus'" 
            :class="['flex-1 py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300', 
                     activePlan === 'Plus' ? 'bg-[#2A8B8B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600']">
            Plus
          </button>
          <button @click="activePlan = 'Pro'" 
            :class="['flex-1 py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 relative', 
                     activePlan === 'Pro' ? 'bg-[#2A8B8B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600']">
            Pro
            <span class="absolute -top-3 -right-2 bg-[#D97736] text-white text-[7px] sm:text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm border border-white uppercase tracking-tighter transform rotate-3">
              -30%
            </span>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row transition-all">
        
        <div class="p-8 sm:p-12 lg:p-14 md:w-1/2 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-gray-50 bg-[#FDFBF9]">
          <div class="mb-8 sm:mb-10 lg:mb-8">
            <div class="flex items-baseline justify-center gap-1 text-[#2A8B8B]">
              <span class="text-5xl sm:text-7xl lg:text-6xl font-bold tracking-tighter">{{ currentPlan.price }}</span>
              <span class="text-sm sm:text-xl lg:text-base font-bold opacity-70">{{ currentPlan.period }}</span>
            </div>
            <p class="text-[10px] sm:text-xs text-gray-400 font-bold mt-2 sm:mt-3 uppercase tracking-widest">{{ currentPlan.subtext }}</p>
          </div>

          <div v-if="currentPlan.savings" class="mb-8 sm:mb-10 lg:mb-8">
            <span class="bg-orange-50 text-[#D97736] px-5 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold border border-orange-100 uppercase tracking-wide">
              {{ currentPlan.savings }}
            </span>
          </div>

          <button @click="router.push({ path: '/payment', query: { plan: activePlan, price: currentPlan.price } })"
            class="w-full bg-[#D97736] text-white font-bold py-4 sm:py-5 lg:py-4 rounded-2xl shadow-lg hover:bg-[#c4682c] transition-all text-sm sm:text-lg active:scale-95">
            {{ currentPlan.buttonText }}
          </button>

          <p class="text-[8px] sm:text-[10px] text-gray-400 mt-6 sm:mt-8 lg:mt-6 font-bold uppercase tracking-widest opacity-60">
            Secure Payment • Cancel Anytime
          </p>
        </div>

        <div class="p-8 sm:p-12 lg:p-14 md:w-1/2 bg-white flex flex-col justify-center">
          <div class="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-8">
            <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 bg-yellow-50 rounded-2xl flex items-center justify-center border border-yellow-100">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 text-[#F4D03F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
            <h3 class="text-base sm:text-xl lg:text-lg font-bold text-gray-800">Premium Perks</h3>
          </div>

          <ul class="space-y-4 sm:space-y-6 lg:space-y-4">
            <li v-for="(feature, index) in currentPlan.features" :key="index" class="flex items-start gap-4 sm:gap-5">
              <div class="bg-teal-50 text-[#2A8B8B] rounded-full p-1 mt-0.5 shrink-0 border border-teal-100">
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-600 font-medium text-xs sm:text-base lg:text-sm leading-snug">{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16 sm:mt-24 lg:mt-16 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div class="text-center py-6 sm:py-8 lg:py-6 border-b border-gray-50 bg-gray-50/30">
          <h3 class="text-[#2A8B8B] font-bold text-[10px] sm:text-xs uppercase tracking-widest">Full Comparison</h3>
        </div>
        
        <div class="divide-y divide-gray-50">
          <div v-for="(row, idx) in comparisonData" :key="idx" class="flex items-center justify-between py-5 sm:py-7 lg:py-5 px-6 sm:px-12 lg:px-10 hover:bg-gray-50/50 transition-all">
            <span class="text-gray-400 text-[9px] sm:text-[11px] font-bold uppercase tracking-widest w-1/3">{{ row.feature }}</span>
            <span class="text-gray-500 text-xs sm:text-base lg:text-sm font-medium w-1/3 text-center">{{ row.basic }}</span>
            <div class="text-[#2A8B8B] font-bold text-xs sm:text-base lg:text-sm w-1/3 text-right flex justify-end items-center">
              <svg v-if="row.isCheck" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              <span v-else>{{ row.premium }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-8 sm:gap-16 lg:gap-12 text-gray-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mt-16 lg:mt-12 mb-12 opacity-50">
        <span class="flex items-center gap-2"><svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> Secure Payment</span>
        <span class="flex items-center gap-2"><svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg> 10K+ Travelers</span>
      </div>

    </div>
  </div>
</template>