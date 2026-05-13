<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isRegister = ref(false)

const email = ref('')
const password = ref('')
const fullName = ref('') // Added for potential future use (backend currently only requires email/password)
const errorMessage = ref('')
const isLoading = ref(false)

const validateEmail = (val) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(val);
};

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  if (!validateEmail(email.value)) {
    errorMessage.value = "Invalid user"
    isLoading.value = false
    return
  }
  
  try {
    if (isRegister.value) {
      // 1. Send Registration Request to FastAPI Backend
      await axios.post('http://127.0.0.1:8000/api/auth/register', {
        fullname: fullName.value,
        email: email.value,
        password: password.value
      })
      
      // 2. Automatically log them in right after registering
      const loginResponse = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email: email.value,
        password: password.value
      })
      
      localStorage.setItem('access_token', loginResponse.data.access_token)
      localStorage.setItem('user_email', email.value)
      const nameToStore = fullName.value || email.value.split('@')[0];
      localStorage.setItem(`user_fullname_${email.value}`, nameToStore);
      localStorage.setItem('user_fullname', nameToStore); // Legacy compatibility
      router.push('/plan')
      
    } else {
      // Only do Login
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email: email.value,
        password: password.value
      })
      
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('user_email', email.value)
      
      // Load user-specific name if it exists, otherwise use email prefix
      let storedName = localStorage.getItem(`user_fullname_${email.value}`);
      if (!storedName) {
        storedName = email.value.split('@')[0];
        localStorage.setItem(`user_fullname_${email.value}`, storedName);
      }
      localStorage.setItem('user_fullname', storedName);
      
      router.push('/plan')
    }
  } catch (error) {
    // Handle specific FastAPI validation errors or server messages smoothly
    if (error.response && error.response.data && error.response.data.detail) {
      errorMessage.value = typeof error.response.data.detail === 'string' 
        ? error.response.data.detail 
        : "Invalid credentials. Password might need to be 8 characters long."
    } else {
      errorMessage.value = "An unexpected server error occurred. Is the FastAPI backend running?"
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6 sm:p-10 bg-[#F4EBE1] font-sans relative">
    
    <!-- Minimalist Back Button -->
    <button @click="router.push('/')" class="absolute top-6 left-6 sm:top-10 sm:left-10 z-[60] flex items-center gap-2 text-gray-500 hover:text-[#2A8B8B] font-bold text-xs sm:text-sm transition-all group">
      <div class="p-2 bg-white rounded-xl border border-gray-100 group-hover:border-[#2A8B8B] shadow-sm transition-all">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <span class="hidden sm:inline tracking-widest uppercase text-[10px]">Back to Landing</span>
    </button>

    <div class="w-[92%] max-w-[440px] lg:max-w-5xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden ring-1 ring-gray-900/5 animate-fade-in relative">
      
      <div class="hidden lg:flex lg:w-1/2 relative bg-[#2A8B8B] items-center justify-center overflow-hidden">
        <div class="absolute inset-0 bg-black/30 z-10"></div>
        <img src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80" class="absolute inset-0 w-full h-full object-cover" />
        
        <div class="relative z-20 text-center px-10">
          <h1 class="text-6xl font-bold text-white tracking-tighter mb-4">LAKBAY<span class="text-[#D97736]">+</span></h1>
          <p class="text-xl text-white opacity-90 font-light">Your Geoanalytics Travel Planner</p>
        </div>
      </div>

      <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <!-- Loading Overlay -->
        <div v-if="isLoading" class="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center rounded-[2.5rem]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D97736]"></div>
          <span class="mt-4 text-[#D97736] font-bold">Authenticating securely...</span>
        </div>

        <div class="w-full max-w-sm">
          
          <div class="lg:hidden text-center mb-8">
            <h1 class="text-5xl font-bold text-[#D97736] tracking-tighter">LAKBAY<span class="text-[#2A8B8B]">+</span></h1>
          </div>

          <h2 class="text-3xl font-bold text-[#2A8B8B] mb-2">{{ isRegister ? 'Create an Account' : 'Welcome Back!' }}</h2>
          <p class="text-gray-500 mb-6 text-sm">{{ isRegister ? 'Sign up to connect with Lakbay API.' : 'Sign in securely to your account.' }}</p>

          <!-- Error Alert -->
          <div v-if="errorMessage" class="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-start gap-2">
            <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{{ errorMessage }}</span>
          </div>

          <form @submit.prevent="handleSubmit">
            <div v-if="isRegister" class="mb-5">
              <label class="block text-sm font-semibold text-[#D97736] mb-2">Full Name</label>
              <input v-model="fullName" type="text" placeholder="John Doe" class="w-full bg-orange-50 border border-orange-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#D97736] transition text-sm">
            </div>

            <div class="mb-5">
              <label class="block text-sm font-semibold text-[#D97736] mb-2">Email Address</label>
              <input v-model="email" type="email" required placeholder="your@email.com" class="w-full bg-orange-50 border border-orange-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#D97736] transition text-sm">
            </div>

            <div class="mb-3">
              <label class="block text-sm font-semibold text-[#D97736] mb-2">Password</label>
              <input v-model="password" type="password" required minlength="8" placeholder="Must be at least 8 chars" class="w-full bg-orange-50 border border-orange-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#D97736] transition text-sm">
            </div>
            
            <div class="flex justify-end mb-8">
              <a href="#" class="text-sm text-gray-500 hover:text-[#2A8B8B] transition">Forgot Password?</a>
            </div>

            <button type="submit" :disabled="isLoading" class="w-full bg-[#D97736] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-orange-700 transition text-lg flex items-center justify-center gap-2">
              {{ isRegister ? 'Register' : 'Sign In' }}
            </button>
            
            <div class="mt-6 text-center text-sm text-gray-500">
              {{ isRegister ? 'Already have an account?' : "Don't have an account?" }} 
              <button type="button" @click="isRegister = !isRegister; errorMessage = ''" class="text-[#2A8B8B] font-bold hover:underline transition ml-1">
                {{ isRegister ? 'Sign In' : 'Register' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  </div>
</template>
