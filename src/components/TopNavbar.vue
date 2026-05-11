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

        <div class="hidden sm:flex items-center space-x-8">
          <router-link to="/plan" active-class="text-[#D97736] border-[#D97736]" class="text-gray-500 hover:text-[#2A8B8B] px-1 pt-1 border-b-2 border-transparent text-sm font-bold transition-colors">Plan</router-link>
          <router-link to="/trips" active-class="text-[#D97736] border-[#D97736]" class="text-gray-500 hover:text-[#2A8B8B] px-1 pt-1 border-b-2 border-transparent text-sm font-bold transition-colors">Trips</router-link>
          
          <router-link to="/groups" active-class="text-[#D97736] border-[#D97736]" class="text-gray-500 hover:text-[#2A8B8B] px-1 pt-1 border-b-2 border-transparent text-sm font-bold transition-colors">Groups</router-link>
          
          <router-link to="/subscription" active-class="text-[#D97736] border-[#D97736]" class="text-[#D97736] hover:text-[#c4682c] px-1 pt-1 border-b-2 border-transparent text-sm font-bold transition-colors flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            Premium
          </router-link>
          
          <router-link 
            to="/profile" 
            active-class="bg-orange-100 ring-2 ring-[#D97736]"
            class="bg-[#F4EBE1] p-2 rounded-full text-[#D97736] hover:bg-orange-100 transition shadow-sm cursor-pointer flex items-center justify-center shrink-0 ml-4"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
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

    <div v-show="isMobileMenuOpen" class="sm:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
      <div class="px-4 pt-2 pb-6 space-y-1 flex flex-col">
        <router-link @click="isMobileMenuOpen = false" to="/plan" active-class="text-[#D97736] bg-orange-50" class="block px-4 py-3 rounded-xl text-base font-bold text-gray-600 hover:bg-gray-50 transition-colors">Plan</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/trips" active-class="text-[#D97736] bg-orange-50" class="block px-4 py-3 rounded-xl text-base font-bold text-gray-600 hover:bg-gray-50 transition-colors">Trips</router-link>
        
        <router-link @click="isMobileMenuOpen = false" to="/groups" active-class="text-[#D97736] bg-orange-50" class="block px-4 py-3 rounded-xl text-base font-bold text-gray-600 hover:bg-gray-50 transition-colors">Groups</router-link>
        
        <router-link @click="isMobileMenuOpen = false" to="/subscription" active-class="text-[#D97736] bg-orange-50" class="block px-4 py-3 rounded-xl text-base font-bold text-[#D97736] hover:bg-orange-50 transition-colors flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          Premium
        </router-link>
        <router-link @click="isMobileMenuOpen = false" to="/profile" active-class="text-[#D97736] bg-orange-50" class="block px-4 py-3 rounded-xl text-base font-bold text-gray-600 hover:bg-gray-50 transition-colors border-t border-gray-100 mt-2">My Profile</router-link>
      </div>
    </div>
  </nav>
</template>