<script setup>
import { ref } from 'vue'

const activeDestination = ref('Boracay')

const destinations = [
  { name: 'Boracay', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', cost: '₱5,500', save: '₱250/day', tag: 'Beach Hub' },
  { name: 'Palawan', img: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80', cost: '₱8,200', save: '₱400/day', tag: 'Paradise' },
  { name: 'Siargao', img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80', cost: '₱6,800', save: '₱300/day', tag: 'Surf Capital' },
  { name: 'Baguio', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80&sig=baguio-refresh', cost: '₱3,500', save: '₱150/day', tag: 'Summer Capital' }
]

const features = [
  { title: 'Smart Geoanalytics', desc: 'Our AI calculates the most efficient travel paths, factoring in real-time commute costs and distance.', icon: '🗺️', color: 'bg-teal-50 text-[#2A8B8B]' },
  { title: 'Group Synergy', desc: 'Invite your barkada, split costs fairly, and vote on activities together in one seamless canvas.', icon: '🤝', color: 'bg-orange-50 text-[#D97736]' },
  { title: 'Daily Savings Goal', desc: 'We tell you exactly how much to set aside daily to reach your travel goal by departure date.', icon: '💰', color: 'bg-green-50 text-green-600' }
]

const reviews = [
  { name: 'Sofia Rivera', trip: 'Siargao', icon: '🏄‍♀️', text: 'Lakbay+ turned our messy group chat into a perfect itinerary. The daily savings tracker is exactly what we needed to stay on budget!' },
  { name: 'Marcus Chen', trip: 'Boracay', icon: '🥥', text: 'The receipt scanning and cost splitting is pure magic. We spent more time having fun and less time computing expenses.' },
  { name: 'Liza Manalo', trip: 'Batanes', icon: '📸', text: 'I love how it shows the breakdown of every jeep and trike ride. It makes traveling around the islands feel so much more predictable.' }
]
</script>

<template>
  <div class="min-h-screen bg-[#FDFBF9] font-sans selection:bg-[#2A8B8B]/20 overflow-x-hidden">
    
    <!-- Hero Section -->
    <header class="relative pt-12 pb-20 lg:pt-20 lg:pb-32 px-6 sm:px-10 lg:px-16 overflow-hidden text-center lg:text-left">
      <!-- Background Elements -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-[#2A8B8B]/5 rounded-full blur-[120px] z-0 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#D97736]/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        <div class="w-full lg:w-1/2">
          <div class="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full mb-6 border border-orange-100/50 mx-auto lg:mx-0">
            <span class="w-2 h-2 bg-[#D97736] rounded-full animate-pulse"></span>
            <span class="text-[10px] font-bold text-[#D97736] uppercase tracking-[0.2em]">Travel Smarter, Save Daily</span>
          </div>
          
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tighter mb-8 leading-[1.1]">
            Experience the <br class="hidden sm:block" />
            <span class="text-[#2A8B8B]">Philippines</span> in <br class="hidden sm:block" />
            <span class="relative">
              High Definition.
              <svg class="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C50 2 150 2 299 5.5" stroke="#D97736" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </span>
          </h1>
          
          <p class="text-base sm:text-lg text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed px-4 sm:px-0">
            Lakbay+ is your interactive travel canvas. We analyze commute costs, split expenses among friends, and calculate your daily savings target automatically.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full max-w-xs sm:max-w-none mx-auto lg:mx-0 px-4 sm:px-0">
            <router-link to="/login" class="w-full sm:w-auto bg-[#2A8B8B] text-white px-10 py-4.5 rounded-3xl font-bold text-lg shadow-xl shadow-teal-900/10 hover:bg-[#1e6666] hover:-translate-y-1 transition-all">
              Start Planning
            </router-link>
            <router-link to="/login" class="w-full sm:w-auto bg-white border-2 border-gray-100 text-gray-700 px-10 py-4.5 rounded-3xl font-bold text-lg hover:border-[#D97736]/30 hover:bg-orange-50 transition-all">
              Explore Destinations
            </router-link>
          </div>
        </div>

        <!-- Hero Visual (Interactive Explorer Mockup) -->
        <div class="w-full lg:w-1/2 relative group px-4 sm:px-0 mt-8 lg:mt-0">
          <div class="absolute inset-0 bg-gradient-to-tr from-[#2A8B8B]/10 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative bg-white p-3 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-white rotate-1 lg:rotate-2 group-hover:rotate-0 transition-transform duration-700 mx-auto max-w-lg lg:max-w-none">
            <img src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=80" class="w-full h-56 sm:h-[400px] object-cover rounded-2xl sm:rounded-[1.8rem] mb-4 sm:mb-6 shadow-inner" />
            <div class="flex justify-between items-center px-1 sm:px-2">
              <div class="text-left">
                <p class="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Palawan Expedition</p>
                <p class="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight">El Nido Lagoon</p>
              </div>
              <div class="text-right">
                <p class="text-[8px] sm:text-[10px] font-bold text-[#2A8B8B] bg-teal-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-teal-100 uppercase tracking-widest">₱320 / day goal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Destinations Explorer (The Interactive Section) -->
    <section class="py-20 px-6 sm:px-10 lg:px-16 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 mb-12 sm:mb-16">
          <div class="max-w-2xl text-center lg:text-left">
            <h2 class="text-[#D97736] font-bold text-sm uppercase tracking-widest mb-4">Interactive Discovery</h2>
            <h3 class="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">Where will your budget take you?</h3>
          </div>
          <p class="text-gray-500 font-medium max-w-sm lg:text-right text-center mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed">Interact with our top destinations to see real-time geoanalytics data and estimated daily savings.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div v-for="dest in destinations" :key="dest.name" 
               @mouseenter="activeDestination = dest.name"
               :class="[
                 'group relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3',
                 activeDestination === dest.name ? 'ring-4 ring-[#2A8B8B] shadow-2xl shadow-teal-900/20' : 'opacity-90 hover:opacity-100'
               ]">
            <img :src="dest.img" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            
            <div class="absolute top-5 left-5">
              <span class="bg-white/20 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-full border border-white/30 uppercase tracking-widest">{{ dest.tag }}</span>
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
              <h4 class="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 tracking-tight text-left">{{ dest.name }}</h4>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center text-white/80 text-[10px] sm:text-xs border-b border-white/10 pb-2">
                  <span class="font-medium">Total Commute</span>
                  <span class="font-bold text-white">{{ dest.cost }}</span>
                </div>
                <div class="flex justify-between items-center text-white/80 text-[10px] sm:text-xs pt-1">
                  <span class="font-medium">Daily Savings</span>
                  <span class="font-bold text-[#D97736] bg-orange-50/10 px-2 py-0.5 rounded">{{ dest.save }}</span>
                </div>
              </div>
              <router-link to="/login" class="mt-5 w-full bg-white text-gray-900 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg text-sm">
                View Plan
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Features Section -->
    <section class="py-20 px-6 sm:px-10 lg:px-16 bg-gray-50/50">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 text-center lg:text-left">
          <div v-for="feat in features" :key="feat.title" class="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div :class="['w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-6 sm:mb-8 group-hover:scale-110 transition-transform mx-auto lg:mx-0', feat.color]">
              {{ feat.icon }}
            </div>
            <h4 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">{{ feat.title }}</h4>
            <p class="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotional / Value Prop Section -->
    <section class="py-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="bg-[#2A8B8B] rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-16 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-16 text-center lg:text-left">
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full -mr-64 -mt-64 blur-3xl"></div>
          
          <div class="w-full lg:w-3/5 relative z-10">
            <h3 class="text-white text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 lg:mb-8 leading-[1.1]">
              Plan for the trip you <br class="hidden lg:block" />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-[#D97736]">Actually Want to Take.</span>
            </h3>
            <p class="text-teal-50/80 text-lg sm:text-xl font-medium mb-10 lg:mb-12 max-w-2xl mx-auto lg:mx-0">
              No more guessing. Lakbay+ helps you build realistic itineraries that match your financial goals. See the breakdown of every jeep, bus, and ferry ride.
            </p>
            <div class="flex flex-wrap justify-center lg:justify-start gap-3">
              <div v-for="tag in ['Offline Access', 'Real-time Sync', 'Receipt Scanner', 'AI Route Optimizer']" :key="tag" class="bg-white/10 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-bold border border-white/20 uppercase tracking-widest">
                {{ tag }}
              </div>
            </div>
          </div>

          <div class="w-full lg:w-2/5 relative z-10 flex flex-col gap-6">
            <div class="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 transform rotate-1 hover:rotate-0 transition-transform max-w-sm mx-auto w-full">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-inner text-[#2A8B8B]">🗺️</div>
                <div class="text-left">
                  <p class="text-white font-bold text-sm sm:text-base">Smart Routing</p>
                  <p class="text-teal-50/60 text-[10px] sm:text-xs">Optimized for cost & time</p>
                </div>
              </div>
              <div class="h-2 w-full bg-white/10 rounded-full mb-3"></div>
              <div class="h-2 w-3/4 bg-[#D97736] rounded-full shadow-lg shadow-[#D97736]/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 px-6 sm:px-10 lg:px-16 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-xs sm:text-sm font-bold text-[#D97736] tracking-[0.3em] uppercase mb-4">Barkada Approved</h2>
          <h3 class="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Loved by Thousands of Group Travelers</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div v-for="review in reviews" :key="review.name" class="p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-[#FDFBF9] border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all text-center sm:text-left">
            <p class="text-gray-600 font-medium text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 italic">
              "{{ review.text }}"
            </p>
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-100 border-4 border-white shadow-sm flex items-center justify-center text-xl">{{ review.icon }}</div>
              <div class="text-center sm:text-left">
                <p class="font-bold text-gray-900 text-sm sm:text-base">{{ review.name }}</p>
                <p class="text-[#2A8B8B] text-[10px] font-bold uppercase tracking-widest">Traveler to {{ review.trip }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer / Final CTA -->
    <footer class="py-20 px-6 sm:px-10 lg:px-16 text-center bg-[#FDFBF9] relative overflow-hidden">
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-[#D97736]/5 rounded-full blur-[100px] -mr-48 -mb-48"></div>
      <div class="max-w-4xl mx-auto relative z-10">
        <h2 class="text-3xl sm:text-6xl font-bold text-gray-900 tracking-tighter mb-8 leading-tight">Your next memory <br /> starts with <span class="text-[#2A8B8B]">one simple plan.</span></h2>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto px-4 sm:px-0">
          <router-link to="/login" class="w-full sm:w-auto bg-[#D97736] text-white px-12 py-4.5 rounded-3xl font-bold text-lg sm:text-xl shadow-xl shadow-orange-100 hover:bg-[#c4682c] hover:scale-105 transition-all">
            Join Lakbay+ Now
          </router-link>
          <router-link to="/login" class="w-full sm:w-auto bg-white border-2 border-gray-100 text-gray-700 px-12 py-4.5 rounded-3xl font-bold text-lg sm:text-xl hover:bg-gray-50 transition-all">
            Learn More
          </router-link>
        </div>
        <p class="mt-12 text-gray-400 text-[10px] sm:text-sm font-medium tracking-wide">© 2026 Lakbay+. Built with ❤️ in the Philippines.</p>
      </div>
    </footer>

  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
</style>
