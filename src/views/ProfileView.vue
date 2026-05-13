<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'

const user = ref({
  name: 'Traveler',
  email: 'travelling@lakbay.app',
  avatar: 'https://i.pravatar.cc/150?u=traveller',
  bio: 'Exploring the world one beach at a time. 🏖️',
  phone: '+63 912 345 6789',
  address: 'Metro Manila, Philippines',
  isPremium: false
});

// Modal states
const activeModal = ref(null); // 'edit', 'notifications', 'subscription'
const fileInput = ref(null);
const showError = ref(false);

const validateEmail = (val) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(val);
};

const notifications = ref([
  { id: 1, title: 'Flight Update', body: 'Your flight to Boracay is on schedule.', time: '2h ago', type: 'info', icon: '✈️' },
  { id: 2, title: 'New Memory', body: 'Sarah added a photo to "Island Squad" memories.', time: '5h ago', type: 'social', icon: '📸' },
  { id: 3, title: 'Plan Reminder', body: 'Time to check in for your hotel in Samal.', time: '1d ago', type: 'alert', icon: '🏨' },
]);

onMounted(() => {
  const email = localStorage.getItem('user_email') || 'travelling@lakbay.app';
  user.value.email = email;
  
  // Use user-specific keys to prevent cross-account data leakage
  user.value.name = localStorage.getItem(`user_fullname_${email}`) || localStorage.getItem('user_fullname') || 'Traveler';
  
  const storedAvatar = localStorage.getItem(`user_avatar_${email}`);
  if (storedAvatar) user.value.avatar = storedAvatar;
});

// Scroll Lock logic (same as GroupsView for consistency)
watch(activeModal, (val) => {
  if (val) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.documentElement.style.overflow = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
});

const router = useRouter()

const handleSignOut = () => {
  localStorage.removeItem('access_token')
  router.push('/')
}

const triggerFileUpload = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.avatar = e.target.result;
      // Save with unique key per user
      localStorage.setItem(`user_avatar_${user.value.email}`, e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  if (!validateEmail(user.value.email)) {
    showError.value = true;
    setTimeout(() => showError.value = false, 3000);
    return;
  }
  
  // Save with user-specific key
  localStorage.setItem(`user_fullname_${user.value.email}`, user.value.name);
  localStorage.setItem('user_fullname', user.value.name); // Keep for legacy/nav compatibility
  localStorage.setItem('user_email', user.value.email);
  activeModal.value = null;
};

const handleOptionClick = (title) => {
  if (title === 'Edit Profile') activeModal.value = 'edit';
  else if (title === 'Notifications') activeModal.value = 'notifications';
  else if (title === 'My Subscriptions') activeModal.value = 'subscription';
};

const settingsOptions = ref([
  { 
    id: 1, title: 'Edit Profile', desc: 'Update your personal information', 
    theme: 'orange',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>`
  },
  { 
    id: 2, title: 'Privacy & Security', desc: 'Manage your privacy settings', 
    theme: 'teal',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>`
  },
  { 
    id: 3, title: 'Notifications', desc: 'Configure notification preferences', 
    theme: 'orange',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>`
  },
  { 
    id: 4, title: 'Help Center', desc: 'Get support and find answers', 
    theme: 'teal',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`
  },
  { 
    id: 5, title: 'Contact Us', desc: 'support@lakbay.app', 
    theme: 'orange',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>`
  },
  { 
    id: 6, title: 'My Subscriptions', desc: 'View my subscription details', 
    theme: 'teal',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>`
  }
]);
</script>

<template>
  <div class="pb-24 pt-8 min-h-screen bg-[#F8FAFB] relative overflow-hidden">
    <!-- Hidden File Input -->
    <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileUpload">

    <!-- Decorative Background Blobs -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-lakbay-teal/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lakbay-orange/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div class="bg-white rounded-[2.5rem] shadow-xl shadow-teal-900/5 border border-white overflow-hidden mb-8 lg:mb-10 group transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/10">
        
        <div class="h-40 lg:h-64 bg-gradient-to-br from-[#2A8B8B] via-[#43A0A0] to-[#2A8B8B] relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div class="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white opacity-20 blur-3xl"></div>
          <div class="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-lakbay-orange/20 opacity-30 blur-2xl"></div>
          
          <button @click="triggerFileUpload" class="absolute top-4 right-4 lg:top-6 lg:right-6 bg-white/20 hover:bg-white/40 backdrop-blur-xl text-white p-2.5 lg:p-3 rounded-2xl transition duration-300 border border-white/30 shadow-lg">
            <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
          </button>
        </div>

        <div class="px-6 lg:px-10 pb-8 flex flex-col lg:flex-row items-center lg:items-end gap-4 lg:gap-6 -mt-16 lg:-mt-20 relative z-10">
          
          <div class="relative shrink-0 group/avatar">
            <img :src="user.avatar" alt="Profile" class="w-32 h-32 lg:w-44 lg:h-44 rounded-full border-[6px] border-white shadow-xl object-cover bg-white transition-transform duration-500 group-hover/avatar:scale-105" />
            <button @click="triggerFileUpload" class="absolute bottom-1 right-1 lg:bottom-3 lg:right-3 bg-[#D97736] text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-4 border-white">
              <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
            </button>
          </div>

          <div class="text-center lg:text-left mb-2 lg:mb-6 flex-grow min-w-0">
            <div class="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 justify-center lg:justify-start">
              <h1 class="text-3xl lg:text-4xl font-bold text-[#2A8B8B] tracking-tight break-words leading-tight">{{ user.name }}</h1>
              <span v-if="user.isPremium" class="inline-flex items-center self-center px-3 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-[#D97736] border border-orange-100 uppercase tracking-widest shadow-sm">Premium</span>
            </div>
            <p class="text-gray-400 font-bold mt-1.5 break-words text-sm lg:text-base">{{ user.email }}</p>
          </div>

          <div class="flex flex-col lg:flex-row gap-3 w-full max-w-sm lg:max-w-none mx-auto lg:mx-0 lg:w-auto mt-6 lg:mt-0 lg:mb-6">
            <button class="w-full lg:w-auto bg-gray-50 border border-gray-100 text-gray-600 font-bold py-3.5 lg:py-2.5 px-8 rounded-2xl hover:bg-white hover:border-[#2A8B8B]/30 hover:text-[#2A8B8B] transition-all shadow-sm text-sm">
              Share Profile
            </button>
            <button @click="handleSignOut" class="w-full lg:w-auto bg-[#D97736] text-white font-bold py-3.5 lg:py-2.5 px-10 rounded-2xl hover:bg-[#c4682c] hover:shadow-orange-200 transition-all shadow-lg shadow-orange-100 text-sm">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 pl-2 tracking-tight">Account Settings</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <div v-for="option in settingsOptions" :key="option.id" 
               @click="handleOptionClick(option.title)"
               :class="[
                 `border-2 rounded-3xl p-6 flex items-center gap-5 cursor-pointer transition-all duration-300 group bg-white shadow-sm hover:shadow-xl`,
                 option.theme === 'orange' ? 'border-orange-50 hover:border-[#D97736]/30 hover:shadow-orange-100/50' : 'border-teal-50 hover:border-[#2A8B8B]/30 hover:shadow-teal-100/50'
               ]">
            
            <div :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-300',
              option.theme === 'orange' ? 'bg-orange-50 text-[#D97736]' : 'bg-teal-50 text-[#2A8B8B]'
            ]">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="option.icon"></svg>
            </div>
 
            <div class="flex-grow">
              <h3 class="font-bold text-lg mb-0.5 tracking-tight text-gray-800">{{ option.title }}</h3>
              <p class="text-xs font-bold text-gray-400">{{ option.desc }}</p>
            </div>
 
            <div class="shrink-0 transition-transform duration-300 group-hover:translate-x-1" :class="option.theme === 'orange' ? 'text-[#D97736]' : 'text-[#2A8B8B]'">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </div>
            
          </div>
 
        </div>
 
        <button @click="handleSignOut" class="lg:hidden w-full max-w-sm mx-auto block mt-10 bg-red-50 text-red-600 border border-red-100 font-bold py-4 rounded-2xl hover:bg-red-100 transition shadow-sm">
          Sign Out
        </button>
 
      </div>
    </div>

    <!-- Modals (Teleported) -->
    <Teleport to="body">
      <!-- Edit Profile Modal -->
      <div v-if="activeModal === 'edit'" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        <div class="absolute inset-0 bg-[#F8FAFB]/60 backdrop-blur-3xl animate-fade-in touch-none" @click="activeModal = null"></div>
        <div class="bg-white w-[92%] max-w-[500px] max-h-[90vh] rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10 animate-slide-up border border-white/80 overflow-y-auto custom-scrollbar">
          <div class="p-8 sm:p-10">
            <div class="flex justify-between items-start mb-8">
              <div>
                <h3 class="text-3xl font-bold text-[#2A8B8B] tracking-tight">Edit Profile</h3>
                <p class="text-gray-500 text-sm mt-1">Keep your information up to date.</p>
              </div>
              <button @click="activeModal = null" class="p-2 hover:bg-gray-100 rounded-full transition">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" stroke-linecap="round"/></svg>
              </button>
            </div>

            <div class="space-y-5">
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input v-model="user.name" type="text" class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-[#2A8B8B] transition font-bold text-gray-700">
              </div>
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input v-model="user.email" type="email" 
                  :class="[
                    'w-full bg-gray-50 border-2 rounded-2xl py-4 px-6 outline-none transition font-bold text-gray-700',
                    showError ? 'border-red-400' : 'border-gray-100 focus:border-[#2A8B8B]'
                  ]">
                <p v-if="showError" class="text-[10px] text-red-500 font-bold mt-2 ml-1 animate-pulse">Invalid user</p>
              </div>
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Bio</label>
                <textarea v-model="user.bio" rows="3" class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-[#2A8B8B] transition font-bold text-gray-700 resize-none"></textarea>
              </div>
              <button @click="saveProfile" class="w-full bg-[#2A8B8B] text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-100 hover:bg-[#237777] transition-all mt-4 text-lg">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications Modal -->
      <div v-if="activeModal === 'notifications'" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        <div class="absolute inset-0 bg-[#F8FAFB]/60 backdrop-blur-3xl animate-fade-in touch-none" @click="activeModal = null"></div>
        <div class="bg-white w-[92%] max-w-[500px] max-h-[90vh] rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10 animate-slide-up border border-white/80 overflow-y-auto custom-scrollbar">
          <div class="p-8 sm:p-10">
            <div class="flex justify-between items-start mb-8">
              <div>
                <h3 class="text-3xl font-bold text-[#2A8B8B] tracking-tight">Notifications</h3>
                <p class="text-gray-500 text-sm mt-1">Stay updated on your adventures.</p>
              </div>
              <button @click="activeModal = null" class="p-2 hover:bg-gray-100 rounded-full transition">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" stroke-linecap="round"/></svg>
              </button>
            </div>

            <div class="space-y-4">
              <div v-for="notif in notifications" :key="notif.id" class="p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#2A8B8B]/30 transition-all group">
                <div class="flex gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0">
                    {{ notif.icon }}
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-800">{{ notif.title }}</h4>
                    <p class="text-sm text-gray-500 font-bold mt-0.5">{{ notif.body }}</p>
                    <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 block">{{ notif.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription Modal -->
      <div v-if="activeModal === 'subscription'" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        <div class="absolute inset-0 bg-[#F8FAFB]/60 backdrop-blur-3xl animate-fade-in touch-none" @click="activeModal = null"></div>
        <div class="bg-white w-[92%] max-w-[500px] max-h-[90vh] rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10 animate-slide-up border border-white/80 overflow-y-auto custom-scrollbar">
          <div class="p-8 sm:p-10 text-center">
            <div class="w-20 h-20 bg-orange-50 text-[#D97736] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path></svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-800 tracking-tight mb-2">Lakbay+ Premium</h3>
            <p class="text-gray-500 font-bold mb-8">Unlock exclusive travel planning tools and AI insights.</p>

            <div class="bg-teal-50 rounded-3xl p-6 border-2 border-[#2A8B8B]/10 mb-8">
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-[#2A8B8B] uppercase tracking-widest text-xs">Current Plan</span>
                <span class="bg-white px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 border border-gray-100">FREE</span>
              </div>
              <p class="text-left text-sm text-gray-600 font-bold">Standard features enabled. Upgrade for premium perks!</p>
            </div>

            <button class="w-full bg-[#D97736] text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-100 hover:bg-[#c4682c] transition-all text-lg mb-4">
              Upgrade Now — $9.99/mo
            </button>
            <button @click="activeModal = null" class="text-gray-400 font-bold text-sm hover:text-gray-600 transition">Maybe later</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #CBD5E1;
}
</style>