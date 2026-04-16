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

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
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
      localStorage.setItem('user_fullname', fullName.value || email.value.split('@')[0])
      localStorage.setItem('user_email', email.value)
      router.push('/plan')
      
    } else {
      // Only do Login
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email: email.value,
        password: password.value
      })
      
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('user_email', email.value)
      // Since backend doesn't return fullname on login, use previous or fallback to email prefix
      if (!localStorage.getItem('user_fullname') || localStorage.getItem('user_email') !== email.value) {
         localStorage.setItem('user_fullname', email.value.split('@')[0])
      }
      
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
  <div class="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#F4EBE1] font-sans">
    
    <div class="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden ring-1 ring-gray-900/5">
      
      <div class="hidden lg:flex lg:w-1/2 relative bg-[#2A8B8B] items-center justify-center overflow-hidden">
        <div class="absolute inset-0 bg-black/30 z-10"></div>
        <img src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80" class="absolute inset-0 w-full h-full object-cover" />
        
        <div class="relative z-20 text-center px-10">
          <h1 class="text-6xl font-bold text-white tracking-tighter mb-4">LAKBAY<span class="text-[#D97736]">+</span></h1>
          <p class="text-xl text-white opacity-90 font-light">Your Geoanalytics Travel Planner</p>
        </div>
      </div>

      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <!-- Loading Overlay -->
        <div v-if="isLoading" class="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center rounded-[2rem]">
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

          <div class="mt-8 border-t border-gray-200 relative">
            <span class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4 text-sm text-gray-400">Or continue with</span>
          </div>

          <button class="w-full mt-8 border-2 border-gray-100 bg-white text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition flex justify-center items-center gap-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>
