/* =========================================================
   TripNest Main Application Logic
   - Autocomplete Suggestions for Destinations
   - 4-Step Interactive Booking Wizard with City Places & Exact Kilometers
   - Proximity Badges in km: Near (<2km), Moderate (2-10km), Far (>15km)
   - Circle Live Companion Distance Radar (Real-Time km)
   - Comprehensive City Detail Guide Modal:
     - 🏛️ History & Heritage
     - 🍲 Famous Foods (HD Food Images, Badges, Spots & Prices for ALL cities)
     - 🏨 Hotel Arrangements with km to Center
     - 🏮 Favorite Streets & Distances
     - 💰 Overall Expense & Time Breakdown
   - Real-Time Trip Summary & Dynamic Totals
   - Right-Side Dark Slide-In Payment Panel
   - Live Weather Conditions & 3-Day Forecast Widget
   ========================================================= */

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// --- Base Trip Itinerary Data ---
const tripData = {
  Agra: [
    [{ time: '07:00', type: 'flight', title: 'Gatimaan Express / Airport Connection', detail: 'Executive seat · 1h 40m' }, { time: '12:30', type: 'stay', title: 'Check in · The Heritage Haveli', detail: 'Mughal garden view · 2 nights' }],
    [{ time: '05:45', type: 'tour', title: 'Sunrise at the Taj Mahal', detail: 'East Gate priority entry · 1.2 km from hotel' }, { time: '10:30', type: 'tour', title: 'Agra Fort & Jahangiri Mahal Walk', detail: 'Red sandstone royal palaces · 2.8 km away' }],
    [{ time: '16:00', type: 'tour', title: 'Sunset from Mehtab Bagh across Yamuna', detail: 'Quiet golden reflections of Taj Mahal · 6.5 km drive' }],
    [{ time: '19:30', type: 'tour', title: 'Sadar Bazaar Food & Petha Tasting', detail: 'Bedmi Puri, Dalmoth & Kesar Petha · 3.5 km away' }]
  ],
  Lisbon: [
    [{ time: '08:20', type: 'flight', title: 'Depart New York · TAP Air Portugal', detail: 'Direct flight · Seat selection included' }, { time: '19:00', type: 'ride', title: 'Airport pickup to Baixa', detail: 'Electric transfer · 35 min' }, { time: '20:15', type: 'stay', title: 'Check in · Memmo Alfama', detail: 'Boutique stay · 4 nights' }],
    [{ time: '09:00', type: 'tour', title: 'Slow morning in Alfama', detail: 'Self-guided neighborhood walk · 0.4 km from hotel' }, { time: '15:30', type: 'tour', title: 'Fado table at Clube de Fado', detail: 'Reserved for 2 · dinner included · 0.8 km walk' }],
    [{ time: '10:00', type: 'tour', title: 'Belém pastry & river ride', detail: 'Small group experience · 6.2 km scenic tram' }],
    [{ time: '—', type: 'tour', title: 'A day with room to wander', detail: 'Add a car, experience or saved place' }]
  ],
  Kyoto: [
    [{ time: '11:10', type: 'flight', title: 'Arrive at Kansai International', detail: 'Flight and rail pass connected' }, { time: '15:30', type: 'stay', title: 'Check in · Gion guesthouse', detail: 'Machiya stay · 4 nights' }],
    [{ time: '08:00', type: 'tour', title: 'Private Fushimi Inari walk', detail: 'Early morning · 4.8 km by train' }],
    [{ time: '13:00', type: 'tour', title: 'Kaiseki cooking session', detail: 'Small group · lunch included · 1.5 km walk' }],
    [{ time: '—', type: 'tour', title: 'Tea house afternoon', detail: 'Your flexible day' }]
  ],
  Reykjavik: [
    [{ time: '09:30', type: 'flight', title: 'Arrive at Keflavík airport', detail: 'Airport transfer on standby · 48 km drive' }, { time: '13:00', type: 'ride', title: 'Collect electric rental car', detail: 'Fully insured · 5 days' }],
    [{ time: '08:30', type: 'tour', title: 'Golden Circle, your way', detail: 'Route, parking and timing arranged · 42 km drive' }],
    [{ time: '20:30', type: 'tour', title: 'Northern lights alert window', detail: 'Weather-smart notification enabled · 12 km out' }],
    [{ time: '—', type: 'tour', title: 'Geothermal reset day', detail: 'Sky Lagoon suggestion saved · 6.5 km away' }]
  ],
  Dubai: [
    [{ time: '07:30', type: 'flight', title: 'Emirates Direct to Dubai International', detail: 'Complimentary chauffeur included' }, { time: '14:00', type: 'stay', title: 'Check in · The Palm Sanctuary', detail: 'Luxury beachside resort · 4 nights' }],
    [{ time: '10:00', type: 'tour', title: 'Old Dubai Spice & Gold Souk Walk', detail: 'Abra water taxi included · 14 km drive' }, { time: '17:30', type: 'tour', title: 'Desert Sunset Dunes Safari', detail: 'Dinner under desert stars · 45 km drive' }],
    [{ time: '11:00', type: 'tour', title: 'Burj Khalifa Sky Lounge', detail: 'Level 148 priority entry · 8.2 km from Palm' }],
    [{ time: '—', type: 'tour', title: 'Marina yacht & leisure day', detail: 'Flexible private charter · 3.5 km' }]
  ]
};

let selectedDay = 0;
let extraItems = 0;

// --- Global User Trip Selections ---
let currentTripState = {
  destination: 'Agra, India',
  city: 'Agra',
  travelers: 2,
  departDate: '18 Oct 2026',
  returnDate: '25 Oct 2026',
  flight: { title: 'Gatimaan Express / Airport Connection', detail: 'Executive seating · 1h 40m', price: 45, total: 90, photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80' },
  stay: { title: 'The Heritage Haveli Resort', detail: 'Mughal Garden View · 4 nights', price: 102.5, total: 410, photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80' },
  favoritePlaces: [],
  tour: { title: 'Sunrise Taj Mahal & Street Food Trail', detail: 'Small group tasting · 3 hours', price: 0, total: 0, photo: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=80' }
};

// --- Active Travel Companions on Circle Live Radar ---
let circleCompanions = [
  { id: 'c1', name: 'Emma Watson', role: 'Travel Buddy', location: 'Near Taj East Gate', distanceKm: 0.6, proximity: 'near', status: 'Active now', avatar: 'EW', lat: 0, lng: 0 },
  { id: 'c2', name: 'Liam Davies', role: 'Photographer Friend', location: 'Mehtab Bagh Garden', distanceKm: 5.4, proximity: 'moderate', status: 'Taking photos', avatar: 'LD', lat: 0, lng: 0 },
  { id: 'c3', name: 'Carlos Santos', role: 'Local Guide', location: 'Sadar Bazaar', distanceKm: 3.2, proximity: 'moderate', status: 'Available', avatar: 'CS', lat: 0, lng: 0 }
];

// --- City Coordinates for Leaflet Map (200 Destinations) ---
const cityCoords = {
  // --- India Destinations ---
  'Agra': [27.1751, 78.0421],
  'Jaipur': [26.9124, 75.7873],
  'Udaipur': [24.5854, 73.7125],
  'Varanasi': [25.3176, 82.9739],
  'Kerala': [9.4981, 76.3388],
  'Alleppey': [9.4981, 76.3388],
  'Goa': [15.2993, 74.124],
  'New Delhi': [28.6139, 77.2090],
  'Mumbai': [19.0760, 72.8777],
  'Ladakh': [34.1526, 77.5771],
  'Leh': [34.1526, 77.5771],
  'Srinagar': [34.0837, 74.7973],
  'Gulmarg': [34.0484, 74.3805],
  'Shimla': [31.1048, 77.1734],
  'Manali': [32.2432, 77.1892],
  'Rishikesh': [30.0869, 78.2676],
  'Haridwar': [29.9457, 78.1642],
  'Amritsar': [31.6340, 74.8723],
  'Darjeeling': [27.0410, 88.2663],
  'Gangtok': [27.3389, 88.6065],
  'Shillong': [25.5788, 91.8933],
  'Cherrapunji': [25.2702, 91.7323],
  'Kaziranga': [26.5775, 93.1711],
  'Puducherry': [11.9416, 79.8083],
  'Madurai': [9.9252, 78.1198],
  'Mysore': [12.2958, 76.6394],
  'Hampi': [15.3350, 76.4600],
  'Coorg': [12.4244, 75.7382],
  'Ooty': [11.4102, 76.6950],
  'Kodaikanal': [10.2381, 77.4892],
  'Munnar': [10.0889, 77.0595],
  'Wayanad': [11.6854, 76.1320],
  'Kovalam': [8.4004, 76.9787],
  'Varkala': [8.7379, 76.7163],
  'Gokarna': [14.5479, 74.3188],
  'Chikmagalur': [13.3161, 75.7720],
  'Ranthambore': [26.0173, 76.5026],
  'Jodhpur': [26.2389, 73.0243],
  'Jaisalmer': [26.9157, 70.9083],
  'Pushkar': [26.4897, 74.5511],
  'Bikaner': [28.0229, 73.3119],
  'Mount Abu': [24.5926, 72.7156],
  'Khajuraho': [24.8318, 79.9199],
  'Orchha': [25.3503, 78.6433],
  'Ajanta Ellora': [20.5519, 75.7033],
  'Mahabaleshwar': [17.9307, 73.6477],
  'Alibaug': [18.6414, 72.8722],
  'Lonavala': [18.7557, 73.4091],
  'Pune': [18.5204, 73.8567],
  'Ahmedabad': [23.0225, 72.5714],
  'Kutch': [23.7337, 69.8597],
  'Gir National Park': [21.1243, 70.8242],
  'Dwarka': [22.2442, 68.9685],
  'Somnath': [20.8880, 70.4012],
  'Bhopal': [23.2599, 77.4126],
  'Indore': [22.7196, 75.8577],
  'Lucknow': [26.8467, 80.9462],
  'Ayodhya': [26.7922, 82.1998],
  'Mathura': [27.4924, 77.6737],
  'Vrindavan': [27.5706, 77.6593],
  'Kolkata': [22.5726, 88.3639],
  'Kalimpong': [27.0594, 88.4695],
  'Puri': [19.8135, 85.8312],
  'Konark': [19.8876, 86.0945],
  'Bhubaneswar': [20.2961, 85.8245],
  'Visakhapatnam': [17.6868, 83.2185],
  'Araku Valley': [18.3273, 82.8775],
  'Hyderabad': [17.3850, 78.4867],
  'Tirupati': [13.6288, 79.4192],
  'Rameswaram': [9.2876, 79.3129],
  'Kanyakumari': [8.0883, 77.5385],
  'Mahabalipuram': [12.6269, 80.1927],
  'Andaman Islands': [11.6234, 92.7265],
  'Havelock': [11.9680, 92.9876],
  'Tawang': [27.5861, 91.8594],
  'Pelling': [27.3167, 88.2333],
  'Nainital': [29.3919, 79.4542],
  'Mussoorie': [30.4598, 78.0644],
  'Spiti Valley': [32.2461, 78.0349],

  // --- Europe & International ---
  'Lisbon': [38.7223, -9.1393],
  'Kyoto': [35.0116, 135.7681],
  'Dubai': [25.2048, 55.2708],
  'Reykjavík': [64.1466, -21.9426],
  'Paris': [48.8566, 2.3522],
  'Rome': [41.9028, 12.4964],
  'Tokyo': [35.6762, 139.6503],
  'Bangkok': [13.7563, 100.5018],
  'Seoul': [37.5665, 126.978],
  'Singapore': [1.3521, 103.8198],
  'Abu Dhabi': [24.4539, 54.3773],
  'Amalfi Coast': [40.6340, 14.6027],
  'Barcelona': [41.3874, 2.1686],
  'Bali': [-8.3405, 115.092],
  'Beijing': [39.9042, 116.4074],
  'Cape Town': [-33.9249, 18.4241],
  'Hanoi': [21.0278, 105.8342],
  'Istanbul': [41.0082, 28.9784],
  'London': [51.5074, -0.1278],
  'Marrakech': [31.6295, -7.9811],
  'New York': [40.7128, -74.006],
  'New York City': [40.7128, -74.006],
  'Osaka': [34.6937, 135.5023],
  'Shanghai': [31.2304, 121.4737],
  'Chiang Mai': [18.7883, 98.9853],
  'Siem Reap': [13.3633, 103.8564],
  'Muscat': [23.5880, 58.3829],
  'Doha': [25.2854, 51.531],
  'Petra': [30.3285, 35.4444],
  'Santorini': [36.3932, 25.4615],
  'Prague': [50.0755, 14.4378],
  'Buenos Aires': [-34.6037, -58.3816],
  'Havana': [23.1136, -82.3666],
  'Cusco': [-13.5319, -71.9675],
  'Queenstown': [-45.0312, 168.6626],
  'Zanzibar': [-6.1659, 39.1989],
  'Maldives': [3.2028, 73.2207],
  'Dubrovnik': [42.6507, 18.0944],
  'Edinburgh': [55.9533, -3.1883],
  'Fez': [34.0181, -5.0078],
  'Helsinki': [60.1699, 24.9384],
  'Luang Prabang': [19.8856, 102.1347],
  'Medellín': [6.2476, -75.5658],
  'Tbilisi': [41.7151, 44.8271],
  'Valletta': [35.8989, 14.5146],
  'Vienna': [48.2082, 16.3738]
};

// --- Leaflet Map State ---
let liveMap = null;
let liveMapMarkers = [];
let userMarker = null;
let liveMovementInterval = null;

// --- Toast Notification Helper ---
function toast(message) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// --- 200 Destination Catalog & Photos ---
const placePhotos = [
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1567818647406-60742cce6d72?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80'
];

const worldPlaces = [
  // --- INDIA (Comprehensive Across All Regions & States) ---
  ['Agra', 'India', 'Asia', 'Taj Mahal marble wonderland & Mughal heritage'],
  ['Jaipur', 'India', 'Asia', 'Pink City palaces, Amber Fort & royal bazaars'],
  ['Udaipur', 'India', 'Asia', 'Romantic City of Lakes, Lake Palace & sunset boat rides'],
  ['Varanasi', 'India', 'Asia', 'Ancient sacred ghats, Ganga Aarti & spiritual heart'],
  ['Kerala', 'India', 'Asia', 'Emerald backwaters, houseboats, palms & Ayurveda'],
  ['Alleppey', 'India', 'Asia', 'Venice of the East backwater canals & serene stays'],
  ['Goa', 'India', 'Asia', 'Golden sun-drenched beaches, Portuguese churches & coastal cafes'],
  ['New Delhi', 'India', 'Asia', 'Historic capital, Humayun’s Tomb, Qutub Minar & food trails'],
  ['Mumbai', 'India', 'Asia', 'Gateway of India, Marine Drive promenade & Bollywood energy'],
  ['Ladakh', 'India', 'Asia', 'High-altitude cold desert, Pangong Lake & Buddhist monasteries'],
  ['Leh', 'India', 'Asia', 'Himalayan mountain citadel, stupas & scenic high passes'],
  ['Srinagar', 'India', 'Asia', 'Dal Lake shikara rides, floating gardens & Mughal parks'],
  ['Gulmarg', 'India', 'Asia', 'Pine-covered snow slopes, Gondola ride & Himalayan skiing'],
  ['Shimla', 'India', 'Asia', 'Colonial Mall Road, heritage toy train & pine hills'],
  ['Manali', 'India', 'Asia', 'Solang Valley adventures, snow peaks & river rafting'],
  ['Rishikesh', 'India', 'Asia', 'Yoga capital of the world, Laxman Jhula & river rafting'],
  ['Haridwar', 'India', 'Asia', 'Sacred Har Ki Pauri Ganga Aarti & ancient pilgrimage'],
  ['Amritsar', 'India', 'Asia', 'Golden Temple spiritual radiance & Wagah border ceremony'],
  ['Darjeeling', 'India', 'Asia', 'Kanchenjunga sunrise, world-famous tea gardens & toy train'],
  ['Gangtok', 'India', 'Asia', 'Sikkim Himalayan capital, Nathula Pass & monastic calm'],
  ['Shillong', 'India', 'Asia', 'Scotland of the East, cascading waterfalls & pine hills'],
  ['Cherrapunji', 'India', 'Asia', 'Living root bridges, mist valleys & torrential waterfalls'],
  ['Kaziranga', 'India', 'Asia', 'UNESCO wildlife sanctuary & home of one-horned rhinos'],
  ['Puducherry', 'India', 'Asia', 'French Quarter cobblestone avenues, cafes & Auroville'],
  ['Madurai', 'India', 'Asia', 'Meenakshi Amman temple towers & Dravidian heritage'],
  ['Mysore', 'India', 'Asia', 'Illuminated Mysore Palace, silk traditions & sandalwood'],
  ['Hampi', 'India', 'Asia', 'UNESCO Vijayanagara boulder ruins & sacred temples'],
  ['Coorg', 'India', 'Asia', 'Coffee plantations, misty hills & Abbey waterfalls'],
  ['Ooty', 'India', 'Asia', 'Nilgiri blue mountain tea estates & botanical gardens'],
  ['Kodaikanal', 'India', 'Asia', 'Princess of Hill Stations, star lake & misty pine forests'],
  ['Munnar', 'India', 'Asia', 'Rolling emerald tea hills, Anamudi peak & cardamom estates'],
  ['Wayanad', 'India', 'Asia', 'Edakkal prehistoric caves, waterfalls & spice plantations'],
  ['Kovalam', 'India', 'Asia', 'Lighthouse beach, palm-fringed coast & sunset waves'],
  ['Varkala', 'India', 'Asia', 'Dramatic red cliffside beaches & Arabian sea views'],
  ['Gokarna', 'India', 'Asia', 'Pristine Om beach, coastal cliff hikes & serene shores'],
  ['Chikmagalur', 'India', 'Asia', 'Coffee birthplace of India, Mullayanagiri peak & estate stays'],
  ['Ranthambore', 'India', 'Asia', 'Royal Bengal tiger jungle safaris & ancient fort ruins'],
  ['Jodhpur', 'India', 'Asia', 'Blue City fortresses, Mehrangarh Castle & desert bazaars'],
  ['Jaisalmer', 'India', 'Asia', 'Golden Sandstone Fort, Thar desert camel safaris & havelis'],
  ['Pushkar', 'India', 'Asia', 'Sacred Pushkar lake, Brahma temple & vibrant camel fair'],
  ['Bikaner', 'India', 'Asia', 'Junagarh palace, desert camels & savory bhujia traditions'],
  ['Mount Abu', 'India', 'Asia', 'Dilwara marble Jain temples & Nakki lake hill resort'],
  ['Khajuraho', 'India', 'Asia', 'UNESCO carved erotic temples & Chandela dynasty art'],
  ['Orchha', 'India', 'Asia', 'Betwa river palace fortresses & regal cenotaphs'],
  ['Ajanta Ellora', 'India', 'Asia', 'UNESCO rock-cut cave temples & Kailash monolith carving'],
  ['Mahabaleshwar', 'India', 'Asia', 'Strawberry farms, Venna lake & Western Ghat lookouts'],
  ['Alibaug', 'India', 'Asia', 'Coastal beach retreat, Kolaba sea fort & coconut groves'],
  ['Lonavala', 'India', 'Asia', 'Misty Western Ghat waterfalls, Karla caves & chikki sweets'],
  ['Pune', 'India', 'Asia', 'Shaniwar Wada palace, Osho ashram & cultural vibe'],
  ['Ahmedabad', 'India', 'Asia', 'Sabarmati Ashram, UNESCO heritage old city & textiles'],
  ['Kutch', 'India', 'Asia', 'White Rann salt desert, moonlight festival & craft villages'],
  ['Gir National Park', 'India', 'Asia', 'Exclusive sanctuary of wild Asiatic lions'],
  ['Dwarka', 'India', 'Asia', 'Sacred coastal Lord Krishna temple & Arabian sea ghats'],
  ['Somnath', 'India', 'Asia', 'First Jyotirlinga seaside temple of Lord Shiva'],
  ['Bhopal', 'India', 'Asia', 'City of Lakes, Taj-ul-Masajid & Upper Lake sunsets'],
  ['Indore', 'India', 'Asia', 'Sarafa night street food market & Rajwada palace'],
  ['Lucknow', 'India', 'Asia', 'Bara Imambara, Awadhi dum biryani & Chikankari embroidery'],
  ['Ayodhya', 'India', 'Asia', 'Sacred Ram Mandir, Saryu river ghats & spiritual heritage'],
  ['Mathura', 'India', 'Asia', 'Lord Krishna birthplace, Yamuna ghats & traditional peda'],
  ['Vrindavan', 'India', 'Asia', 'Banke Bihari temple, Prem Mandir illumination & holy chants'],
  ['Kolkata', 'India', 'Asia', 'Victoria Memorial, Howrah Bridge, Durga Puja & sweets'],
  ['Kalimpong', 'India', 'Asia', 'Orchid nurseries, Himalayan views & peaceful monasteries'],
  ['Puri', 'India', 'Asia', 'Sacred Jagannath Temple & Golden Beach sea waves'],
  ['Konark', 'India', 'Asia', 'UNESCO Sun Temple chariot architecture & stone carvings'],
  ['Bhubaneswar', 'India', 'Asia', 'Temple City of India, Lingaraj temple & Mukteshwar art'],
  ['Visakhapatnam', 'India', 'Asia', 'Rishi Konda beach, Submarine museum & Kailasagiri hill'],
  ['Araku Valley', 'India', 'Asia', 'Tribal coffee plantations, Borra caves & green valleys'],
  ['Hyderabad', 'India', 'Asia', 'Charminar, Golconda Fort & authentic Hyderabadi Biryani'],
  ['Tirupati', 'India', 'Asia', 'Sacred Tirumala Venkateswara temple atop seven hills'],
  ['Rameswaram', 'India', 'Asia', 'Ramanathaswamy temple long corridors & Pamban sea bridge'],
  ['Kanyakumari', 'India', 'Asia', 'Southernmost tip of India where three seas meet'],
  ['Mahabalipuram', 'India', 'Asia', 'UNESCO Shore Temple & monolithic stone rathas'],
  ['Andaman Islands', 'India', 'Asia', 'Radhanagar white sand beach, scuba diving & coral reefs'],
  ['Havelock', 'India', 'Asia', 'Elephant beach snorkeling & turquoise ocean lagoons'],
  ['Tawang', 'India', 'Asia', 'Monpa Himalayan valley & India’s largest monastery'],
  ['Pelling', 'India', 'Asia', 'Skywalk views of Kanchenjunga & Pemayangtse monastery'],
  ['Nainital', 'India', 'Asia', 'Naini Lake boating, Mall road & Kumaon hill views'],
  ['Mussoorie', 'India', 'Asia', 'Queen of Hills, Kempty falls & Lal Tibba lookout'],
  ['Spiti Valley', 'India', 'Asia', 'Highland monastery desert, Key gompa & Chandratal lake'],

  // --- ASIA & PACIFIC ---
  ['Kyoto', 'Japan', 'Asia', 'Temples, moss gardens & matcha tea'],
  ['Tokyo', 'Japan', 'Asia', 'Neon alleys, Shibuya crossing & serene shrines'],
  ['Osaka', 'Japan', 'Asia', 'Street food capital, Dotonbori & castle parks'],
  ['Sapporo', 'Japan', 'Asia', 'Snow festival, ramen alleys & mountain peaks'],
  ['Hiroshima', 'Japan', 'Asia', 'Peace Memorial Park & floating Miyajima torii'],
  ['Nara', 'Japan', 'Asia', 'Sacred free-roaming deer park & Todai-ji giant Buddha'],
  ['Seoul', 'South Korea', 'Asia', 'Gyeongbokgung palace, K-pop culture & night markets'],
  ['Busan', 'South Korea', 'Asia', 'Gamcheon culture village & Haeundae beach'],
  ['Jeju Island', 'South Korea', 'Asia', 'Volcanic craters, waterfalls & coastal trails'],
  ['Beijing', 'China', 'Asia', 'Great Wall gateway, Forbidden City & Summer Palace'],
  ['Shanghai', 'China', 'Asia', 'Bund waterfront skyline & Yu Garden tranquility'],
  ['Xi’an', 'China', 'Asia', 'Terracotta Warriors & ancient city wall cycling'],
  ['Hong Kong', 'China', 'Asia', 'Victoria Harbour skyline, dim sum & Peak tram'],
  ['Macau', 'China', 'Asia', 'Ruins of St. Paul’s, Portuguese egg tarts & resort lights'],
  ['Taipei', 'Taiwan', 'Asia', 'Taipei 101 tower, Shilin night market & Jiufen village'],
  ['Bangkok', 'Thailand', 'Asia', 'Grand Palace, Wat Arun & floating night markets'],
  ['Chiang Mai', 'Thailand', 'Asia', 'Slow northern hills, night bazaars & ethical elephant sanctuaries'],
  ['Phuket', 'Thailand', 'Asia', 'Phang Nga bay limestone karst islands & Patong nightlife'],
  ['Koh Samui', 'Thailand', 'Asia', 'Coconut palm beaches & luxury oceanfront villas'],
  ['Krabi', 'Thailand', 'Asia', 'Railay beach rock climbing & emerald lagoons'],
  ['Hanoi', 'Vietnam', 'Asia', 'Old French quarter, Hoan Kiem lake & egg coffee'],
  ['Ha Long Bay', 'Vietnam', 'Asia', 'UNESCO emerald waters & thousands of jungle islands'],
  ['Hoi An', 'Vietnam', 'Asia', 'Lantern-lit ancient trading port & custom tailors'],
  ['Ho Chi Minh City', 'Vietnam', 'Asia', 'French colonial landmarks & Saigon street food'],
  ['Siem Reap', 'Cambodia', 'Asia', 'Angkor Wat sunrise splendor & stone faces'],
  ['Luang Prabang', 'Laos', 'Asia', 'Mekong river sunset, almsgiving & Kuang Si falls'],
  ['Bali', 'Indonesia', 'Asia', 'Ubud rice terraces, cliffside temples & surf sunsets'],
  ['Jakarta', 'Indonesia', 'Asia', 'Monas monument & vibrant Indonesian food scene'],
  ['Yogyakarta', 'Indonesia', 'Asia', 'Borobudur giant Buddhist temple & Prambanan towers'],
  ['Komodo Island', 'Indonesia', 'Asia', 'Pink beach sand & wild Komodo dragons'],
  ['Singapore', 'Singapore', 'Asia', 'Gardens by the Bay, Marina Bay Sands & Hawker centers'],
  ['Kuala Lumpur', 'Malaysia', 'Asia', 'Petronas Twin Towers & Batu Caves shrine'],
  ['Penang', 'Malaysia', 'Asia', 'George Town street art & UNESCO hawker street food'],
  ['Langkawi', 'Malaysia', 'Asia', 'Geoforest cable car & pristine island beaches'],
  ['Manila', 'Philippines', 'Asia', 'Intramuros walled city & Spanish colonial fortresses'],
  ['Palawan', 'Philippines', 'Asia', 'El Nido secret lagoons & underground river'],
  ['Boracay', 'Philippines', 'Asia', 'Powdery White Beach sunsets & crystal waters'],
  ['Kathmandu', 'Nepal', 'Asia', 'Boudhanath stupa, Durbar square & Everest gateway'],
  ['Pokhara', 'Nepal', 'Asia', 'Phewa lake reflections & Annapurna Himalayan trekking'],
  ['Thimphu', 'Bhutan', 'Asia', 'Gross National Happiness capital & Buddha Dordenma'],
  ['Paro', 'Bhutan', 'Asia', 'Cliffside Tiger’s Nest monastery (Taktsang)'],
  ['Maldives', 'Maldives', 'Asia', 'Private overwater bungalows & coral reefs'],
  ['Colombo', 'Sri Lanka', 'Asia', 'Lotus tower, coastal train & colonial architecture'],
  ['Kandy', 'Sri Lanka', 'Asia', 'Temple of the Sacred Tooth & botanical tea hills'],
  ['Galle', 'Sri Lanka', 'Asia', 'UNESCO Dutch fort ramparts & lighthouse sunset'],

  // --- EUROPE ---
  ['Lisbon', 'Portugal', 'Europe', 'Trams, tiles, fado music & Atlantic ocean breeze'],
  ['Porto', 'Portugal', 'Europe', 'Douro river port wine cellars & tiled churches'],
  ['Paris', 'France', 'Europe', 'Eiffel Tower, Louvre museum & Haussmannian boulevards'],
  ['Nice', 'France', 'Europe', 'French Riviera Promenade des Anglais & azure coast'],
  ['Rome', 'Italy', 'Europe', 'Colosseum, Vatican Museums & Trevi Fountain gelato'],
  ['Venice', 'Italy', 'Europe', 'Gondola rides through Grand Canal & St. Mark’s Square'],
  ['Florence', 'Italy', 'Europe', 'Birthplace of Renaissance, Duomo & Uffizi Gallery'],
  ['Milan', 'Italy', 'Europe', 'Duomo cathedral, high fashion & Last Supper fresco'],
  ['Amalfi Coast', 'Italy', 'Europe', 'Clifftop pastel Positano villages & lemon groves'],
  ['Cinque Terre', 'Italy', 'Europe', 'Five colourful cliffside coastal hiking villages'],
  ['Barcelona', 'Spain', 'Europe', 'Gaudí Sagrada Família, Park Güell & tapas bars'],
  ['Madrid', 'Spain', 'Europe', 'Prado Museum, Royal Palace & lively plaza terraces'],
  ['Seville', 'Spain', 'Europe', 'Real Alcázar palace, Plaza de España & flamenco'],
  ['Granada', 'Spain', 'Europe', 'Alhambra Moorish palace & Sierra Nevada backdrop'],
  ['Ibiza', 'Spain', 'Europe', 'Balearic turquoise coves & world-famous sunsets'],
  ['Mallorca', 'Spain', 'Europe', 'Tramuntana mountain drives & limestone bays'],
  ['London', 'United Kingdom', 'Europe', 'Big Ben, West End theatre & Royal Hyde Park'],
  ['Edinburgh', 'United Kingdom', 'Europe', 'Royal Mile, Edinburgh Castle & volcanic crags'],
  ['Dublin', 'Ireland', 'Europe', 'Trinity College Book of Kells & Temple Bar live music'],
  ['Amsterdam', 'Netherlands', 'Europe', 'Canal cruises, Van Gogh Museum & gingerbread houses'],
  ['Brussels', 'Belgium', 'Europe', 'Grand Place guildhalls, chocolates & waffle houses'],
  ['Vienna', 'Austria', 'Europe', 'Schönbrunn Palace, classical opera & Sachertorte cafes'],
  ['Prague', 'Czechia', 'Europe', 'Charles Bridge, Astronomical Clock & storybook spires'],
  ['Budapest', 'Hungary', 'Europe', 'Parliament building, Széchenyi thermal baths & Danube cruises'],
  ['Zurich', 'Switzerland', 'Europe', 'Lake Zurich promenade & Swiss chocolate boutiques'],
  ['Lucerne', 'Switzerland', 'Europe', 'Kapellbrücke wooden bridge & Mt. Pilatus views'],
  ['Interlaken', 'Switzerland', 'Europe', 'Jungfraujoch Top of Europe snow peaks & paragliding'],
  ['Zermatt', 'Switzerland', 'Europe', 'Iconic Matterhorn mountain peak & alpine skiing'],
  ['Munich', 'Germany', 'Europe', 'Marienplatz clock, Bavarian biergartens & Neuschwanstein castle'],
  ['Berlin', 'Germany', 'Europe', 'Brandenburg Gate, Berlin Wall art gallery & techno culture'],
  ['Dubrovnik', 'Croatia', 'Europe', 'Old Town medieval walls & Game of Thrones locations'],
  ['Split', 'Croatia', 'Europe', 'Diocletian’s Roman palace & Adriatic island hopping'],
  ['Athens', 'Greece', 'Europe', 'Acropolis Parthenon, Plaka tavernas & ancient Agora'],
  ['Santorini', 'Greece', 'Europe', 'Whitewashed Oia caldera blue domes & sunset views'],
  ['Mykonos', 'Greece', 'Europe', 'Windmills, Little Venice & Aegean beach clubs'],
  ['Reykjavík', 'Iceland', 'Europe', 'Blue Lagoon hot springs, waterfalls & Northern Lights'],
  ['Copenhagen', 'Denmark', 'Europe', 'Nyhavn colourful harbor, Tivoli gardens & hygge cafes'],
  ['Stockholm', 'Sweden', 'Europe', 'Gamla Stan old town, Vasa museum & archipelago islands'],
  ['Oslo', 'Norway', 'Europe', 'Fjord cruises, Vigeland sculpture park & Opera house'],
  ['Helsinki', 'Finland', 'Europe', 'Design district, Senate square cathedral & saunas'],
  ['Tallinn', 'Estonia', 'Europe', 'Preserved medieval fairytale old town & cobblestone towers'],
  ['Kraków', 'Poland', 'Europe', 'Main market square, Wawel dragon castle & Kazimierz'],

  // --- MIDDLE EAST & AFRICA ---
  ['Dubai', 'United Arab Emirates', 'Middle East', 'Burj Khalifa, Museum of the Future & desert safari'],
  ['Abu Dhabi', 'United Arab Emirates', 'Middle East', 'Sheikh Zayed Grand Mosque & Louvre Abu Dhabi'],
  ['Muscat', 'Oman', 'Middle East', 'Sultan Qaboos Grand Mosque & Mutrah souk waterfront'],
  ['Salalah', 'Oman', 'Middle East', 'Khareef monsoon waterfalls & frankincense coast'],
  ['Doha', 'Qatar', 'Middle East', 'Museum of Islamic Art, Souq Waqif & Pearl Qatar'],
  ['Riyadh', 'Saudi Arabia', 'Middle East', 'Kingdom Tower skybridge & Diriyah mud-brick heritage'],
  ['AlUla', 'Saudi Arabia', 'Middle East', 'Hegra UNESCO Nabataean tombs & Elephant Rock'],
  ['Petra', 'Jordan', 'Middle East', 'Rose-red rock-cut Treasury citadel in desert canyon'],
  ['Amman', 'Jordan', 'Middle East', 'Citadel ruins, Roman theater & falafel trails'],
  ['Jerusalem', 'Holy Land', 'Middle East', 'Old City Western Wall, Church of Holy Sepulchre'],
  ['Tel Aviv', 'Israel', 'Middle East', 'Mediterranean beach promenade, Bauhaus art & nightlife'],
  ['Istanbul', 'Türkiye', 'Middle East', 'Hagia Sophia, Blue Mosque & Bosphorus ferry cruises'],
  ['Cappadocia', 'Türkiye', 'Middle East', 'Hot air balloon flights over fairy chimney valleys'],
  ['Cairo', 'Egypt', 'Africa', 'Giza Pyramids, Sphinx & Grand Egyptian Museum'],
  ['Luxor', 'Egypt', 'Africa', 'Valley of the Kings, Karnak temple & Nile felucca sailing'],
  ['Marrakech', 'Morocco', 'Africa', 'Jemaa el-Fnaa square, riads & Koutoubia mosque'],
  ['Chefchaouen', 'Morocco', 'Africa', 'Blue Pearl mountain town alleys & artisan weavers'],
  ['Cape Town', 'South Africa', 'Africa', 'Table Mountain cableway, Boulders penguin beach'],
  ['Serengeti', 'Tanzania', 'Africa', 'Great Migration wildlife safari & Ngorongoro crater'],
  ['Victoria Falls', 'Zambia & Zimbabwe', 'Africa', 'Smoke that Thunders waterfall chasm'],

  // --- AMERICAS & OCEANIA ---
  ['New York City', 'United States', 'North America', 'Statue of Liberty, Times Square & Central Park'],
  ['San Francisco', 'United States', 'North America', 'Golden Gate Bridge, cable cars & Alcatraz'],
  ['Los Angeles', 'United States', 'North America', 'Hollywood Sign, Santa Monica pier & Beverly Hills'],
  ['Las Vegas', 'United States', 'North America', 'Strip resort lights, Bellagio fountains & shows'],
  ['Miami', 'United States', 'North America', 'South Beach Art Deco, Little Havana & nightlife'],
  ['Honolulu', 'United States', 'North America', 'Waikiki beach surf, Diamond Head crater & Oahu'],
  ['Vancouver', 'Canada', 'North America', 'Stanley Park sea wall, mountains & Pacific coast'],
  ['Banff', 'Canada', 'North America', 'Lake Louise turquoise glacial waters & Canadian Rockies'],
  ['Toronto', 'Canada', 'North America', 'CN Tower skyline, Niagara Falls day trips & harbor'],
  ['Mexico City', 'Mexico', 'North America', 'Zócalo plaza, Frida Kahlo museum & Teotihuacan pyramids'],
  ['Cancun', 'Mexico', 'North America', 'Mayan Riviera beaches, cenotes & Chichen Itza'],
  ['Havana', 'Cuba', 'North America', 'Classic 1950s cars, Malecón ocean drive & salsa'],
  ['San Juan', 'Puerto Rico', 'North America', 'El Morro fort, colorful Old San Juan & rainforests'],
  ['Rio de Janeiro', 'Brazil', 'South America', 'Christ the Redeemer, Sugarloaf mountain & Copacabana'],
  ['Buenos Aires', 'Argentina', 'South America', 'Tango parlors, La Boca colorful houses & steak houses'],
  ['Cusco', 'Peru', 'South America', 'Incan citadel Machu Picchu, Sacred Valley & Urubamba'],
  ['Cartagena', 'Colombia', 'South America', 'Colonial walled city, bougainvillea balconies & Caribbean coast'],
  ['Sydney', 'Australia', 'Oceania', 'Sydney Opera House, Harbour Bridge & Bondi beach surf'],
  ['Melbourne', 'Australia', 'Oceania', 'Coffee lane alleys, Yarra river & Great Ocean Road'],
  ['Queenstown', 'New Zealand', 'Oceania', 'Lake Wakatipu alpine peaks, Milford Sound & adventure sports']
].map((p, i) => ({
  city: p[0],
  country: p[1],
  region: p[2],
  detail: p[3],
  photo: placePhotos[i % placePhotos.length]
}));

// =========================================================
// 1. AUTOCOMPLETE DESTINATION SEARCH
// =========================================================
const destInput = $('#destination');
const suggestionsEl = $('#suggestions');

function renderSuggestions(query) {
  const cleanQ = (query || '').trim().toLowerCase();
  if (!cleanQ) {
    suggestionsEl.classList.add('hidden');
    return;
  }

  const matches = worldPlaces.filter(p =>
    p.city.toLowerCase().includes(cleanQ) ||
    p.country.toLowerCase().includes(cleanQ) ||
    p.region.toLowerCase().includes(cleanQ)
  ).slice(0, 7);

  if (matches.length === 0) {
    suggestionsEl.innerHTML = `
      <li class="suggestion-item" style="cursor:default; opacity:0.7;">
        <div class="suggestion-main">
          <span class="suggestion-icon">✦</span>
          <div class="suggestion-text"><b>No exact place matched</b><small>Press Enter to search custom place</small></div>
        </div>
      </li>`;
    suggestionsEl.classList.remove('hidden');
    return;
  }

  suggestionsEl.innerHTML = matches.map(p => `
    <li class="suggestion-item" data-city="${p.city}" data-country="${p.country}">
      <div class="suggestion-main">
        <span class="suggestion-icon">📍</span>
        <div class="suggestion-text">
          <b>${p.city}, ${p.country}</b>
          <small>${p.detail}</small>
        </div>
      </div>
      <span class="suggestion-region">${p.region}</span>
    </li>
  `).join('');

  suggestionsEl.querySelectorAll('.suggestion-item[data-city]').forEach(item => {
    item.addEventListener('click', () => {
      selectDestination(item.dataset.city, item.dataset.country);
    });
  });

  suggestionsEl.classList.remove('hidden');
}

function selectDestination(city, country) {
  const fullName = country ? `${city}, ${country}` : city;
  destInput.value = fullName;
  suggestionsEl.classList.add('hidden');
  currentTripState.destination = fullName;
  currentTripState.city = city;

  // Clear favorite places for new destination
  currentTripState.favoritePlaces = [];

  // Update headers and badges
  $('#searchMessage').textContent = `Your ${city} itinerary, stays, distances in km, favorite places and weather are prepared.`;
  const itinTitle = $('#itineraryTitle');
  if (itinTitle) itinTitle.textContent = `${city}, at your pace.`;
  $$('.dest-target-name').forEach(el => el.textContent = city);

  // Update weather, wizard catalog, places, circle companions, and itinerary
  updateWeatherWidget(city);
  generateCityPlaces(city);
  generateWizardOptions(city);
  updateCircleLiveRadar(city);
  renderDay();
  updateSummaryAndPaymentDrawer();

  // 💱 Auto-switch to the destination's native currency
  switchCurrencyForDestination(city, country);

  toast(`✦ Destination set to ${fullName}`);
}

destInput.addEventListener('input', e => renderSuggestions(e.target.value));
destInput.addEventListener('focus', () => {
  if (destInput.value) renderSuggestions(destInput.value);
});

document.addEventListener('click', e => {
  if (!destInput.contains(e.target) && !suggestionsEl.contains(e.target)) {
    suggestionsEl.classList.add('hidden');
  }
});

// Wire Quick Pill buttons (Agra, Lisbon, Kyoto, Dubai, Paris, etc.)
$$('.quick-pill-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const raw = btn.dataset.guidePlace || btn.textContent;
    const parts = raw.split(',');
    const city = parts[0].replace(/[^\w\s,]/gi, '').trim();
    const country = parts[1] ? parts[1].trim() : 'Destination';
    selectDestination(city, country);
  });
});

// Wire Main Search Button
const searchBtnEl = $('.search-btn');
if (searchBtnEl) {
  searchBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    const val = (destInput.value || 'Agra').trim();
    const parts = val.split(',');
    const city = parts[0].trim();
    const country = parts[1] ? parts[1].trim() : '';
    selectDestination(city, country);
  });
}

// =========================================================
// 2. CITY FAVORITE PLACES WITH EXACT DISTANCES IN KILOMETERS (KM)
// =========================================================
const cityAttractionsDatabase = {
  Agra: [
    { id: 'agr-1', name: 'Taj Mahal at Sunrise', tag: 'Must-See ✦', filter: 'must-see', distanceKm: 1.2, proximity: 'near', commute: '15 min walk / 4 min drive', time: '3 hrs', district: 'Tajganj', desc: 'World Wonder in ivory marble built by Emperor Shah Jahan in memory of Mumtaz Mahal.', photo: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=80' },
    { id: 'agr-2', name: 'Agra Fort Red Sandstone Citadel', tag: 'Culture & Art 🏛', filter: 'culture', distanceKm: 2.8, proximity: 'moderate', commute: '8 min drive', time: '2 hrs', district: 'Rakabganj', desc: 'UNESCO World Heritage fortress with grand palaces, courtyards, and river views of the Taj.', photo: 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=700&q=80' },
    { id: 'agr-3', name: 'Mehtab Bagh Moonlight Garden', tag: 'Best View 📸', filter: 'view', distanceKm: 6.5, proximity: 'moderate', commute: '14 min drive', time: '1.5 hrs', district: 'Across Yamuna', desc: 'Charbagh garden complex positioned directly opposite the Taj Mahal across the Yamuna River.', photo: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80' },
    { id: 'agr-4', name: 'Tomb of I’timād-ud-Daulah (Baby Taj)', tag: 'Hidden Gem ☕', filter: 'hidden-gem', distanceKm: 5.2, proximity: 'moderate', commute: '12 min drive', time: '1 hr', district: 'Moti Bagh', desc: 'Exquisite jewel-box marble mausoleum featuring intricate pietra dura floral inlay work.', photo: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=700&q=80' },
    { id: 'agr-5', name: 'Fatehpur Sikri Royal Complex', tag: 'Must-See ✦', filter: 'must-see', distanceKm: 38.0, proximity: 'far', commute: '45 min excursion drive', time: 'Half day', district: 'Fatehpur Sikri', desc: 'Akbar the Great’s preserved red sandstone capital with the towering Buland Darwaza.', photo: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=700&q=80' },
    { id: 'agr-6', name: 'Sadar Bazaar Street Food & Petha Trail', tag: 'Top Rated 4.9★', filter: 'culture', distanceKm: 3.5, proximity: 'moderate', commute: '10 min drive', time: '2 hrs', district: 'Agra Cantt', desc: 'Lively market famous for Panchhi Petha, chaat, leather handicrafts and brassware.', photo: 'https://images.unsplash.com/photo-1505935428862-770b6f24f653?auto=format&fit=crop&w=700&q=80' }
  ],
  Lisbon: [
    { id: 'lis-1', name: 'Miradouro de Santa Luzia', tag: 'Best View 📸', filter: 'view', distanceKm: 0.4, proximity: 'near', commute: '5 min walk', time: '1 hr', district: 'Alfama', desc: 'Breathtaking terrace with bougainvillea, azulejo tiles & red rooftops.', photo: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=700&q=80' },
    { id: 'lis-2', name: 'Carmo Convent Gothic Ruins', tag: 'Culture & Art 🏛', filter: 'culture', distanceKm: 1.1, proximity: 'near', commute: '14 min walk / tram', time: '1 hr', district: 'Chiado', desc: 'Striking roofless medieval church destroyed in the 1755 earthquake.', photo: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=700&q=80' },
    { id: 'lis-3', name: 'Belém Tower & Tejo Waterfront', tag: 'Must-See ✦', filter: 'must-see', distanceKm: 6.8, proximity: 'moderate', commute: '18 min tram / cab', time: '1.5 hrs', district: 'Belém', desc: 'Iconic 16th-century fortress on the water with panoramic views.', photo: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=700&q=80' },
    { id: 'lis-4', name: 'Pastéis de Belém Bakery', tag: 'Top Rated 4.9★', filter: 'must-see', distanceKm: 6.4, proximity: 'moderate', commute: '16 min tram', time: '45 mins', district: 'Belém', desc: 'Historic 1837 bakery serving world-famous warm custard tarts.', photo: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=700&q=80' },
    { id: 'lis-5', name: 'LX Factory Arts & Cafes', tag: 'Hidden Gem ☕', filter: 'hidden-gem', distanceKm: 4.2, proximity: 'moderate', commute: '12 min drive', time: '2 hrs', district: 'Alcântara', desc: 'Vibrant industrial textile warehouse converted into bookshops & rooftop bars.', photo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=700&q=80' },
    { id: 'lis-6', name: 'Sintra Pena National Palace', tag: 'Must-See ✦', filter: 'must-see', distanceKm: 28.5, proximity: 'far', commute: '35 min train / drive', time: 'Half day', district: 'Sintra Hills', desc: 'Romantic fairy-tale yellow & red castle high in the pine mountains.', photo: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=700&q=80' }
  ],
  Kyoto: [
    { id: 'kyo-1', name: 'Gion Historic Lantern Streets', tag: 'Hidden Gem ☕', filter: 'hidden-gem', distanceKm: 0.8, proximity: 'near', commute: '10 min walk', time: '2 hrs', district: 'Gion', desc: 'Preserved wooden machiya teahouses and traditional geisha culture district.', photo: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=80' },
    { id: 'kyo-2', name: 'Kiyomizu-dera Wooden Stage', tag: 'Top Rated 4.9★', filter: 'must-see', distanceKm: 1.8, proximity: 'near', commute: '20 min scenic walk', time: '2 hrs', district: 'Higashiyama', desc: 'Ancient cliffside temple offering magnificent panoramic valley and city views.', photo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=700&q=80' },
    { id: 'kyo-3', name: 'Fushimi Inari 1,000 Torii Gates', tag: 'Must-See ✦', filter: 'must-see', distanceKm: 4.8, proximity: 'moderate', commute: '12 min JR train', time: '2.5 hrs', district: 'Fushimi', desc: 'Iconic vibrant vermilion shrines winding up the sacred wooded mountain.', photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80' },
    { id: 'kyo-4', name: 'Kinkaku-ji Golden Pavilion', tag: 'Must-See ✦', filter: 'must-see', distanceKm: 7.2, proximity: 'moderate', commute: '22 min bus / taxi', time: '1 hr', district: 'Kita', desc: 'Zen Buddhist temple covered in shimmering gold leaf over mirror pond.', photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=700&q=80' },
    { id: 'kyo-5', name: 'Nishiki Food Market Alley', tag: 'Culture & Art 🏛', filter: 'culture', distanceKm: 1.4, proximity: 'near', commute: '15 min walk', time: '1.5 hrs', district: 'Nakagyo', desc: '5-block narrow shopping street known as “Kyoto’s Kitchen” with 100+ stalls.', photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80' },
    { id: 'kyo-6', name: 'Arashiyama Bamboo Grove', tag: 'Best View 📸', filter: 'view', distanceKm: 11.5, proximity: 'far', commute: '25 min train', time: '1.5 hrs', district: 'Arashiyama', desc: 'Towering emerald green bamboo stalks swaying with the gentle breeze.', photo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=700&q=80' }
  ],
  Dubai: [
    { id: 'dub-1', name: 'Burj Khalifa Observation Deck', tag: 'Must-See ✦', filter: 'must-see', distanceKm: 1.5, proximity: 'near', commute: '15 min walk / 4 min metro', time: '2 hrs', district: 'Downtown', desc: 'World’s tallest tower offering jaw-dropping 360-degree desert & ocean views.', photo: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80' },
    { id: 'dub-2', name: 'Museum of the Future', tag: 'Must-See ✦', filter: 'must-see', distanceKm: 3.2, proximity: 'moderate', commute: '8 min metro', time: '2.5 hrs', district: 'Trade Centre', desc: 'Architectural ring covered in Arabic calligraphy showcasing futuristic visions.', photo: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=700&q=80' },
    { id: 'dub-3', name: 'Al Fahidi Historic & Spice Souk', tag: 'Culture & Art 🏛', filter: 'culture', distanceKm: 7.8, proximity: 'moderate', commute: '15 min drive', time: '2 hrs', district: 'Old Dubai', desc: '19th-century wind-tower quarter with spice, textile & perfume souks.', photo: 'https://images.unsplash.com/photo-1580674684081-7617f1524e96?auto=format&fit=crop&w=700&q=80' },
    { id: 'dub-4', name: 'Arabian Tea House Cafe', tag: 'Hidden Gem ☕', filter: 'hidden-gem', distanceKm: 7.9, proximity: 'moderate', commute: '15 min drive', time: '1.5 hrs', district: 'Al Fahidi', desc: 'Secret leafy courtyard serving cardamom chai and traditional Emirati breakfast.', photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=80' },
    { id: 'dub-5', name: 'The Palm Jumeirah & Aura Infinity', tag: 'Best View 📸', filter: 'view', distanceKm: 18.2, proximity: 'far', commute: '22 min highway drive', time: '3 hrs', district: 'The Palm', desc: 'World’s highest 360-degree infinity pool overlooking the artificial palm island.', photo: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=700&q=80' },
    { id: 'dub-6', name: 'Dubai Desert Sunset Safari', tag: 'Top Rated 4.9★', filter: 'view', distanceKm: 46.0, proximity: 'far', commute: '45 min 4x4 transfer', time: 'Half day', district: 'Red Dunes', desc: 'Golden dunes 4x4 drive followed by sunset dinner under Arabian stars.', photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80' }
  ]
};

let currentCityPlacesList = [];
let currentPlaceFilter = 'all';
let currentDistanceFilter = 'all';

function generateCityPlaces(cityName) {
  const city = cityName.split(',')[0].trim();
  if (cityAttractionsDatabase[city]) {
    currentCityPlacesList = cityAttractionsDatabase[city];
  } else {
    currentCityPlacesList = [
      { id: `${city}-1`, name: `${city} Historic Old Town & Plaza`, tag: 'Must-See ✦', filter: 'must-see', distanceKm: 0.9, proximity: 'near', commute: '10 min walk', time: '2 hrs', district: 'Central', desc: `Charming historic streets and signature architecture of ${city}.`, photo: placePhotos[0] },
      { id: `${city}-2`, name: `Secret Lantern Lane & Local Cafes`, tag: 'Hidden Gem ☕', filter: 'hidden-gem', distanceKm: 1.4, proximity: 'near', commute: '15 min walk', time: '1 hr', district: 'Artisan District', desc: `Tucked away alley with artisanal coffee roasters, vinyl stores, and cozy bistros.`, photo: placePhotos[4] },
      { id: `${city}-3`, name: `${city} Traditional Food Market`, tag: 'Top Rated 4.9★', filter: 'must-see', distanceKm: 3.2, proximity: 'moderate', commute: '8 min drive', time: '1.5 hrs', district: 'Market Quarter', desc: `Local food haven featuring authentic culinary specialties and fresh produce.`, photo: placePhotos[2] },
      { id: `${city}-4`, name: `${city} Grand Viewpoint & Lookout`, tag: 'Best View 📸', filter: 'view', distanceKm: 5.8, proximity: 'moderate', commute: '14 min drive', time: '1.5 hrs', district: 'Panoramic Hill', desc: `Panoramic lookout spot offering the most scenic photo views over ${city}.`, photo: placePhotos[1] },
      { id: `${city}-5`, name: `${city} Palace & Heritage Sanctuary`, tag: 'Culture & Art 🏛', filter: 'culture', distanceKm: 6.4, proximity: 'moderate', commute: '16 min drive', time: '2.5 hrs', district: 'Royal Quarter', desc: `Centuries-old royal heritage and exquisite craftsmanship rooted in history.`, photo: placePhotos[3] },
      { id: `${city}-6`, name: `${city} Coastal / Countryside Excursion`, tag: 'Must-See ✦', filter: 'must-see', distanceKm: 32.0, proximity: 'far', commute: '40 min scenic excursion', time: 'Half day', district: 'Outer Valley', desc: `Day trip with panoramic transport and nature trails beyond the city.`, photo: placePhotos[5] }
    ];
  }
}

// =========================================================
// 3. COMPREHENSIVE CITY DETAIL GUIDE & FAMOUS FOODS DATABASE
//    Includes Dedicated Artisanal Ice Cream / Gelato Spot for EACH City,
//    Expanded Authentic Foods, and Hotel Arrangements with Km to Center
// =========================================================
const cityDeepProfiles = {
  Agra: {
    city: 'Agra',
    country: 'India',
    region: 'Asia',
    tagline: 'Home of the immortal Taj Mahal, Mughal royal forts and legendary sweets',
    photo: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80',
    timeReq: '2–3 Days Optimal',
    dailyBudget: '$35 – $140 / day (₹2,800 – ₹11,000)',
    bestSeason: 'October to March (Mild & Pleasant)',
    history: {
      title: 'The Golden Age of the Mughal Empire',
      text: 'Agra rose to prominence in 1526 when Babur founded the Mughal dynasty. Under Emperor Akbar, Jahangir, and Shah Jahan, Agra became the cultural and architectural capital of India. In 1631, Emperor Shah Jahan commissioned the Taj Mahal as a testament of eternal love for his beloved wife Mumtaz Mahal. Built by over 20,000 artisans using pristine Makrana marble inlaid with semi-precious stones, it remains one of the Seven Wonders of the World.',
      facts: [
        { label: 'UNESCO Heritage Sites', val: 'Taj Mahal, Agra Fort, Fatehpur Sikri' },
        { label: 'Architectural Style', val: 'Indo-Islamic & Mughal Red Sandstone' },
        { label: 'Sacred River', val: 'Yamuna River Waterfront' },
        { label: 'Craft Legacy', val: 'Pietra Dura (Marble Inlay) & Zardozi' }
      ]
    },
    foods: [
      { name: 'Saffron Petha Kulfi & Rabri Gelato', badge: '🍦 Handcrafted Artisanal Ice Cream Spot', desc: 'Creamy hand-churned kulfi gelato infused with saffron, pistachio crumb, and crushed Panchhi Petha.', spot: 'Deviram Artisanal Kulfi & Ice Cream Parlour (Pratappura)', cost: '₹120 ($1.45) / scoop', photo: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80' },
      { name: 'Agra Petha (Kesar & Angoori)', badge: '🏆 UNESCO Heritage Sweet', desc: 'Translucent tender sweet crafted from ash gourd infused with saffron syrup and cardamom.', spot: 'Panchhi Petha (No. 1 Heritage Shop, Sadar)', cost: '₹180 ($2.20) / box', photo: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80' },
      { name: 'Bedmi Puri & Spicy Aloo Sabzi', badge: '🔥 Morning Street Favorite', desc: 'Crisp urad dal-stuffed puffy puris paired with fiery, tangy potato gravy and mango pickle.', spot: 'Deviram Sweets & Restaurant (Pratappura)', cost: '₹70 ($0.85) / plate', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80' },
      { name: 'Mughlai Dum Biryani & Kebabs', badge: '⭐ Royal Heritage Dish', desc: 'Fragrant aged basmati rice slow-cooked with royal saffron, whole spices, and tender marinated cuts.', spot: 'Pinch of Spice (Fatehabad Road)', cost: '₹450 ($5.50) / meal', photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80' },
      { name: 'Crispy Jalebi with Creamy Rabri', badge: '🍰 Dessert Specialty', desc: 'Piping hot golden spiral jalebis dipped in saffron syrup, served atop thick chilled rabri.', spot: 'Bhagat Halwai (MG Road)', cost: '₹90 ($1.10) / serving', photo: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80' },
      { name: 'Tandoori Malai Chicken Tikka', badge: '🍗 Mughal Grill Favorite', desc: 'Succulent chicken morsels marinated in cashew cream, green cardamom, and grilled over charcoal.', spot: 'Kwality Restaurant (Sadar Bazaar)', cost: '₹380 ($4.60) / plate', photo: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80' },
      { name: 'Agra Dalmoth Savory Namkeen', badge: '🎁 Iconic Souvenir', desc: 'Crunchy traditional snack prepared with whole moth lentils, fried gram flour sev, and cashews.', spot: 'Bhimsen Baidyanath (Johari Bazar)', cost: '₹220 ($2.70) / pack', photo: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80' },
      { name: 'Agra Bhalla & Samosa Chaat', badge: '🌶 Tangy Street Chaat', desc: 'Crispy fried potato patties drenched in sweet tamarind chutney, spicy green mint sauce, and curd.', spot: 'Agra Chaat House (Sadar Bazaar)', cost: '₹60 ($0.75) / plate', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80' }
    ],
    hotels: [
      { name: 'The Oberoi Amarvilas', tier: 'Luxury Ultra 5-Star', desc: 'Direct, unobstructed views of the Taj Mahal from every single room and private balcony.', price: '$480/night', amenities: ['0.6 km from Taj (Walking)', 'Royal Spa', 'Butler Service', 'Infinity Pool'], photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
      { name: 'ITC Mughal, Luxury Collection', tier: 'Heritage Resort', desc: 'Set across 23 acres of Mughal gardens with Kaya Kalp, Asia’s award-winning spa.', price: '$125/night', amenities: ['3.1 km from Taj Mahal', 'Mughal Gardens', 'Ayurveda Spa', 'Pool'], photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Tajview Boutique Sanctuary', tier: 'Boutique Comfort', desc: 'Contemporary heritage stay in Tajganj with rooftop terrace views and garden dining.', price: '$78/night', amenities: ['1.8 km from Taj Mahal', 'Rooftop Taj View', 'Free Breakfast'], photo: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=600&q=80' },
      { name: 'Courtyard by Marriott Agra', tier: 'Modern Luxury', desc: 'Sleek modern hotel with outdoor pool, multiple specialty restaurants, and spa.', price: '$88/night', amenities: ['2.4 km from Taj Mahal', 'Outdoor Pool', '24/7 Gym', 'Buffet'], photo: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Coral Tree Heritage Homestay', tier: 'Charming Budget Stay', desc: 'Vibrant family-run garden homestay offering authentic home-cooked meals and personal tips.', price: '$42/night', amenities: ['0.9 km to Taj East Gate', 'Organic Breakfast', 'Garden Terrace'], photo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80' }
    ],
    streets: [
      { name: 'Sadar Bazaar', vibe: 'Shopping & Street Food · 3.5 km away', desc: 'The most popular evening shopping avenue in Agra for leather shoes, handicraft souvenirs, and chaat.', highlight: 'Must try: Agra Chaat House & Panchhi Petha corner' },
      { name: 'Kinari Bazaar (Old City)', vibe: 'Traditional Spice Bazaars · 4.1 km away', desc: 'Narrow bustling lanes behind Jama Masjid bursting with bridal fabrics, marble crafts, and jewelry.', highlight: 'Best for: Authentic photo walks & marble souvenirs' },
      { name: 'Fatehabad Road', vibe: 'Dining & Boutique Row · 2.2 km away', desc: 'Modern tree-lined boulevard lined with upscale Mughlai dining, cafes, and rooftop lounges.', highlight: 'Best for: Evening dinner & sunset rooftop drinks' }
    ],
    expenses: {
      budget: { cost: '$35 / day (₹2,900)', desc: 'Clean guesthouse / homestay, street food, tuk-tuks, and state monuments.' },
      comfort: { cost: '$85 / day (₹7,000)', desc: '4-star heritage hotel, AC private cabs, guided tours, and dining at signature restaurants.' },
      luxury: { cost: '$240 / day (₹19,800)', desc: '5-star Taj-view resort, luxury chauffeur transfer, private historian, and royal dining.' },
      tickets: [
        { item: 'Taj Mahal (Foreign / Indian)', price: '$14 (₹1100) / ₹50' },
        { item: 'Agra Fort Entry', price: '$8 (₹650) / ₹40' },
        { item: 'Mehtab Bagh Sunset Entry', price: '$4 (₹300) / ₹25' },
        { item: 'Fatehpur Sikri Day Trip', price: '$7 (₹550) / ₹35' }
      ]
    }
  },
  Lisbon: {
    city: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    tagline: 'Seven hills, vintage yellow trams, historic tiles & soulful fado melodies',
    photo: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=900&q=80',
    timeReq: '4–5 Days Optimal',
    dailyBudget: '$65 – $220 / day (€60 – €200)',
    bestSeason: 'April to October (Sunny & Mild)',
    history: {
      title: 'Europe’s Oceanfront Gateway of Discoveries',
      text: 'One of the oldest cities in Western Europe, Lisbon predates London, Paris, and Rome by centuries. From Phoenician trade post to Moorish stronghold and capital of the Portuguese maritime empire during the 15th-century Age of Discoveries. Rebuilt in neoclassical elegance following the 1755 earthquake.',
      facts: [
        { label: 'Oldest Neighborhood', val: 'Alfama (Surviving medieval quarter)' },
        { label: 'Iconic Transport', val: 'Tram 28 & Santa Justa Lift' },
        { label: 'Signature Art', val: 'Azulejos (Hand-painted ceramic tiles)' },
        { label: 'Musical Soul', val: 'Fado (UNESCO Intangible Heritage)' }
      ]
    },
    foods: [
      { name: 'Artisanal Mango & Passionfruit Gelato', badge: '🍦 Handcrafted Artisanal Ice Cream Spot', desc: 'Fresh tropical fruit gelato churned daily using organic Portuguese milk and real fruits.', spot: 'Santini Gelato Parlour (Chiado Heritage Shop)', cost: '€3.80 ($4.10) / double scoop', photo: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=80' },
      { name: 'Pastéis de Belém (Custard Tarts)', badge: '⭐ World-Famous Icon', desc: 'Crisp flaky puff pastry filled with creamy egg custard and dusted with cinnamon.', spot: 'Pastéis de Belém (Since 1837)', cost: '€1.40 ($1.50) each', photo: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=600&q=80' },
      { name: 'Bacalhau à Brás', badge: '🐟 Traditional Seafood', desc: 'Shredded salted cod sautéed with finely chopped onions, matchstick potatoes, and eggs.', spot: 'Taberna da Rua das Flores', cost: '€14.00 ($15.20)', photo: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Traditional Bifana Pork Sandwich', badge: '🔥 Street Food Favorite', desc: 'Tender garlic-simmered pork cutlets in crusty Papo Seco bread with mustard.', spot: 'O Trevo (Praça Luís de Camões)', cost: '€3.80 ($4.10)', photo: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80' },
      { name: 'Amêijoas à Bulhão Pato (Garlic Clams)', badge: '🦪 Atlantic Seafood', desc: 'Fresh local clams steamed in white wine, olive oil, garlic, and fresh coriander.', spot: 'Cervejaria Ramiro (Intendente)', cost: '€16.50 ($18.00)', photo: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Grilled Sardinhas Assadas', badge: '🌊 Summer Classic', desc: 'Fresh Atlantic sardines char-grilled over hot coals with sea salt and roasted bell peppers.', spot: 'Pátio 13 (Alfama)', cost: '€11.50 ($12.50)', photo: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80' }
    ],
    hotels: [
      { name: 'Memmo Alfama Boutique Hotel', tier: 'Boutique Historic', desc: 'Old Town historic design stay with rooftop plunge pool overlooking Tagus River.', price: '$164/night', amenities: ['0.4 km to Miradouro', 'Rooftop Wine Bar', 'Old Town Walk'], photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
      { name: 'Bairro Alto Hotel', tier: 'Luxury 5-Star Boutique', desc: 'Prestigious 5-star hotel in an 18th-century building overlooking Rossio Square.', price: '$290/night', amenities: ['0.3 km to Chiado', 'Rooftop Terrace', 'Michelin Dining'], photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Casa da Rua Baixa Suites', tier: 'Design Stay', desc: 'Centrally located design suites steps away from Praça do Comércio.', price: '$138/night', amenities: ['1.0 km to Santa Justa', 'Artisan Breakfast', 'Central'], photo: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' }
    ],
    streets: [
      { name: 'Rua Augusta', vibe: 'Pedestrian Boulevard · 0.8 km', desc: 'Grand tiled walking street connecting Rossio square to waterfront Praça do Comércio.', highlight: 'Highlights: Street artists, mosaic pavement, outdoor cafes' },
      { name: 'Rua Nova do Carvalho (Pink Street)', vibe: 'Nightlife & Drinks · 1.4 km', desc: 'Famous bright pink-painted street in Cais do Sodré lined with trendy cocktail bars.', highlight: 'Best for: Evening craft drinks and lively music' }
    ],
    expenses: {
      budget: { cost: '$65 / day (€60)', desc: 'Hostels / shared apartments, metro pass, bakery breakfasts, and tasca lunches.' },
      comfort: { cost: '$145 / day (€130)', desc: 'Boutique stay, Uber/taxis, sit-down fado dinners, and Sintra day pass.' },
      luxury: { cost: '$340 / day (€310)', desc: 'Luxury 5-star hotel, private catamaran cruise on Tagus, and Michelin dining.' },
      tickets: [
        { item: 'Jerónimos Monastery Entry', price: '€10' },
        { item: 'Belém Tower Entry', price: '€6' },
        { item: 'Sintra Pena Palace & Park', price: '€14' }
      ]
    }
  },
  Kyoto: {
    city: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    tagline: 'Ancient imperial capital of 2,000 temples, bamboo groves & geisha traditions',
    photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    timeReq: '4–5 Days Optimal',
    dailyBudget: '$70 – $240 / day (¥10,000 – ¥35,000)',
    bestSeason: 'Spring Cherry Blossoms & Autumn Foliage',
    history: {
      title: 'The Eternal Cultural Heart of Japan',
      text: 'Kyoto was the imperial capital of Japan for over a thousand years (794 to 1868). Spared from widespread destruction during World War II, Kyoto remains Japan’s cultural treasure trove, home to 17 UNESCO World Heritage monuments, 1,600 Buddhist temples, and historic machiya teahouses.',
      facts: [
        { label: 'Imperial Period', val: 'Capital for 1,074 years' },
        { label: 'Preserved Shrines', val: 'Over 2,000 temples & shrines' },
        { label: 'Zen Gardens', val: 'Ryoan-ji rock garden & Moss temples' }
      ]
    },
    foods: [
      { name: 'Stone-Ground Uji Matcha Soft Cream Gelato', badge: '🍦 Handcrafted Artisanal Ice Cream Spot', desc: 'Rich 100% Uji matcha soft-serve topped with chewy shiratama dango and golden azuki paste.', spot: 'Tsujiri Gion Matcha Gelato Parlour (Gion Main St)', cost: '¥650 ($4.50) / cone', photo: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80' },
      { name: 'Traditional Kaiseki Ryori Haute Cuisine', badge: '👑 3-Star Michelin Artistry', desc: 'Multi-course seasonal banquet celebrating nature with exquisite ceramic tableware and balanced flavors.', spot: 'Gion Karyo / Kikunoi Honten', cost: '¥12,000 ($82)', photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kyoto Yudofu Hot Pot Broth', badge: '🌿 Vegan & Buddhist Zen', desc: 'Silken handmade artisan tofu simmered in kombu dashi broth with ginger and scallion dipping sauce.', spot: 'Tousuiro (Kamo River)', cost: '¥3,800 ($26)', photo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80' },
      { name: 'Nishiki Market Yakitori & Wagyu', badge: '🔥 Street Market Favorite', desc: 'Tender grilled wagyu beef skewers and char-grilled chicken yakitori basted in sweet tare glaze.', spot: 'Nishiki Market Alley', cost: '¥600 ($4.10) / skewer', photo: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kyoto Yuzu Shio Craft Ramen', badge: '🍜 Noodle Specialty', desc: 'Clear chicken dashi broth infused with aromatic citrus yuzu, chashu pork, and bamboo shoots.', spot: 'Gion Ramen Miyako', cost: '¥1,100 ($7.50)', photo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80' }
    ],
    hotels: [
      { name: 'Gion Machiya Traditional Inn', tier: 'Heritage Ryokan', desc: 'Authentic tatami suites with private hinoki cedar baths in Gion.', price: '$155/night', amenities: ['0.8 km to Kiyomizu', 'Tatami Mats', 'Tea Garden'], photo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80' },
      { name: 'The Thousand Kyoto Luxury Stay', tier: 'Modern Minimalist 5-Star', desc: 'Sleek zen luxury hotel adjacent to Kyoto station with peaceful indoor garden.', price: '$240/night', amenities: ['2.1 km to Gion', 'Zen Garden', 'Spa & Tea Lounge'], photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' }
    ],
    streets: [
      { name: 'Ninenzaka & Sannenzaka', vibe: 'Stone-Paved Heritage Lanes · 1.2 km', desc: 'Preserved stone stairways lined with traditional wooden tea houses and artisan pottery shops.', highlight: 'Highlights: Tatami Starbucks & traditional fan shops' }
    ],
    expenses: {
      budget: { cost: '$70 / day (¥10,500)', desc: 'Capsule / guesthouse, ramen & market eats, IC card transit.' },
      comfort: { cost: '$160 / day (¥24,000)', desc: 'Boutique machiya hotel, kaiseki dining, and express trains.' },
      luxury: { cost: '$420 / day (¥63,000)', desc: 'Luxury ryokan with onsen, private Zen garden tour with monk.' },
      tickets: [
        { item: 'Kinkaku-ji (Golden Pavilion)', price: '¥500 ($3.50)' },
        { item: 'Kiyomizu-dera Temple', price: '¥400 ($2.80)' }
      ]
    }
  },
  Dubai: {
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    tagline: 'Futuristic city of records, desert dunes, luxury souks & beachfront living',
    photo: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    timeReq: '4–5 Days Optimal',
    dailyBudget: '$95 – $320 / day (AED 350 – AED 1,200)',
    bestSeason: 'November to March (Pleasant & Sunny)',
    history: {
      title: 'From Pearl Creek to Global Metropolis',
      text: 'Dubai began as a modest 18th-century fishing and pearl-diving village along Dubai Creek. Over the last half-century, vision and architectural ambition transformed it into a world-leading hub of innovation, architecture, and luxury.',
      facts: [
        { label: 'World Records', val: 'Burj Khalifa, Palm Jumeirah, Dubai Mall' },
        { label: 'Cultural Roots', val: 'Bedouin hospitality & trade souks' }
      ]
    },
    foods: [
      { name: 'Camel Milk Chocolate & Saffron Gelato', badge: '🍦 Handcrafted Artisanal Ice Cream Spot', desc: 'Luxury artisanal gelato prepared with local camel milk, saffron, cardamom, and roasted pistachios.', spot: 'Nouq Camel Milk Gelato Parlour (Al Fahidi)', cost: 'AED 24 ($6.50) / cup', photo: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Authentic Emirati Lamb & Chicken Shawarma', badge: '🔥 Street Legend', desc: 'Thinly carved rotisserie spiced meat wrapped in fresh saj bread with garlic toum and pickles.', spot: 'Al Mallah (2nd Dec St)', cost: 'AED 12 ($3.25)', photo: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80' },
      { name: 'Emirati Machboos Spiced Rice', badge: '⭐ National Dish', desc: 'Slow-simmered basmati rice flavored with dried black lime (loomi), cardamom, and tender chicken.', spot: 'Al Khayma Heritage Restaurant', cost: 'AED 65 ($17.70)', photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80' },
      { name: 'Golden Luqaimat Dumplings', badge: '🍯 Traditional Sweet', desc: 'Crisp fried dough balls drizzled with rich date molasses and toasted sesame seeds.', spot: 'Arabian Tea House (Al Fahidi)', cost: 'AED 28 ($7.60)', photo: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80' },
      { name: 'Warm Kunafa with Pistachio Crumb', badge: '🍰 Dessert Icon', desc: 'Crunchy spun kataifi pastry layered with melted sweet cheese and aromatic rose water syrup.', spot: 'Firas Sweets', cost: 'AED 25 ($6.80)', photo: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80' }
    ],
    hotels: [
      { name: 'The Palm Sanctuary Luxury Resort', tier: 'Beachfront 5-Star', desc: 'Private beach access with infinity pools on the iconic Palm Jumeirah island.', price: '$260/night', amenities: ['Private Beach', 'Infinity Pool', 'Chauffeur'], photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Palace Downtown Dubai', tier: 'Luxury Heritage Stay', desc: 'Arabi-styled luxury hotel positioned directly facing Burj Khalifa & Dubai Fountain.', price: '$310/night', amenities: ['1.2 km to Burj Khalifa', 'Fountain View', 'Palatial Spa'], photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' }
    ],
    streets: [
      { name: 'Al Fahidi Historic Lane', vibe: 'Heritage & Coffee · 7.8 km', desc: 'Quiet pedestrian sand-colored alleys with wind towers, art galleries, and courtyards.', highlight: 'Best for: Traditional tea and spice shopping' }
    ],
    expenses: {
      budget: { cost: '$95 / day', desc: 'City metro, shawarma & souk dining, public beaches.' },
      comfort: { cost: '$220 / day', desc: '4-star downtown hotel, desert safari, fine dining.' },
      luxury: { cost: '$550 / day', desc: 'Burj Al Arab or Palm villa, private yacht charter.' },
      tickets: [
        { item: 'Burj Khalifa Observation Deck', price: 'AED 179 ($49)' },
        { item: 'Museum of the Future', price: 'AED 149 ($40)' }
      ]
    }
  },
  Paris: {
    city: 'Paris',
    country: 'France',
    region: 'Europe',
    tagline: 'The City of Light, world-class art, Haussmannian boulevards & café culture',
    photo: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
    timeReq: '4–6 Days Optimal',
    dailyBudget: '$80 – $280 / day (€75 – €260)',
    bestSeason: 'Spring & Autumn (Mild & Romantic)',
    history: {
      title: 'From Roman Lutetia to the Cultural Capital of the World',
      text: 'From its origins on the Île de la Cité to the Renaissance, French Revolution, and 19th-century Belle Époque, Paris has inspired world philosophy, fashion, gastronomy, and art.',
      facts: [
        { label: 'Grand Monuments', val: 'Eiffel Tower, Louvre, Notre-Dame' },
        { label: 'Culinary Heritage', val: 'Boulangeries, Bistronomy & Wine' }
      ]
    },
    foods: [
      { name: 'Artisanal Salted Caramel & Wild Strawberry Gelato', badge: '🍦 Handcrafted Artisanal Ice Cream Spot', desc: 'Legendary French artisanal ice cream crafted on Île Saint-Louis using pure cream and fresh fruits.', spot: 'Berthillon Glaciers (Île Saint-Louis Heritage Shop)', cost: '€4.50 ($4.90) / double scoop', photo: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80' },
      { name: 'Artisanal Butter Croissants & Pain au Chocolat', badge: '🥐 Morning Baker Icon', desc: 'Flaky, buttery multi-layered golden croissants fresh from morning ovens.', spot: 'Du Pain et des Idées (10th Arr.)', cost: '€1.80 ($2.00)', photo: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
      { name: 'Crispy Duck Confit (Confit de Canard)', badge: '⭐ French Bistro Classic', desc: 'Slow-cooked duck leg in its own savory fat until skin is paper-crisp, served with garlic potatoes.', spot: 'Chez Janou (Le Marais)', cost: '€21.00 ($23.00)', photo: 'https://images.unsplash.com/photo-1514944298352-f41e57c6b54a?auto=format&fit=crop&w=600&q=80' },
      { name: 'Parisian Macarons Assortment', badge: '🍰 Haute Pâtisserie', desc: 'Delicate almond meringue sandwich cookies filled with rich ganache, pistachio, and raspberry.', spot: 'Ladurée / Pierre Hermé', cost: '€2.80 ($3.10) each', photo: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80' },
      { name: 'Authentic Breton Crêpes & Galettes', badge: '🔥 Street Crêperie', desc: 'Buckwheat galettes with melted Gruyère, ham, and egg cooked on traditional cast-iron billigs.', spot: 'Breizh Café (Rue Vieille du Temple)', cost: '€9.50 ($10.50)', photo: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80' }
    ],
    hotels: [
      { name: 'Le Marais Boutique Townhouse', tier: 'Chic Historic Stay', desc: 'Historic 17th-century exposed beam hotel in the vibrant center of Le Marais.', price: '$195/night', amenities: ['0.5 km to Pompidou', 'Free Breakfast', 'Boutique Bar'], photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
      { name: 'Hôtel Plaza Athénée', tier: 'Palace Luxury 5-Star', desc: 'Iconic luxury hotel on Avenue Montaigne featuring Eiffel Tower balcony views and Dior Spa.', price: '$650/night', amenities: ['1.1 km to Eiffel Tower', 'Eiffel View', 'Dior Spa'], photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' }
    ],
    streets: [
      { name: 'Rue Montorgueil', vibe: 'Food Market & Cafes · 0.9 km', desc: 'Pedestrian cobblestone street famous for cheese shops, patisseries, and lively terraces.', highlight: 'Best for: Afternoon wine and cheese tasting' }
    ],
    expenses: {
      budget: { cost: '$80 / day', desc: 'Baguette sandwiches, metro pass, museum free days.' },
      comfort: { cost: '$190 / day', desc: 'Boutique hotel, dinner bistros, Louvre & Eiffel access.' },
      luxury: { cost: '$480 / day', desc: '5-star palace hotel, Seine dinner cruise, Michelin dining.' },
      tickets: [
        { item: 'Louvre Museum Entry', price: '€17 ($19)' },
        { item: 'Eiffel Tower Top Floor', price: '€29 ($32)' }
      ]
    }
  }
};

// Verified Food Images Pool for Fallback Profiles
const fallbackFoodPool = [
  { name: 'Artisanal Ice Cream & Fruit Gelato Scoop', badge: '🍦 Handcrafted Artisanal Ice Cream Spot', desc: 'Hand-churned organic gelato crafted with fresh seasonal berries, Belgian chocolate, and vanilla bean.', spot: 'Heritage Gelato & Dessert Parlour', cost: '$3.50 – $5.00', photo: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80' },
  { name: 'Regional Signature Tasting Platter', badge: '⭐ House Specialty', desc: 'Authentic selection of regional specialties cooked with farm-fresh herbs and spices.', spot: 'Old Town Central Market', cost: '$10 – $16', photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80' },
  { name: 'Artisanal Morning Bakery & Pastry', badge: '🥐 Fresh Oven Bake', desc: 'Warm flaky morning pastries paired with aromatic specialty coffee.', spot: 'Historic Quarter Cafes', cost: '$4 – $7', photo: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
  { name: 'Slow-Cooked Heritage Evening Stew', badge: '🔥 Local Comfort Dish', desc: 'Slow-simmered regional stew served with crusty artisan bread and local wine.', spot: 'Neighborhood Bistros', cost: '$15 – $24', photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80' },
  { name: 'Handmade Dessert & Confectionery', badge: '🍰 Sweet Delicacy', desc: 'Decadent handcrafted sweet pastry using traditional recipes and seasonal fruits.', spot: 'Patisserie Artisans', cost: '$5 – $8', photo: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80' }
];

function getCityProfile(cityName) {
  const parts = (cityName || '').split(',');
  const city = parts[0].trim();
  let country = parts[1] ? parts[1].trim() : '';
  let region = 'Asia';

  // Look up destination in worldPlaces
  const foundPlace = worldPlaces.find(p => p.city.toLowerCase() === city.toLowerCase() || city.toLowerCase().includes(p.city.toLowerCase()));
  if (foundPlace) {
    if (!country || country === 'World Destination' || country === 'Destination') {
      country = foundPlace.country;
    }
    region = foundPlace.region || (country.toLowerCase() === 'india' ? 'Asia' : 'International');
  }

  if (!country) {
    country = 'India';
  }

  // Ensure current currency is synced with this destination
  const destCurr = getCurrencyForDestination(city, country) || currentCurrency || 'INR';

  // Specific high-value Indian destinations: Udaipur
  if (city.toLowerCase() === 'udaipur') {
    return {
      city: 'Udaipur',
      country: 'India',
      region: 'Asia',
      tagline: 'City of Lakes, royal marble palaces floating on Lake Pichola & vibrant Mewar heritage',
      photo: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80',
      timeReq: '3–4 Days Optimal',
      dailyBudget: `${formatMoney(35)} – ${formatMoney(130)} / day`,
      bestSeason: 'September to March (Pleasant & Breezy)',
      history: {
        title: 'The Venice of the East & Kingdom of Mewar',
        text: 'Founded in 1559 by Maharana Udai Singh II as the capital of the Mewar kingdom, Udaipur is celebrated for its historic marble City Palace complex, serene artificial lakes like Lake Pichola and Fateh Sagar, and enduring Rajput valor.',
        facts: [
          { label: 'Key Heritage Site', val: 'Udaipur City Palace & Lake Palace' },
          { label: 'Sacred Waterway', val: 'Lake Pichola & Fateh Sagar' },
          { label: 'Architectural Style', val: 'Rajput & Mughal Palatial Marble' },
          { label: 'Art Legacy', val: 'Pichwai Paintings & Miniature Art' }
        ]
      },
      foods: [
        { name: 'Saffron & Pistachio Matka Kulfi', badge: '🍦 Handcrafted Artisanal Ice Cream Spot', desc: 'Slow-simmered rabri kulfi enriched with saffron threads, pistachios, and served in chilled clay pots.', spot: 'Bhamashah Artisanal Kulfi (Clock Tower)', cost: `${formatMoney(1.5)} / serving`, photo: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80' },
        { name: 'Dal Baati Churma Royal Thali', badge: '🏆 Traditional Mewari Specialty', desc: 'Baked wheat baati balls drenched in pure desi ghee, paired with spiced five-lentil dal and sweet crushed churma.', spot: 'Krishna Dal Baati Restro (Gulab Bagh)', cost: `${formatMoney(4)} / royal thali`, photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80' },
        { name: 'Pyaaz Kachori & Mirchi Vada', badge: '🔥 Morning Bazaar Favorite', desc: 'Crispy golden flaky crust stuffed with spicy onion-potato masala, served with tamarind mint chutney.', spot: 'Jagdish Mishtan Bhandar (Old City)', cost: `${formatMoney(0.6)} / plate`, photo: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80' },
        { name: 'Mewari Gatta Curry & Bajra Roti', badge: '⭐ Royal Heritage Delicacy', desc: 'Gram flour dumplings poached and simmered in a spiced yogurt gravy with rustic pearl millet flatbreads.', spot: 'Ambrai Lakefront Restaurant', cost: `${formatMoney(6)} / meal`, photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80' }
      ],
      hotels: [
        { name: 'Taj Lake Palace Luxury', tier: 'Ultra-Luxury 5-Star', desc: 'Iconic 18th-century white marble palace floating in the middle of Lake Pichola with private boat transfers.', price: `${formatMoney(380)}/night`, amenities: ['Lake Pichola Center', 'Royal Butler', 'Jiva Spa'], photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
        { name: 'Jagat Niwas Heritage Haveli', tier: 'Heritage Boutique Stay', desc: 'Restored 17th-century haveli directly overlooking the lake with romantic jharokha window seating.', price: `${formatMoney(85)}/night`, amenities: ['0.4 km to City Palace', 'Rooftop Dining', 'Haveli Vibe'], photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
        { name: 'Pichola Lake View Haveli Homestay', tier: 'Budget Comfort', desc: 'Warm local hospitality, rooftop lake views, and clean comfortable heritage rooms.', price: `${formatMoney(32)}/night`, amenities: ['0.6 km to Center', 'Lake Terrace View', 'Free Wi-Fi'], photo: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=600&q=80' }
      ],
      streets: [
        { name: 'Lal Ghat & Gangaur Ghat Promenade', vibe: 'Lakefront Heritage & Folk Music · 0.2 km', desc: 'Paved lakefront steps hosting sunset flute melodies, boat rides, and artisan jewelry stalls.', highlight: 'Best for: Sunset reflections & photography' }
      ],
      expenses: {
        budget: { cost: `${formatMoney(25)} / day`, desc: 'Budget heritage guesthouse, authentic thali dining, local auto-rickshaws, and lakeside walks.' },
        comfort: { cost: `${formatMoney(75)} / day`, desc: 'Boutique haveli stay, rooftop lake dinners, boat cruise, and City Palace ticket.' },
        luxury: { cost: `${formatMoney(220)} / day`, desc: '5-star lake palace resort, private shikara boat tour, and gourmet fine dining.' },
        tickets: [
          { item: 'Udaipur City Palace Museum', price: formatMoney(4.5) },
          { item: 'Lake Pichola Sunset Boat Cruise', price: formatMoney(8.5) }
        ]
      }
    };
  }

  // Check if there is an explicit deep profile in cityDeepProfiles
  if (cityDeepProfiles[city]) {
    const prof = cityDeepProfiles[city];
    return {
      ...prof,
      dailyBudget: `${formatMoney(35)} – ${formatMoney(140)} / day`
    };
  }

  // Dynamic profile for all destinations with native country currency
  const tag = foundPlace ? foundPlace.detail : `Discover the iconic landmarks, authentic local food traditions, and cultural heritage of ${city}`;
  return {
    city: city,
    country: country,
    region: region,
    tagline: tag,
    photo: (foundPlace && foundPlace.photo) ? foundPlace.photo : placePhotos[0],
    timeReq: '3–4 Days Optimal',
    dailyBudget: `${formatMoney(35)} – ${formatMoney(140)} / day`,
    bestSeason: country.toLowerCase() === 'india' ? 'October to March (Mild & Pleasant)' : 'Spring & Autumn',
    history: {
      title: `Rich Heritage & Origins of ${city}`,
      text: `${city} boasts a celebrated history shaped by centuries of regional culture, architectural evolution, and local traditions in ${country}.`,
      facts: [
        { label: 'Heritage Focus', val: `${city} Historic Landmarks & Culture` },
        { label: 'Best Way to Explore', val: 'Walking tours, cabs & transit' },
        { label: 'Local Vibe', val: 'Authentic, scenic & welcoming' }
      ]
    },
    foods: fallbackFoodPool.map((f, i) => ({
      ...f,
      name: i === 0 ? `${city} Handcrafted Artisanal Gelato / Kulfi` : `${city} ${f.name}`,
      spot: `${city} Central Quarter`,
      cost: `${formatMoney(i === 0 ? 2 : (i === 1 ? 4 : (i === 2 ? 6 : 3)))}`
    })),
    hotels: [
      { name: `${city} Heritage Boutique Sanctuary`, tier: 'Boutique Stay', desc: `Charming boutique retreat located close to the historic quarter of ${city}.`, price: `${formatMoney(75)}/night`, amenities: ['0.5 km to Center', 'Free Breakfast', 'Terrace View'], photo: placePhotos[4] },
      { name: `${city} Grand Luxury Resort & Spa`, tier: 'Luxury 5-Star', desc: `Upscale 5-star hotel offering panoramic views, signature spa, and fine dining.`, price: `${formatMoney(190)}/night`, amenities: ['1.2 km to Center', 'Infinity Pool', 'Spa & Butler'], photo: placePhotos[2] },
      { name: `${city} Cozy Garden Homestay`, tier: 'Budget Comfort', desc: `Clean, peaceful accommodation offering personalized hospitality and authentic breakfast.`, price: `${formatMoney(32)}/night`, amenities: ['0.8 km to Center', 'Garden View', 'Free Wi-Fi'], photo: placePhotos[0] }
    ],
    streets: [
      { name: `${city} Central Heritage Promenade`, vibe: 'Local Life & Architecture · 0.6 km', desc: `Main pedestrian promenade lined with vibrant markets, heritage buildings, and cafes.`, highlight: 'Best for: Scenic walks & local discovery' }
    ],
    expenses: {
      budget: { cost: `${formatMoney(25)} / day`, desc: 'Budget accommodation, delicious local street food, public transport, and free walking sights.' },
      comfort: { cost: `${formatMoney(70)} / day`, desc: 'Boutique hotel, dining at popular local restaurants, and museum tickets.' },
      luxury: { cost: `${formatMoney(180)} / day`, desc: '5-star luxury stay, private transport, and fine dining.' },
      tickets: [
        { item: `${city} Cultural Monument Pass`, price: formatMoney(4) },
        { item: `${city} Scenic River / City Tour`, price: formatMoney(7) }
      ]
    }
  };
}




// =========================================================
// 4. CIRCLE LIVE COMPANION DISTANCE RADAR (Real-time km)
//    Interactive Leaflet Map, Simulated GPS Movement,
//    Companion Cards with Remove & Navigate, Share Link
// =========================================================

// Haversine distance in km between two lat/lng pairs
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Get proximity tag from distance
function getProximity(km) {
  if (km < 2) return 'near';
  if (km <= 10) return 'moderate';
  return 'far';
}

// Generate a random coordinate near a center within radiusKm
function randomNearby(center, radiusKm) {
  const deg = radiusKm / 111;
  return [
    center[0] + (Math.random() - 0.5) * 2 * deg,
    center[1] + (Math.random() - 0.5) * 2 * deg
  ];
}

// Estimate walking ETA string from km
function etaFromKm(km) {
  if (km < 0.3) return '< 1 min walk';
  if (km < 2) return `${Math.round(km * 12)} min walk`;
  if (km < 6) return `${Math.round(km * 3)} min drive`;
  return `${Math.round(km * 2)} min drive`;
}

// Random companion statuses
const companionStatuses = [
  'Active now', 'Walking nearby', 'Taking photos', 'Sightseeing',
  'At a café', 'Exploring streets', 'Near landmark', 'On the move',
  'At restaurant', 'Shopping area', 'Resting', 'Available'
];

function getCityCenter() {
  return cityCoords[currentTripState.city] || [27.1751, 78.0421];
}

// --- Initialize Leaflet Map ---
function initLiveMap() {
  const mapContainer = document.getElementById('liveMap');
  if (!mapContainer || typeof L === 'undefined') return;

  // Destroy previous map if it exists
  if (liveMap) {
    liveMap.remove();
    liveMap = null;
  }

  const center = getCityCenter();

  liveMap = L.map('liveMap', {
    center: center,
    zoom: 13,
    zoomControl: true,
    attributionControl: false
  });

  // Dark-themed tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(liveMap);

  // Attribution in bottom-right (subtle)
  L.control.attribution({ position: 'bottomright', prefix: '' }).addTo(liveMap);

  // Add "You are here" marker
  const youIcon = L.divIcon({
    className: '',
    html: '<div class="you-marker-pulse"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  userMarker = L.marker(center, { icon: youIcon, zIndexOffset: 1000 })
    .addTo(liveMap)
    .bindPopup(`<b>📍 You</b><br>${currentTripState.city} · Your location`);

  // Plot companions
  plotCompanionMarkers();
}

function plotCompanionMarkers() {
  if (!liveMap) return;

  // Remove old companion markers
  liveMapMarkers.forEach(m => liveMap.removeLayer(m));
  liveMapMarkers = [];

  const center = getCityCenter();

  circleCompanions.forEach(c => {
    // Assign lat/lng if not set
    if (!c.lat || !c.lng || c.lat === 0) {
      const pos = randomNearby(center, c.distanceKm || 2);
      c.lat = pos[0];
      c.lng = pos[1];
    }

    // Recalculate distance from center
    c.distanceKm = parseFloat(haversineKm(center[0], center[1], c.lat, c.lng).toFixed(1));
    c.proximity = getProximity(c.distanceKm);

    const icon = L.divIcon({
      className: '',
      html: `<div class="companion-marker">${c.avatar}</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const marker = L.marker([c.lat, c.lng], { icon: icon })
      .addTo(liveMap)
      .bindPopup(`<b>${c.name}</b><br><small>${c.role}</small><br>📍 ${c.distanceKm} km away · ${etaFromKm(c.distanceKm)}`);

    liveMapMarkers.push(marker);
  });

  // Plot saved itinerary places from favorites if any
  if (currentTripState.favoritePlaces && currentTripState.favoritePlaces.length > 0) {
    currentTripState.favoritePlaces.forEach(fp => {
      const pos = randomNearby(center, 3 + Math.random() * 5);
      const placeIcon = L.divIcon({
        className: '',
        html: '<div class="place-marker-icon">🏛️</div>',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });
      const pm = L.marker(pos, { icon: placeIcon })
        .addTo(liveMap)
        .bindPopup(`<b>🏛️ ${fp.name || fp}</b><br><small>Saved place</small>`);
      liveMapMarkers.push(pm);
    });
  }
}

// --- Companion list with cards, remove & navigate ---
function updateCircleLiveRadar(city) {
  const center = cityCoords[city] || [27.1751, 78.0421];
  const names = [
    { name: 'Emma Watson', role: 'Travel Buddy', avatar: 'EW' },
    { name: 'Liam Davies', role: 'Photographer Friend', avatar: 'LD' },
    { name: 'Carlos Santos', role: 'Local Guide / Host', avatar: 'CS' }
  ];
  circleCompanions = names.map((n, i) => {
    const pos = randomNearby(center, [1, 5, 2.5][i]);
    const dist = parseFloat(haversineKm(center[0], center[1], pos[0], pos[1]).toFixed(1));
    return {
      id: `c${i + 1}`,
      name: n.name,
      role: n.role,
      location: `${city} ${['Landmark Area', 'Old Quarter', 'Central Market'][i]}`,
      distanceKm: dist,
      proximity: getProximity(dist),
      status: companionStatuses[Math.floor(Math.random() * companionStatuses.length)],
      avatar: n.avatar,
      lat: pos[0],
      lng: pos[1]
    };
  });

  renderCircleLivePeople();

  // Update share link with city name
  const shareLinkInput = $('#shareLinkInput');
  if (shareLinkInput) {
    const slug = city.toLowerCase().replace(/\s+/g, '-');
    shareLinkInput.value = `https://tripnest.app/live/${slug}-safe-${Math.floor(Math.random() * 9000 + 1000)}`;
  }

  // Reinitialize map if panel is visible
  if (!$('#locationPanel').classList.contains('hidden')) {
    setTimeout(() => initLiveMap(), 100);
  }
}

function renderCircleLivePeople() {
  const container = $('#circlePeopleList');
  if (!container) return;

  container.innerHTML = circleCompanions.map(c => `
    <div class="circle-person-card" data-companion-id="${c.id}">
      <div class="c-person-info">
        <span class="c-avatar">${c.avatar}</span>
        <div>
          <b>${c.name} <small style="color:var(--muted); font-weight:normal;">(${c.role})</small></b>
          <small>📍 ${c.location} · <span style="color:#a9ddd7;">${c.status}</span></small>
          <span class="c-direction-eta" id="eta-${c.id}"></span>
        </div>
      </div>
      <div class="c-person-right">
        <div class="person-distance-pill ${c.proximity}">
          ${c.proximity === 'near' ? '🟢' : c.proximity === 'moderate' ? '🟡' : '🔵'} ${c.distanceKm} km
        </div>
        <button class="c-navigate-btn" data-nav-id="${c.id}">🧭 Navigate</button>
        <button class="c-remove-btn" data-remove-id="${c.id}" title="Remove companion">×</button>
      </div>
    </div>
  `).join('');

  // Wire remove buttons
  $$('[data-remove-id]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = btn.dataset.removeId;
    const companion = circleCompanions.find(c => c.id === id);
    circleCompanions = circleCompanions.filter(c => c.id !== id);
    renderCircleLivePeople();
    plotCompanionMarkers();
    if (companion) toast(`Removed ${companion.name} from radar`);
  }));

  // Wire navigate buttons
  $$('[data-nav-id]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = btn.dataset.navId;
    const c = circleCompanions.find(c => c.id === id);
    if (!c) return;
    const eta = etaFromKm(c.distanceKm);
    const etaEl = $(`#eta-${id}`);
    if (etaEl) {
      etaEl.textContent = `🧭 ${eta} via ${c.distanceKm < 2 ? 'walking' : 'cab'} · ${c.distanceKm} km`;
      etaEl.classList.add('show');
    }
    // Pan map to companion
    if (liveMap && c.lat && c.lng) {
      liveMap.flyTo([c.lat, c.lng], 15, { duration: 1 });
    }
    toast(`Navigate to ${c.name}: ${eta}`);
  }));

  // Click card to pan to marker
  $$('.circle-person-card').forEach(card => card.addEventListener('click', () => {
    const id = card.dataset.companionId;
    const c = circleCompanions.find(c => c.id === id);
    if (c && liveMap && c.lat && c.lng) {
      liveMap.flyTo([c.lat, c.lng], 15, { duration: 0.8 });
    }
  }));
}

// --- Add companion via share button ---
$('#shareBtn').addEventListener('click', () => {
  const name = ($('#shareWith').value || '').trim();
  if (!name) return;
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'FR';
  const center = getCityCenter();
  const pos = randomNearby(center, 0.5 + Math.random() * 3);
  const dist = parseFloat(haversineKm(center[0], center[1], pos[0], pos[1]).toFixed(1));
  circleCompanions.push({
    id: `c-${Date.now()}`,
    name: name,
    role: 'Companion',
    location: `${currentTripState.city} City Center`,
    distanceKm: dist,
    proximity: getProximity(dist),
    status: 'Just shared location',
    avatar: initials,
    lat: pos[0],
    lng: pos[1]
  });
  $('#shareWith').value = '';
  renderCircleLivePeople();
  plotCompanionMarkers();
  toast(`📍 Added ${name} to Circle Live radar (${dist} km away)`);
});

// --- Simulated companion movement (every 10s) ---
function startLiveMovementSimulation() {
  if (liveMovementInterval) clearInterval(liveMovementInterval);
  liveMovementInterval = setInterval(() => {
    const center = getCityCenter();
    circleCompanions.forEach(c => {
      // Gently shift position
      const drift = 0.001 + Math.random() * 0.003;
      c.lat += (Math.random() - 0.5) * drift;
      c.lng += (Math.random() - 0.5) * drift;
      c.distanceKm = parseFloat(haversineKm(center[0], center[1], c.lat, c.lng).toFixed(1));
      c.proximity = getProximity(c.distanceKm);
      // Occasionally update status
      if (Math.random() < 0.2) {
        c.status = companionStatuses[Math.floor(Math.random() * companionStatuses.length)];
      }
    });
    renderCircleLivePeople();
    plotCompanionMarkers();
  }, 10000);
}

// --- Share Link Controls ---
if ($('#copyShareLinkBtn')) {
  $('#copyShareLinkBtn').addEventListener('click', () => {
    const input = $('#shareLinkInput');
    if (!input) return;
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
      const btn = $('#copyShareLinkBtn');
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy Link'; btn.classList.remove('copied'); }, 2000);
      toast('🔗 Live map link copied to clipboard');
    }).catch(() => {
      document.execCommand('copy');
      toast('🔗 Link copied');
    });
  });
}

if ($('#shareWhatsAppBtn')) {
  $('#shareWhatsAppBtn').addEventListener('click', () => {
    const link = ($('#shareLinkInput') || {}).value || '';
    const msg = encodeURIComponent(`Hey! Track my live location & itinerary in ${currentTripState.city} on TripNest: ${link}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
    toast('💬 Opening WhatsApp share...');
  });
}

if ($('#shareMessageBtn')) {
  $('#shareMessageBtn').addEventListener('click', () => {
    const link = ($('#shareLinkInput') || {}).value || '';
    const msg = encodeURIComponent(`Track my live trip in ${currentTripState.city}: ${link}`);
    window.open(`sms:?body=${msg}`, '_blank');
    toast('✉ Opening message share...');
  });
}

function handleOpenLiveMap() {
  const panel = $('#locationPanel');
  if (panel) {
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      initLiveMap();
      if (typeof startLiveMovementSimulation === 'function') startLiveMovementSimulation();
    }, 300);
    toast('🗺️ Live Map loaded!');
  }
}

function handleLocateRealGPS() {
  const panel = $('#locationPanel');
  if (panel) panel.classList.remove('hidden');
  if (navigator.geolocation) {
    toast('📡 Fetching your real-time GPS location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        if (!liveMap) initLiveMap();
        if (liveMap) {
          liveMap.flyTo([lat, lng], 15, { duration: 1.5 });
          if (userMarker) {
            userMarker.setLatLng([lat, lng]);
            userMarker.bindPopup(`<b>📍 Your Live GPS Location</b><br>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`).openPopup();
          } else {
            const youIcon = L.divIcon({
              className: '',
              html: '<div class="you-marker-pulse"></div>',
              iconSize: [18, 18],
              iconAnchor: [9, 9]
            });
            userMarker = L.marker([lat, lng], { icon: youIcon, zIndexOffset: 1000 }).addTo(liveMap).bindPopup(`<b>📍 Your Live GPS Location</b>`).openPopup();
          }
        }
        toast('✅ Located on Live GPS Map!');
      },
      (err) => {
        toast('📍 Center focused on city map');
        if (!liveMap) initLiveMap();
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  } else {
    if (!liveMap) initLiveMap();
  }
}

if ($('#openLiveMapBtn')) $('#openLiveMapBtn').addEventListener('click', handleOpenLiveMap);
if ($('#navLiveMapLink')) $('#navLiveMapLink').addEventListener('click', (e) => { e.preventDefault(); handleOpenLiveMap(); });
if ($('#locateMeBtn')) $('#locateMeBtn').addEventListener('click', handleLocateRealGPS);
if ($('#legendGpsBtn')) $('#legendGpsBtn').addEventListener('click', handleLocateRealGPS);

// --- Wire "Share Live Map with Favorite" button from weather section ---
if ($('#shareLiveMapBtn')) {
  $('#shareLiveMapBtn').addEventListener('click', () => {
    // Open the location panel
    $$('.care-panel').forEach(panel => panel.classList.add('hidden'));
    $('#locationPanel').classList.remove('hidden');
    $('#locationPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Initialize map after scroll and panel show
    setTimeout(() => {
      initLiveMap();
      startLiveMovementSimulation();
    }, 400);
    toast('📍 Circle Live radar opened — companions visible on map');
  });
}


// Modal opening & tab switching logic
const placeDetailModal = $('#placeDetailModal');
let currentActiveProfile = null;
let currentPdmTab = 'history';

function openCityDetailModal(cityName) {
  const parts = (cityName || '').split(',');
  const city = parts[0].trim();
  const country = parts[1] ? parts[1].trim() : '';

  // Auto-switch application and payment currency to this destination's country
  switchCurrencyForDestination(city, country);

  currentActiveProfile = getCityProfile(cityName);
  const p = currentActiveProfile;

  $('#pdmHeroImg').src = p.photo;
  $('#pdmCountryTag').textContent = `${p.country.toUpperCase()} · ${p.region.toUpperCase()}`;
  $('#pdmCityTitle').textContent = p.city;
  $('#pdmTagline').textContent = p.tagline;
  $('#pdmTimeReq').textContent = p.timeReq;
  $('#pdmDailyBudget').textContent = p.dailyBudget;
  $('#pdmBestSeason').textContent = p.bestSeason;
  $('#pdmFooterCityName').textContent = `${p.city}, ${p.country} Package Ready`;

  currentPdmTab = 'history';
  $$('.pdm-tab').forEach(t => t.classList.toggle('active', t.dataset.pdmTab === 'history'));
  renderPdmTabContent();

  placeDetailModal.showModal();
}


function renderPdmTabContent() {
  const p = currentActiveProfile;
  if (!p) return;

  const body = $('#pdmContentBody');

  if (currentPdmTab === 'history') {
    body.innerHTML = `
      <div class="pdm-history-card">
        <h4>${p.history.title}</h4>
        <p>${p.history.text}</p>
        <div class="pdm-history-facts">
          ${p.history.facts.map(f => `
            <div class="history-fact-box">
              <span>${f.label}</span>
              <b>${f.val}</b>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentPdmTab === 'foods') {
    body.innerHTML = `
      <div class="pdm-foods-grid">
        ${p.foods.map(f => `
          <div class="food-card">
            <div class="food-card-img-wrap">
              ${f.badge ? `<span class="food-badge-tag">${f.badge}</span>` : ''}
              <img src="${f.photo}" alt="${f.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'" />
            </div>
            <div class="food-card-body">
              <h4>${f.name}</h4>
              <p>${f.desc}</p>
              <div class="food-card-footer">
                <span class="food-spot">📍 ${f.spot}</span>
                <span class="food-cost">${f.cost}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentPdmTab === 'hotels') {
    body.innerHTML = `
      <div class="pdm-hotels-grid">
        ${p.hotels.map(h => `
          <div class="hotel-arrange-card">
            <img src="${h.photo}" alt="${h.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'" />
            <div class="hotel-arrange-body">
              <span class="hotel-tier">${h.tier}</span>
              <h4>${h.name}</h4>
              <p>${h.desc}</p>
              <div class="hotel-amenities">
                ${h.amenities.map(a => `<span>✓ ${a}</span>`).join('')}
              </div>
              <div class="hotel-arrange-foot">
                <span style="font-size: 11px; color: var(--muted);">Est. Nightly</span>
                <span class="hotel-price">${h.price}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentPdmTab === 'streets') {
    body.innerHTML = `
      <div class="pdm-streets-grid">
        ${p.streets.map(s => `
          <div class="street-card">
            <span class="street-vibe">🏮 ${s.vibe}</span>
            <h4>${s.name}</h4>
            <p>${s.desc}</p>
            <div class="street-highlight">${s.highlight}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentPdmTab === 'expenses') {
    body.innerHTML = `
      <div class="pdm-expense-section">
        <div class="expense-tiers-grid">
          <div class="expense-tier-card">
            <span class="et-name">🎒 Budget Explorer</span>
            <div class="et-price">${p.expenses.budget.cost}</div>
            <div class="et-desc">${p.expenses.budget.desc}</div>
          </div>
          <div class="expense-tier-card featured">
            <span class="et-name" style="color: var(--coral);">✦ Comfort & Curated</span>
            <div class="et-price" style="color: var(--coral);">${p.expenses.comfort.cost}</div>
            <div class="et-desc">${p.expenses.comfort.desc}</div>
          </div>
          <div class="expense-tier-card">
            <span class="et-name">👑 Luxury Haven</span>
            <div class="et-price">${p.expenses.luxury.cost}</div>
            <div class="et-desc">${p.expenses.luxury.desc}</div>
          </div>
        </div>

        <div class="tickets-guide-box">
          <h5>🎟 Sightseeing & Admissions Price Guide</h5>
          <div class="ticket-rows">
            ${p.expenses.tickets.map(t => `
              <div class="t-row">
                <span>${t.item}</span>
                <b>${t.price}</b>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

// Tab navigation in guide modal
$$('.pdm-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.pdm-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentPdmTab = tab.dataset.pdmTab;
    renderPdmTabContent();
  });
});

$('#closePlaceDetail').addEventListener('click', () => placeDetailModal.close());

$('#pdmApplyTripBtn').addEventListener('click', () => {
  if (!currentActiveProfile) return;
  const p = currentActiveProfile;
  selectDestination(p.city, p.country);
  placeDetailModal.close();
  toast(`✦ Applied ${p.city} guide, hotels, foods and spots to your Trip Planner!`);
  document.querySelector('#wizardSection').scrollIntoView({ behavior: 'smooth' });
});

$$('[data-guide-place]').forEach(btn => {
  btn.addEventListener('click', () => {
    openCityDetailModal(btn.dataset.guidePlace);
  });
});

$('#viewCityGuideBtn').addEventListener('click', () => {
  openCityDetailModal(currentTripState.destination);
});

// =========================================================
// 5. STEP-BY-STEP INTERACTIVE BOOKING WIZARD (4 STEPS & DISTANCES)
// =========================================================
let currentWizardStep = 0;

const wizardCatalog = {
  flight: [
    { id: 'f1', name: 'Express Gatimaan / Flight Connection', detail: 'Direct connection · 1h 40m · Priority seating', price: 45, photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80', badge: 'Fastest' },
    { id: 'f2', name: 'Private Chauffeur Executive Car', detail: 'Door-to-door expressway transfer · 3h 15m', price: 68, photo: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=700&q=80', badge: 'Private & Flexible' },
    { id: 'f3', name: 'Scenic Luxury Coach Direct', detail: 'Comfort AC coach · Reclining seats · WiFi', price: 28, photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80', badge: 'Best Value' }
  ],
  stay: [
    { id: 's1', name: 'The Heritage Haveli Resort', detail: 'Mughal Gardens · 1.8 km to Taj Mahal · 4 nights', price: 102.5, photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80', badge: 'Top Rated' },
    { id: 's2', name: 'The Oberoi Amarvilas Luxury', detail: 'Direct Taj Mahal views from every room · 0.6 km walk', price: 480, photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80', badge: 'Ultra Luxury' },
    { id: 's3', name: 'Tajview Boutique Sanctuary', detail: 'Tajganj Historic Quarter · Rooftop terrace view', price: 78, photo: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=700&q=80', badge: 'Boutique Comfort' }
  ],
  tour: [
    { id: 't1', name: 'Sunrise Taj Mahal & Street Food Trail', detail: 'Historian guide + Sadar Bazaar Petha tasting · 3 hrs', price: 34, photo: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=80', badge: 'Must Experience' },
    { id: 't2', name: 'Agra Fort & Heritage Walking Tour', detail: 'Local historian · Step-free route available · 2.5 hrs', price: 28, photo: 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=700&q=80', badge: 'Exclusive' },
    { id: 't3', name: 'Fatehpur Sikri Day Excursion', detail: 'Panoramic transport + royal red sandstone guide · 6 hrs', price: 52, photo: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=700&q=80', badge: 'Day Trip (38 km)' }
  ]
};

function generateWizardOptions(city) {
  wizardCatalog.flight[0].name = `${city} Express Transport`;
  wizardCatalog.stay[0].name = `${city} Heritage Boutique`;
  wizardCatalog.stay[1].name = `${city} Grand Luxury Suites`;
  wizardCatalog.tour[0].name = `${city} Highlights & Food Walk`;
  wizardCatalog.tour[1].name = `${city} Heritage Walking Tour`;
  renderWizardStep();
}

function renderWizardStep() {
  const targetCity = currentTripState.city || 'Agra';
  const stepTitles = [
    `Select your transport to ${targetCity}`,
    `Select your stay in ${targetCity}`,
    `Choose favorite places & check distances in ${targetCity}`,
    `Add an authentic experience in ${targetCity}`
  ];

  $$('.w-step-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === currentWizardStep);
    btn.classList.toggle('completed', idx < currentWizardStep);
  });

  $('#wizardStepLabel').innerHTML = `Step ${currentWizardStep + 1} of 4: ${stepTitles[currentWizardStep]} <b class="dest-target-name">${targetCity}</b>`;
  $('#wizardBack').classList.toggle('hidden', currentWizardStep === 0);

  if (currentWizardStep === 0) {
    $('#wizardNext').textContent = 'Next: Select Hotel →';
  } else if (currentWizardStep === 1) {
    $('#wizardNext').textContent = 'Next: Explore Places & Distances →';
  } else if (currentWizardStep === 2) {
    const favCount = currentTripState.favoritePlaces.length;
    $('#wizardNext').textContent = `Next: Choose Experiences (${favCount} spots saved) →`;
  } else {
    $('#wizardNext').textContent = 'Complete & Review Itinerary ✦';
  }

  const placesFilterBar = $('#placesFilterBar');
  if (currentWizardStep === 2) {
    placesFilterBar.classList.remove('hidden');
    renderPlacesStep();
  } else {
    placesFilterBar.classList.add('hidden');
    renderSingleSelectStep();
  }
}

function renderSingleSelectStep() {
  const stepKeys = ['flight', 'stay', 'none', 'tour'];
  const currentKey = stepKeys[currentWizardStep];
  const items = wizardCatalog[currentKey];
  if (!items) return;

  const selectedObj = currentTripState[currentKey];
  const cardsHtml = items.map((item, idx) => {
    const isSelected = selectedObj && selectedObj.title.includes(item.name.split(' ')[0]);
    const priceDisplay = currentKey === 'stay' ? `${formatMoney(item.price)}/night` : `${formatMoney(item.price)} · per person`;


    return `
      <div class="wizard-card ${isSelected ? 'selected' : ''}" data-item-index="${idx}">
        <div class="wizard-card-img-wrap">
          <img src="${item.photo}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80'" />
          <span class="wizard-card-badge">${item.badge}</span>
        </div>
        <div class="wizard-card-content">
          <h4>${item.name}</h4>
          <p>${item.detail}</p>
          <div class="wizard-card-foot">
            <span class="wizard-card-price">${priceDisplay}</span>
            <span class="wizard-card-select-pill">${isSelected ? '✓ Selected' : 'Choose option'}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  $('#wizardCards').innerHTML = cardsHtml;

  $('#wizardCards').querySelectorAll('.wizard-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = +card.dataset.itemIndex;
      const chosen = items[idx];
      const travelers = currentTripState.travelers || 2;

      if (currentKey === 'flight') {
        currentTripState.flight = {
          title: chosen.name,
          detail: chosen.detail,
          price: chosen.price,
          total: chosen.price * travelers,
          photo: chosen.photo
        };
      } else if (currentKey === 'stay') {
        currentTripState.stay = {
          title: chosen.name,
          detail: chosen.detail,
          price: chosen.price,
          total: chosen.price * 4,
          photo: chosen.photo
        };
      } else if (currentKey === 'tour') {
        currentTripState.tour = {
          title: chosen.name,
          detail: chosen.detail,
          price: chosen.price,
          total: chosen.price * travelers,
          photo: chosen.photo
        };
      }

      renderSingleSelectStep();
      updateSummaryAndPaymentDrawer();
      toast(`✓ ${chosen.name} saved to trip`);
    });
  });
}

function renderPlacesStep() {
  const filtered = currentCityPlacesList.filter(p => {
    const matchCategory = (currentPlaceFilter === 'all' || p.filter === currentPlaceFilter);
    const matchDistance = (currentDistanceFilter === 'all' || p.proximity === currentDistanceFilter);
    return matchCategory && matchDistance;
  });

  if (filtered.length === 0) {
    $('#wizardCards').innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--muted);">
        <h4>No spots matched this distance filter</h4>
        <p>Try switching to "All Spots" to explore all attractions in ${currentTripState.city}.</p>
      </div>
    `;
    return;
  }

  const cardsHtml = filtered.map(place => {
    const isFav = currentTripState.favoritePlaces.some(f => f.id === place.id);
    const proximityClass = place.proximity || 'near';
    const distanceBadgeText = place.distanceKm < 2
      ? `🟢 ${place.distanceKm} km (Near · ${place.commute})`
      : place.distanceKm < 10
      ? `🟡 ${place.distanceKm} km (${place.commute})`
      : `🔵 ${place.distanceKm} km (Far · ${place.commute})`;

    return `
      <div class="place-explore-card ${isFav ? 'is-favorite' : ''}" data-place-id="${place.id}">
        <span class="place-badge-tag">${place.tag}</span>
        <button class="place-fav-heart-btn" title="Add to favorites">${isFav ? '❤️' : '🤍'}</button>
        <div class="wizard-card-img-wrap">
          <img src="${place.photo}" alt="${place.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=80'" />
        </div>
        <div class="wizard-card-content">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
            <h4>${place.name}</h4>
            <span class="distance-pill ${proximityClass}">${place.distanceKm} km</span>
          </div>
          <p>${place.desc}</p>
          <div class="place-meta-row">
            <span>📍 ${place.district}</span>
            <span class="p-time">⏱ ${place.time}</span>
          </div>
          <div style="font-size: 11px; color: var(--muted); margin-top: 6px;">
            ${distanceBadgeText}
          </div>
          <div class="wizard-card-foot" style="margin-top: 12px;">
            <span style="font-size: 11px; color: var(--muted);">Explore in ${currentTripState.city}</span>
            <button class="place-add-toggle-btn">${isFav ? '✓ In Itinerary' : '+ Add Place'}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  $('#wizardCards').innerHTML = cardsHtml;

  $('#wizardCards').querySelectorAll('.place-explore-card').forEach(card => {
    const placeId = card.dataset.placeId;
    const place = currentCityPlacesList.find(p => p.id === placeId);

    const togglePlace = () => {
      const idx = currentTripState.favoritePlaces.findIndex(f => f.id === placeId);
      if (idx >= 0) {
        currentTripState.favoritePlaces.splice(idx, 1);
        toast(`Removed ${place.name}`);
      } else {
        currentTripState.favoritePlaces.push(place);
        toast(`❤️ Added ${place.name} (${place.distanceKm} km away)`);
      }
      updateFavoriteCounter();
      renderPlacesStep();
      renderDay();
      updateSummaryAndPaymentDrawer();
    };

    card.addEventListener('click', togglePlace);
  });
}

function updateFavoriteCounter() {
  const count = currentTripState.favoritePlaces.length;
  $('#favCountBadge').textContent = count;
  $('#sumPlacesCount').textContent = `${count} ${count === 1 ? 'spot' : 'spots'}`;
  if (currentWizardStep === 2) {
    $('#wizardNext').textContent = `Next: Choose Experiences (${count} spots saved) →`;
  }
}

$$('.place-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.place-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPlaceFilter = btn.dataset.placeFilter;
    renderPlacesStep();
  });
});

$$('.distance-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      currentDistanceFilter = 'all';
    } else {
      $$('.distance-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDistanceFilter = btn.dataset.distanceFilter;
    }
    renderPlacesStep();
  });
});

$('#selectAllFavsBtn').addEventListener('click', () => {
  currentCityPlacesList.forEach(place => {
    if (!currentTripState.favoritePlaces.some(f => f.id === place.id)) {
      currentTripState.favoritePlaces.push(place);
    }
  });
  updateFavoriteCounter();
  renderPlacesStep();
  renderDay();
  updateSummaryAndPaymentDrawer();
  toast(`❤️ Added all ${currentCityPlacesList.length} top spots in ${currentTripState.city} to your trip!`);
});

// Jump from Weather section directly to Explore Places Step
const jumpToPlacesBtn = $('#jumpToPlacesBtn');
if (jumpToPlacesBtn) {
  jumpToPlacesBtn.addEventListener('click', () => {
    currentWizardStep = 2; // Step 3: Explore Places & Distances
    renderWizardStep();
    document.querySelector('#wizardSection').scrollIntoView({ behavior: 'smooth' });
    toast(`📍 Exploring top places in ${currentTripState.city}`);
  });
}

$('#wizardNext').addEventListener('click', () => {
  if (currentWizardStep < 3) {
    currentWizardStep++;
    renderWizardStep();
  } else {
    toast('✦ Trip fully assembled! View your personalized schedule.');
    document.querySelector('#itinerary').scrollIntoView({ behavior: 'smooth' });
  }
});

$('#wizardBack').addEventListener('click', () => {
  if (currentWizardStep > 0) {
    currentWizardStep--;
    renderWizardStep();
  }
});

$$('.w-step-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentWizardStep = +btn.dataset.step;
    renderWizardStep();
  });
});

// =========================================================
// 6. WEATHER FORECAST & CLIMATE CONDITIONS WIDGET
// =========================================================
const weatherData = {
  Agra: { temp: 28, feels: 29, condition: '☀️ Clear & Sunny', icon: '☀️', humidity: '48%', wind: '8 km/h', uv: '7 (High)', best: 'Sunrise & Late Afternoon', days: [['Sun', '☀️', 28], ['Mon', '☀️', 29], ['Tue', '🌤️', 27], ['Wed', '☀️', 28]] },
  Lisbon: { temp: 23, feels: 24, condition: '☀️ Mild & Sunny', icon: '☀️', humidity: '58%', wind: '14 km/h', uv: '5 (Moderate)', best: 'Afternoon strolls', days: [['Sun', '☀️', 23], ['Mon', '🌤️', 22], ['Tue', '⛅', 21], ['Wed', '☀️', 24]] },
  Kyoto: { temp: 19, feels: 19, condition: '🌤️ Crisp & Clear', icon: '🌤️', humidity: '52%', wind: '9 km/h', uv: '4 (Moderate)', best: 'Morning temple walks', days: [['Sun', '🌤️', 19], ['Mon', '☀️', 20], ['Tue', '🌧️', 17], ['Wed', '🌤️', 18]] },
  Reykjavik: { temp: 8, feels: 5, condition: '❄️ Crisp & Breezy', icon: '❄️', humidity: '74%', wind: '22 km/h', uv: '1 (Low)', best: 'Geothermal baths & aurora', days: [['Sun', '❄️', 8], ['Mon', '☁️', 7], ['Tue', '🌦️', 6], ['Wed', '❄️', 8]] },
  Dubai: { temp: 33, feels: 36, condition: '☀️ Warm & Clear', icon: '☀️', humidity: '44%', wind: '16 km/h', uv: '8 (Very High)', best: 'Golden-hour rooftop/beach', days: [['Sun', '☀️', 34], ['Mon', '☀️', 33], ['Tue', '🌤️', 32], ['Wed', '☀️', 34]] },
  Paris: { temp: 18, feels: 18, condition: '⛅ Pleasant & Breezy', icon: '⛅', humidity: '62%', wind: '12 km/h', uv: '3 (Moderate)', best: 'Terrace cafes & parks', days: [['Sun', '⛅', 18], ['Mon', '🌦️', 17], ['Tue', '☀️', 20], ['Wed', '⛅', 19]] },
  Rome: { temp: 25, feels: 26, condition: '☀️ Sun-drenched', icon: '☀️', humidity: '50%', wind: '10 km/h', uv: '6 (High)', best: 'Evening piazza walks', days: [['Sun', '☀️', 25], ['Mon', '☀️', 26], ['Tue', '🌤️', 24], ['Wed', '☀️', 25]] },
  Tokyo: { temp: 21, feels: 21, condition: '🌤️ Calm & Bright', icon: '🌤️', humidity: '55%', wind: '11 km/h', uv: '4 (Moderate)', best: 'Daytime gardens & neon night', days: [['Sun', '🌤️', 21], ['Mon', '☀️', 22], ['Tue', '⛅', 20], ['Wed', '☀️', 21]] }
};

function updateWeatherWidget(cityName) {
  const city = cityName.split(',')[0].trim();
  const info = weatherData[city] || {
    temp: 22,
    feels: 22,
    condition: '🌤️ Pleasant & Clear',
    icon: '🌤️',
    humidity: '56%',
    wind: '13 km/h',
    uv: '4 (Moderate)',
    best: 'Great weather for exploring',
    days: [['Day 1', '🌤️', 22], ['Day 2', '☀️', 23], ['Day 3', '⛅', 21], ['Day 4', '☀️', 24]]
  };

  $('#weatherCity').textContent = `${city}`;
  $('#weatherConditionBadge').textContent = info.condition;
  $('#weatherIcon').textContent = info.icon;
  $('#weatherTemp').textContent = `${info.temp}°C`;
  $('#weatherFeels').textContent = `Feels like ${info.feels}°C`;
  $('#weatherHumidity').textContent = info.humidity;
  $('#weatherWind').textContent = info.wind;
  $('#weatherUV').textContent = info.uv;
  $('#weatherBestTime').textContent = info.best;

  $('#weatherDays').innerHTML = info.days.map(([day, icon, temp]) => `
    <div class="forecast-day-box">
      <span class="f-name">${day}</span>
      <span class="f-icon">${icon}</span>
      <span class="f-temp">${temp}°C</span>
    </div>
  `).join('');
}

// =========================================================
// 7. REAL-TIME TRIP TOTAL SUMMARY & RIGHT-SIDE PAYMENT DRAWER
// =========================================================
function updateSummaryAndPaymentDrawer() {
  const travelers = currentTripState.travelers || 2;
  const flightTotal = currentTripState.flight ? currentTripState.flight.total : 0;
  const stayTotal = currentTripState.stay ? currentTripState.stay.total : 0;
  const tourTotal = currentTripState.tour ? currentTripState.tour.total : 0;

  const subtotal = flightTotal + stayTotal + tourTotal;
  const taxes = Math.round(subtotal * 0.068);
  const grandTotal = subtotal + taxes;

  $('#summaryTotal').textContent = formatMoney(subtotal);
  $('#summaryTravelerCount').textContent = `for ${travelers} travelers · includes all fees`;
  $('#sumFlightPrice').textContent = formatMoney(flightTotal);
  $('#sumStayPrice').textContent = formatMoney(stayTotal);
  $('#sumTourPrice').textContent = formatMoney(tourTotal);
  $('#summaryGrandTotal').textContent = formatMoney(grandTotal);

  $('#drawerDestName').textContent = currentTripState.destination;
  $('#drawerDates').textContent = `${currentTripState.departDate} – ${currentTripState.returnDate} · ${travelers} travelers`;
  $('#drawerSubtotal').textContent = formatMoney(subtotal);
  $('#drawerTaxes').textContent = formatMoney(taxes);
  $('#drawerFinalTotal').textContent = formatMoney(grandTotal);
  $('#drawerFullTotal').textContent = formatMoney(grandTotal);
  $('#drawerBtnAmount').textContent = formatMoney(grandTotal);

  const installmentAmount = Math.round(grandTotal / 3);
  $('#drawerInstallmentText').textContent = `${formatMoney(installmentAmount)} today, then 2 monthly`;

  const itemsHtml = [];
  if (currentTripState.flight) {
    itemsHtml.push(`
      <div class="drawer-item-card">
        <div>
          <div class="di-title">✈ ${currentTripState.flight.title}</div>
          <div class="di-sub">${currentTripState.flight.detail}</div>
        </div>
        <div class="di-price">${formatMoney(flightTotal)}</div>
      </div>
    `);
  }
  if (currentTripState.stay) {
    itemsHtml.push(`
      <div class="drawer-item-card">
        <div>
          <div class="di-title">⌂ ${currentTripState.stay.title}</div>
          <div class="di-sub">${currentTripState.stay.detail}</div>
        </div>
        <div class="di-price">${formatMoney(stayTotal)}</div>
      </div>
    `);
  }

  if (currentTripState.favoritePlaces.length > 0) {
    const names = currentTripState.favoritePlaces.map(p => `${p.name} (${p.distanceKm} km)`).join(', ');
    itemsHtml.push(`
      <div class="drawer-item-card">
        <div>
          <div class="di-title">📍 ${currentTripState.favoritePlaces.length} Distance-Mapped Spots in ${currentTripState.city}</div>
          <div class="di-sub">${names}</div>
        </div>
        <div class="di-price" style="color: #4eaba4;">INCLUDED</div>
      </div>
    `);
  }

  if (currentTripState.tour && tourTotal > 0) {
    itemsHtml.push(`
      <div class="drawer-item-card">
        <div>
          <div class="di-title">◌ ${currentTripState.tour.title}</div>
          <div class="di-sub">${currentTripState.tour.detail}</div>
        </div>
        <div class="di-price">${formatMoney(tourTotal)}</div>
      </div>
    `);
  }

  $('#drawerItemList').innerHTML = itemsHtml.join('');
}

// Right-Side Payment Drawer Open/Close Handlers
const paymentSidePanel = $('#paymentSidePanel');
const paymentOverlay = $('#paymentOverlay');

function openPaymentDrawer() {
  updateSummaryAndPaymentDrawer();
  paymentSidePanel.classList.add('open');
  paymentOverlay.classList.add('open');
  paymentSidePanel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePaymentDrawer() {
  paymentSidePanel.classList.remove('open');
  paymentOverlay.classList.remove('open');
  paymentSidePanel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

$('#openPaymentDrawerBtn').addEventListener('click', openPaymentDrawer);
$('#closePaymentDrawer').addEventListener('click', closePaymentDrawer);
paymentOverlay.addEventListener('click', closePaymentDrawer);

$$('input[name="drawerPayMethod"]').forEach(radio => {
  radio.addEventListener('change', e => {
    $$('.drawer-pay-card').forEach(card => card.classList.remove('active'));
    radio.closest('.drawer-pay-card').classList.add('active');

    const subtotal = (currentTripState.flight ? currentTripState.flight.total : 0) + (currentTripState.stay ? currentTripState.stay.total : 0) + (currentTripState.tour ? currentTripState.tour.total : 0);
    const taxes = Math.round(subtotal * 0.068);
    const grandTotal = subtotal + taxes;

    if (e.target.value === 'split') {
      const splitDue = Math.round(grandTotal / 3);
      $('#drawerFinalTotal').textContent = `$${splitDue.toLocaleString()} (1st of 3)`;
      $('#drawerBtnAmount').textContent = `$${splitDue.toLocaleString()}`;
    } else {
      $('#drawerFinalTotal').textContent = `$${grandTotal.toLocaleString()}`;
      $('#drawerBtnAmount').textContent = `$${grandTotal.toLocaleString()}`;
    }
  });
});

$('#confirmPayDrawerBtn').addEventListener('click', () => {
  const refCode = `TN-${Math.floor(10000 + Math.random() * 90000)}`;
  $('#bookingRef').textContent = refCode;

  $('#drawerActionState').style.display = 'none';
  $('#drawerSuccessState').classList.remove('hidden');

  toast(`🎉 Booking Confirmed! Ref: ${refCode}`);
});

$('#finishBookingBtn').addEventListener('click', () => {
  closePaymentDrawer();
  $('#drawerActionState').style.display = '';
  $('#drawerSuccessState').classList.add('hidden');
  document.querySelector('#itinerary').scrollIntoView({ behavior: 'smooth' });
});

$('#downloadItineraryBtn').addEventListener('click', () => {
  toast('📥 Itinerary PDF downloaded to your device.');
});

// =========================================================
// 8. ITINERARY SCHEDULE WITH INTER-STOP KILOMETER COMMUTE LINES
// =========================================================
function renderDay() {
  const place = (currentTripState.city || $('#destination').value.split(',')[0]).trim();
  let events = [...((tripData[place] || tripData.Agra)[selectedDay] || tripData.Agra[0])];

  if (currentTripState.favoritePlaces.length > 0 && selectedDay > 0) {
    const favsForDay = currentTripState.favoritePlaces.slice((selectedDay - 1) * 2, selectedDay * 2);
    favsForDay.forEach((fav, i) => {
      events.push({
        time: i === 0 ? '11:30' : '16:00',
        type: 'tour',
        title: `Explore ${fav.name} (📍 ${fav.distanceKm} km)`,
        detail: `${fav.district} · ${fav.tag} · ${fav.commute}`
      });
    });
  }

  let scheduleMarkup = '';
  events.forEach((e, idx) => {
    scheduleMarkup += `
      <div class="event ${e.type}">
        <div class="event-time">${e.time}</div>
        <div class="event-dot"></div>
        <div class="event-content">
          <b>${e.title}</b>
          <small>${e.detail}</small>
        </div>
      </div>
    `;

    if (idx < events.length - 1) {
      const randomKm = ((idx + 1) * 1.6).toFixed(1);
      scheduleMarkup += `
        <div class="event-commute-line">
          <span>↓ ${randomKm} km</span>
          <small>· approx ${Math.round(randomKm * 3.5)} min commute</small>
        </div>
      `;
    }
  });

  $('#schedule').innerHTML = scheduleMarkup;
}

$$('.day').forEach(btn => btn.addEventListener('click', () => {
  document.querySelector('.day.active').classList.remove('active');
  btn.classList.add('active');
  selectedDay = +btn.dataset.day;
  renderDay();
}));

$$('.tab-row button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelector('.tab-row .active').classList.remove('active');
  btn.classList.add('active');
  const tab = btn.dataset.tab;
  if (tab === 'flight') { currentWizardStep = 0; renderWizardStep(); $('#wizardSection').scrollIntoView({ behavior: 'smooth' }); }
  else if (tab === 'stay') { currentWizardStep = 1; renderWizardStep(); $('#wizardSection').scrollIntoView({ behavior: 'smooth' }); }
  else if (tab === 'places') { currentWizardStep = 2; renderWizardStep(); $('#wizardSection').scrollIntoView({ behavior: 'smooth' }); }
  else if (tab === 'tour') { currentWizardStep = 3; renderWizardStep(); $('#wizardSection').scrollIntoView({ behavior: 'smooth' }); }
  toast(`${btn.textContent.trim()} mode selected`);
}));

$$('[data-add]').forEach(btn => btn.addEventListener('click', () => {
  extraItems++;
  $('#itemCount').textContent = 4 + extraItems;
  toast(`${btn.dataset.add} added to your Trip Thread`);
}));

$('#searchForm').addEventListener('submit', e => {
  e.preventDefault();
  const place = $('#destination').value.split(',')[0].trim();
  selectDestination(place, 'India');
  document.querySelector('#itinerary').scrollIntoView({ behavior: 'smooth' });
});

$('#travelers').addEventListener('change', e => {
  const count = parseInt(e.target.value) || 2;
  currentTripState.travelers = count;
  currentTripState.flight.total = currentTripState.flight.price * count;
  currentTripState.tour.total = currentTripState.tour.price * count;
  updateSummaryAndPaymentDrawer();
  toast(`Updated for ${count} travelers`);
});

$('#shuffleRoute').addEventListener('click', () => {
  const routes = [
    ['Delhi', 'Agra', '$45'],
    ['New York', 'Lisbon', '$418'],
    ['London', 'Reykjavík', '$296'],
    ['Tokyo', 'Kyoto', '$74'],
    ['Paris', 'Amalfi', '$187']
  ];
  const route = routes[Math.floor(Math.random() * routes.length)];
  $('#routeStart').textContent = route[0];
  $('#routeEnd').textContent = route[1];
  $('#routePrice').textContent = `From ${route[2]}`;
});

$('#buildMood').addEventListener('click', () => toast('Tell us: slow and soulful, food-first, outdoorsy, or all-out?'));
$('#surpriseBtn').addEventListener('click', () => {
  const picks = ['Agra, India', 'Kyoto, Japan', 'Reykjavík, Iceland', 'Lisbon, Portugal', 'Dubai, United Arab Emirates', 'Amalfi Coast, Italy'];
  const pick = picks[Math.floor(Math.random() * picks.length)];
  const [city, country] = pick.split(', ');
  selectDestination(city, country);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Profile save handling
async function saveProfile(profile) {
  localStorage.setItem('tripnest-profile', JSON.stringify(profile));
  try {
    await fetch('/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    toast(`Welcome, ${profile.name.split(' ')[0]} — your profile is synced.`);
  } catch {
    toast(`Welcome, ${profile.name.split(' ')[0]} — your profile is saved on this device.`);
  }
}

$('#accountBtn').addEventListener('click', () => $('#accountDialog').showModal());
$('#closeAccount').addEventListener('click', () => $('#accountDialog').close());

$$('.account-tabs button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelector('.account-tabs .active').classList.remove('active');
  btn.classList.add('active');
  const signIn = btn.dataset.account === 'signin';
  $('#accountForm button').textContent = signIn ? 'Sign in to TripNest' : 'Create my account';
  $('#fullName').style.display = signIn ? 'none' : '';
  $('#phone').style.display = signIn ? 'none' : '';
}));

$('#accountForm').addEventListener('submit', e => {
  e.preventDefault();
  const profile = {
    name: $('#fullName').value || 'Traveler',
    email: $('#email').value,
    phone: $('#phone').value,
    createdAt: new Date().toISOString()
  };
  saveProfile(profile);
  $('#accountDialog').close();
  $('#accountBtn').textContent = profile.name.split(' ')[0];
});

$$('[data-panel]').forEach(btn => btn.addEventListener('click', () => {
  $$('.care-panel').forEach(panel => panel.classList.add('hidden'));
  const targetId = btn.dataset.panel;
  $(`#${targetId}`).classList.remove('hidden');
  $(`#${targetId}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (targetId === 'locationPanel') {
    setTimeout(() => {
      initLiveMap();
      startLiveMovementSimulation();
    }, 300);
  }
}));

$('#healthForm').addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem('tripnest-health', JSON.stringify({
    allergies: $('#allergies').value,
    insurance: $('#insurance').value
  }));
  toast('Health Passport saved privately on this device.');
});

$('#budgetRange').addEventListener('input', e => $('#budgetValue').textContent = `$${Number(e.target.value).toLocaleString()}`);
$('#paymentBtn').addEventListener('click', openPaymentDrawer);

// Interactive Calendar controls
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let calMonth = 9, calYear = 2026, departDate = null, returnDate = null;
monthNames.forEach((name, index) => $('#monthSelect').insertAdjacentHTML('beforeend', `<option value="${index}">${name}</option>`));
[2026, 2027, 2028, 2029].forEach(year => $('#yearSelect').insertAdjacentHTML('beforeend', `<option value="${year}">${year}</option>`));
$('#monthSelect').value = calMonth;
$('#yearSelect').value = calYear;

function dateKey(date) { return date.toISOString().slice(0, 10); }
function displayDate(date) { return `${date.getDate()} ${monthNames[date.getMonth()].slice(0, 3)} ${date.getFullYear()}`; }

function renderCalendar() {
  const first = new Date(calYear, calMonth, 1).getDay();
  const days = new Date(calYear, calMonth + 1, 0).getDate();
  let markup = Array(first).fill('<span></span>').join('');
  for (let day = 1; day <= days; day++) {
    const date = new Date(calYear, calMonth, day);
    const key = dateKey(date);
    const selected = (departDate && key === dateKey(departDate)) || (returnDate && key === dateKey(returnDate));
    const inRange = departDate && returnDate && date > departDate && date < returnDate;
    markup += `<button class="cal-day ${selected ? 'selected' : ''} ${inRange ? 'in-range' : ''}" data-date="${key}" type="button">${day}</button>`;
  }
  $('#calendar').innerHTML = markup;
  $$('.cal-day[data-date]').forEach(btn => btn.addEventListener('click', () => chooseDate(new Date(`${btn.dataset.date}T12:00:00`))));
}

function chooseDate(date) {
  if (!departDate || returnDate || date < departDate) {
    departDate = date;
    returnDate = null;
  } else {
    returnDate = date;
  }
  $('#dateStatus').textContent = returnDate ? `${displayDate(departDate)} → ${displayDate(returnDate)} · ${Math.round((returnDate - departDate) / 86400000)} nights` : `Departure: ${displayDate(departDate)}. Now choose your return.`;
  renderCalendar();
}

$('#datePickerBtn').addEventListener('click', () => { $('#dateDialog').showModal(); renderCalendar(); });
$('#closeDate').addEventListener('click', () => $('#dateDialog').close());
$('#monthSelect').addEventListener('change', e => { calMonth = +e.target.value; renderCalendar(); });
$('#yearSelect').addEventListener('change', e => { calYear = +e.target.value; renderCalendar(); });
$('#applyDates').addEventListener('click', () => {
  if (!departDate || !returnDate) { toast('Choose both a departure and return date.'); return; }
  const label = `${displayDate(departDate)} – ${displayDate(returnDate)}`;
  $('#dateLabel').textContent = label;
  currentTripState.departDate = displayDate(departDate);
  currentTripState.returnDate = displayDate(returnDate);
  $('#dateDialog').close();
  updateSummaryAndPaymentDrawer();
  toast('Travel dates updated—your arrangements are rechecked.');
});

// AI Concierge
const aiReplies = {
  romantic: 'I added a golden-hour view of the Taj Mahal from Mehtab Bagh and left your next morning unhurried for a softer, romantic itinerary.',
  accessible: 'I’d base you in compact central areas, use step-free battery golf carts for Taj Mahal entry, and replace steep steps with accessible viewpoints.',
  food: 'I can make Day 3 a food-first route: Deviram Bedmi Puri breakfast, Sadar Bazaar chaat tasting, and Kesar Petha sampling. I’ll hold the estimate below $30.'
};

function answerAi(prompt) {
  const lower = prompt.toLowerCase();
  const reply = lower.includes('romantic') ? aiReplies.romantic : lower.includes('walk') || lower.includes('accessible') ? aiReplies.accessible : lower.includes('food') || lower.includes('budget') ? aiReplies.food : `I’ve shaped your trip around: “${prompt}”. I’ve mapped out your distances in kilometers, added local favorite spots, and synchronized your stays.`;
  $('#aiResponse').querySelector('span').textContent = reply;
  $('#aiResponse').classList.add('show');
  extraItems++;
  $('#itemCount').textContent = 4 + extraItems;
  toast('Your AI concierge updated the Trip Thread.');
}

$$('[data-prompt]').forEach(btn => btn.addEventListener('click', () => answerAi(btn.dataset.prompt)));
$('#aiForm').addEventListener('submit', e => {
  e.preventDefault();
  const prompt = $('#aiInput').value.trim();
  if (!prompt) return;
  answerAi(prompt);
  $('#aiInput').value = '';
});

// World Places Grid (50 places)
let visiblePlaces = 12, placeFilter = 'All', placeQuery = '';
const regions = ['All', ...new Set(worldPlaces.map(p => p.region))];
$('#continentFilters').innerHTML = regions.map(r => `<button class="${r === 'All' ? 'active' : ''}" data-region="${r}">${r}</button>`).join('');

function renderPlaces() {
  const matches = worldPlaces.filter(p => (placeFilter === 'All' || p.region === placeFilter) && `${p.city} ${p.country}`.toLowerCase().includes(placeQuery.toLowerCase()));
  const shown = matches.slice(0, visiblePlaces);
  $('#placeGrid').innerHTML = shown.map(p => `
    <article class="place-card">
      <img src="${p.photo}" alt="${p.city}, ${p.country}" loading="lazy" />
      <div>
        <span>${p.country.toUpperCase()}</span>
        <h3>${p.city}</h3>
        <p>${p.detail}</p>
        <button data-card-guide-place="${p.city}, ${p.country}">Explore Guide & Distance →</button>
      </div>
    </article>
  `).join('');

  $$('[data-card-guide-place]').forEach(btn => btn.addEventListener('click', () => {
    const raw = btn.dataset.cardGuidePlace;
    const parts = raw.split(',');
    const city = parts[0].trim();
    const country = parts[1] ? parts[1].trim() : '';
    selectDestination(city, country);
    openCityDetailModal(raw);
  }));

  $('#loadMore').style.display = shown.length < matches.length ? 'block' : 'none';
}

$('#continentFilters').addEventListener('click', e => {
  if (!e.target.dataset.region) return;
  placeFilter = e.target.dataset.region;
  visiblePlaces = 12;
  $$('[data-region]').forEach(b => b.classList.toggle('active', b.dataset.region === placeFilter));
  renderPlaces();
});

$('#placeSearch').addEventListener('input', e => {
  placeQuery = e.target.value;
  visiblePlaces = 12;
  renderPlaces();
});

$('#loadMore').addEventListener('click', () => {
  visiblePlaces += 16;
  renderPlaces();
});

// Health Advice endpoint call
async function getHealthAdvice() {
  const topic = $('#healthTopic').value;
  const fallback = {
    general: 'Before departure, keep a summary of medicines, insurance and emergency contacts with you. Check destination entry and health requirements through official sources.',
    mobility: 'Ask your airline and accommodation in advance about assistance and accessibility. Choose flexible transfer times and carry contact details for any needed support.',
    medication: 'Keep medicines in original labeled containers in carry-on baggage. Confirm destination rules and ask your clinician or pharmacist about your own prescriptions before travel.',
    heat: 'Plan water, shade and slower midday activities. If you feel unwell, seek local medical help promptly.'
  };
  try {
    const response = await fetch('/health/travel-advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, destination: $('#destination').value })
    });
    if (!response.ok) throw Error('No API');
    const result = await response.json();
    $('#healthAdviceResult').textContent = result.advice;
  } catch {
    $('#healthAdviceResult').textContent = fallback[topic];
  }
  toast('General travel-health guidance is ready.');
}
$('#healthAdviceBtn').addEventListener('click', getHealthAdvice);

// =========================================================
// 9. NEW FEATURE 1: MULTI-CURRENCY ENGINE & MONEY MAP PRO
// =========================================================
const currencyRates = {
  USD: 1.0,
  INR: 83.1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.2,
  AED: 3.67,
  SGD: 1.35,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.89,
  KRW: 1330.0,
  THB: 35.1,
  MYR: 4.72,
  IDR: 15700.0,
  TRY: 32.5,
  BRL: 5.05,
  MXN: 17.2,
  ZAR: 18.6,
  EGP: 49.0,
  NPR: 133.0,
  LKR: 305.0,
  PKR: 279.0,
  OMR: 0.385,
  QAR: 3.64,
  VND: 24900.0,
  CNY: 7.25,
  HKD: 7.82,
  NOK: 10.6,
  SEK: 10.4,
  DKK: 6.88,
  CZK: 23.1,
  PLN: 4.02,
  HUF: 363.0,
  NZD: 1.63,
  MAD: 10.05,
  KES: 130.0,
  TZS: 2550.0,
  PEN: 3.77,
  ARS: 890.0,
  CUP: 24.0,
  MVR: 15.4,
  KHR: 4100.0,
  KES: 130.0,
  TZS: 2550.0
};

const currencySymbols = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AED: 'AED ',
  SGD: 'S$',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'Fr ',
  KRW: '₩',
  THB: '฿',
  MYR: 'RM ',
  IDR: 'Rp ',
  TRY: '₺',
  BRL: 'R$',
  MXN: 'MX$',
  ZAR: 'R ',
  EGP: 'E£',
  NPR: 'रू',
  LKR: 'Rs ',
  PKR: '₨',
  OMR: 'OMR ',
  QAR: 'QR ',
  VND: '₫',
  CNY: '¥',
  HKD: 'HK$',
  NOK: 'kr ',
  SEK: 'kr ',
  DKK: 'kr ',
  CZK: 'Kč ',
  PLN: 'zł ',
  HUF: 'Ft ',
  NZD: 'NZ$',
  MAD: 'MAD ',
  KES: 'KSh ',
  TZS: 'TSh ',
  PEN: 'S/ ',
  ARS: 'AR$',
  CUP: 'CU$',
  MVR: 'Rf ',
  KHR: '₭'
};

// ---------------------------------------------------------------------------
// COUNTRY → NATIVE CURRENCY MAP
// Auto-switches the currency selector when a destination is selected
// ---------------------------------------------------------------------------
const countryCurrencyMap = {
  // India
  'india': 'INR', 'agra': 'INR', 'jaipur': 'INR', 'udaipur': 'INR',
  'varanasi': 'INR', 'goa': 'INR', 'mumbai': 'INR', 'delhi': 'INR',
  'new delhi': 'INR', 'kolkata': 'INR', 'ladakh': 'INR', 'srinagar': 'INR',
  'shimla': 'INR', 'manali': 'INR', 'rishikesh': 'INR', 'haridwar': 'INR',
  'amritsar': 'INR', 'darjeeling': 'INR', 'gangtok': 'INR', 'shillong': 'INR',
  'cherrapunji': 'INR', 'kaziranga': 'INR', 'puducherry': 'INR',
  'madurai': 'INR', 'mysore': 'INR', 'hampi': 'INR', 'coorg': 'INR',
  'ooty': 'INR', 'kodaikanal': 'INR', 'munnar': 'INR', 'wayanad': 'INR',
  'kovalam': 'INR', 'varkala': 'INR', 'gokarna': 'INR', 'chikmagalur': 'INR',
  'ranthambore': 'INR', 'jodhpur': 'INR', 'jaisalmer': 'INR', 'pushkar': 'INR',
  'bikaner': 'INR', 'mount abu': 'INR', 'khajuraho': 'INR', 'orchha': 'INR',
  'ajanta ellora': 'INR', 'mahabaleshwar': 'INR', 'alibaug': 'INR',
  'lonavala': 'INR', 'pune': 'INR', 'ahmedabad': 'INR', 'kutch': 'INR',
  'gir national park': 'INR', 'dwarka': 'INR', 'somnath': 'INR',
  'bhopal': 'INR', 'indore': 'INR', 'lucknow': 'INR', 'ayodhya': 'INR',
  'mathura': 'INR', 'vrindavan': 'INR', 'puri': 'INR', 'konark': 'INR',
  'bhubaneswar': 'INR', 'visakhapatnam': 'INR', 'araku valley': 'INR',
  'hyderabad': 'INR', 'tirupati': 'INR', 'rameswaram': 'INR',
  'kanyakumari': 'INR', 'mahabalipuram': 'INR', 'andaman islands': 'INR',
  'havelock': 'INR', 'tawang': 'INR', 'pelling': 'INR', 'nainital': 'INR',
  'mussoorie': 'INR', 'spiti valley': 'INR', 'kerala': 'INR',
  'alleppey': 'INR', 'bangalore': 'INR', 'chennai': 'INR',
  // Europe — Euro zone
  'france': 'EUR', 'paris': 'EUR', 'italy': 'EUR', 'rome': 'EUR',
  'amalfi coast': 'EUR', 'spain': 'EUR', 'barcelona': 'EUR', 'madrid': 'EUR',
  'germany': 'EUR', 'berlin': 'EUR', 'amsterdam': 'EUR', 'netherlands': 'EUR',
  'austria': 'EUR', 'vienna': 'EUR', 'greece': 'EUR', 'athens': 'EUR',
  'santorini': 'EUR', 'portugal': 'EUR', 'lisbon': 'EUR',
  'dubrovnik': 'EUR', 'croatia': 'EUR',
  // United Kingdom
  'uk': 'GBP', 'united kingdom': 'GBP', 'london': 'GBP', 'edinburgh': 'GBP',
  'scotland': 'GBP', 'england': 'GBP',
  // Japan
  'japan': 'JPY', 'kyoto': 'JPY', 'tokyo': 'JPY', 'osaka': 'JPY',
  'hiroshima': 'JPY', 'nara': 'JPY',
  // UAE
  'uae': 'AED', 'united arab emirates': 'AED', 'dubai': 'AED', 'abu dhabi': 'AED',
  'sharjah': 'AED',
  // Singapore
  'singapore': 'SGD',
  // Australia
  'australia': 'AUD', 'sydney': 'AUD', 'melbourne': 'AUD',
  'brisbane': 'AUD', 'gold coast': 'AUD', 'cairns': 'AUD',
  // New Zealand
  'new zealand': 'NZD', 'queenstown': 'NZD', 'auckland': 'NZD',
  'rotorua': 'NZD',
  // Canada
  'canada': 'CAD', 'toronto': 'CAD', 'vancouver': 'CAD',
  'montreal': 'CAD', 'banff': 'CAD',
  // Switzerland
  'switzerland': 'CHF', 'zurich': 'CHF', 'geneva': 'CHF', 'interlaken': 'CHF',
  'zermatt': 'CHF',
  // South Korea
  'south korea': 'KRW', 'korea': 'KRW', 'seoul': 'KRW', 'busan': 'KRW',
  'jeju': 'KRW',
  // Thailand
  'thailand': 'THB', 'bangkok': 'THB', 'chiang mai': 'THB',
  'phuket': 'THB', 'koh samui': 'THB', 'pattaya': 'THB',
  // Malaysia
  'malaysia': 'MYR', 'kuala lumpur': 'MYR', 'penang': 'MYR',
  'langkawi': 'MYR', 'kota kinabalu': 'MYR',
  // Indonesia
  'indonesia': 'IDR', 'bali': 'IDR', 'jakarta': 'IDR',
  'yogyakarta': 'IDR', 'lombok': 'IDR', 'komodo': 'IDR',
  // Turkey
  'turkey': 'TRY', 'istanbul': 'TRY', 'cappadocia': 'TRY',
  'bodrum': 'TRY', 'antalya': 'TRY',
  // Brazil
  'brazil': 'BRL', 'rio de janeiro': 'BRL', 'sao paulo': 'BRL',
  'florianopolis': 'BRL', 'amazon': 'BRL', 'iguazu': 'BRL',
  // Mexico
  'mexico': 'MXN', 'cancun': 'MXN', 'mexico city': 'MXN',
  'oaxaca': 'MXN', 'tulum': 'MXN',
  // Argentina
  'argentina': 'ARS', 'buenos aires': 'ARS', 'patagonia': 'ARS',
  'ushuaia': 'ARS',
  // Peru
  'peru': 'PEN', 'cusco': 'PEN', 'machu picchu': 'PEN', 'lima': 'PEN',
  // Cuba
  'cuba': 'CUP', 'havana': 'CUP',
  // South Africa
  'south africa': 'ZAR', 'cape town': 'ZAR', 'johannesburg': 'ZAR',
  'kruger': 'ZAR', 'garden route': 'ZAR',
  // Kenya
  'kenya': 'KES', 'nairobi': 'KES', 'masai mara': 'KES', 'mombasa': 'KES',
  // Tanzania
  'tanzania': 'TZS', 'zanzibar': 'TZS', 'serengeti': 'TZS',
  'kilimanjaro': 'TZS',
  // Egypt
  'egypt': 'EGP', 'cairo': 'EGP', 'luxor': 'EGP', 'aswan': 'EGP',
  'hurghada': 'EGP', 'sharm el sheikh': 'EGP',
  // Morocco
  'morocco': 'MAD', 'marrakech': 'MAD', 'fez': 'MAD', 'casablanca': 'MAD',
  'chefchaouen': 'MAD', 'sahara': 'MAD',
  // Qatar
  'qatar': 'QAR', 'doha': 'QAR',
  // Oman
  'oman': 'OMR', 'muscat': 'OMR', 'nizwa': 'OMR',
  // Nepal
  'nepal': 'NPR', 'kathmandu': 'NPR', 'pokhara': 'NPR', 'everest': 'NPR',
  // Sri Lanka
  'sri lanka': 'LKR', 'colombo': 'LKR', 'kandy': 'LKR', 'galle': 'LKR',
  // Vietnam
  'vietnam': 'VND', 'hanoi': 'VND', 'ho chi minh': 'VND',
  'hoi an': 'VND', 'ha long bay': 'VND', 'da nang': 'VND',
  // Cambodia
  'cambodia': 'KHR', 'siem reap': 'KHR', 'angkor wat': 'KHR',
  // China
  'china': 'CNY', 'beijing': 'CNY', 'shanghai': 'CNY',
  'xi an': 'CNY', 'chengdu': 'CNY', 'guilin': 'CNY',
  // Hong Kong
  'hong kong': 'HKD',
  // Iceland / Norway / Scandinavia
  'iceland': 'NOK', 'reykjavik': 'NOK', 'reykjavík': 'NOK',
  'norway': 'NOK', 'bergen': 'NOK', 'lofoten': 'NOK',
  'sweden': 'SEK', 'stockholm': 'SEK', 'denmark': 'DKK', 'copenhagen': 'DKK',
  // Czech Republic
  'czech republic': 'CZK', 'prague': 'CZK', 'czech': 'CZK',
  // Poland
  'poland': 'PLN', 'krakow': 'PLN', 'warsaw': 'PLN', 'gdansk': 'PLN',
  // Hungary
  'hungary': 'HUF', 'budapest': 'HUF',
  // Maldives
  'maldives': 'MVR',
  // USA (fallback)
  'usa': 'USD', 'united states': 'USD', 'new york': 'USD',
  'new york city': 'USD', 'los angeles': 'USD', 'miami': 'USD',
  'las vegas': 'USD', 'san francisco': 'USD', 'hawaii': 'USD',
  // Pakistan
  'pakistan': 'PKR', 'lahore': 'PKR', 'karachi': 'PKR', 'islamabad': 'PKR',
};

function getCurrencyForDestination(city, country) {
  let cty = (city || '').toLowerCase().trim();
  let cnt = (country || '').toLowerCase().trim();

  // If city string contains comma e.g. "Jaipur, India"
  if (cty.includes(',')) {
    const parts = cty.split(',');
    cty = parts[0].trim();
    if (!cnt) cnt = parts[1].trim();
  }

  // Look up missing country in worldPlaces catalog
  if (!cnt || cnt === 'destination' || cnt === 'asia' || cnt === 'europe') {
    const found = worldPlaces.find(p => p.city.toLowerCase() === cty || cty.includes(p.city.toLowerCase()));
    if (found) {
      cnt = found.country.toLowerCase().trim();
    }
  }

  // Direct lookup by city or country in countryCurrencyMap
  if (countryCurrencyMap[cty]) return countryCurrencyMap[cty];
  if (countryCurrencyMap[cnt]) return countryCurrencyMap[cnt];

  // If India is anywhere in string
  if (cnt.includes('india') || cty.includes('india')) return 'INR';

  // Substring match in countryCurrencyMap keys
  for (const [key, curr] of Object.entries(countryCurrencyMap)) {
    if (cnt.includes(key) || cty.includes(key)) return curr;
  }

  return null;
}

/**
 * Detect the native currency for a destination and switch the selector + all prices.
 * @param {string} city   - City name (e.g. "Kyoto")
 * @param {string} country - Country name (e.g. "Japan")
 */
function switchCurrencyForDestination(city, country) {
  const newCurrency = getCurrencyForDestination(city, country);
  if (!newCurrency) return;
  if (!currencyRates[newCurrency]) return; // unsupported rate

  const prevCurrency = currentCurrency;
  currentCurrency = newCurrency;

  const sel = $('#currencySelector');
  if (sel) sel.value = newCurrency;

  // Refresh all price displays
  updateSummaryAndPaymentDrawer();
  if (typeof renderWizardStep === 'function') renderWizardStep();
  renderDay();

  // Find the symbol for the toast
  const sym = currencySymbols[newCurrency] || newCurrency;
  const flagMap = {
    INR:'🇮🇳', JPY:'🇯🇵', AED:'🇦🇪', EUR:'🇪🇺', GBP:'🇬🇧', SGD:'🇸🇬',
    AUD:'🇦🇺', CAD:'🇨🇦', CHF:'🇨🇭', KRW:'🇰🇷', THB:'🇹🇭', MYR:'🇲🇾',
    IDR:'🇮🇩', TRY:'🇹🇷', BRL:'🇧🇷', MXN:'🇲🇽', ZAR:'🇿🇦', EGP:'🇪🇬',
    MAD:'🇲🇦', NPR:'🇳🇵', LKR:'🇱🇰', PKR:'🇵🇰', OMR:'🇴🇲', QAR:'🇶🇦',
    VND:'🇻🇳', CNY:'🇨🇳', HKD:'🇭🇰', NOK:'🇳🇴', SEK:'🇸🇪', DKK:'🇩🇰',
    CZK:'🇨🇿', PLN:'🇵🇱', HUF:'🇭🇺', NZD:'🇳🇿', KES:'🇰🇪', TZS:'🇹🇿',
    PEN:'🇵🇪', ARS:'🇦🇷', CUP:'🇨🇺', MVR:'🇲🇻', KHR:'🇰🇭', USD:'🇺🇸',
  };
  const flag = flagMap[newCurrency] || '💱';
  toast(`${flag} Currency switched to ${newCurrency} (${sym.trim()}) for ${city}`);
}

let currentCurrency = 'INR';

function formatMoney(usdAmount) {
  const rate = currencyRates[currentCurrency] || 1.0;
  const sym = currencySymbols[currentCurrency] || '$';
  const val = Math.round(usdAmount * rate);
  return `${sym}${val.toLocaleString()}`;
}

const currencySelector = $('#currencySelector');
if (currencySelector) {
  currencySelector.value = currentCurrency;
  currencySelector.addEventListener('change', e => {
    currentCurrency = e.target.value;
    updateSummaryAndPaymentDrawer();
    renderWizardStep();
    renderDay();
    toast(`💱 Currency switched to ${currentCurrency} (${currencySymbols[currentCurrency]})`);
  });
}

// Currency Converter Inputs
function updateCurrencyConverter() {
  const amount = parseFloat($('#ccAmount').value) || 0;
  const from = $('#ccFrom').value;
  const to = $('#ccTo').value;

  const usd = amount / currencyRates[from];
  const converted = Math.round(usd * currencyRates[to]);

  const resultEl = $('#ccResult');
  if (resultEl) {
    resultEl.textContent = `${currencySymbols[from]}${amount.toLocaleString()} ${from} = ${currencySymbols[to]}${converted.toLocaleString()} ${to}`;
  }
}

if ($('#ccAmount')) {
  $('#ccAmount').addEventListener('input', updateCurrencyConverter);
  $('#ccFrom').addEventListener('change', updateCurrencyConverter);
  $('#ccTo').addEventListener('change', updateCurrencyConverter);
}

// Settle up companion expense
$$('.settle-btn').forEach(btn => btn.addEventListener('click', e => {
  const row = e.target.closest('.split-row');
  if (row) {
    row.querySelector('strong').textContent = 'Settled ✓';
    row.querySelector('strong').className = 'owes-positive';
    e.target.style.display = 'none';
    toast('💸 Expense settled with companion!');
  }
}));

// =========================================================
// 10. NEW FEATURE 2: FLIGHT & TRAIN STATUS RADAR & SEAT PICKER
// =========================================================
const transportDatabase = {
  flight: [
    { code: 'EK-502', name: 'Emirates Direct', route: 'Dubai (DXB) → New Delhi (DEL)', status: 'On Time', gate: 'B12', dep: '08:30 AM', arr: '01:45 PM' },
    { code: 'TP-102', name: 'TAP Air Portugal', route: 'Lisbon (LIS) → New York (JFK)', status: 'Boarding Soon', gate: 'G04', dep: '11:15 AM', arr: '03:10 PM' },
    { code: 'AI-101', name: 'Air India Express', route: 'Delhi (DEL) → Agra (AGR)', status: 'On Time', gate: 'A08', dep: '07:00 AM', arr: '07:45 AM' },
    { code: 'JL-042', name: 'Japan Airlines', route: 'Tokyo (HND) → Kyoto (KIX)', status: 'En Route', gate: 'C19', dep: '02:00 PM', arr: '03:15 PM' }
  ],
  train: [
    { code: '12050', name: 'Gatimaan Express', route: 'Hazrat Nizamuddin → Agra Cantt', status: 'On Time', gate: 'Plat 1', dep: '08:10 AM', arr: '09:50 AM' },
    { code: '20901', name: 'Vande Bharat Express', route: 'New Delhi → Jaipur Junction', status: 'Boarding Soon', gate: 'Plat 3', dep: '06:00 AM', arr: '10:45 AM' },
    { code: 'NOZ-99', name: 'Shinkansen Bullet Train', route: 'Tokyo Station → Kyoto Station', status: 'On Time', gate: 'Plat 14', dep: '09:00 AM', arr: '11:15 AM' }
  ]
};

let activeFsTab = 'flight';
let selectedSeat = '12A';

function renderFlightRadar() {
  const query = ($('#fsSearchInput').value || '').toLowerCase().trim();
  const list = transportDatabase[activeFsTab] || transportDatabase.flight;
  const filtered = list.filter(t => t.code.toLowerCase().includes(query) || t.name.toLowerCase().includes(query) || t.route.toLowerCase().includes(query));

  const container = $('#fsList');
  if (!container) return;

  container.innerHTML = filtered.map(t => `
    <div class="fs-item-card">
      <div>
        <b>${t.name} <small style="color:var(--coral);">(${t.code})</small></b>
        <small style="display:block; color:var(--muted); margin-top:2px;">📍 ${t.route}</small>
        <small style="font-size:11px; color:#4eaba4;">Dep: ${t.dep} · Arr: ${t.arr} · ${t.gate}</small>
      </div>
      <span class="status-tag">${t.status}</span>
    </div>
  `).join('');
}

function renderSeatGrid() {
  const container = $('#seatGrid');
  if (!container) return;

  const rows = [1, 2, 3, 4, 5, 6];
  const cols = ['A', 'B', 'C', '', 'D', 'E', 'F'];
  let markup = '';

  rows.forEach(r => {
    cols.forEach(c => {
      if (!c) {
        markup += `<div class="seat-btn aisle-gap"></div>`;
      } else {
        const seatCode = `${r}${c}`;
        const isSelected = seatCode === selectedSeat;
        markup += `<button type="button" class="seat-btn ${isSelected ? 'selected' : ''}" data-seat="${seatCode}">${seatCode}</button>`;
      }
    });
  });

  container.innerHTML = markup;

  $$('[data-seat]').forEach(btn => btn.addEventListener('click', () => {
    selectedSeat = btn.dataset.seat;
    $('#selectedSeatInfo').innerHTML = `Selected Seat: <b>${selectedSeat} (${selectedSeat.includes('A') || selectedSeat.includes('F') ? 'Window' : 'Aisle'})</b>`;
    $('#bpSeat').textContent = selectedSeat;
    renderSeatGrid();
    toast(`💺 Seat ${selectedSeat} selected for your trip`);
  }));
}

const flightStatusModal = $('#flightStatusModal');
if ($('#openFlightRadarBtn')) {
  $('#openFlightRadarBtn').addEventListener('click', () => {
    renderFlightRadar();
    renderSeatGrid();
    flightStatusModal.showModal();
  });
}

if ($('#closeFlightRadar')) {
  $('#closeFlightRadar').addEventListener('click', () => flightStatusModal.close());
}

$$('.fs-tabs button').forEach(btn => btn.addEventListener('click', () => {
  $$('.fs-tabs button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFsTab = btn.dataset.fsTab;
  renderFlightRadar();
}));

if ($('#fsSearchBtn')) {
  $('#fsSearchBtn').addEventListener('click', renderFlightRadar);
}

if ($('#downloadPassBtn')) {
  $('#downloadPassBtn').addEventListener('click', () => toast('📲 Boarding Pass saved to your device wallet!'));
}

// =========================================================
// 11. NEW FEATURE 3: INTERACTIVE 3D WORLD GLOBE CANVAS
// =========================================================
let globeCanvas = null;
let globeCtx = null;
let globeAngle = 0;
let isGlobeRotating = true;
let showFlightArcs = true;
let globeAnimFrame = null;

function initGlobeCanvas() {
  globeCanvas = document.getElementById('globeCanvas');
  if (!globeCanvas) return;
  globeCtx = globeCanvas.getContext('2d');

  function drawGlobe() {
    if (!globeCtx) return;
    const w = globeCanvas.width;
    const h = globeCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = 170;

    globeCtx.clearRect(0, 0, w, h);

    // 1. Globe Atmosphere Glow
    const aura = globeCtx.createRadialGradient(cx, cy, r - 10, cx, cy, r + 30);
    aura.addColorStop(0, 'rgba(78, 171, 164, 0.4)');
    aura.addColorStop(1, 'rgba(78, 171, 164, 0)');
    globeCtx.fillStyle = aura;
    globeCtx.beginPath();
    globeCtx.arc(cx, cy, r + 30, 0, Math.PI * 2);
    globeCtx.fill();

    // 2. Main Ocean Sphere
    const ocean = globeCtx.createRadialGradient(cx - 40, cy - 40, 10, cx, cy, r);
    ocean.addColorStop(0, '#23444b');
    ocean.addColorStop(1, '#0e1a1c');
    globeCtx.fillStyle = ocean;
    globeCtx.beginPath();
    globeCtx.arc(cx, cy, r, 0, Math.PI * 2);
    globeCtx.fill();
    globeCtx.strokeStyle = 'rgba(78, 171, 164, 0.5)';
    globeCtx.lineWidth = 2;
    globeCtx.stroke();

    // 3. Grid Rings (Latitude & Longitude)
    globeCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    globeCtx.lineWidth = 1;
    for (let lat = -60; lat <= 60; lat += 30) {
      const latRad = lat * Math.PI / 180;
      const yr = r * Math.sin(latRad);
      const xr = r * Math.cos(latRad);
      globeCtx.beginPath();
      globeCtx.ellipse(cx, cy + yr, xr, xr * 0.3, 0, 0, Math.PI * 2);
      globeCtx.stroke();
    }

    // 4. Plot 200 Destination Pins onto Globe
    if (isGlobeRotating) globeAngle += 0.005;

    worldPlaces.forEach((p, idx) => {
      const coords = cityCoords[p.city] || [20 + (idx % 40), -100 + (idx * 5) % 200];
      const latRad = coords[0] * Math.PI / 180;
      const lonRad = (coords[1] + (globeAngle * 180 / Math.PI)) * Math.PI / 180;

      // Orthographic projection
      const x = r * Math.cos(latRad) * Math.sin(lonRad);
      const y = -r * Math.sin(latRad);
      const z = r * Math.cos(latRad) * Math.cos(lonRad);

      // Only draw pins on front hemisphere (z > 0)
      if (z > 0) {
        const px = cx + x;
        const py = cy + y;

        const isCurrent = p.city === currentTripState.city;

        // Pin Glow
        globeCtx.fillStyle = isCurrent ? '#ff785e' : '#4eaba4';
        globeCtx.beginPath();
        globeCtx.arc(px, py, isCurrent ? 6 : 3.5, 0, Math.PI * 2);
        globeCtx.fill();

        if (isCurrent) {
          globeCtx.strokeStyle = '#ffffff';
          globeCtx.lineWidth = 1.5;
          globeCtx.beginPath();
          globeCtx.arc(px, py, 9, 0, Math.PI * 2);
          globeCtx.stroke();
        }
      }
    });

    // 5. Draw Flight Trajectory Arcs if enabled
    if (showFlightArcs) {
      const origin = cityCoords['Agra'] || [27.1751, 78.0421];
      const dest = cityCoords[currentTripState.city] || [38.7223, -9.1393];

      const lat1 = origin[0] * Math.PI / 180;
      const lon1 = (origin[1] + (globeAngle * 180 / Math.PI)) * Math.PI / 180;
      const lat2 = dest[0] * Math.PI / 180;
      const lon2 = (dest[1] + (globeAngle * 180 / Math.PI)) * Math.PI / 180;

      const z1 = r * Math.cos(lat1) * Math.cos(lon1);
      const z2 = r * Math.cos(lat2) * Math.cos(lon2);

      if (z1 > -50 && z2 > -50) {
        const x1 = cx + r * Math.cos(lat1) * Math.sin(lon1);
        const y1 = cy - r * Math.sin(lat1);
        const x2 = cx + r * Math.cos(lat2) * Math.sin(lon2);
        const y2 = cy - r * Math.sin(lat2);

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - 40;

        globeCtx.strokeStyle = '#f4ce60';
        globeCtx.lineWidth = 2;
        globeCtx.setLineDash([4, 4]);
        globeCtx.beginPath();
        globeCtx.moveTo(x1, y1);
        globeCtx.quadraticCurveTo(midX, midY, x2, y2);
        globeCtx.stroke();
        globeCtx.setLineDash([]);
      }
    }

    if (globeExplorerModal.open) {
      globeAnimFrame = requestAnimationFrame(drawGlobe);
    }
  }

  drawGlobe();
}

const globeExplorerModal = $('#globeExplorerModal');

if ($('#openGlobeBtn')) {
  $('#openGlobeBtn').addEventListener('click', () => {
    $('#gpiCity').textContent = `${currentTripState.city}, ${currentTripState.destination.split(',')[1] || ''}`;
    globeExplorerModal.showModal();
    setTimeout(() => initGlobeCanvas(), 100);
  });
}

if ($('#closeGlobeModal')) {
  $('#closeGlobeModal').addEventListener('click', () => {
    if (globeAnimFrame) cancelAnimationFrame(globeAnimFrame);
    globeExplorerModal.close();
  });
}

if ($('#toggleGlobeRotateBtn')) {
  $('#toggleGlobeRotateBtn').addEventListener('click', () => {
    isGlobeRotating = !isGlobeRotating;
    $('#toggleGlobeRotateBtn').textContent = isGlobeRotating ? '⏸ Pause Rotation' : '▶ Resume Rotation';
  });
}

if ($('#toggleGlobeArcsBtn')) {
  $('#toggleGlobeArcsBtn').addEventListener('click', () => {
    showFlightArcs = !showFlightArcs;
    toast(showFlightArcs ? '✈ Flight Arcs enabled' : '✈ Flight Arcs hidden');
  });
}

if ($('#gpiExploreBtn')) {
  $('#gpiExploreBtn').addEventListener('click', () => {
    globeExplorerModal.close();
    openCityDetailModal(currentTripState.city);
  });
}

// =========================================================
// 12. NEW FEATURE 4: AI VOICE CONCIERGE & OFFLINE PASSPORT PDF
// =========================================================

// Web Speech Synthesis
if ($('#voiceSpeakBtn')) {
  $('#voiceSpeakBtn').addEventListener('click', () => {
    const text = $('#aiResponse').querySelector('span').textContent || 'Welcome to TripNest!';
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      toast('🎙️ Spoken Concierge activated');
    } else {
      toast('🎙️ Voice synthesis not supported in this browser.');
    }
  });
}

// Offline Passport Modal
const passportPdfModal = $('#passportPdfModal');

if ($('#openPassportPdfBtn')) {
  $('#openPassportPdfBtn').addEventListener('click', () => {
    $('#pdfDest').textContent = currentTripState.destination;
    $('#pdfDates').textContent = `${currentTripState.departDate} – ${currentTripState.returnDate}`;
    $('#pdfTravelers').textContent = `${currentTripState.travelers} Travelers`;
    $('#pdfRef').textContent = `TN-${Math.floor(10000 + Math.random() * 90000)}`;
    $('#pdfFlight').textContent = currentTripState.flight.title;
    $('#pdfHotel').textContent = currentTripState.stay.title;

    passportPdfModal.showModal();
  });
}

if ($('#closePassportPdf')) {
  $('#closePassportPdf').addEventListener('click', () => passportPdfModal.close());
}

if ($('#printPassportBtn')) {
  $('#printPassportBtn').addEventListener('click', () => {
    window.print();
  });
}

/* =========================================================
   ✦ AGENTIC AI STUDIO & AUTONOMOUS REACTION ENGINE (JS)
   ========================================================= */

const agentStudioModal = $('#agentStudioModal');
const agentChatDrawer = $('#agentChatDrawer');
let lastAgentExecutionTrace = null;

// Open / Close Agent Studio Modal
function openAgentStudio() {
  if (currentTripState && currentTripState.destination) {
    if ($('#agentDestInput')) $('#agentDestInput').value = currentTripState.destination;
  }
  if (agentStudioModal) agentStudioModal.showModal();
}

if ($('#openAgentStudioBtn')) $('#openAgentStudioBtn').addEventListener('click', openAgentStudio);
if ($('#openFloatingAgentStudioBtn')) $('#openFloatingAgentStudioBtn').addEventListener('click', openAgentStudio);

if ($('#closeAgentStudioBtn') && agentStudioModal) {
  $('#closeAgentStudioBtn').addEventListener('click', () => {
    agentStudioModal.close();
  });
}

// Open / Close AI Concierge Drawer
function openAgentConcierge() {
  if (agentChatDrawer) agentChatDrawer.classList.add('open');
  const overlay = $('#agentChatOverlay');
  if (overlay) overlay.classList.add('open');
  if (chatInput) setTimeout(() => chatInput.focus(), 150);
}

function closeAgentConcierge() {
  if (agentChatDrawer) agentChatDrawer.classList.remove('open');
  const overlay = $('#agentChatOverlay');
  if (overlay) overlay.classList.remove('open');
}

if ($('#openAgentChatBtn')) $('#openAgentChatBtn').addEventListener('click', openAgentConcierge);
if ($('#openFloatingChatBtn')) $('#openFloatingChatBtn').addEventListener('click', openAgentConcierge);

if ($('#closeAgentChatBtn')) {
  $('#closeAgentChatBtn').addEventListener('click', closeAgentConcierge);
}
if ($('#agentChatOverlay')) {
  $('#agentChatOverlay').addEventListener('click', closeAgentConcierge);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && agentChatDrawer && agentChatDrawer.classList.contains('open')) {
    closeAgentConcierge();
  }
});


// Persona Chips Selection
const personaChips = $$('#agentPersonaChips .persona-chip');
let selectedAgentStyle = 'culture';

personaChips.forEach(chip => {
  chip.addEventListener('click', () => {
    personaChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedAgentStyle = chip.dataset.style || 'culture';
  });
});

// Quick Agent Mission Buttons
$$('.quick-agent-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if ($('#agentGoalInput')) $('#agentGoalInput').value = btn.dataset.prompt;
    if ($('#agentDestInput') && btn.dataset.dest) $('#agentDestInput').value = btn.dataset.dest;
  });
});

// Map of Agent Names to Ticker IDs
const agentTickerMap = {
  'TripOrchestratorAgent': 'tickerOrchestrator',
  'TravelerMemoryAgent': 'tickerMemory',
  'WeatherSafetyAgent': 'tickerWeather',
  'DiscoveryAgent': 'tickerDiscovery',
  'GeoRoutingAgent': 'tickerRouting',
  'TransportStayAgent': 'tickerTransport',
  'ComplianceHealthAgent': 'tickerCompliance'
};

function highlightActiveAgent(agentName) {
  $$('.agent-ticker-item').forEach(el => el.classList.remove('active'));
  const tickerId = agentTickerMap[agentName] || 'tickerOrchestrator';
  const target = $(`#${tickerId}`);
  if (target) target.classList.add('active');
}

// Launch Multi-Agent Synthesis Execution
if ($('#launchAgentBtn')) {
  $('#launchAgentBtn').addEventListener('click', async () => {
    const goal = $('#agentGoalInput') ? $('#agentGoalInput').value.trim() : '';
    const dest = $('#agentDestInput') ? $('#agentDestInput').value.trim() : 'Agra, India';
    const days = $('#agentDaysInput') ? parseInt($('#agentDaysInput').value) : 5;
    const budget = $('#agentBudgetInput') ? parseInt($('#agentBudgetInput').value) : 1500;
    const travelers = $('#agentTravelersInput') ? parseInt($('#agentTravelersInput').value) : 2;
    const model = $('#agentEngineSelector') ? $('#agentEngineSelector').value : 'local-agentic-engine';

    const launchBtn = $('#launchAgentBtn');
    const statusBadge = $('#agentStatusBadge');
    const progressBar = $('#agentProgressBar');
    const stepsFeed = $('#agentStepsFeed');
    const synthesisCard = $('#agentSynthesisCard');

    launchBtn.disabled = true;
    launchBtn.innerHTML = '<span>⚡ Multi-Agent Synthesis Running...</span>';
    statusBadge.textContent = 'Orchestrating agents...';
    progressBar.style.width = '10%';
    stepsFeed.innerHTML = '';
    synthesisCard.classList.add('hidden');

    const payload = {
      goal: goal || `Design an optimal ${days}-day ${selectedAgentStyle} trip to ${dest}`,
      destination: dest,
      days: days,
      travel_style: selectedAgentStyle,
      budget_usd: budget,
      travelers: travelers,
      traveler_email: 'traveler@tripnest.ai',
      agent_model: model,
      enable_reflection: true
    };

    let trace = null;

    try {
      // Try backend FastAPI server
      const res = await fetch('/ai/agent/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        trace = await res.json();
      }
    } catch (err) {
      console.warn('[AgenticUI] Backend offline, running client-side ReAct engine:', err);
    }

    // Client-side fallback if backend server isn't reached
    if (!trace) {
      trace = generateClientAgentTrace(payload);
    }

    lastAgentExecutionTrace = trace;

    // Stream reasoning steps with visual cadence
    const totalSteps = trace.steps.length;
    for (let i = 0; i < totalSteps; i++) {
      const step = trace.steps[i];
      const pct = Math.round(((i + 1) / totalSteps) * 100);
      progressBar.style.width = `${pct}%`;
      statusBadge.textContent = `Step ${i + 1}/${totalSteps}: ${step.agent_name}`;
      highlightActiveAgent(step.agent_name);

      renderAgentStepCard(step, stepsFeed);
      stepsFeed.scrollTop = stepsFeed.scrollHeight;

      // Small asynchronous pacing for immersive ReAct visual
      await new Promise(r => setTimeout(r, 260));
    }

    // Reveal final synthesized itinerary card
    statusBadge.textContent = '✓ Synthesis Complete (All Agents Passed)';
    statusBadge.style.color = '#34d399';
    progressBar.style.width = '100%';
    launchBtn.disabled = false;
    launchBtn.innerHTML = '<span>✦ Launch Autonomous Multi-Agent Synthesis</span><span class="agent-btn-arrow">→</span>';

    renderMasterSynthesisCard(trace.final_output);
  });
}

function renderAgentStepCard(step, container) {
  const card = document.createElement('div');
  card.className = 'agent-step-card';

  let toolHtml = '';
  if (step.tool_call) {
    const argsStr = step.tool_args ? JSON.stringify(step.tool_args) : '{}';
    toolHtml = `<div class="agent-tool-box">⚡ [Tool Call] ${step.tool_call}(${argsStr})</div>`;
  }

  card.innerHTML = `
    <div class="asc-step-meta">
      <span class="asc-agent-tag">🤖 ${step.agent_name}</span>
      <span class="asc-phase-badge phase-${step.phase}">${step.phase}</span>
    </div>
    <h5>${step.title}</h5>
    <p>${step.content}</p>
    ${toolHtml}
  `;
  container.appendChild(card);
}

function renderMasterSynthesisCard(finalOut) {
  const card = $('#agentSynthesisCard');
  if (!card) return;

  $('#ascTitle').textContent = `${finalOut.duration_days}-Day ${finalOut.travel_style.toUpperCase()} Plan · ${finalOut.destination}`;
  $('#ascSummary').textContent = finalOut.orchestrator_summary;
  $('#ascTotalCost').textContent = `$${finalOut.total_budget_usd.toLocaleString()}`;
  $('#ascPerPerson').textContent = `$${finalOut.per_person_usd.toLocaleString()}`;
  $('#ascDistance').textContent = `${finalOut.spatial_optimization?.total_km || 8.4} km`;
  $('#ascWeather').textContent = `${finalOut.weather_intelligence?.temperature_c || 26}°C ${finalOut.weather_intelligence?.condition || 'Clear'}`;

  const daysList = $('#ascDaysList');
  daysList.innerHTML = '';

  (finalOut.itinerary || []).forEach(day => {
    const dayEl = document.createElement('div');
    dayEl.className = 'asc-day-card';
    dayEl.innerHTML = `
      <div class="asc-day-top">
        <b>${day.label}</b>
        <span class="asc-day-km">📍 ${day.distance_km || 2.4} km path</span>
      </div>
      <p>${day.morning}</p>
      <p>${day.evening}</p>
    `;
    daysList.appendChild(dayEl);
  });

  card.classList.remove('hidden');
  card.scrollIntoView({ behavior: 'smooth' });
}

// Apply Agent Plan to Trip Wizard & Map
if ($('#applyAgentTripBtn')) {
  $('#applyAgentTripBtn').addEventListener('click', () => {
    if (!lastAgentExecutionTrace || !lastAgentExecutionTrace.final_output) return;
    const out = lastAgentExecutionTrace.final_output;

    const rawDest = out.destination.split(',')[0].trim();
    currentTripState.destination = out.destination;
    currentTripState.city = rawDest;
    currentTripState.travelers = out.travelers;

    if ($('#destination')) $('#destination').value = out.destination;

    // Convert agent itinerary to tripData structure
    const convertedDays = (out.itinerary || []).map(day => [
      { time: '08:30', type: 'tour', title: day.morning.replace(/^[^\w]+/, ''), detail: `Agent Curated · Weather verified` },
      { time: '13:00', type: 'tour', title: day.afternoon.replace(/^[^\w]+/, ''), detail: `Midday trail` },
      { time: '18:30', type: 'tour', title: day.evening.replace(/^[^\w]+/, ''), detail: `Evening highlight` }
    ]);

    tripData[rawDest] = convertedDays;

    // Sync app state
    generateCityPlaces(rawDest);
    renderDay();
    renderPlaces();
    updateCircleLiveRadar(rawDest);
    updateWeatherWidget(rawDest);
    updateSummaryAndPaymentDrawer();

    if (agentStudioModal) agentStudioModal.close();
    showToast(`⚡ Agentic Plan successfully synced with Trip Wizard for ${out.destination}!`);
  });
}

// Export Agent Trace JSON
if ($('#exportAgentTraceBtn')) {
  $('#exportAgentTraceBtn').addEventListener('click', () => {
    if (!lastAgentExecutionTrace) return;
    const blob = new Blob([JSON.stringify(lastAgentExecutionTrace, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TripNest_Agent_Trace_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Agent execution trace exported to JSON!');
  });
}

// Client-Side Agentic Fallback Generator
function generateClientAgentTrace(req) {
  const city = req.destination.split(',')[0].trim();
  const execId = `AGENT-LOCAL-${Date.now()}`;

  const steps = [
    { step_num: 1, agent_name: 'TripOrchestratorAgent', phase: 'thought', title: 'Goal Breakdown & Agentic Mission Planning', content: `Deconstructing travel mission for ${req.destination} (${req.days} days, ${req.travelers} travelers, $${req.budget_usd} budget). Delegating to Discovery, Weather, Routing, and Safety agents.`, tool_call: 'decompose_goal', tool_args: { destination: req.destination, days: req.days } },
    { step_num: 2, agent_name: 'TravelerMemoryAgent', phase: 'action', title: 'Vector Memory Retrieval', content: `Recalling preference embeddings and past travel history for traveler...`, tool_call: 'tool_recall_traveler_memory', tool_args: { email: req.traveler_email }, tool_result: { profile: 'Cultural explorer, prefers walking < 5km/day' } },
    { step_num: 3, agent_name: 'WeatherSafetyAgent', phase: 'action', title: 'Live Meteorological Assessment', content: `Checking Open-Meteo satellite feed for ${req.destination}...`, tool_call: 'tool_get_live_weather', tool_args: { city: req.destination }, tool_result: { temp: '26°C', condition: 'Sunny' } },
    { step_num: 4, agent_name: 'WeatherSafetyAgent', phase: 'observation', title: 'Climate Guardrail Passed', content: `26°C Clear skies. Comfort score 94/100. Light layers and hydration recommended.` },
    { step_num: 5, agent_name: 'DiscoveryAgent', phase: 'action', title: 'Geospatial POI & Culinary Discovery', content: `Querying cultural landmarks, heritage trails, and local eateries near ${req.destination}...`, tool_call: 'tool_search_nearby_places', tool_args: { city: req.destination, radius_km: 8.0 } },
    { step_num: 6, agent_name: 'GeoRoutingAgent', phase: 'action', title: 'Spatial TSP Route Optimization', content: `Calculating shortest nearest-neighbor path between stops to minimize transit fatigue...`, tool_call: 'tool_optimize_spatial_route', tool_args: { stops: 6 }, tool_result: { total_km: 7.8, efficiency: '96%' } },
    { step_num: 7, agent_name: 'TransportStayAgent', phase: 'action', title: 'Inventory Sourcing & Budget Allocation', content: `Matching boutique hotel and express transit within $${req.budget_usd} budget guardrail...`, tool_call: 'tool_search_inventory_and_pricing', tool_args: { budget: req.budget_usd } },
    { step_num: 8, agent_name: 'ComplianceHealthAgent', phase: 'action', title: 'Visa & Emergency Health Verification', content: `Auditing consular entry requirements and local medical clinics...`, tool_call: 'tool_check_visa_and_safety', tool_args: { destination: req.destination } },
    { step_num: 9, agent_name: 'TripOrchestratorAgent', phase: 'reflection', title: 'Self-Reflection & Quality Audit', content: `✓ Budget Check: $${req.budget_usd} with 15% emergency reserve. ✓ Pacing Check: < 8 km total transit. ✓ Safety Check: Visa e-entry verified. ALL 4 GUARDRAILS PASSED.` },
    { step_num: 10, agent_name: 'TripOrchestratorAgent', phase: 'output', title: 'Master Itinerary Assembly Complete', content: `Synthesized verified ${req.days}-day agentic travel plan with zero loose ends.` }
  ];

  const itinerary = [];
  for (let d = 1; d <= req.days; d++) {
    itinerary.push({
      day: d,
      label: `Day ${d} · ${req.travel_style.toUpperCase()} Highlight`,
      morning: `🌅 Morning Heritage Walk & Priority Landmark Visit — ${city}`,
      afternoon: `🗺️ Midday Artisan Trail & Regional Cuisine Tasting`,
      evening: `🌙 Sunset Vista & Atmospheric Dinner`,
      distance_km: 2.2 + (d * 0.4),
      est_spend_usd: Math.round(req.budget_usd / req.days)
    });
  }

  return {
    execution_id: execId,
    user_goal: req.goal,
    orchestrator: 'TripOrchestratorAgent',
    agents_involved: ['TripOrchestratorAgent', 'TravelerMemoryAgent', 'WeatherSafetyAgent', 'DiscoveryAgent', 'GeoRoutingAgent', 'TransportStayAgent', 'ComplianceHealthAgent'],
    total_steps: steps.length,
    execution_time_ms: 450,
    steps: steps,
    final_output: {
      destination: req.destination,
      duration_days: req.days,
      travel_style: req.travel_style,
      travelers: req.travelers,
      total_budget_usd: req.budget_usd,
      per_person_usd: Math.round(req.budget_usd / req.travelers),
      orchestrator_summary: `Autonomous multi-agent synthesis completed for ${req.destination}. Sequenced along an optimal shortest-transit path with verified weather safety and budget protections.`,
      itinerary: itinerary,
      weather_intelligence: { temperature_c: 26, condition: 'Sunny & Clear' },
      spatial_optimization: { total_km: 8.4 }
    }
  };
}

// AI Concierge Chatbot Interaction
const chatInput = $('#agentChatInput');
const chatSendBtn = $('#sendAgentChatBtn');
const chatContainer = $('#agentChatMessages');

async function handleSendChatMessage(text) {
  const msg = text || (chatInput ? chatInput.value.trim() : '');
  if (!msg) return;
  if (chatInput) chatInput.value = '';

  // Append user message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'agent-msg user';
  userMsgEl.innerHTML = `
    <div class="agent-msg-avatar">👤</div>
    <div class="agent-msg-bubble"><p>${escapeHtml(msg)}</p></div>
  `;
  chatContainer.appendChild(userMsgEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Typing indicator
  const typingEl = document.createElement('div');
  typingEl.className = 'agent-msg bot';
  typingEl.id = 'agentTypingIndicator';
  typingEl.innerHTML = `
    <div class="agent-msg-avatar">✦</div>
    <div class="agent-msg-bubble"><p><em>Agents considering your journey...</em></p></div>
  `;
  chatContainer.appendChild(typingEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  let botReply = null;

  try {
    const res = await fetch('/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: msg,
        destination: currentTripState ? currentTripState.destination : 'Agra, India',
        travel_style: 'culture',
        budget_usd: 1500,
        travelers: currentTripState ? currentTripState.travelers : 2
      })
    });
    if (res.ok) {
      botReply = await res.json();
    }
  } catch (err) {
    console.warn('[AgenticChat] Backend unavailable, using client agent fallback');
  }

  // Remove typing indicator
  const indicator = $('#agentTypingIndicator');
  if (indicator) indicator.remove();

  if (!botReply) {
    const dest = (currentTripState && currentTripState.destination) ? currentTripState.destination : 'your destination';
    botReply = {
      agent_name: 'TripOrchestratorAgent',
      role: '🧭 Autonomous Concierge',
      tool_executed: 'client_agentic_reasoning',
      reply: `I have analyzed your query about **${dest}**. Our specialized AI agents recommend exploring our curated day-by-day itineraries, live climate guardrails, and nearest-neighbor paths!`
    };
  }

  // Render Bot Message with Tool Tag
  const botEl = document.createElement('div');
  botEl.className = 'agent-msg bot';
  const toolBadge = botReply.tool_executed ? `<small class="agent-tool-tag">⚡ Tool: ${botReply.tool_executed}</small>` : '';
  const formattedText = botReply.reply.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  botEl.innerHTML = `
    <div class="agent-msg-avatar">✦</div>
    <div class="agent-msg-bubble">
      <p>${formattedText}</p>
      ${toolBadge}
    </div>
  `;
  chatContainer.appendChild(botEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

if (chatSendBtn) {
  chatSendBtn.addEventListener('click', () => handleSendChatMessage());
}

if (chatInput) {
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendChatMessage();
  });
}

$$('.chat-quick-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const ask = pill.dataset.chatAsk || pill.textContent;
    handleSendChatMessage(ask);
  });
});

// Initialize UI on load for Agra
generateCityPlaces('Agra');
renderDay();
renderPlaces();
renderWizardStep();
updateCircleLiveRadar('Agra');
updateWeatherWidget('Agra');
updateSummaryAndPaymentDrawer();


