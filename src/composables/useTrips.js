import { ref } from 'vue';
import { generateTripData } from '@/utils/mockAiPlanner';

// Generate rich data for each pre-seeded trip so tabs work correctly
const kotaData = generateTripData('cebu');
const elNidoData = generateTripData('palawan');
const camiguinData = generateTripData('camiguin');
const siargaoData = generateTripData('siargao');

const trips = ref([
  {
    id: 1, title: 'Kota Beach Resort', location: 'Bantayan Cebu, Philippines', date: 'Dec 20-25, 2026',
    status: 'Upcoming', spent: '₱0', totalBudget: '₱25,000', budgetPercent: 0,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
    link: '/trip_details',
    itinerary: kotaData.itinerary, route: kotaData.route, budgetObj: kotaData.budgetObj,
    members: kotaData.members, tasks: kotaData.tasks,
  },
  {
    id: 2, title: 'El Nido Adventure', location: 'Palawan, Philippines', date: 'Nov 10-15, 2024',
    status: 'Completed', spent: '₱25,550', totalBudget: '₱25,000', budgetPercent: 100,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    link: '/trip_details',
    itinerary: elNidoData.itinerary, route: elNidoData.route, budgetObj: elNidoData.budgetObj,
    members: elNidoData.members, tasks: elNidoData.tasks,
  },
  {
    id: 3, title: 'Camiguin Island Escape', location: 'Northern Mindanao', date: 'April 10-15, 2026',
    status: 'Ongoing', spent: '₱5,550', totalBudget: '₱25,000', budgetPercent: 22,
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=600&q=80',
    link: '/trip_details',
    itinerary: camiguinData.itinerary, route: camiguinData.route, budgetObj: camiguinData.budgetObj,
    members: camiguinData.members, tasks: camiguinData.tasks,
  },
  {
    id: 4, title: 'Siargao Surfing', location: 'Surigao del Norte', date: 'May 5-10, 2026',
    status: 'Upcoming', spent: '₱0', totalBudget: '₱30,000', budgetPercent: 0,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80',
    link: '/trip_details',
    itinerary: siargaoData.itinerary, route: siargaoData.route, budgetObj: siargaoData.budgetObj,
    members: siargaoData.members, tasks: siargaoData.tasks,
  }
]);

export function useTrips() {
  const addTrip = (trip) => {
    trips.value.unshift(trip); // Add to the top of the list
  };

  return {
    trips,
    addTrip
  };
}
