'use client';

import React, { useState } from 'react';
import ModuleSidebar from '@/components/ui/ModuleSidebar';
import {
  Activity, CheckCircle, Clock, PlusCircle, Trash2,
  AlertTriangle, Sprout, Calendar, Filter, X
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { CultivationTask } from '@/lib/types';

export default function CultivationMonitoringPage() {
  const { farms, tasks, alerts, addTask, toggleTask, deleteTask } = useApp();
  
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedFarmId, setSelectedFarmId] = useState(farms[0]?.id || 'farm_1');

  // New task modal state
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    farmId: selectedFarmId,
    farmName: farms.find(f => f.id === selectedFarmId)?.farmName || 'Baramati Green Sector Alpha',
    title: '',
    type: 'Irrigation' as const,
    dueDate: '2026-08-30',
    priority: 'High' as const
  });

  const activeFarm = farms.find(f => f.id === selectedFarmId) || farms[0];

  const sidebarItems = [
    { name: 'Crop Growth Timeline', tabId: 'timeline', icon: Sprout, badge: '6 Stages' },
    { name: 'Farm Task Checklist', tabId: 'tasks', icon: CheckCircle, badge: `${tasks.filter(t => t.status === 'Pending').length} Due` },
    { name: 'Pest & Problem Alerts', tabId: 'alerts', icon: AlertTriangle, badge: `${alerts.length}` }
  ];

  const growthStages = [
    { stage: '🌱 Seed Planted', status: 'Completed', date: '2026-06-01' },
    { stage: '🌿 Germination', status: 'Completed', date: '2026-06-12' },
    { stage: '🌾 Vegetative Growth', status: 'Completed', date: '2026-07-05' },
    { stage: '🌼 Flowering', status: 'Completed', date: '2026-07-28' },
    { stage: '🍅 Fruit Development', status: 'In Progress', date: '2026-08-20' },
    { stage: '🧺 Harvest Ready', status: 'Upcoming', date: '2026-09-15' }
  ];

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    addTask(newTask);
    setTaskModalOpen(false);
    setNewTask({
      farmId: selectedFarmId,
      farmName: activeFarm.farmName,
      title: '',
      type: 'Irrigation',
      dueDate: '2026-08-30',
      priority: 'High'
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-2">
      
      {/* Sub-App Sidebar */}
      <ModuleSidebar
        moduleTitle="Cultivation Monitoring"
        moduleSubtitle="Farm Growth Tracking"
        moduleIcon={Activity}
        moduleColor="text-teal-400"
        items={sidebarItems}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Sub-App Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-agri-300 bg-white/95 shadow-sm text-agri-950">
          <div>
            <h1 className="text-2xl font-black text-agri-950 flex items-center gap-2">
              🌱 Cultivation & Crop Stage Monitoring
            </h1>
            <p className="text-xs text-agri-700 font-medium mt-0.5">
              Track multi-stage crop lifecycle, execute daily field task checklists, and receive pest outbreak warnings.
            </p>
          </div>

          <button
            onClick={() => setTaskModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-extrabold text-xs transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center space-x-1.5 shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>+ Create Farm Task</span>
          </button>
        </div>

        {/* TAB 1: CROP GROWTH TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-agri-300 bg-white/95 space-y-6 shadow-sm text-agri-950">
              <div className="flex items-center justify-between border-b border-agri-200 pb-3">
                <div>
                  <span className="text-xs font-black text-agri-700 uppercase font-mono tracking-wider">ACTIVE FARM CROP TIMELINE</span>
                  <h3 className="text-xl font-black text-agri-950">{activeFarm.farmName} — {activeFarm.crop}</h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-agri-100 text-agri-900 font-extrabold border border-agri-300 shadow-sm">
                  Health: {activeFarm.healthScore}%
                </span>
              </div>

              {/* Animated Timeline Progression */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {growthStages.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-center space-y-2 relative transition-all ${
                      step.status === 'Completed'
                        ? 'bg-agri-100 border-agri-300 text-agri-950 font-bold'
                        : step.status === 'In Progress'
                        ? 'bg-amber-100 border-2 border-amber-400 shadow-md text-amber-950 font-extrabold'
                        : 'bg-agri-50/50 border-agri-200 text-agri-700 font-medium'
                    }`}
                  >
                    <p className="text-sm font-black">{step.stage}</p>
                    <p className="text-[10px] font-mono font-bold">{step.date}</p>
                    <span className="inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white border border-agri-300 shadow-sm">
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FARM TASK CHECKLIST */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-agri-950">Interactive Farm Task Manager ({tasks.length})</h3>
              <button
                onClick={() => setTaskModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-agri-600 text-white font-extrabold text-xs shadow-sm hover:bg-agri-500"
              >
                + Add Task
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map(t => (
                <div
                  key={t.id}
                  className={`glass-panel p-4 rounded-2xl border flex items-center justify-between transition-colors shadow-sm bg-white ${
                    t.status === 'Completed' ? 'border-agri-200 opacity-75' : 'border-agri-300'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={() => toggleTask(t.id)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                        t.status === 'Completed' ? 'bg-agri-600 border-agri-700 text-white' : 'border-agri-300 hover:border-agri-600'
                      }`}
                    >
                      {t.status === 'Completed' && <CheckCircle className="w-4 h-4 text-white" />}
                    </button>
                    <div>
                      <h4 className={`font-extrabold text-sm ${t.status === 'Completed' ? 'line-through text-agri-700' : 'text-agri-950'}`}>
                        {t.title}
                      </h4>
                      <p className="text-xs text-agri-700 font-medium">{t.farmName} • Type: {t.type} • Due: {t.dueDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      t.priority === 'High' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-agri-100 text-agri-800 border border-agri-300'
                    }`}>
                      {t.priority}
                    </span>

                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-agri-600 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PEST & PROBLEM ALERTS */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-agri-950">Active Pest & Weather Alerts ({alerts.length})</h3>

            <div className="space-y-3">
              {alerts.map(a => (
                <div key={a.id} className="glass-panel p-5 rounded-2xl border border-amber-300 space-y-2 bg-amber-50 shadow-sm text-agri-950">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" /> {a.title}
                    </span>
                    <span className="text-xs text-agri-700 font-mono font-bold">{a.timestamp}</span>
                  </div>
                  <p className="text-xs text-agri-900 font-medium">{a.message}</p>
                  <p className="text-[10px] text-amber-800 font-mono font-bold">Affected Farm: {a.farmName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: CREATE FARM TASK */}
      {taskModalOpen && (
        <div className="fixed inset-0 z-50 bg-agri-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-2xl text-agri-950">
            <div className="flex items-center justify-between border-b border-agri-200 pb-3">
              <h3 className="text-lg font-black text-agri-950">Create Cultivation Task</h3>
              <button onClick={() => setTaskModalOpen(false)} className="text-agri-600 hover:text-agri-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-agri-950 font-bold mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apply Neem Oil Spray for Leaf Aphids"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Task Type</label>
                  <select
                    value={newTask.type}
                    onChange={e => setNewTask({...newTask, type: e.target.value as any})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  >
                    <option value="Irrigation">Irrigation</option>
                    <option value="Fertilization">Fertilization</option>
                    <option value="Pest Inspection">Pest Inspection</option>
                    <option value="Weed Control">Weed Control</option>
                    <option value="Harvesting">Harvesting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-agri-950 font-bold mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-agri-950 font-bold mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setTaskModalOpen(false)} className="px-4 py-2 rounded-xl bg-agri-100 text-agri-800 font-bold hover:bg-agri-200">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-agri-600 text-white font-extrabold hover:bg-agri-500 shadow-sm">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
