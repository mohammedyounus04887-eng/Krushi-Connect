'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User, UserRole, LandListing, LeaseRequest, WorkerProfile, LabourJob, LabourApplication,
  CropDemand, ProduceListing, StorageFacility, GovScheme, SchemeApplication,
  FarmZone, CultivationTask, FarmAlert, AppNotification, Message
} from './types';
import { getInitialState, saveState } from './store';
import { SEED_USERS } from './seed-data';

interface AppContextType {
  currentUser: User;
  users: User[];
  switchUserRole: (role: UserRole) => void;
  
  // Land Leasing
  lands: LandListing[];
  leases: LeaseRequest[];
  addLand: (land: Omit<LandListing, 'id' | 'createdDate' | 'status' | 'ownerId' | 'ownerName' | 'ownerPhone' | 'ownerRating'>) => void;
  requestLease: (landId: string, proposedRent: number, durationYears: number, message: string) => void;
  updateLeaseStatus: (leaseId: string, status: LeaseRequest['status']) => void;

  // Labour Community
  workers: WorkerProfile[];
  jobs: LabourJob[];
  applications: LabourApplication[];
  addWorkerProfile: (profile: Omit<WorkerProfile, 'id' | 'completedJobs' | 'verified'>) => void;
  postJob: (job: Omit<LabourJob, 'id' | 'farmerId' | 'farmerName' | 'farmerPhone' | 'status' | 'postedDate' | 'applicantsCount' | 'workersHired'>) => void;
  applyJob: (jobId: string, experienceSummary: string) => void;
  updateApplicationStatus: (applicationId: string, status: LabourApplication['status']) => void;

  // Crop Intelligence
  cropDemands: CropDemand[];

  // Crop Market
  produce: ProduceListing[];
  storages: StorageFacility[];
  addProduceListing: (item: Omit<ProduceListing, 'id' | 'farmerId' | 'farmerName' | 'farmerPhone' | 'status'>) => void;

  // Schemes
  schemes: GovScheme[];
  schemeApplications: SchemeApplication[];
  applyScheme: (schemeId: string) => void;

  // Precision & Monitoring
  farms: FarmZone[];
  tasks: CultivationTask[];
  alerts: FarmAlert[];
  addFarm: (farm: Omit<FarmZone, 'id'>) => void;
  addTask: (task: Omit<CultivationTask, 'id' | 'status'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;

  // Messaging & Notifications
  notifications: AppNotification[];
  messages: Message[];
  markNotificationRead: (notifId: string) => void;
  sendMessage: (receiverId: string, receiverName: string, content: string) => void;

  // Admin Actions
  deleteLand: (landId: string) => void;
  deleteJob: (jobId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(() => getInitialState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const switchUserRole = (role: UserRole) => {
    const target = state.users.find(u => u.role === role) || {
      ...SEED_USERS[0],
      role,
      name: `${role.toUpperCase()} Demo User`
    };
    setState(prev => ({ ...prev, currentUser: target }));
  };

  // Land Leasing
  const addLand = (newLandData: Omit<LandListing, 'id' | 'createdDate' | 'status' | 'ownerId' | 'ownerName' | 'ownerPhone' | 'ownerRating'>) => {
    const newLand: LandListing = {
      ...newLandData,
      id: `land_${Date.now()}`,
      ownerId: state.currentUser.id,
      ownerName: state.currentUser.name,
      ownerPhone: state.currentUser.phone,
      ownerRating: 5.0,
      status: 'available',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setState(prev => ({
      ...prev,
      lands: [newLand, ...prev.lands],
      notifications: [
        {
          id: `notif_${Date.now()}`,
          userId: state.currentUser.id,
          title: 'Land Listed Successfully',
          message: `Your land "${newLand.title}" is now active in the Land Leasing marketplace.`,
          type: 'lease',
          link: '/land-leasing',
          timestamp: 'Just now',
          read: false
        },
        ...prev.notifications
      ]
    }));
  };

  const requestLease = (landId: string, proposedRent: number, durationYears: number, message: string) => {
    const land = state.lands.find(l => l.id === landId);
    if (!land) return;

    const newLease: LeaseRequest = {
      id: `lease_${Date.now()}`,
      landId,
      landTitle: land.title,
      landLocation: land.location,
      farmerId: state.currentUser.id,
      farmerName: state.currentUser.name,
      farmerPhone: state.currentUser.phone,
      proposedRent,
      durationYears,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      message
    };

    setState(prev => ({
      ...prev,
      leases: [newLease, ...prev.leases],
      notifications: [
        {
          id: `notif_${Date.now()}`,
          userId: land.ownerId,
          title: 'New Lease Request Received!',
          message: `${state.currentUser.name} requested to lease "${land.title}" for ₹${proposedRent.toLocaleString()}/yr.`,
          type: 'lease',
          link: '/land-leasing',
          timestamp: 'Just now',
          read: false
        },
        ...prev.notifications
      ]
    }));
  };

  const updateLeaseStatus = (leaseId: string, status: LeaseRequest['status']) => {
    setState(prev => {
      const updatedLeases = prev.leases.map(l => l.id === leaseId ? { ...l, status } : l);
      const targetLease = prev.leases.find(l => l.id === leaseId);
      
      let updatedLands = prev.lands;
      if (targetLease && status === 'accepted') {
        updatedLands = prev.lands.map(land => land.id === targetLease.landId ? { ...land, status: 'leased' } : land);
      }

      return {
        ...prev,
        leases: updatedLeases,
        lands: updatedLands
      };
    });
  };

  // Labour Community
  const addWorkerProfile = (data: Omit<WorkerProfile, 'id' | 'completedJobs' | 'verified'>) => {
    const newWorker: WorkerProfile = {
      ...data,
      id: `wrk_${Date.now()}`,
      completedJobs: 0,
      verified: true
    };
    setState(prev => ({
      ...prev,
      workers: [newWorker, ...prev.workers]
    }));
  };

  const postJob = (jobData: Omit<LabourJob, 'id' | 'farmerId' | 'farmerName' | 'farmerPhone' | 'status' | 'postedDate' | 'applicantsCount' | 'workersHired'>) => {
    const newJob: LabourJob = {
      ...jobData,
      id: `job_${Date.now()}`,
      farmerId: state.currentUser.id,
      farmerName: state.currentUser.name,
      farmerPhone: state.currentUser.phone,
      status: 'open',
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      workersHired: 0
    };
    setState(prev => ({
      ...prev,
      jobs: [newJob, ...prev.jobs]
    }));
  };

  const applyJob = (jobId: string, experienceSummary: string) => {
    const job = state.jobs.find(j => j.id === jobId);
    if (!job) return;

    const newApp: LabourApplication = {
      id: `app_${Date.now()}`,
      jobId,
      jobTitle: job.title,
      workerId: state.currentUser.id,
      workerName: state.currentUser.name,
      workerPhone: state.currentUser.phone,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
      experienceSummary
    };

    setState(prev => ({
      ...prev,
      applications: [newApp, ...prev.applications],
      jobs: prev.jobs.map(j => j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j),
      notifications: [
        {
          id: `notif_${Date.now()}`,
          userId: job.farmerId,
          title: 'Worker Job Application Received',
          message: `${state.currentUser.name} applied for "${job.title}".`,
          type: 'labour',
          link: '/labour-community',
          timestamp: 'Just now',
          read: false
        },
        ...prev.notifications
      ]
    }));
  };

  const updateApplicationStatus = (applicationId: string, status: LabourApplication['status']) => {
    setState(prev => {
      const updated = prev.applications.map(a => a.id === applicationId ? { ...a, status } : a);
      const app = prev.applications.find(a => a.id === applicationId);
      let updatedJobs = prev.jobs;
      if (app && status === 'accepted') {
        updatedJobs = prev.jobs.map(j => j.id === app.jobId ? { ...j, workersHired: j.workersHired + 1 } : j);
      }
      return {
        ...prev,
        applications: updated,
        jobs: updatedJobs
      };
    });
  };

  // Crop Market
  const addProduceListing = (itemData: Omit<ProduceListing, 'id' | 'farmerId' | 'farmerName' | 'farmerPhone' | 'status'>) => {
    const newItem: ProduceListing = {
      ...itemData,
      id: `prod_${Date.now()}`,
      farmerId: state.currentUser.id,
      farmerName: state.currentUser.name,
      farmerPhone: state.currentUser.phone,
      status: 'available'
    };
    setState(prev => ({
      ...prev,
      produce: [newItem, ...prev.produce]
    }));
  };

  // Schemes
  const applyScheme = (schemeId: string) => {
    const scheme = state.schemes.find(s => s.id === schemeId);
    if (!scheme) return;

    const newApp: SchemeApplication = {
      id: `sch_app_${Date.now()}`,
      schemeId,
      schemeTitle: scheme.title,
      farmerId: state.currentUser.id,
      farmerName: state.currentUser.name,
      status: 'Under Review',
      submittedDate: new Date().toISOString().split('T')[0],
      referenceNo: `PMFBY-MH-2026-${Math.floor(10000 + Math.random() * 90000)}`
    };

    setState(prev => ({
      ...prev,
      schemeApplications: [newApp, ...prev.schemeApplications],
      notifications: [
        {
          id: `notif_${Date.now()}`,
          userId: state.currentUser.id,
          title: 'Scheme Application Submitted',
          message: `Your guidance application for ${scheme.title} was submitted. Ref No: ${newApp.referenceNo}`,
          type: 'scheme',
          link: '/schemes',
          timestamp: 'Just now',
          read: false
        },
        ...prev.notifications
      ]
    }));
  };

  // Precision & Monitoring
  const addFarm = (farmData: Omit<FarmZone, 'id'>) => {
    const newFarm: FarmZone = {
      ...farmData,
      id: `farm_${Date.now()}`
    };
    setState(prev => ({
      ...prev,
      farms: [...prev.farms, newFarm]
    }));
  };

  const addTask = (taskData: Omit<CultivationTask, 'id' | 'status'>) => {
    const newTask: CultivationTask = {
      ...taskData,
      id: `task_${Date.now()}`,
      status: 'Pending'
    };
    setState(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));
  };

  const toggleTask = (taskId: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === taskId ? {
        ...t,
        status: t.status === 'Completed' ? 'Pending' : 'Completed'
      } : t)
    }));
  };

  const deleteTask = (taskId: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId)
    }));
  };

  // Messaging & Notifications
  const markNotificationRead = (notifId: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === notifId ? { ...n, read: true } : n)
    }));
  };

  const sendMessage = (receiverId: string, receiverName: string, content: string) => {
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: state.currentUser.id,
      senderName: state.currentUser.name,
      receiverId,
      receiverName,
      content,
      timestamp: 'Just now',
      read: false
    };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
  };

  // Admin actions
  const deleteLand = (landId: string) => {
    setState(prev => ({
      ...prev,
      lands: prev.lands.filter(l => l.id !== landId)
    }));
  };

  const deleteJob = (jobId: string) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.filter(j => j.id !== jobId)
    }));
  };

  return (
    <AppContext.Provider value={{
      currentUser: state.currentUser,
      users: state.users,
      switchUserRole,
      lands: state.lands,
      leases: state.leases,
      addLand,
      requestLease,
      updateLeaseStatus,
      workers: state.workers,
      jobs: state.jobs,
      applications: state.applications,
      addWorkerProfile,
      postJob,
      applyJob,
      updateApplicationStatus,
      cropDemands: state.cropDemands,
      produce: state.produce,
      storages: state.storages,
      addProduceListing,
      schemes: state.schemes,
      schemeApplications: state.schemeApplications,
      applyScheme,
      farms: state.farms,
      tasks: state.tasks,
      alerts: state.alerts,
      addFarm,
      addTask,
      toggleTask,
      deleteTask,
      notifications: state.notifications,
      messages: state.messages,
      markNotificationRead,
      sendMessage,
      deleteLand,
      deleteJob
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
