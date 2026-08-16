import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  MapPin,
  Flame,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Radio,
  Building2,
  ListTodo,
  Layers,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({ type = 'citizen' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();

  const citizenNav = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Report Issue', icon: PlusCircle, path: '/report' },
    { label: 'My Complaints', icon: FileText, path: '/citizen/complaints' },
    { label: 'Nearby Issues', icon: MapPin, path: '/map' },
  ];

  const authorityNav = [
    { label: 'Overview', icon: LayoutDashboard, path: '/authority' },
    { label: 'Priority Queue', icon: ListTodo, path: '/authority/queue' },
    { label: 'City Map', icon: MapPin, path: '/authority/map' },
    { label: 'Live Feed', icon: Radio, path: '/authority/feed' },
    { label: 'Analytics', icon: BarChart3, path: '/authority/analytics' },
    { label: 'Departments', icon: Building2, path: '/authority/departments' },
    { label: 'Settings', icon: Settings, path: '/authority/settings' },
  ];

  const adminNav = [
    { label: 'Admin Console', icon: LayoutDashboard, path: '/admin' },
    { label: 'All Complaints', icon: FileText, path: '/admin/complaints' },
    { label: 'Departments', icon: Building2, path: '/admin/departments' },
    { label: 'Wards & Zones', icon: Layers, path: '/admin/wards' },
    { label: 'Reports & Export', icon: BarChart3, path: '/admin/reports' },
  ];

  let navItems = citizenNav;
  let hubTitle = 'CivicEye AI';
  let hubSub = 'Central District Hub';

  if (type === 'authority' || user?.role === 'AUTHORITY') {
    navItems = authorityNav;
    hubTitle = 'CivicEye Authority';
    hubSub = user?.departmentId ? 'Roads & Infrastructure' : 'Central District Hub';
  } else if (type === 'admin' || user?.role === 'ADMIN') {
    navItems = adminNav;
    hubTitle = 'CivicEye Admin';
    hubSub = 'Municipal Governance Center';
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-[#090d16] border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shrink-0 select-none transition-colors duration-200">
      {/* Top Section */}
      <div className="p-4 space-y-6">
        
        {/* User Hub Profile Header (matches Screenshot 2) */}
        <div className="flex items-center gap-3 px-2 py-1">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Profile"
            className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
          />
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 dark:text-white truncate flex items-center gap-1.5">
              {hubTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{hubSub}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
        {/* Emergency Dispatch Button */}
        <button
          onClick={() => navigate('/report?emergency=true')}
          className="w-full flex items-center justify-center gap-2 py-3 px-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl text-sm font-bold shadow-sm shadow-red-500/20 transition-colors"
        >
          <AlertCircle className="w-4 h-4" />
          <span>Emergency Dispatch</span>
        </button>

        {/* Help & Logout */}
        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
          <Link
            to="/help"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>Help Center</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-colors text-left"
          >
            <LogOut className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
