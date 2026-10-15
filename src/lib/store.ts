'use client';

import { useState, useEffect } from 'react';
import {
  User, UserRole, LandListing, LeaseRequest, WorkerProfile, LabourJob, LabourApplication,
  CropDemand, ProduceListing, StorageFacility, GovScheme, SchemeApplication,
  FarmZone, CultivationTask, FarmAlert, AppNotification, Message, CropRecommendationInput, CropRecommendationOutput
} from './types';
import {
  SEED_USERS, SEED_LANDS, SEED_LEASES, SEED_WORKERS, SEED_JOBS, SEED_JOB_APPLICATIONS,
  SEED_CROP_DEMANDS, SEED_PRODUCE, SEED_STORAGES, SEED_SCHEMES, SEED_SCHEME_APPLICATIONS,
  SEED_FARMS, SEED_TASKS, SEED_ALERTS, SEED_NOTIFICATIONS, SEED_MESSAGES
} from './seed-data';

// Key for LocalStorage persistence
const STORAGE_KEY = 'krushi_connect_store_v1';

interface AppStoreState {
  currentUser: User;
  users: User[];
  lands: LandListing[];
  leases: LeaseRequest[];
  workers: WorkerProfile[];
  jobs: LabourJob[];
  applications: LabourApplication[];
  cropDemands: CropDemand[];
  produce: ProduceListing[];
  storages: StorageFacility[];
  schemes: GovScheme[];
  schemeApplications: SchemeApplication[];
  farms: FarmZone[];
  tasks: CultivationTask[];
  alerts: FarmAlert[];
  notifications: AppNotification[];
  messages: Message[];
}

const initialStore: AppStoreState = {
  currentUser: SEED_USERS[0],
  users: SEED_USERS,
  lands: SEED_LANDS,
  leases: SEED_LEASES,
  workers: SEED_WORKERS,
  jobs: SEED_JOBS,
  applications: SEED_JOB_APPLICATIONS,
  cropDemands: SEED_CROP_DEMANDS,
  produce: SEED_PRODUCE,
  storages: SEED_STORAGES,
  schemes: SEED_SCHEMES,
  schemeApplications: SEED_SCHEME_APPLICATIONS,
  farms: SEED_FARMS,
  tasks: SEED_TASKS,
  alerts: SEED_ALERTS,
  notifications: SEED_NOTIFICATIONS,
  messages: SEED_MESSAGES,
};

export function getInitialState(): AppStoreState {
  if (typeof window === 'undefined') return initialStore;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialStore, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load local state', e);
  }
  return initialStore;
}

export function saveState(state: AppStoreState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to persist local state', e);
  }
}

// Recommendation Engine Logic
export function calculateCropRecommendation(input: CropRecommendationInput): CropRecommendationOutput {
  const { soilType, waterAvailability, season, landSizeAcres } = input;
  
  if (soilType === 'Black Soil' && waterAvailability === 'Drip Irrigation') {
    return {
      recommendedCrop: 'Tomato (Red Gold - Hy-Veg)',
      demandScore: 94,
      expectedYieldTons: Math.round(landSizeAcres * 18),
      expectedPriceRange: '₹34 - ₹42 / kg',
      estimatedRevenue: Math.round(landSizeAcres * 18 * 36000),
      riskLevel: 'Low',
      suggestedPlantingPeriod: 'Late September - Early October',
      rationale: 'High market demand score (94%). Black soil rich in nitrogen and organic matter with drip irrigation maximizes fruit size and yields up to 18 Tons/acre.'
    };
  } else if (soilType === 'Red Soil' || season === 'Kharif') {
    return {
      recommendedCrop: 'Green Chilli & Bell Pepper',
      demandScore: 82,
      expectedYieldTons: Math.round(landSizeAcres * 8),
      expectedPriceRange: '₹40 - ₹55 / kg',
      estimatedRevenue: Math.round(landSizeAcres * 8 * 45000),
      riskLevel: 'Medium',
      suggestedPlantingPeriod: 'Early Kharif Season (June - July)',
      rationale: 'Red soil well-drained aeration promotes healthy root system for capsicum and green chilli with high price per kg stability.'
    };
  } else {
    return {
      recommendedCrop: 'Export Quality Red Onion (Bhagwat)',
      demandScore: 88,
      expectedYieldTons: Math.round(landSizeAcres * 12),
      expectedPriceRange: '₹26 - ₹34 / kg',
      estimatedRevenue: Math.round(landSizeAcres * 12 * 28000),
      riskLevel: 'Low',
      suggestedPlantingPeriod: 'Rabi Season (November)',
      rationale: 'Alluvial and clay loam soils support bulb expansion. Excellent storage shelf-life allows flexible market release.'
    };
  }
}
