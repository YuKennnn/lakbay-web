<script setup>
// Landing page uses standard vue and doesn't need many complex imports.
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFB] overflow-hidden">
    
    <!-- Hero Section -->
    <section class="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <!-- Decorative abstract shapes behind hero -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#2A8B8B]/10 blur-3xl z-0 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#D97736]/10 blur-3xl z-0 pointer-events-none"></div>
      
      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <h1 class="text-5xl sm:text-7xl font-black text-[#1e293b] tracking-tighter mb-6 leading-tight">
          Your Smart Canvas for <br class="hidden sm:block" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#D97736] to-[#F9A261]">Travel & Daily Budgeting.</span>
        </h1>
        
        <p class="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          We break down your travel and commute costs, split it among your group, and tell you exactly how much you need to save daily until your departure date!
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link to="/login" class="w-full sm:w-auto bg-[#2A8B8B] hover:bg-[#1e6666] text-white px-8 py-4 rounded-full font-black text-lg shadow-xl shadow-teal-900/20 hover:shadow-teal-900/40 hover:-translate-y-1 transition-all">
            Start Planning Now
          </router-link>
          <router-link to="/login" class="w-full sm:w-auto bg-white border-2 border-gray-100 hover:border-[#D97736]/30 hover:bg-orange-50 text-gray-700 hover:text-[#D97736] px-8 py-4 rounded-full font-bold text-lg shadow-sm transition-all">
            Join a Group
          </router-link>
        </div>
      </div>
      
      <!-- Premium App UI Mockup visual -->
      <div class="mt-20 relative z-10">
        <div class="absolute inset-0 bg-gradient-to-t from-[#F8FAFB] via-transparent to-transparent z-10 pointer-events-none h-full w-full"></div>
        <div class="bg-white rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-8 shadow-2xl border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform duration-700 max-w-5xl mx-auto relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-white z-0"></div>
          <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Mockup Card 1 -->
            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
              <div>
                <div class="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Option 1</div>
                <div class="font-bold text-[#2A8B8B] text-lg mb-2">Budget Friendly</div>
                <div class="h-2 w-full bg-gray-200 rounded-md mb-2"></div>
                <div class="h-2 w-3/4 bg-gray-200 rounded-md"></div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                 <div class="text-sm font-bold text-gray-700">₱2,500 total</div>
                 <div class="text-xs text-[#2A8B8B] font-bold bg-teal-100 px-2 py-1 rounded">₱150/day</div>
              </div>
            </div>
            <!-- Mockup Card 2 -->
            <div class="bg-white rounded-2xl p-6 border border-[#D97736] shadow-xl transform -translate-y-4 flex flex-col justify-between relative overflow-hidden">
              <div class="absolute top-0 right-0 bg-[#D97736] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">TOP PICK</div>
              <div>
                <div class="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Option 2</div>
                <div class="font-bold text-[#D97736] text-xl mb-2">Standard Comfort</div>
                <div class="h-2 w-full bg-gray-200 rounded-md mb-2"></div>
                <div class="h-2 w-5/6 bg-gray-200 rounded-md"></div>
              </div>
              <div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                 <div class="text-gray-900 font-bold">₱5,200 total</div>
                 <div class="text-sm text-white font-bold bg-[#D97736] px-3 py-1.5 rounded shadow-sm">₱275/day</div>
              </div>
            </div>
            <!-- Mockup Card 3 -->
            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
              <div>
                <div class="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Option 3</div>
                <div class="font-bold text-gray-700 text-lg mb-2">Premium Experience</div>
                <div class="h-2 w-full bg-gray-200 rounded-md mb-2"></div>
                <div class="h-2 w-1/3 bg-gray-200 rounded-md"></div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                 <div class="text-sm font-bold text-gray-700">₱11,000 total</div>
                 <div class="text-xs text-gray-600 font-bold bg-gray-200 px-2 py-1 rounded">₱500/day</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-sm font-black text-[#D97736] tracking-widest uppercase mb-3">Why Lakbay+</h2>
          <h3 class="text-3xl sm:text-4xl font-bold text-gray-900">Everything you need for the perfect getaway.</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- Feature 1 -->
          <div class="group">
            <div class="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-[#2A8B8B] mb-6 group-hover:scale-110 group-hover:bg-[#2A8B8B] group-hover:text-white transition-all duration-300 shadow-sm">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">AI-Powered Itineraries</h4>
            <p class="text-gray-500 leading-relaxed">Simply tell our AI where you're going, your budget, and pax. We'll generate a complete, day-by-day customized schedule instantly.</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="group">
            <div class="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-[#D97736] mb-6 group-hover:scale-110 group-hover:bg-[#D97736] group-hover:text-white transition-all duration-300 shadow-sm">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Group Synergy</h4>
            <p class="text-gray-500 leading-relaxed">Invite friends via link. Everyone can view the plan, propose edits, and vote on activities in real-time. No more messy chat groups.</p>
          </div>
          
          <!-- Feature 3 -->
          <div class="group">
            <div class="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Split Expenses</h4>
            <p class="text-gray-500 leading-relaxed">Track who paid for what. Easily scan receipts, allocate costs fairly, and settle up balances effortlessly at the end of the trip.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof Section -->
    <section class="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-sm font-black text-[#2A8B8B] tracking-widest uppercase mb-3">Community Stories</h2>
          <h3 class="text-3xl sm:text-4xl font-bold text-gray-900">Loved by thousands of Barkadas</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Review 1 -->
          <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative items-stretch flex flex-col">
            <div class="flex items-center gap-1 mb-6 text-[#F4D03F]">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            <p class="text-gray-700 font-medium mb-8 leading-relaxed">"Lakbay+ made our trip to Siargao possible! The AI gave us 3 options, and knowing exactly that we only needed to save ₱200 a day made the budgeting completely stress-free."</p>
            <div class="flex items-center gap-4 mt-auto">
              <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center font-bold text-[#2A8B8B] text-xl">M</div>
              <div class="text-left">
                <div class="font-bold text-gray-900">Mika Dela Cruz</div>
                <div class="text-gray-500 text-sm">Traveled to Siargao</div>
              </div>
            </div>
          </div>

          <!-- Review 2 -->
          <div class="bg-gradient-to-br from-[#2A8B8B] to-[#1e6666] rounded-[2rem] p-8 shadow-xl relative transform md:-translate-y-4 items-stretch flex flex-col">
            <div class="flex items-center gap-1 mb-6 text-[#F4D03F]">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            <p class="text-white font-medium mb-8 leading-relaxed text-lg">"The Splitwise-style budgeting is a game-changer. We separated our flights and daily commute goals. Nobody fought over money anymore!"</p>
            <div class="flex items-center gap-4 mt-auto">
              <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-[#D97736] text-xl">J</div>
              <div class="text-left">
                <div class="font-bold text-white">Jose Santos</div>
                <div class="text-teal-200 text-sm">Traveled to Boracay</div>
              </div>
            </div>
          </div>

          <!-- Review 3 -->
          <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative items-stretch flex flex-col">
            <div class="flex items-center gap-1 mb-6 text-[#F4D03F]">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            <p class="text-gray-700 font-medium mb-8 leading-relaxed">"Honestly, the UI is just magical. It feels like a canvas where we can swap expensive options for cheaper ones until the daily savings matched our current salaries."</p>
            <div class="flex items-center gap-4 mt-auto">
              <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-[#D97736] text-xl">A</div>
              <div class="text-left">
                <div class="font-bold text-gray-900">Anna Reyes</div>
                <div class="text-gray-500 text-sm">Traveled to Palawan</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-24 bg-white text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-black text-gray-900 mb-6">Ready to create unforgettable memories?</h2>
        <p class="text-xl text-gray-500 mb-10">Join thousands of travelers planning smarter trips.</p>
        <router-link to="/login" class="bg-[#D97736] hover:bg-[#c4682c] text-white px-10 py-5 rounded-full font-black text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-block">
          Launch App Now
        </router-link>
      </div>
    </section>

  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
</style>
