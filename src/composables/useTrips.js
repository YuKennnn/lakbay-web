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
    status: 'Upcoming', spent: kotaData.budgetObj.spent, totalBudget: kotaData.budgetObj.total, budgetPercent: kotaData.budgetObj.percentSpent,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
    link: '/trip_details',
    itinerary: kotaData.itinerary, route: kotaData.route, budgetObj: kotaData.budgetObj,
    members: [
      { name: 'YuKen', email: 'yuken67@gmail.com', role: 'Host', avatar: 'https://i.pravatar.cc/150?u=y' },
      { name: 'Alyssa', email: 'alyssa@gmail.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?u=a1' },
      { name: 'Jeric', email: 'jeric@gmail.com', role: 'Viewer', avatar: 'https://i.pravatar.cc/150?u=j1' },
      { name: 'Joaquin', email: 'joaquin@gmail.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?u=jo' }
    ],
    memories: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600', location: 'Sandbar', date: 'Dec 21, 2026' },
      { id: 2, type: 'video', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', location: 'Sunset', date: 'Dec 22, 2026', duration: '0:12' }
    ],
    tasks: kotaData.tasks,
  },
  {
    id: 2, title: 'El Nido Adventure', location: 'Palawan, Philippines', date: 'Nov 10-15, 2024',
    status: 'Completed', spent: elNidoData.budgetObj.spent, totalBudget: elNidoData.budgetObj.total, budgetPercent: elNidoData.budgetObj.percentSpent,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    link: '/trip_details',
    itinerary: elNidoData.itinerary, route: elNidoData.route, budgetObj: elNidoData.budgetObj,
    members: [
      { name: 'YuKen', email: 'yuken67@gmail.com', role: 'Host', avatar: 'https://i.pravatar.cc/150?u=y' },
      { name: 'Kyle', email: 'kyle@gmail.com', role: 'Contributor', avatar: 'https://i.pravatar.cc/150?u=k1' }
    ],
    memories: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=600', location: 'Big Lagoon', date: 'Nov 11, 2024' },
      { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600', location: 'Shimizu Island', date: 'Nov 12, 2024' },
      { id: 3, type: 'video', url: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600', location: 'Snorkeling', date: 'Nov 13, 2024', duration: '1:45' }
    ],
    tasks: elNidoData.tasks,
  },
  {
    id: 3, title: 'Camiguin Escape', location: 'Northern Mindanao', date: 'April 10-15, 2026',
    status: 'Ongoing', spent: camiguinData.budgetObj.spent, totalBudget: camiguinData.budgetObj.total, budgetPercent: camiguinData.budgetObj.percentSpent,
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=600&q=80',
    link: '/trip_details',
    itinerary: camiguinData.itinerary, route: camiguinData.route, budgetObj: camiguinData.budgetObj,
    members: [
      { name: 'YuKen', email: 'yuken67@gmail.com', role: 'Host', avatar: 'https://i.pravatar.cc/150?u=y' },
      { name: 'Arjean', email: 'arjean@gmail.com', role: 'Member', avatar: 'https://i.pravatar.cc/150?u=ar' },
      { name: 'Kenneth', email: 'kenneth@gmail.com', role: 'Member', avatar: 'https://i.pravatar.cc/150?u=ke' }
    ],
    memories: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', location: 'White Island', date: 'Apr 11, 2026' }
    ],
    tasks: camiguinData.tasks,
  },
  {
    id: 4, title: 'Siargao Surfing', location: 'Surigao del Norte', date: 'May 5-10, 2026',
    status: 'Upcoming', spent: siargaoData.budgetObj.spent, totalBudget: siargaoData.budgetObj.total, budgetPercent: siargaoData.budgetObj.percentSpent,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80',
    link: '/trip_details',
    itinerary: siargaoData.itinerary, route: siargaoData.route, budgetObj: siargaoData.budgetObj,
    members: [
      { name: 'YuKen', email: 'yuken67@gmail.com', role: 'Host', avatar: 'https://i.pravatar.cc/150?u=y' },
      { name: 'Joaquin', email: 'joaquin@gmail.com', role: 'Viewer', avatar: 'https://i.pravatar.cc/150?u=jo' },
      { name: 'Bea', email: 'bea@gmail.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?u=be' },
      { name: 'Steph', email: 'steph@gmail.com', role: 'Viewer', avatar: 'https://i.pravatar.cc/150?u=st' }
    ],
    memories: [],
    tasks: siargaoData.tasks,
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
