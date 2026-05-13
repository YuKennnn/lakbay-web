<script setup>
import { ref } from 'vue'

// This variable controls whether the mobile menu is open or closed
const isMobileMenuOpen = ref(false)

let user_fullname = localStorage.getItem('user_fullname') || 'Traveler';


const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <div class="flex items-center">
          <div v-if="
             user_fullname != null">
            <div class="text-xl sm:text-2xl font-serif font-bold text-[#2A8B8B] tracking-tight hover:opacity-80 transition shrink-0">
              Lakbay<span class="text-[#D97736]">+</span>
            </div>
          </div>
          <div v-else>
            <router-link to="/" class="text-xl sm:text-2xl font-serif font-bold text-[#2A8B8B] tracking-tight hover:opacity-80 transition shrink-0">
            Lakbay<span class="text-[#D97736]">+</span>
          </router-link>
          </div>
        </div>

        <div class="hidden sm:flex items-center space-x-2">
          <router-link to="/plan" active-class="bg-[#2A8B8B] text-white shadow-lg shadow-teal-900/10 scale-105" class="text-gray-500 hover:text-[#2A8B8B] hover:bg-teal-50/80 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300">Plan</router-link>
          <router-link to="/trips" active-class="bg-[#2A8B8B] text-white shadow-lg shadow-teal-900/10 scale-105" class="text-gray-500 hover:text-[#2A8B8B] hover:bg-teal-50/80 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300">Trips</router-link>
          <router-link to="/groups" active-class="bg-[#2A8B8B] text-white shadow-lg shadow-teal-900/10 scale-105" class="text-gray-500 hover:text-[#2A8B8B] hover:bg-teal-50/80 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300">Groups</router-link>
          
          <router-link to="/subscription" active-class="bg-[#2A8B8B] text-white shadow-lg shadow-teal-900/10 scale-105" class="text-gray-500 hover:text-[#2A8B8B] hover:bg-teal-50/80 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            Premium
          </router-link>
          
          <router-link 
            to="/profile" 
            active-class="bg-[#2A8B8B] text-white shadow-lg shadow-teal-900/10 scale-105"
            class="text-gray-500 hover:text-[#2A8B8B] hover:bg-teal-50/80 p-2 rounded-full transition-all duration-300 flex items-center justify-center shrink-0 ml-4 border-2 border-transparent"
          >
            <div class="w-7 h-7 bg-teal-50 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-teal-200 transition-colors">
              <svg class="w-4 h-4 text-[#2A8B8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
          </router-link>
        </div>
        
        <div class="sm:hidden flex items-center">
          <button @click="toggleMobileMenu" class="text-[#2A8B8B] hover:text-[#1e6666] focus:outline-none p-2">
            <svg v-if="!isMobileMenuOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

      </div>
    </div>

    <div v-show="isMobileMenuOpen" class="sm:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 animate-fade-in">
      <div class="px-4 pt-4 pb-8 space-y-2 flex flex-col">
        <router-link @click="isMobileMenuOpen = false" to="/plan" active-class="bg-[#2A8B8B] text-white shadow-md" class="block px-6 py-4 rounded-2xl text-base font-bold text-gray-600 hover:bg-teal-50 hover:text-[#2A8B8B] transition-all">Plan</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/trips" active-class="bg-[#2A8B8B] text-white shadow-md" class="block px-6 py-4 rounded-2xl text-base font-bold text-gray-600 hover:bg-teal-50 hover:text-[#2A8B8B] transition-all">Trips</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/groups" active-class="bg-[#2A8B8B] text-white shadow-md" class="block px-6 py-4 rounded-2xl text-base font-bold text-gray-600 hover:bg-teal-50 hover:text-[#2A8B8B] transition-all">Groups</router-link>
        
        <router-link @click="isMobileMenuOpen = false" to="/subscription" active-class="bg-[#2A8B8B] text-white shadow-md" class="block px-6 py-4 rounded-2xl text-base font-bold text-gray-600 hover:bg-teal-50 hover:text-[#2A8B8B] transition-all flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          Premium
        </router-link>
        <router-link @click="isMobileMenuOpen = false" to="/profile" active-class="bg-[#2A8B8B] text-white shadow-md" class="block px-6 py-4 rounded-2xl text-base font-bold text-gray-600 hover:bg-teal-50 hover:text-[#2A8B8B] transition-all border-t border-gray-100 mt-2">My Profile</router-link>
      </div>
    </div>
  </nav>
</template>