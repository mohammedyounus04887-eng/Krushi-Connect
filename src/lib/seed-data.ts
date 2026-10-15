import {
  User, LandListing, LeaseRequest, WorkerProfile, LabourJob, LabourApplication,
  CropDemand, ProduceListing, StorageFacility, GovScheme, SchemeApplication,
  FarmZone, CultivationTask, FarmAlert, AppNotification, Message
} from './types';

export const SEED_USERS: User[] = [
  {
    id: 'usr_1',
    name: 'Ramesh Kumar (Farmer)',
    email: 'ramesh@krushiconnect.org',
    role: 'farmer',
    phone: '+91 98765 43210',
    location: 'Nashik, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    bio: 'Progressive organic grape and tomato cultivator with 12 acres.',
    joinedDate: '2023-01-15'
  },
  {
    id: 'usr_2',
    name: 'Suresh Patil (Landowner)',
    email: 'suresh@krushiconnect.org',
    role: 'landowner',
    phone: '+91 98123 76543',
    location: 'Pune, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    bio: 'Landowner offering fertile black soil agricultural plots for long term lease.',
    joinedDate: '2023-03-22'
  },
  {
    id: 'usr_3',
    name: 'Anil Deshmukh (Agri Worker)',
    email: 'anil@krushiconnect.org',
    role: 'worker',
    phone: '+91 97654 32109',
    location: 'Satara, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 4.95,
    bio: 'Expert tractor operator and plant protection specialist with 8 years field experience.',
    joinedDate: '2023-05-10'
  },
  {
    id: 'usr_4',
    name: 'FreshBazar Mart (Buyer)',
    email: 'buyer@freshbazar.com',
    role: 'buyer',
    phone: '+91 91234 56789',
    location: 'Mumbai, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 4.7,
    bio: 'Bulk agricultural produce procurement team for retail chain store.',
    joinedDate: '2023-06-01'
  },
  {
    id: 'usr_admin',
    name: 'Krushi Admin Operations',
    email: 'admin@krushiconnect.org',
    role: 'admin',
    phone: '+91 80000 11111',
    location: 'HQ Central, India',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5.0,
    bio: 'System Administrator and Ecosystem Operations Lead.',
    joinedDate: '2022-12-01'
  }
];

export const SEED_LANDS: LandListing[] = [
  {
    id: 'land_1',
    title: 'Green Valley Fertile Black Soil Acreage',
    location: 'Baramati, Pune',
    district: 'Pune',
    state: 'Maharashtra',
    sizeAcres: 8.5,
    soilType: 'Black Soil',
    waterSource: 'Drip Irrigation',
    cropSuitability: ['Sugarcane', 'Pomegranate', 'Tomato', 'Wheat'],
    rentPerYear: 65000,
    ownerId: 'usr_2',
    ownerName: 'Suresh Patil',
    ownerPhone: '+91 98123 76543',
    ownerRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    latitude: 18.1517,
    longitude: 74.5772,
    description: 'High fertility black cotton soil with dedicated 24/7 solar borewell and drip line installed. Road touch accessibility for harvest transport.',
    createdDate: '2026-08-01'
  },
  {
    id: 'land_2',
    title: 'Sunrise Organic Riverbed Farm Plot',
    location: 'Niphad, Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    sizeAcres: 12.0,
    soilType: 'Alluvial Soil',
    waterSource: 'River',
    cropSuitability: ['Grapes', 'Onion', 'Capsicum', 'Maize'],
    rentPerYear: 82000,
    ownerId: 'usr_2',
    ownerName: 'Suresh Patil',
    ownerPhone: '+91 98123 76543',
    ownerRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    latitude: 20.0788,
    longitude: 74.1084,
    description: 'Abundant water supply directly from Godavari sub-canal. Ideal for onion nursery or vineyard setup.',
    createdDate: '2026-08-10'
  },
  {
    id: 'land_3',
    title: 'Highland Terrace Horticulture Plot',
    location: 'Mahabaleshwar Border, Satara',
    district: 'Satara',
    state: 'Maharashtra',
    sizeAcres: 5.0,
    soilType: 'Red Soil',
    waterSource: 'Canal',
    cropSuitability: ['Strawberry', 'Turmeric', 'Exotic Vegetables', 'Ginger'],
    rentPerYear: 48000,
    ownerId: 'usr_2',
    ownerName: 'Suresh Patil',
    ownerPhone: '+91 98123 76543',
    ownerRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'pending',
    latitude: 17.9258,
    longitude: 73.6582,
    description: 'Cool weather slope ideal for berry cultivation and high-value medicinal spices.',
    createdDate: '2026-08-15'
  }
];

export const SEED_LEASES: LeaseRequest[] = [
  {
    id: 'lease_101',
    landId: 'land_3',
    landTitle: 'Highland Terrace Horticulture Plot',
    landLocation: 'Mahabaleshwar Border, Satara',
    farmerId: 'usr_1',
    farmerName: 'Ramesh Kumar (Farmer)',
    farmerPhone: '+91 98765 43210',
    proposedRent: 46000,
    durationYears: 3,
    status: 'pending',
    requestDate: '2026-08-20',
    message: 'We plan to cultivate organic turmeric and strawberry using drip irrigation. Seeking 3-year term.'
  }
];

export const SEED_WORKERS: WorkerProfile[] = [
  {
    id: 'wrk_1',
    name: 'Anil Deshmukh',
    skills: ['Tractor Driving', 'Tillage', 'Pesticide Spraying', 'Drip Maintenance'],
    experienceYears: 8,
    location: 'Satara, Maharashtra',
    availability: 'Immediate',
    dailyRate: 650,
    rating: 4.95,
    phone: '+91 97654 32109',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    completedJobs: 42,
    verified: true
  },
  {
    id: 'wrk_2',
    name: 'Santosh Pawar',
    skills: ['Paddy Transplanting', 'Sugarcane Harvest', 'Weeding', 'Pruning'],
    experienceYears: 5,
    location: 'Kolhapur, Maharashtra',
    availability: 'Immediate',
    dailyRate: 550,
    rating: 4.8,
    phone: '+91 98221 44332',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    completedJobs: 29,
    verified: true
  },
  {
    id: 'wrk_3',
    name: 'Savita Shinde',
    skills: ['Vegetable Picking', 'Sorting & Packing', 'Nursery Management'],
    experienceYears: 6,
    location: 'Nashik, Maharashtra',
    availability: 'Next Week',
    dailyRate: 500,
    rating: 4.9,
    phone: '+91 94230 88776',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    completedJobs: 56,
    verified: true
  }
];

export const SEED_JOBS: LabourJob[] = [
  {
    id: 'job_1',
    title: 'Tomato Harvest & Grading Crew Needed',
    crop: 'Tomato',
    workType: 'Harvesting',
    workersNeeded: 6,
    workersHired: 4,
    requiredDate: '2026-08-28',
    durationDays: 4,
    location: 'Pimple Gaon, Nashik',
    budgetPerDay: 600,
    farmerId: 'usr_1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98765 43210',
    status: 'open',
    description: 'Requires experienced hands for ripe tomato plucking, crate packing, and sorting.',
    postedDate: '2026-08-22',
    applicantsCount: 5
  },
  {
    id: 'job_2',
    title: 'Monsoon Paddy Transplanting Team',
    crop: 'Paddy',
    workType: 'Transplanting',
    workersNeeded: 10,
    workersHired: 10,
    requiredDate: '2026-08-15',
    durationDays: 3,
    location: 'Bhor, Pune',
    budgetPerDay: 550,
    farmerId: 'usr_1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98765 43210',
    status: 'completed',
    description: 'Manual transplanting of rice saplings in 4 acre muddy field.',
    postedDate: '2026-08-10',
    applicantsCount: 12
  }
];

export const SEED_JOB_APPLICATIONS: LabourApplication[] = [
  {
    id: 'app_1',
    jobId: 'job_1',
    jobTitle: 'Tomato Harvest & Grading Crew Needed',
    workerId: 'wrk_1',
    workerName: 'Anil Deshmukh',
    workerPhone: '+91 97654 32109',
    status: 'pending',
    appliedDate: '2026-08-23',
    experienceSummary: 'Handled over 20+ vegetable harvests. Punctual team member.'
  }
];

export const SEED_CROP_DEMANDS: CropDemand[] = [
  {
    id: 'dem_1',
    cropName: 'Tomato (Red Gold)',
    category: 'Vegetables',
    demandScore: 91,
    currentPricePerKg: 38,
    priceChangePercent: 12.5,
    forecastTrend: 'High Growth',
    season: 'Kharif',
    recommendedRegion: 'Western Maharashtra & North Karnataka',
    riskLevel: 'Low',
    historicalDemand: [
      { month: 'Apr', score: 65, price: 22 },
      { month: 'May', score: 70, price: 25 },
      { month: 'Jun', score: 82, price: 30 },
      { month: 'Jul', score: 88, price: 35 },
      { month: 'Aug', score: 91, price: 38 }
    ]
  },
  {
    id: 'dem_2',
    cropName: 'Nashik Red Onion',
    category: 'Vegetables',
    demandScore: 84,
    currentPricePerKg: 28,
    priceChangePercent: 8.4,
    forecastTrend: 'High Growth',
    season: 'Rabi',
    recommendedRegion: 'Nashik, Ahmednagar, Solapur',
    riskLevel: 'Low',
    historicalDemand: [
      { month: 'Apr', score: 60, price: 18 },
      { month: 'May', score: 68, price: 20 },
      { month: 'Jun', score: 75, price: 24 },
      { month: 'Jul', score: 80, price: 26 },
      { month: 'Aug', score: 84, price: 28 }
    ]
  },
  {
    id: 'dem_3',
    cropName: 'Pomegranate (Bhagwa)',
    category: 'Fruits',
    demandScore: 78,
    currentPricePerKg: 110,
    priceChangePercent: 5.2,
    forecastTrend: 'Stable',
    season: 'All Season',
    recommendedRegion: 'Solapur, Sangli, Osmanabad',
    riskLevel: 'Medium',
    historicalDemand: [
      { month: 'Apr', score: 72, price: 95 },
      { month: 'May', score: 74, price: 100 },
      { month: 'Jun', score: 76, price: 105 },
      { month: 'Jul', score: 77, price: 108 },
      { month: 'Aug', score: 78, price: 110 }
    ]
  },
  {
    id: 'dem_4',
    cropName: 'Green Chilli (G4)',
    category: 'Vegetables',
    demandScore: 68,
    currentPricePerKg: 45,
    priceChangePercent: -2.1,
    forecastTrend: 'Moderate',
    season: 'Kharif',
    recommendedRegion: 'Nandurbar, Jalgaon',
    riskLevel: 'Medium',
    historicalDemand: [
      { month: 'Apr', score: 75, price: 50 },
      { month: 'May', score: 72, price: 48 },
      { month: 'Jun', score: 70, price: 47 },
      { month: 'Jul', score: 69, price: 46 },
      { month: 'Aug', score: 68, price: 45 }
    ]
  }
];

export const SEED_PRODUCE: ProduceListing[] = [
  {
    id: 'prod_1',
    cropName: 'Organic Vine Tomatoes',
    category: 'Vegetables',
    quantityKg: 2500,
    pricePerKg: 36,
    location: 'Baramati, Pune',
    harvestDate: '2026-08-24',
    farmerId: 'usr_1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98765 43210',
    quality: 'Grade A Premium',
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'],
    status: 'available',
    description: 'Freshly harvested firm red tomatoes grown with organic neem cake and drip fertigation.'
  },
  {
    id: 'prod_2',
    cropName: 'Export Quality Bhagwa Pomegranates',
    category: 'Fruits',
    quantityKg: 1800,
    pricePerKg: 115,
    location: 'Sangola, Solapur',
    harvestDate: '2026-08-20',
    farmerId: 'usr_1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98765 43210',
    quality: 'Organic Certified',
    images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80'],
    status: 'available',
    description: 'Deep crimson arils, average weight 300g+ per fruit. Zero pesticide residue test passed.'
  }
];

export const SEED_STORAGES: StorageFacility[] = [
  {
    id: 'store_1',
    name: 'Kisan Cold Logistics & Preservation Center',
    type: 'Cold Storage',
    location: 'MIDC Phase 2, Baramati',
    capacityTons: 1200,
    availableTons: 450,
    pricePerTonMonth: 1800,
    distanceKm: 8.5,
    phone: '+91 98222 11000',
    rating: 4.8,
    latitude: 18.1600,
    longitude: 74.5800
  },
  {
    id: 'store_2',
    name: 'AgriSafe Multi-Commodity Warehouse',
    type: 'Warehouse',
    location: 'Hadapsar Hub, Pune',
    capacityTons: 3500,
    availableTons: 1100,
    pricePerTonMonth: 1100,
    distanceKm: 24.0,
    phone: '+91 98333 44555',
    rating: 4.6,
    latitude: 18.5000,
    longitude: 73.9400
  }
];

export const SEED_SCHEMES: GovScheme[] = [
  {
    id: 'sch_1',
    title: '₹1 Pradhan Mantri Fasal Bima Yojana (Crop Insurance Enrollment)',
    category: 'Insurance',
    targetGroup: 'All Farmers (Small, Marginal & Commercial)',
    benefits: 'Comprehensive crop loss coverage against drought, flood, pests for token cost of just ₹1 enrollment premium fee.',
    eligibility: [
      'Farmer cultivating notified crop in notified district area',
      'Valid 7/12 land extract or registered tenancy lease agreement',
      'Aadhaar seeded bank account'
    ],
    requiredDocs: ['Aadhaar Card', '7/12 Land Document or Lease Certificate', 'Bank Passbook Copy', 'Sowing Certificate'],
    applicationProcess: 'Fill the guided online form below or visit nearest Common Service Center (CSC) with document copies.',
    officialSource: 'pmfby.gov.in',
    is1RupeeScheme: true
  },
  {
    id: 'sch_2',
    title: 'PM-KISAN Samman Nidhi (Direct Benefit Transfer)',
    category: 'Credit',
    targetGroup: 'Small and Marginal Landholding Farmers',
    benefits: 'Financial benefit of ₹6,000 per year transferred directly into bank accounts in 3 equal installments.',
    eligibility: [
      'Landholding farmer families with cultivable land',
      'Excludes institutional landholders and high income taxpayers'
    ],
    requiredDocs: ['Aadhaar Card', 'Land Ownership Records', 'Bank Account details'],
    applicationProcess: 'Register on PM-KISAN portal or via Krushi Connect ₹1 scheme wizard.',
    officialSource: 'pmkisan.gov.in',
    is1RupeeScheme: false
  },
  {
    id: 'sch_3',
    title: 'Soil Health Card Scheme & Nutrient Advisory',
    category: 'Soil & Water',
    targetGroup: 'All Indian Farmers',
    benefits: 'Free comprehensive 12-parameter soil testing report with crop-wise nutrient management recommendation.',
    eligibility: ['Open to all farm owners and lease cultivators.'],
    requiredDocs: ['Soil sample coordinates', 'Farmer ID card'],
    applicationProcess: 'Request soil sample collection from nearest Krushi Bhavan or via Krushi Connect dashboard.',
    officialSource: 'soilhealth.dac.gov.in',
    is1RupeeScheme: false
  }
];

export const SEED_SCHEME_APPLICATIONS: SchemeApplication[] = [
  {
    id: 'sch_app_1',
    schemeId: 'sch_1',
    schemeTitle: '₹1 Pradhan Mantri Fasal Bima Yojana',
    farmerId: 'usr_1',
    farmerName: 'Ramesh Kumar',
    status: 'Approved',
    submittedDate: '2026-07-15',
    referenceNo: 'PMFBY-MH-2026-98124'
  }
];

export const SEED_FARMS: FarmZone[] = [
  {
    id: 'farm_1',
    farmName: 'Baramati Green Sector Alpha',
    acreage: 4.5,
    crop: 'Tomato (Red Gold)',
    soilMoisture: 42,
    soilpH: 6.8,
    nitrogenN: 140,
    phosphorusP: 35,
    potassiumK: 210,
    irrigationStatus: 'Optimal',
    healthScore: 92,
    weatherForecast: 'Partly Cloudy, light shower expected tomorrow evening.',
    tempC: 28,
    rainProbability: 25
  },
  {
    id: 'farm_2',
    farmName: 'Nashik Riverbed Orchard Beta',
    acreage: 6.0,
    crop: 'Pomegranate (Bhagwa)',
    soilMoisture: 31,
    soilpH: 7.2,
    nitrogenN: 110,
    phosphorusP: 28,
    potassiumK: 185,
    irrigationStatus: 'Requires Water',
    healthScore: 84,
    weatherForecast: 'Sunny and dry, temperature rising to 32°C.',
    tempC: 31,
    rainProbability: 10
  }
];

export const SEED_TASKS: CultivationTask[] = [
  {
    id: 'task_1',
    farmId: 'farm_2',
    farmName: 'Nashik Riverbed Orchard Beta',
    title: 'Run Drip Irrigation for 2 Hours (Zone 2)',
    type: 'Irrigation',
    dueDate: '2026-08-25',
    status: 'Pending',
    priority: 'High'
  },
  {
    id: 'task_2',
    farmId: 'farm_1',
    farmName: 'Baramati Green Sector Alpha',
    title: 'Apply Micronutrient Spray (Zinc & Boron)',
    type: 'Fertilization',
    dueDate: '2026-08-26',
    status: 'Pending',
    priority: 'Medium'
  },
  {
    id: 'task_3',
    farmId: 'farm_1',
    farmName: 'Baramati Green Sector Alpha',
    title: 'Pest Scoute for Leaf Miner activity',
    type: 'Pest Inspection',
    dueDate: '2026-08-23',
    status: 'Completed',
    priority: 'High'
  }
];

export const SEED_ALERTS: FarmAlert[] = [
  {
    id: 'alt_1',
    farmId: 'farm_2',
    farmName: 'Nashik Riverbed Orchard Beta',
    type: 'irrigation',
    title: 'Soil Moisture Warning',
    message: 'Moisture level dropped to 31%. Scheduled irrigation recommended today.',
    severity: 'warning',
    timestamp: '10 mins ago'
  },
  {
    id: 'alt_2',
    farmId: 'farm_1',
    farmName: 'Baramati Green Sector Alpha',
    type: 'weather',
    title: 'Rain Forecast Alert',
    message: '25% chance of light showers in next 24 hours. Hold pesticide application.',
    severity: 'info',
    timestamp: '2 hours ago'
  }
];

export const SEED_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    senderId: 'usr_2',
    senderName: 'Suresh Patil (Landowner)',
    receiverId: 'usr_1',
    receiverName: 'Ramesh Kumar (Farmer)',
    content: 'Namaste Ramesh ji! I received your lease request for the Mahabaleshwar plot. When can we discuss contract terms?',
    timestamp: 'Today, 11:30 AM',
    read: false
  },
  {
    id: 'msg_2',
    senderId: 'usr_4',
    senderName: 'FreshBazar Mart (Buyer)',
    receiverId: 'usr_1',
    receiverName: 'Ramesh Kumar (Farmer)',
    content: 'Hello! We are interested in purchasing 2 Tons of your Organic Vine Tomatoes. Can you deliver to Pune warehouse?',
    timestamp: 'Yesterday, 4:15 PM',
    read: true
  }
];

export const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    userId: 'usr_1',
    title: 'New Lease Update',
    message: 'Landowner Suresh Patil acknowledged your request for Highland Terrace Plot.',
    type: 'lease',
    link: '/land-leasing',
    timestamp: '15 mins ago',
    read: false
  },
  {
    id: 'notif_2',
    userId: 'usr_1',
    title: 'Worker Application Received',
    message: 'Anil Deshmukh applied for Tomato Harvest job position.',
    type: 'labour',
    link: '/labour-community',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'notif_3',
    userId: 'usr_1',
    title: 'Market Demand Surge Alert 📈',
    message: 'Red Gold Tomatoes demand score increased to 91% (+12.5% price bump).',
    type: 'market',
    link: '/crop-demand',
    timestamp: '3 hours ago',
    read: true
  }
];
