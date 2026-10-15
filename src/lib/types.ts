export type UserRole = 'farmer' | 'landowner' | 'worker' | 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  location: string;
  avatar: string;
  rating?: number;
  bio?: string;
  joinedDate: string;
}

export interface LandListing {
  id: string;
  title: string;
  location: string;
  district: string;
  state: string;
  sizeAcres: number;
  soilType: 'Black Soil' | 'Red Soil' | 'Alluvial Soil' | 'Clay' | 'Sandy Loam';
  waterSource: 'Borewell' | 'Canal' | 'River' | 'Rainfed' | 'Drip Irrigation';
  cropSuitability: string[];
  rentPerYear: number;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerRating: number;
  images: string[];
  status: 'available' | 'leased' | 'pending';
  latitude: number;
  longitude: number;
  description: string;
  createdDate: string;
}

export interface LeaseRequest {
  id: string;
  landId: string;
  landTitle: string;
  landLocation: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  proposedRent: number;
  durationYears: number;
  status: 'pending' | 'accepted' | 'rejected' | 'active' | 'completed';
  requestDate: string;
  message: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  skills: string[];
  experienceYears: number;
  location: string;
  availability: 'Immediate' | 'Next Week' | 'Seasonal' | 'Part Time';
  dailyRate: number;
  rating: number;
  phone: string;
  avatar: string;
  completedJobs: number;
  verified: boolean;
}

export interface LabourJob {
  id: string;
  title: string;
  crop: string;
  workType: 'Tillage' | 'Sowing' | 'Transplanting' | 'Plant Protection' | 'Harvesting' | 'Weeding';
  workersNeeded: number;
  workersHired: number;
  requiredDate: string;
  durationDays: number;
  location: string;
  budgetPerDay: number;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  postedDate: string;
  applicantsCount: number;
}

export interface LabourApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  workerId: string;
  workerName: string;
  workerPhone: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: string;
  experienceSummary: string;
}

export interface CropDemand {
  id: string;
  cropName: string;
  category: 'Vegetables' | 'Fruits' | 'Grains' | 'Pulses' | 'Oilseeds';
  demandScore: number; // 0-100
  currentPricePerKg: number;
  priceChangePercent: number; // e.g. +8.4
  forecastTrend: 'High Growth' | 'Stable' | 'Moderate' | 'High Risk';
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'All Season';
  recommendedRegion: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  historicalDemand: { month: string; score: number; price: number }[];
}

export interface CropRecommendationInput {
  location: string;
  landSizeAcres: number;
  soilType: string;
  waterAvailability: string;
  season: string;
}

export interface CropRecommendationOutput {
  recommendedCrop: string;
  demandScore: number;
  expectedYieldTons: number;
  expectedPriceRange: string;
  estimatedRevenue: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  suggestedPlantingPeriod: string;
  rationale: string;
}

export interface ProduceListing {
  id: string;
  cropName: string;
  category: 'Vegetables' | 'Fruits' | 'Grains';
  quantityKg: number;
  pricePerKg: number;
  location: string;
  harvestDate: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  quality: 'Grade A Premium' | 'Grade B Standard' | 'Organic Certified';
  images: string[];
  status: 'available' | 'sold' | 'reserved';
  description: string;
}

export interface StorageFacility {
  id: string;
  name: string;
  type: 'Cold Storage' | 'Warehouse' | 'Collection Center';
  location: string;
  capacityTons: number;
  availableTons: number;
  pricePerTonMonth: number;
  distanceKm: number;
  phone: string;
  rating: number;
  latitude: number;
  longitude: number;
}

export interface GovScheme {
  id: string;
  title: string;
  category: 'Insurance' | 'Subsidy' | 'Credit' | 'Equipment' | 'Soil & Water';
  targetGroup: string;
  benefits: string;
  eligibility: string[];
  requiredDocs: string[];
  applicationProcess: string;
  officialSource: string;
  is1RupeeScheme: boolean;
}

export interface SchemeApplication {
  id: string;
  schemeId: string;
  schemeTitle: string;
  farmerId: string;
  farmerName: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Disbursed';
  submittedDate: string;
  referenceNo: string;
}

export interface FarmZone {
  id: string;
  farmName: string;
  acreage: number;
  crop: string;
  soilMoisture: number; // %
  soilpH: number;
  nitrogenN: number; // kg/ha
  phosphorusP: number; // kg/ha
  potassiumK: number; // kg/ha
  irrigationStatus: 'Optimal' | 'Requires Water' | 'Over-irrigated';
  healthScore: number; // 0-100
  weatherForecast: string;
  tempC: number;
  rainProbability: number; // %
}

export interface CultivationTask {
  id: string;
  farmId: string;
  farmName: string;
  title: string;
  type: 'Irrigation' | 'Fertilization' | 'Pest Inspection' | 'Weed Control' | 'Harvesting';
  dueDate: string;
  status: 'Pending' | 'Completed' | 'In Progress';
  priority: 'High' | 'Medium' | 'Low';
}

export interface FarmAlert {
  id: string;
  farmId: string;
  farmName: string;
  type: 'pest' | 'irrigation' | 'weather' | 'fertilizer';
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'lease' | 'labour' | 'market' | 'farm' | 'scheme';
  link?: string;
  timestamp: string;
  read: boolean;
}
