'use client';

import React, { useState } from 'react';
import ModuleSidebar from '@/components/ui/ModuleSidebar';
import {
  Users, UserCheck, PlusCircle, Search, Star, Phone, Briefcase,
  Calendar, CheckCircle, X, MapPin, Award, Clock
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { WorkerProfile, LabourJob } from '@/lib/types';

export default function LabourCommunityPage() {
  const { currentUser, workers, jobs, applications, postJob, applyJob, updateApplicationStatus, addWorkerProfile } = useApp();

  const [activeTab, setActiveTab] = useState('find_workers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');

  // Post Job modal state
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    crop: 'Tomato',
    workType: 'Harvesting' as const,
    workersNeeded: 4,
    requiredDate: '2026-08-30',
    durationDays: 3,
    location: 'Baramati, Pune',
    budgetPerDay: 600,
    description: ''
  });

  // Apply modal state
  const [selectedJob, setSelectedJob] = useState<LabourJob | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [expSummary, setExpSummary] = useState('');

  // Create worker profile modal state
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: currentUser.name,
    skills: ['Tractor Driving', 'Pesticide Spraying'],
    experienceYears: 5,
    location: currentUser.location || 'Pune, Maharashtra',
    availability: 'Immediate' as const,
    dailyRate: 600,
    rating: 4.9,
    phone: currentUser.phone || '+91 98765 00000',
    avatar: currentUser.avatar
  });

  const sidebarItems = [
    { name: 'Find Skilled Workers', tabId: 'find_workers', icon: Users, badge: `${workers.length}` },
    { name: 'Labour Requirements (Jobs)', tabId: 'jobs', icon: Briefcase, badge: `${jobs.length}` },
    { name: 'Worker Applications', tabId: 'applications', icon: UserCheck, badge: `${applications.length}` },
    { name: 'Create Worker Profile', tabId: 'create_profile', icon: Star }
  ];

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'All' || w.skills.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()));
    return matchesSearch && matchesSkill;
  });

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title) return;
    postJob(newJob);
    setPostModalOpen(false);
    setNewJob({
      title: '',
      crop: 'Tomato',
      workType: 'Harvesting',
      workersNeeded: 4,
      requiredDate: '2026-08-30',
      durationDays: 3,
      location: 'Baramati, Pune',
      budgetPerDay: 600,
      description: ''
    });
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    applyJob(selectedJob.id, expSummary);
    setApplyModalOpen(false);
    setSelectedJob(null);
    setExpSummary('');
  };

  const handleCreateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkerProfile(newWorker);
    setProfileModalOpen(false);
    setActiveTab('find_workers');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-2">
      
      {/* Sub-App Sidebar */}
      <ModuleSidebar
        moduleTitle="Labour Community"
        moduleSubtitle="Workforce Network"
        moduleIcon={Users}
        moduleColor="text-amber-400"
        items={sidebarItems}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Sub-App Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-agri-300 bg-white/95 text-agri-950 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-agri-950 flex items-center gap-2">
              👨‍🌾 Agricultural Labour Community
            </h1>
            <p className="text-xs text-agri-700 font-medium mt-0.5">
              Hire verified agricultural specialists or find field labor job opportunities.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPostModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-agri-950 font-black text-xs hover:bg-amber-300 transition-all flex items-center space-x-1.5 shrink-0 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-agri-950" />
              <span>+ Post Job Requirement</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FIND SKILLED WORKERS */}
        {activeTab === 'find_workers' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-agri-300 bg-white/95 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-agri-950">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-agri-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search worker name or location..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-agri-300 rounded-xl pl-10 pr-4 py-2 text-xs text-agri-950 font-medium focus:outline-none focus:border-agri-600 focus:ring-2 focus:ring-amber-300/40"
                />
              </div>

              <select
                value={selectedSkill}
                onChange={e => setSelectedSkill(e.target.value)}
                className="bg-white border border-agri-300 rounded-xl px-3 py-2 text-xs text-agri-950 font-bold focus:outline-none focus:border-agri-600"
              >
                <option value="All">All Skill Specializations</option>
                <option value="Tractor">Tractor Driving & Tillage</option>
                <option value="Spraying">Plant Protection / Spraying</option>
                <option value="Transplanting">Transplanting</option>
                <option value="Harvest">Harvesting & Packing</option>
              </select>
            </div>

            {/* Workers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredWorkers.map(w => (
                <div key={w.id} className="bg-white/95 p-5 rounded-3xl border border-agri-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-4 shadow-sm text-agri-950">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-amber-300 bg-amber-50 shrink-0 shadow-sm">
                        <img src={w.avatar} alt={w.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h3 className="font-black text-agri-950 text-base">{w.name}</h3>
                          {w.verified && <Award className="w-4 h-4 text-amber-500" />}
                        </div>
                        <p className="text-xs text-agri-700 font-medium flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-agri-600" /> {w.location}
                        </p>
                        <p className="text-[11px] text-amber-700 font-extrabold flex items-center gap-1 mt-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {w.rating} Rating ({w.completedJobs} Jobs Done)
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-black text-amber-600">₹{w.dailyRate}</p>
                      <p className="text-[10px] text-agri-700 uppercase font-mono font-bold">Per Day</p>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {w.skills.map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-agri-100 text-agri-900 border border-agri-300 text-[10px] font-bold">
                        ⚡ {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-agri-200 flex items-center justify-between text-xs">
                    <span className="text-agri-700 font-medium">Availability: <strong className="text-agri-950 font-bold">{w.availability}</strong></span>
                    <a
                      href={`tel:${w.phone}`}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-extrabold hover:bg-amber-200 transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-700" /> Call Worker
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: LABOUR REQUIREMENTS (JOBS) */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-agri-950">Active Farm Job Listings</h3>

            <div className="space-y-4">
              {jobs.map(j => (
                <div key={j.id} className="glass-panel p-5 rounded-2xl bg-white border border-agri-200 space-y-3 shadow-sm text-agri-950">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        {j.workType.toUpperCase()}
                      </span>
                      <h4 className="font-black text-agri-950 text-base mt-1">{j.title}</h4>
                      <p className="text-xs text-agri-700 font-medium">Crop: {j.crop} • Location: {j.location}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-black text-amber-600">₹{j.budgetPerDay} / Day</p>
                      <p className="text-xs text-agri-700 font-semibold">{j.workersNeeded} Workers Needed ({j.workersHired} Hired)</p>
                    </div>
                  </div>

                  <p className="text-xs text-agri-900 bg-agri-50 p-3 rounded-xl border border-agri-200 font-medium">{j.description}</p>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-agri-700 font-medium">Required Date: {j.requiredDate} ({j.durationDays} Days)</span>

                    <button
                      onClick={() => {
                        setSelectedJob(j);
                        setApplyModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-agri-600 text-white font-extrabold hover:bg-agri-500 transition-colors shadow-sm"
                    >
                      Apply For Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WORKER APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-agri-950">Received Applications ({applications.length})</h3>

            {applications.length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-3xl bg-white border border-agri-300 shadow-sm">
                <p className="text-agri-700 font-medium text-sm">No active applications received yet.</p>
              </div>
            ) : (
              applications.map(app => (
                <div key={app.id} className="glass-panel p-5 rounded-2xl bg-white border border-agri-200 space-y-3 shadow-sm text-agri-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-agri-950 text-base">{app.jobTitle}</h4>
                      <p className="text-xs text-amber-700 font-bold">Applicant: {app.workerName} ({app.workerPhone})</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-agri-100 text-agri-800 border border-agri-300 capitalize">
                      {app.status}
                    </span>
                  </div>

                  <p className="text-xs text-agri-900 bg-agri-50 p-3 rounded-xl border border-agri-200 font-medium">
                    "{app.experienceSummary}"
                  </p>

                  {app.status === 'pending' && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'accepted')}
                        className="px-4 py-1.5 rounded-xl bg-agri-600 text-white font-bold text-xs hover:bg-agri-500 shadow-sm"
                      >
                        Hire Worker
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'rejected')}
                        className="px-3 py-1.5 rounded-xl bg-red-100 text-red-800 border border-red-300 text-xs font-bold"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: CREATE WORKER PROFILE */}
        {activeTab === 'create_profile' && (
          <div className="glass-panel p-6 rounded-3xl border border-agri-300 bg-white space-y-4 max-w-xl shadow-sm">
            <h3 className="text-lg font-black text-agri-950">Create Your Agri Worker Profile</h3>
            <form onSubmit={handleCreateProfileSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-agri-950 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newWorker.name}
                  onChange={e => setNewWorker({...newWorker, name: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Years Experience</label>
                  <input
                    type="number"
                    value={newWorker.experienceYears}
                    onChange={e => setNewWorker({...newWorker, experienceYears: parseInt(e.target.value) || 1})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Daily Rate (₹/Day)</label>
                  <input
                    type="number"
                    value={newWorker.dailyRate}
                    onChange={e => setNewWorker({...newWorker, dailyRate: parseInt(e.target.value) || 500})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-agri-950 font-bold mb-1">Primary Location</label>
                <input
                  type="text"
                  required
                  value={newWorker.location}
                  onChange={e => setNewWorker({...newWorker, location: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-agri-600 text-white font-extrabold text-xs shadow-sm"
              >
                Save & Publish Profile
              </button>
            </form>
          </div>
        )}

      </div>

      {/* MODAL 1: POST JOB */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 bg-agri-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-2xl text-agri-950">
            <div className="flex items-center justify-between border-b border-agri-200 pb-3">
              <h3 className="text-lg font-black text-agri-950">Post Field Job Requirement</h3>
              <button onClick={() => setPostModalOpen(false)} className="text-agri-600 hover:text-agri-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostJobSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-agri-950 font-bold mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need 4 Workers for Sugarcane Harvesting"
                  value={newJob.title}
                  onChange={e => setNewJob({...newJob, title: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Target Crop</label>
                  <input
                    type="text"
                    required
                    placeholder="Sugarcane, Wheat, Tomato..."
                    value={newJob.crop}
                    onChange={e => setNewJob({...newJob, crop: e.target.value})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Work Type</label>
                  <select
                    value={newJob.workType}
                    onChange={e => setNewJob({...newJob, workType: e.target.value as any})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  >
                    <option value="Harvesting">Harvesting</option>
                    <option value="Tillage">Tillage & Tractor</option>
                    <option value="Transplanting">Transplanting</option>
                    <option value="Sowing">Sowing</option>
                    <option value="Plant Protection">Plant Protection Spraying</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Daily Budget (₹)</label>
                  <input
                    type="number"
                    value={newJob.budgetPerDay}
                    onChange={e => setNewJob({...newJob, budgetPerDay: parseInt(e.target.value) || 500})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Workers Needed</label>
                  <input
                    type="number"
                    value={newJob.workersNeeded}
                    onChange={e => setNewJob({...newJob, workersNeeded: parseInt(e.target.value) || 1})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="Village / Taluka"
                    value={newJob.location}
                    onChange={e => setNewJob({...newJob, location: e.target.value})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-agri-950 font-bold mb-1">Job Description & Timing</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail farm location, tea/meal provisions, working hours..."
                  value={newJob.description}
                  onChange={e => setNewJob({...newJob, description: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-medium focus:border-agri-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-agri-100 text-agri-800 font-bold hover:bg-agri-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-agri-600 text-white font-extrabold hover:bg-agri-500 shadow-sm"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: APPLY FOR JOB */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-agri-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-2xl text-agri-950">
            <div className="flex items-center justify-between border-b border-agri-200 pb-3">
              <h3 className="text-lg font-black text-agri-950">Apply For Job</h3>
              <button onClick={() => setApplyModalOpen(false)} className="text-agri-600 hover:text-agri-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-agri-50 border border-agri-200 text-xs">
              <p className="font-bold text-agri-950">{selectedJob.title}</p>
              <p className="text-amber-700 font-bold">Rate: ₹{selectedJob.budgetPerDay}/day • Location: {selectedJob.location}</p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-agri-950 font-bold mb-1">Your Experience & Availability Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Mention how many team members you have or past experience with this crop..."
                  value={expSummary}
                  onChange={e => setExpSummary(e.target.value)}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-medium focus:border-agri-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-agri-100 text-agri-800 font-bold hover:bg-agri-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-agri-600 text-white font-extrabold hover:bg-agri-500 shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
