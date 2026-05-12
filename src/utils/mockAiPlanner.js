// FNV-1a inspired hash for better distribution on short strings
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h | 0);
}
function seededRand(seed, i = 0) {
  const s = String(seed) + '_' + String(i) + 'x';
  return (hash(s) % 10000) / 10000;
}
function seededInt(seed, min, max, i = 0) { return min + Math.floor(seededRand(seed, i) * (max - min + 1)); }
function pick(arr, seed, i = 0) { return arr[seededInt(seed, 0, arr.length - 1, i)]; }
function capitalize(s) { return s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '); }
function fmt(n) { return '₱' + n.toLocaleString(); }

const NAMES = ['Marco','Alyssa','Jeric','Camille','Renz','Bea','Joaquin','Nica','Andrei','Steph','Trisha','Kyle','Jasmine','Paolo','Denise'];
const ROLES = ['Editor','Viewer','Contributor','Viewer','Editor','Viewer','Contributor'];
const AVATARS = Array.from({length:15},(_,i)=>`https://i.pravatar.cc/100?u=lakbay${i+1}`);

const MAP_IMAGES = [
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80',
];
const TRIP_IMAGES = [
  'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512100356956-c1226c3af3e8?auto=format&fit=crop&w=600&q=80',
];

const TASK_POOL = [
  'Book roundtrip flights','Reserve hotel/resort','Rent a van or motorbike','Buy travel insurance',
  'Pack clothes & essentials','Prepare first aid kit','Research local restaurants','Download offline maps',
  'Confirm boat/ferry tickets','Arrange airport transfer','Buy snorkeling gear','Book island hopping tour',
  'Print travel documents','Exchange currency','Charge power banks','Set out-of-office email',
  'Reserve restaurant for group dinner','Buy pasalubong budget','Book diving session','Arrange travel permits',
];

// ── Philippine destination database ──
const DB = {
  davao:     { title:'Island Escape to Samal', loc:'Samal Island, Davao del Norte', spots:['Davao Airport','Sasa Wharf','Pearl Farm Beach Resort','Hagimit Falls','Monfort Bat Sanctuary','Maxima Aquafun'], hub:'Davao City', dist:'15 km', dur:'1h 30m', stops:[{n:'Davao Airport',t:'Airport',i:'✈️'},{n:'Sasa Wharf',t:'Port',i:'⛴️'},{n:'Pearl Farm Resort',t:'Hotel',i:'🏨'}] },
  palawan:   { title:'El Nido Expedition', loc:'El Nido, Palawan', spots:['El Nido Airport','Big Lagoon','Small Lagoon','Nacpan Beach','Secret Beach','Shimizu Island'], hub:'Puerto Princesa', dist:'270 km', dur:'5h 30m', stops:[{n:'PPS Airport',t:'Airport',i:'✈️'},{n:'Roxas Stopover',t:'Rest Stop',i:'🍔'},{n:'El Nido Town',t:'Destination',i:'🏝️'}] },
  bohol:     { title:'Bohol Nature & Heritage', loc:'Carmen & Panglao, Bohol', spots:['Tagbilaran Port','Chocolate Hills','Loboc River','Tarsier Sanctuary','Alona Beach','Hinagdanan Cave'], hub:'Tagbilaran', dist:'45 km', dur:'1h 15m', stops:[{n:'Tagbilaran Port',t:'Port',i:'⛴️'},{n:'Chocolate Hills',t:'Landmark',i:'⛰️'},{n:'Panglao Island',t:'Beach',i:'🏖️'}] },
  manila:    { title:'Manila Historical Walk', loc:'Intramuros, Metro Manila', spots:['NAIA Terminal','Fort Santiago','San Agustin Church','National Museum','Rizal Park','Manila Baywalk'], hub:'Makati', dist:'12 km', dur:'45m', stops:[{n:'Makati CBD',t:'City',i:'🏢'},{n:'Intramuros',t:'Historical',i:'🏛️'},{n:'Manila Baywalk',t:'Viewpoint',i:'🌅'}] },
  cebu:      { title:'Queen City of the South', loc:'Cebu City & Mactan', spots:['Mactan Airport','Magellan\'s Cross','Temple of Leah','Tops Lookout','Kawasan Falls','Oslob Whale Sharks'], hub:'Cebu City', dist:'120 km', dur:'3h', stops:[{n:'Mactan Airport',t:'Airport',i:'✈️'},{n:'Cebu City',t:'City',i:'🏙️'},{n:'Kawasan Falls',t:'Nature',i:'🌊'}] },
  siargao:   { title:'Surfing Paradise Siargao', loc:'General Luna, Siargao', spots:['Sayak Airport','Cloud 9 Surfing','Sugba Lagoon','Magpupungko Rock Pools','Naked Island','Daku Island'], hub:'General Luna', dist:'25 km', dur:'40m', stops:[{n:'Sayak Airport',t:'Airport',i:'✈️'},{n:'General Luna',t:'Town',i:'🏄'},{n:'Cloud 9',t:'Surf Spot',i:'🌊'}] },
  boracay:   { title:'White Beach Getaway', loc:'Boracay Island, Aklan', spots:['Caticlan Airport','White Beach Station 1','Puka Shell Beach','Ariel\'s Point','D\'Mall','Willy\'s Rock'], hub:'Caticlan', dist:'7 km', dur:'30m', stops:[{n:'Caticlan Jetty',t:'Port',i:'⛴️'},{n:'Cagban Port',t:'Port',i:'🚢'},{n:'White Beach',t:'Beach',i:'🏖️'}] },
  batanes:   { title:'Rolling Hills of Batanes', loc:'Basco, Batanes', spots:['Basco Airport','Valugan Boulder Beach','Naidi Hills','Fundacion Pacita','Sabtang Island','Marlboro Country'], hub:'Basco', dist:'30 km', dur:'1h', stops:[{n:'Basco Airport',t:'Airport',i:'✈️'},{n:'Basco Town',t:'Town',i:'🏘️'},{n:'Sabtang Ferry',t:'Port',i:'⛴️'}] },
  baguio:    { title:'Summer Capital Escape', loc:'Baguio City, Benguet', spots:['Baguio Bus Terminal','Burnham Park','Mines View Park','Strawberry Farm','BenCab Museum','Session Road'], hub:'Baguio City', dist:'250 km', dur:'5h', stops:[{n:'Manila Bus Terminal',t:'Terminal',i:'🚌'},{n:'Kennon Road',t:'Scenic Road',i:'🛤️'},{n:'Burnham Park',t:'Park',i:'🌲'}] },
  iloilo:    { title:'Heart of the Visayas', loc:'Iloilo City, Iloilo', spots:['Iloilo Airport','Miag-ao Church','Garin Farm','Islas de Gigantes','La Paz Batchoy','Esplanade'], hub:'Iloilo City', dist:'40 km', dur:'1h 20m', stops:[{n:'Iloilo Airport',t:'Airport',i:'✈️'},{n:'Iloilo City',t:'City',i:'🏙️'},{n:'Gigantes Port',t:'Port',i:'⛴️'}] },
  vigan:     { title:'Heritage Walk in Vigan', loc:'Vigan City, Ilocos Sur', spots:['Laoag Airport','Calle Crisologo','Bantay Bell Tower','Hidden Garden','Baluarte Zoo','Pagburnayan Pottery'], hub:'Vigan City', dist:'80 km', dur:'2h', stops:[{n:'Laoag Airport',t:'Airport',i:'✈️'},{n:'Paoay Church',t:'Heritage',i:'⛪'},{n:'Calle Crisologo',t:'Heritage',i:'🏛️'}] },
  coron:     { title:'Coron Lagoon Adventure', loc:'Coron, Palawan', spots:['Busuanga Airport','Kayangan Lake','Twin Lagoon','Barracuda Lake','Malcapuya Island','Mt. Tapyas'], hub:'Coron Town', dist:'35 km', dur:'1h', stops:[{n:'Busuanga Airport',t:'Airport',i:'✈️'},{n:'Coron Town',t:'Town',i:'🏘️'},{n:'Kayangan Lake',t:'Lake',i:'💧'}] },
  camiguin:  { title:'Island Born of Fire', loc:'Mambajao, Camiguin', spots:['Camiguin Airport','White Island','Katibawasan Falls','Sunken Cemetery','Ardent Hot Springs','Old Volcano Trail'], hub:'Mambajao', dist:'20 km', dur:'45m', stops:[{n:'Camiguin Airport',t:'Airport',i:'✈️'},{n:'Mambajao Town',t:'Town',i:'🏘️'},{n:'White Island',t:'Sandbar',i:'🏖️'}] },
  dumaguete: { title:'City of Gentle People', loc:'Dumaguete City, Negros Oriental', spots:['Dumaguete Airport','Rizal Boulevard','Apo Island','Casaroro Falls','Twin Lakes','Silliman University'], hub:'Dumaguete', dist:'50 km', dur:'1h 30m', stops:[{n:'Dumaguete Airport',t:'Airport',i:'✈️'},{n:'Dumaguete City',t:'City',i:'🏙️'},{n:'Apo Island',t:'Marine Sanctuary',i:'🐢'}] },
  sagada:    { title:'Mountain Province Trek', loc:'Sagada, Mountain Province', spots:['Baguio Transit','Sumaguing Cave','Hanging Coffins','Bomod-Ok Falls','Kiltepan Viewpoint','Echo Valley'], hub:'Bontoc', dist:'155 km', dur:'6h', stops:[{n:'Baguio Terminal',t:'Bus Terminal',i:'🚌'},{n:'Bontoc',t:'Town',i:'🏘️'},{n:'Sagada Town',t:'Mountain Town',i:'⛰️'}] },
  legazpi:   { title:'Mayon Volcano Escape', loc:'Legazpi City, Albay', spots:['Legazpi Airport','Mayon Volcano','Cagsawa Ruins','Daraga Church','Sumlang Lake','Lignon Hill'], hub:'Legazpi', dist:'15 km', dur:'30m', stops:[{n:'Legazpi Airport',t:'Airport',i:'✈️'},{n:'Cagsawa Ruins',t:'Historical',i:'🏛️'},{n:'Mayon Viewdeck',t:'Viewpoint',i:'🌋'}] },
  tagaytay:  { title:'Cool Breeze in Tagaytay', loc:'Tagaytay City, Cavite', spots:['Tagaytay Rotunda','People\'s Park','Picnic Grove','Sky Ranch','Taal Volcano View','Mahogany Market'], hub:'Tagaytay', dist:'60 km', dur:'1h 30m', stops:[{n:'Manila South',t:'City',i:'🏙️'},{n:'SLEX Toll',t:'Highway',i:'🛣️'},{n:'Tagaytay Rotunda',t:'Landmark',i:'📍'}] },
  zamboanga: { title:'Asia\'s Latin City', loc:'Zamboanga City', spots:['Zamboanga Airport','Fort Pilar','Paseo del Mar','Great Santa Cruz Island','Pasonanca Park','Yakan Weaving Village'], hub:'Zamboanga City', dist:'20 km', dur:'40m', stops:[{n:'Zamboanga Airport',t:'Airport',i:'✈️'},{n:'Fort Pilar',t:'Historical',i:'🏛️'},{n:'Santa Cruz Island',t:'Island',i:'🏝️'}] },
  bukidnon:  { title:'Highland Adventure', loc:'Malaybalay, Bukidnon', spots:['Laguindingan Airport','Dahilayan Adventure Park','Kaamulan Park','Monastery of Transfiguration','Lake Apo','Del Monte Pineapple Fields'], hub:'Cagayan de Oro', dist:'90 km', dur:'2h', stops:[{n:'Laguindingan Airport',t:'Airport',i:'✈️'},{n:'CDO City',t:'City',i:'🏙️'},{n:'Dahilayan Park',t:'Adventure',i:'🎢'}] },
  siquijor:  { title:'Mystic Island Siquijor', loc:'Siquijor Island', spots:['Siquijor Port','Cambugahay Falls','Salagdoong Beach','Lazi Church','Balete Tree','Paliton Beach'], hub:'Siquijor Town', dist:'25 km', dur:'50m', stops:[{n:'Dumaguete Port',t:'Port',i:'⛴️'},{n:'Siquijor Port',t:'Port',i:'🚢'},{n:'Cambugahay Falls',t:'Waterfall',i:'💧'}] },
};

function genMembers(seed) {
  const count = seededInt(seed, 2, 8, 50);
  const members = [{ id: 1, name: 'YuKen', role: 'Host', email: 'yuken67@gmail.com', avatar: 'https://i.pravatar.cc/100?u=yuken' }];
  const used = new Set();
  for (let i = 1; i < count; i++) {
    let idx = seededInt(seed, 0, NAMES.length - 1, i + 100);
    while (used.has(idx)) idx = (idx + 1) % NAMES.length;
    used.add(idx);
    members.push({ id: i + 1, name: NAMES[idx], role: pick(ROLES, seed, i + 200), email: `${NAMES[idx].toLowerCase()}@gmail.com`, avatar: AVATARS[idx] });
  }
  return members;
}

function genTasks(seed, members) {
  const count = seededInt(seed, 3, 7, 60);
  const used = new Set();
  const tasks = [];
  for (let i = 0; i < count; i++) {
    let idx = seededInt(seed, 0, TASK_POOL.length - 1, i + 300);
    while (used.has(idx)) idx = (idx + 1) % TASK_POOL.length;
    used.add(idx);
    const assignee = members[seededInt(seed, 0, members.length - 1, i + 400)];
    tasks.push({ id: i + 1, title: TASK_POOL[idx], assignee: assignee.name, completed: seededRand(seed, i + 500) > 0.6, avatar: assignee.avatar });
  }
  return tasks;
}

function genBudget(seed, memberCount) {
  const total = seededInt(seed, 8, 50, 70) * 1000;
  const percentSpent = seededInt(seed, 10, 75, 71);
  const spentTotal = Math.round(total * percentSpent / 100);
  
  // Categorical breakdown
  const accommodation = Math.round(spentTotal * 0.4);
  const food = Math.round(spentTotal * 0.3);
  const transport = Math.round(spentTotal * 0.2);
  const activities = spentTotal - (accommodation + food + transport);

  return { 
    total: fmt(total), 
    spent: fmt(spentTotal), 
    spentRaw: spentTotal,
    remaining: fmt(total - spentTotal), 
    percentSpent, 
    members: memberCount,
    accommodation,
    food,
    transport,
    activities
  };
}

function genItinerary(seed, spots, loc) {
  const dayCount = seededInt(seed, 2, 4, 80);
  const morningTimes = ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00'];
  const afternoonTimes = ['12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];
  const prices = [null,'₱50','₱75','₱100','₱150','₱200','₱300','₱400','₱500','₱650','₱750','₱850','₱1,000','₱1,200','₱1,500','₱2,000','₱2,500','₱3,500'];
  const verbs = ['Visit','Explore','Tour','Experience','Discover','Relax at','Photography at','Stroll around','Swim at','Hike to','Enjoy','Sightseeing at'];
  const days = [];
  let spotIdx = 0;
  let actId = 1;
  for (let d = 0; d < dayCount; d++) {
    const actCount = seededInt(seed, 2, 4, d * 7 + 91);
    const activities = [];
    for (let a = 0; a < actCount; a++) {
      const spot = spots[spotIdx % spots.length];
      spotIdx++;
      const verb = verbs[(d * actCount + a + seededInt(seed, 0, 5, d * 13 + a * 17)) % verbs.length];
      const timeArr = a < Math.ceil(actCount / 2) ? morningTimes : afternoonTimes;
      const time = timeArr[seededInt(seed, 0, timeArr.length - 1, d * 11 + a * 23 + 200)];
      const price = d === 0 && a === 0 ? null : prices[seededInt(seed, 0, prices.length - 1, d * 19 + a * 31 + 300)];
      activities.push({
        id: actId++,
        title: d === 0 && a === 0 ? `Arrival & Check-in at ${loc}` : `${verb} ${spot}`,
        time,
        location: spot,
        price,
      });
    }
    days.push({ day: `Day ${d + 1}`, activities });
  }
  return days;
}

export function generateTripData(query) {
  const q = (query || '').toLowerCase().trim();
  const seed = q;
  const loc = capitalize(q);

  // Check if we have a known destination
  let entry = null;
  for (const [key, val] of Object.entries(DB)) {
    if (q.includes(key)) { entry = val; break; }
  }

  const members = genMembers(seed);
  const tasks = genTasks(seed, members);
  const budget = genBudget(seed, members.length);

  if (entry) {
    return {
      title: entry.title,
      location: entry.loc,
      duration: `${seededInt(seed, 2, 5, 10)} Days, ${seededInt(seed, 1, 4, 11)} Nights`,
      date: `${pick(['Jun','Jul','Aug','Sep','Oct','Nov'], seed, 12)} ${seededInt(seed, 1, 25, 13)}-${seededInt(seed, 26, 30, 14)}, 2026`,
      image: pick(TRIP_IMAGES, seed, 15),
      budgetObj: budget,
      itinerary: genItinerary(seed, entry.spots, entry.loc),
      route: { start: entry.hub, end: entry.loc, distance: entry.dist, duration: entry.dur, mapImage: pick(MAP_IMAGES, seed, 16), stops: entry.stops },
      members, tasks,
    };
  }

  // Procedural fallback for ANY Philippine location
  const fallbackSpots = [`${loc} Town Center`, `${loc} Beach`, `${loc} Market`, `${loc} Viewpoint`, `${loc} Heritage Site`, `${loc} Falls`, `${loc} Park`];
  const fallbackStops = [
    { id: 1, name: `Nearest Airport to ${loc}`, type: 'Airport', icon: '✈️' },
    { id: 2, name: `${loc} Terminal`, type: 'Transit', icon: '🚌' },
    { id: 3, name: `${loc} Town Proper`, type: 'Destination', icon: '📍' },
  ];
  return {
    title: `Adventure in ${loc}`,
    location: `${loc}, Philippines`,
    duration: `${seededInt(seed, 2, 5, 10)} Days, ${seededInt(seed, 1, 4, 11)} Nights`,
    date: `${pick(['Jun','Jul','Aug','Sep','Oct','Nov','Dec'], seed, 12)} ${seededInt(seed, 1, 25, 13)}-${seededInt(seed, 26, 30, 14)}, 2026`,
    image: pick(TRIP_IMAGES, seed, 15),
    budgetObj: budget,
    itinerary: genItinerary(seed, fallbackSpots, loc),
    route: { start: 'Manila (NAIA)', end: `${loc}, Philippines`, distance: `${seededInt(seed, 50, 800, 20)} km`, duration: `${seededInt(seed, 1, 12, 21)}h ${seededInt(seed, 10, 55, 22)}m`, mapImage: pick(MAP_IMAGES, seed, 23), stops: fallbackStops },
    members, tasks,
  };
}
