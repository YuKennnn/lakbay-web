<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const user = ref({
  name: 'Traveler',
  email: 'travelling@lakbay.app',
  // Placeholder image for the profile picture
  avatar: '.././src/assets/images/me.png' 
});

onMounted(() => {
  user.value.name = localStorage.getItem('user_fullname') || 'Traveler';
  user.value.email = localStorage.getItem('user_email') || 'Unknown';
});

const router = useRouter()

const handleSignOut = () => {
  // 1. Clear any user data/tokens here (e.g., localStorage.clear())
  localStorage.removeItem('access_token')
  console.log("User signed out!")
  
  // 2. Push them back to the login screen
  router.push('/login')
}

// Settings options array dynamically rendering the alternating colors from your design
const settingsOptions = ref([
  { 
    id: 1, title: 'Edit Profile', desc: 'Update your personal information', 
    colorClass: 'text-lakbay-orange border-orange-200 bg-orange-50/50 hover:border-lakbay-orange hover:shadow-orange-100',
    iconColor: 'text-lakbay-orange',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>`
  },
  { 
    id: 2, title: 'Privacy & Security', desc: 'Manage your privacy settings', 
    colorClass: 'text-lakbay-teal border-teal-200 bg-teal-50/50 hover:border-lakbay-teal hover:shadow-teal-100',
    iconColor: 'text-lakbay-teal',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>`
  },
  { 
    id: 3, title: 'Notifications', desc: 'Configure notification preferences', 
    colorClass: 'text-lakbay-orange border-orange-200 bg-orange-50/50 hover:border-lakbay-orange hover:shadow-orange-100',
    iconColor: 'text-lakbay-orange',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>`
  },
  { 
    id: 4, title: 'Help Center', desc: 'Get support and find answers', 
    colorClass: 'text-lakbay-teal border-teal-200 bg-teal-50/50 hover:border-lakbay-teal hover:shadow-teal-100',
    iconColor: 'text-lakbay-teal',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`
  },
  { 
    id: 5, title: 'Contact Us', desc: 'support@lakbay.app', 
    colorClass: 'text-lakbay-orange border-orange-200 bg-orange-50/50 hover:border-lakbay-orange hover:shadow-orange-100',
    iconColor: 'text-lakbay-orange',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>`
  },
  { 
    id: 6, title: 'My Subscriptions', desc: 'View my subscription details', 
    colorClass: 'text-lakbay-teal border-teal-200 bg-orange-50/50 hover:border-lakbay-teal hover:shadow-teal-100',
    iconColor: 'text-lakbay-teal',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>`
  }
]);
</script>

<template>
  <div class="pb-24 pt-8 min-h-screen bg-gray-50/30">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-10 group">
        
        <div class="h-40 sm:h-56 bg-gradient-to-br from-[#2A8B8B] to-[#43A0A0] relative overflow-hidden">
          <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div class="absolute bottom-0 left-1/4 w-40 h-40 rounded-full bg-lakbay-orange opacity-20 blur-2xl"></div>
          
          <button class="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white p-2 rounded-full transition duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
          </button>
        </div>

        <div class="px-6 sm:px-10 pb-8 flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 sm:-mt-20 relative z-10">
          
          <div class="relative shrink-0">
            <img :src="user.avatar" alt="Profile" class="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-md object-cover bg-white" />
            <button class="absolute bottom-2 right-2 bg-lakbay-orange text-white p-2 rounded-full shadow-lg hover:scale-105 transition border-2 border-white">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button>
          </div>

          <div class="text-center sm:text-left mb-2 sm:mb-4 flex-grow">
            <h1 class="text-3xl sm:text-4xl font-bold text-lakbay-teal tracking-tight">{{ user.name }}</h1>
            <p class="text-gray-500 font-medium mt-1">{{ user.email }}</p>
          </div>

          <div class="hidden sm:flex gap-3 mb-4">
            <button class="bg-white border border-gray-200 text-gray-700 font-semibold py-2.5 px-6 rounded-full hover:bg-gray-50 transition shadow-sm text-sm">
              Share Profile
            </button>
            <button @click="handleSignOut" class="bg-lakbay-orange text-white font-bold py-2.5 px-8 rounded-full hover:bg-[#c4682c] transition shadow-md text-sm">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-6 pl-2">Account Settings</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div v-for="option in settingsOptions" :key="option.id" to="/subscriptions" 
               :class="[`border rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-200 group bg-white shadow-sm`, option.colorClass]">
            
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
              <svg class="w-6 h-6" :class="option.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="option.icon"></svg>
            </div>

            <div class="flex-grow">
              <h3 class="font-bold text-base mb-0.5" :class="option.iconColor">{{ option.title }}</h3>
              <p class="text-[13px] text-gray-500">{{ option.desc }}</p>
            </div>

            <div class="shrink-0 text-gray-300 group-hover:translate-x-1 transition-transform duration-200" :class="option.iconColor">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
            
          </div>

        </div>

        <button @click="handleSignOut" class="sm:hidden w-full mt-8 bg-red-50 text-red-600 border border-red-100 font-bold py-3.5 rounded-xl hover:bg-red-100 transition shadow-sm">
          Sign Out
        </button>

      </div>
    </div>
  </div>
</template>