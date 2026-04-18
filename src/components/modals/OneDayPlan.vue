<script setup>
import { ref, computed, watch, onUnmounted, nextTick } from 'vue';
import axios from 'axios';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close']);

const mode = ref('form'); // form, loading, result
const generatedOptions = ref(null);
const selectedTier = ref('standard');

const currentOption = computed(() => {
  if (!generatedOptions.value) return null;
  if (selectedTier.value === 'budget') return generatedOptions.value.budget_option;
  if (selectedTier.value === 'standard') return generatedOptions.value.standard_option;
  return generatedOptions.value.premium_option;
});

// Form fields
const planTitle = ref('');
const destination = ref('');
const startingPoint = ref('');
const planDate = ref('');
const peopleCount = ref(2);

const mapContainer = ref(null);
let mapInstance = null;

const initMap = () => {
  if (!mapContainer.value) return;
  
  if (!mapInstance) {
    mapInstance = L.map(mapContainer.value);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance);
  }

  // Clear existing markers/lines
  mapInstance.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      mapInstance.removeLayer(layer);
    }
  });

  const points = [];

  if (currentOption.value?.starting_point_coords?.lat) {
    const sp = currentOption.value.starting_point_coords;
    if (sp.lat !== 0 && sp.lng !== 0) {
        const latlng = [sp.lat, sp.lng];
        points.push(latlng);
        L.marker(latlng).bindPopup(`<b>🏁 Starting Point</b><br>${sp.name}`).addTo(mapInstance);
    }
  }

  const places = currentOption.value?.places_and_activities || [];
  
  places.forEach((place) => {
    if (place.lat && place.lng) {
      const latlng = [place.lat, place.lng];
      points.push(latlng);
      L.marker(latlng).bindPopup(`<b>${place.place}</b><br>${place.time}`).addTo(mapInstance);
    }
  });

  if (points.length > 0) {
    L.polyline(points, { color: '#D97736', weight: 4, dashArray: '5, 10' }).addTo(mapInstance);
    mapInstance.fitBounds(L.latLngBounds(points), { padding: [50, 50] });
  }
};

watch(currentOption, () => {
  if (mode.value === 'result') {
    nextTick(() => {
      initMap();
    });
  }
});

watch(mode, (newMode) => {
  if (newMode === 'result') {
    nextTick(() => {
      initMap();
      setTimeout(() => { if (mapInstance) mapInstance.invalidateSize(); }, 200);
    });
  }
});

// Reset state when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    mode.value = 'form';
    generatedOptions.value = null;
  } else {
    document.body.style.overflow = '';
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});

const generatePlan = async () => {
  if (!destination.value || !planDate.value) return;
  
  mode.value = 'loading';
  
  const systemPrompt = `You are LakbayAI, a specialized travel planning assistant for the Lakbay+ mobile application. Your ONLY purpose is to help users in the Philippines plan group trips by providing accurate, realistic cost estimates.

═══════════════════════════════════════════════════════════════
DOMAIN & CONSTRAINTS
═══════════════════════════════════════════════════════════════

You operate STRICTLY within these boundaries:
- ONLY answer questions about travel planning in the Philippines
- ONLY estimate costs for trips within the Philippines
- ONLY use Philippine Peso (PHP) for all currency values
- If asked anything outside travel planning, respond with: {"error": "non_travel_query", "message": "I can only help with travel planning in the Philippines. Please ask about destinations, budgets, itineraries, or activities."}

═══════════════════════════════════════════════════════════════
YOUR TASK
═══════════════════════════════════════════════════════════════

Based on the user's inputs below, generate THREE 1-day trip options: Budget, Standard, and Premium.

For each option, you must estimate:
1. Total budget (sum of all costs for the entire group)
2. Breakdown of costs (transportation, food, activities, other)
3. Transportation type (specific to the route)
4. A short, motivational savings pitch
5. A beautifully detailed, immersive, and highly descriptive timeline of places to visit and activities to do. Write the descriptions in a warm, humane, and engaging tone—like a local friend giving you the best insider tips and painting a vivid picture of the experience!
   - For "place": Give the specific, full name of the establishment or tourist spot.
   - For "address": Provide a realistic, specific street or area address.
   - For "activity": Write ONE engaging, vivid, and immersive sentence painting a picture of the experience or vibe. Keep it strictly under 25 words to prevent token cutoff.
   - For "lat" and "lng": Provide accurate geographic coordinates (latitude and longitude floats) for the place so it can be correctly plotted on an interactive map.
   - For "starting_point_coords": Based on the user's "Starting Point" input, determine its accurate approximate latitude and longitude. Use the "name" field to describe this starting location. If the user's Starting Point is empty or N/A, try to intelligently infer a generic starting point (like the main transport hub of the destination city).

═══════════════════════════════════════════════════════════════
PRICE REFERENCE GUIDE (Use these as baselines)
═══════════════════════════════════════════════════════════════

TRANSPORTATION (per person, one way):
- Jeepney/Tricycle (short distance): ₱13-₱50
- Provincial Bus (2-4 hours): ₱150-₱400
- Ferry (2-5 hours): ₱300-₱1,500
- Shared Van (2-4 hours): ₱200-₱500
- Private Car (fuel + tolls for 4 people, per day): ₱1,500-₱3,000

FOOD (per person, per day):
- Budget (carinderia, street food): ₱150-₱300
- Standard (local restaurants): ₱300-₱600
- Premium (resort dining, seafood): ₱600-₱1,500

ACTIVITIES (per person):
- Free/DIY: ₱0-₱100
- Budget tours (group shared): ₱200-₱500
- Standard tours (guided): ₱500-₱1,500
- Premium tours (private, all-inclusive): ₱1,500-₱4,000

═══════════════════════════════════════════════════════════════
OUTPUT FORMAT (REQUIRED - STRICT JSON)
═══════════════════════════════════════════════════════════════

You MUST respond with ONLY this JSON structure. No extra text, no markdown, no explanations.

{
  "budget_option": {
    "tier": "budget",
    "total_budget": 0,
    "starting_point_coords": { "lat": 0.0, "lng": 0.0, "name": "string" },
    "breakdown": {
      "transportation": 0,
      "food": 0,
      "activities": 0,
      "other": 0
    },
    "transportation_type": "string",
    "savings_pitch": "string",
    "places_and_activities": [
      {
        "time": "Morning",
        "place": "string",
        "address": "string",
        "activity": "string",
        "estimated_cost": 0,
        "lat": 0.0,
        "lng": 0.0
      }
    ]
  },
  "standard_option": {
    "tier": "standard",
    "total_budget": 0,
    "starting_point_coords": { "lat": 0.0, "lng": 0.0, "name": "string" },
    "breakdown": {
      "transportation": 0,
      "food": 0,
      "activities": 0,
      "other": 0
    },
    "transportation_type": "string",
    "savings_pitch": "string",
    "places_and_activities": [
      {
        "time": "Afternoon",
        "place": "string",
        "address": "string",
        "activity": "string",
        "estimated_cost": 0,
        "lat": 0.0,
        "lng": 0.0
      }
    ]
  },
  "premium_option": {
    "tier": "premium",
    "total_budget": 0,
    "starting_point_coords": { "lat": 0.0, "lng": 0.0, "name": "string" },
    "breakdown": {
      "transportation": 0,
      "food": 0,
      "activities": 0,
      "other": 0
    },
    "transportation_type": "string",
    "savings_pitch": "string",
    "places_and_activities": [
      {
        "time": "Evening",
        "place": "string",
        "address": "string",
        "activity": "string",
        "estimated_cost": 0,
        "lat": 0.0,
        "lng": 0.0
      }
    ]
  }
}

═══════════════════════════════════════════════════════════════
USER INPUTS (Fill these with your form data)
═══════════════════════════════════════════════════════════════

Destination: ${destination.value}
Starting Point: ${startingPoint.value || 'N/A'}
Proposed Date: ${planDate.value}
Number of People: ${peopleCount.value}
Trip Duration: 1 day
User Preferences: ${planTitle.value}`;

  try {
    /* 
    // FALLBACK: Native Gemini API Call (Currently hitting quota limits on provided key)
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [{
        role: "user",
        parts: [{ text: "Please generate the 1-day trip plan based on the inputs." }]
      }],
      generationConfig: {
        response_mime_type: "application/json",
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    let content = response.data.candidates[0].content.parts[0].text;
    */

    // ACTIVE: OpenRouter API Call acting as a proxy to Gemini 2.5 Flash
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'google/gemini-2.5-flash',
      messages: [{ role: 'user', content: systemPrompt }],
      response_format: { type: 'json_object' },
      max_tokens: 8000
    }, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173', 
        'X-Title': 'Lakbay+'
      }
    });
    
    let content = response.data.choices[0].message.content;
    // Strip markdown formatting if any
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    generatedOptions.value = JSON.parse(content);
    
    selectedTier.value = 'standard';
    mode.value = 'result';
  } catch (err) {
    console.error("AI Generation Error: ", err);
    let errorMsg = "Oops! Something went wrong generating your trip.";
    if (err.response?.data?.error?.message) {
        errorMsg += "\\nError: " + err.response.data.error.message;
    } else if (err.message) {
        errorMsg += "\\nError: " + err.message;
    }
    alert(errorMsg);
    mode.value = 'form';
  }
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 p-4">
    <div class="bg-white w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl animate-fade-in relative max-h-[90vh] flex flex-col">
      
      <!-- HEADER -->
      <div class="bg-gradient-to-r from-[#2A8B8B] to-[#1e6666] px-6 py-5 flex justify-between items-center text-white shrink-0">
        <h3 class="font-bold tracking-wider text-sm uppercase">Lakbay AI 1-Day Planner</h3>
        <button @click="$emit('close')" class="bg-white/20 text-white hover:bg-white hover:text-[#2A8B8B] rounded-full p-2 shadow-sm transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      
      <!-- FORM MODE -->
      <div v-if="mode === 'form'" class="p-6 overflow-y-auto custom-scrollbar flex-grow">
        <div class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Plan Title</label>
            <input v-model="planTitle" type="text" placeholder="e.g., Quick Manila Food Crawl" class="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#2A8B8B] text-sm text-gray-700 placeholder-gray-400 bg-gray-50">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Destination</label>
              <input v-model="destination" type="text" placeholder="e.g., Binondo" class="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#2A8B8B] text-sm text-gray-700 placeholder-gray-400 bg-gray-50">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Starting Point</label>
              <input v-model="startingPoint" type="text" placeholder="e.g., Makati" class="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#2A8B8B] text-sm text-gray-700 placeholder-gray-400 bg-gray-50">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input v-model="planDate" type="date" class="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#2A8B8B] text-sm text-gray-700 bg-gray-50">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Number of People</label>
              <input v-model="peopleCount" type="number" min="1" class="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#2A8B8B] text-sm text-gray-700 bg-gray-50">
            </div>
          </div>

          <button @click="generatePlan" :disabled="!destination || !planDate" class="w-full bg-[#D97736] text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl shadow-[0_8px_20px_rgba(217,119,54,0.3)] hover:bg-[#c4682c] hover:-translate-y-1 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex justify-center items-center gap-2">
            <span class="text-xl">✨</span>
            Generate AI Plan
          </button>
        </div>
      </div>

      <!-- LOADING MODE -->
      <div v-else-if="mode === 'loading'" class="p-16 flex flex-col items-center justify-center text-center space-y-6 flex-grow">
        <div class="relative w-24 h-24 flex items-center justify-center">
          <div class="absolute inset-0 border-4 border-teal-100 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-[#2A8B8B] rounded-full border-t-transparent animate-spin"></div>
          <span class="text-3xl animate-pulse">✨</span>
        </div>
        <div>
          <h4 class="text-xl font-black text-[#2A8B8B] mb-2">Asking AI...</h4>
          <p class="text-sm text-gray-500 font-medium">Crafting the perfect 1-Day Plan for: <br/> <span class="text-[#D97736] font-bold">"{{ destination }}"</span></p>
        </div>
      </div>

      <!-- RESULT MODE -->
      <div v-else-if="mode === 'result'" class="overflow-y-auto custom-scrollbar flex-grow p-6 bg-[#F8FAFB]">
        <div class="bg-white rounded-[2rem] p-6 border-2 border-gray-100 shadow-sm relative overflow-hidden">
          
          <!-- Trip Summary Banner -->
          <div class="bg-teal-50/50 rounded-2xl p-4 mb-6 border border-teal-100/50 flex flex-wrap gap-4 items-center">
            <div class="flex-1 min-w-[120px]">
              <span class="block text-[10px] font-black text-teal-600/60 uppercase tracking-widest mb-0.5">Destination</span>
              <span class="text-sm font-bold text-gray-800">{{ destination }}</span>
            </div>
            <div class="w-px h-8 bg-teal-200/50 hidden sm:block"></div>
            <div class="flex-1 min-w-[120px]">
              <span class="block text-[10px] font-black text-teal-600/60 uppercase tracking-widest mb-0.5">Date</span>
              <span class="text-sm font-bold text-gray-800">{{ planDate }}</span>
            </div>
            <div class="w-px h-8 bg-teal-200/50 hidden sm:block"></div>
            <div class="flex-[0.5] min-w-[80px]">
              <span class="block text-[10px] font-black text-teal-600/60 uppercase tracking-widest mb-0.5">Group Size</span>
              <span class="text-sm font-bold text-gray-800">{{ peopleCount }} {{ peopleCount > 1 ? 'People' : 'Person' }}</span>
            </div>
          </div>

          <!-- Tabs -->
          <div class="flex bg-gray-100 p-1 rounded-full mb-8 relative">
            <button @click="selectedTier = 'budget'" :class="{'bg-white shadow text-[#2A8B8B]': selectedTier === 'budget', 'text-gray-500 hover:text-gray-700': selectedTier !== 'budget'}" class="flex-1 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all z-10">Budget</button>
            <button @click="selectedTier = 'standard'" :class="{'bg-white shadow text-[#2A8B8B]': selectedTier === 'standard', 'text-gray-500 hover:text-gray-700': selectedTier !== 'standard'}" class="flex-1 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all z-10">Standard</button>
            <button @click="selectedTier = 'premium'" :class="{'bg-white shadow text-[#2A8B8B]': selectedTier === 'premium', 'text-gray-500 hover:text-gray-700': selectedTier !== 'premium'}" class="flex-1 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all z-10">Premium</button>
          </div>
          
          <div class="text-center mb-6">
            <h2 class="text-4xl sm:text-5xl font-black text-gray-800 tracking-tighter">₱{{ currentOption?.total_budget?.toLocaleString() }}</h2>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Total Estimated Cost</p>
          </div>

          <div class="bg-orange-50 border border-orange-100/50 p-4 rounded-2xl mb-8 flex gap-3">
            <span class="text-xl">💡</span>
            <p class="text-sm font-bold text-[#D97736] leading-relaxed">{{ currentOption?.savings_pitch }}</p>
          </div>

          <div class="space-y-4">
            <h4 class="font-black text-[#2A8B8B] text-sm uppercase tracking-widest mt-2 mb-3 border-b border-gray-100 pb-2">Transportation & Commute</h4>
            <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100/50">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><svg class="w-3.5 h-3.5 text-[#D97736]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg> Commute Fares / Tolls</h4>
                <div class="text-xs font-black text-[#2A8B8B]">₱{{ currentOption?.breakdown?.transportation?.toLocaleString() }}</div>
              </div>
              <p class="text-sm font-bold text-gray-700 leading-snug">{{ currentOption?.transportation_type }}</p>
            </div>

            <h4 class="font-black text-[#2A8B8B] text-sm uppercase tracking-widest mt-8 mb-3 border-b border-gray-100 pb-2">Activities, Food & Misc.</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 flex justify-between items-center">
                <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><svg class="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/></svg> Food</h4>
                <div class="text-xs font-black text-[#2A8B8B]">₱{{ currentOption?.breakdown?.food?.toLocaleString() }}</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 flex justify-between items-center">
                <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><svg class="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activities</h4>
                <div class="text-xs font-black text-[#2A8B8B]">₱{{ currentOption?.breakdown?.activities?.toLocaleString() }}</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 flex justify-between items-center sm:col-span-2">
                <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Other / Contingency</h4>
                <div class="text-xs font-black text-[#2A8B8B]">₱{{ currentOption?.breakdown?.other?.toLocaleString() }}</div>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-100">
              <h4 class="font-black text-[#2A8B8B] text-lg mb-4 flex items-center gap-2">Travel Route Map</h4>
              <div class="w-full h-64 bg-gray-100 rounded-2xl overflow-hidden mb-8 border border-gray-200 z-0 relative">
                <div ref="mapContainer" class="w-full h-full"></div>
              </div>

              <h4 class="font-black text-[#2A8B8B] text-lg mb-4 flex items-center gap-2">Places & Activities</h4>
              <div class="space-y-4">
                <div v-for="(item, idx) in currentOption?.places_and_activities" :key="idx" class="relative pl-6 border-l-2 border-teal-100">
                  <div class="absolute -left-[9px] top-1.5 w-4 h-4 bg-[#2A8B8B] rounded-full border-4 border-white shadow-sm"></div>
                  <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 hover:border-teal-200 transition-colors">
                    <div class="flex justify-between items-start mb-1.5">
                      <span class="text-[10px] font-black text-[#D97736] uppercase tracking-widest">{{ item.time }}</span>
                      <span class="text-xs font-black text-[#2A8B8B] bg-white px-2.5 py-1 rounded-md shadow-sm border border-gray-100">₱{{ item.estimated_cost?.toLocaleString() }}</span>
                    </div>
                    <h5 class="text-sm font-bold text-gray-800">{{ item.place }}</h5>
                    <p class="text-[10px] text-gray-400 font-medium mb-1"><span class="mr-1">📍</span>{{ item.address }}</p>
                    <p class="text-xs text-gray-500 mt-1 leading-relaxed">{{ item.activity }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="mode === 'result'" class="p-4 sm:p-5 border-t border-gray-100 flex flex-wrap gap-3 bg-white shrink-0">
        <button @click="mode = 'form'" class="flex-1 min-w-[100px] py-3.5 rounded-2xl font-black text-[#2A8B8B] bg-teal-50 hover:bg-teal-100 transition uppercase tracking-widest text-[10px] sm:text-xs">
          ← Back
        </button>
        <button @click="$emit('close')" class="flex-1 min-w-[100px] py-3.5 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition border-2 border-gray-100 uppercase tracking-widest text-[10px] sm:text-xs">
          Discard
        </button>
        <button @click="$emit('close')" class="w-full sm:w-auto sm:flex-[1.5] bg-[#D97736] text-white py-3.5 rounded-2xl font-black shadow-[0_8px_20px_rgba(217,119,54,0.3)] hover:bg-[#c4682c] hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
          Save to Trips
        </button>
      </div>

    </div>
  </div>
</template>
