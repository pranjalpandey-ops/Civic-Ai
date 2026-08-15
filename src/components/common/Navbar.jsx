import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Sparkles, Globe, User, LogOut, Menu, X, Check, Sun, Moon, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { NotificationDropdown } from './NotificationDropdown';

export function Navbar() {
  const { user, logout, switchRole, isCitizen, isAuthority, isAdmin } = useAuth() || {};
  const { lang = 'en', toggleLanguage = () => {}, t = (k) => k } = useLanguage() || {};
  const { theme = 'light', toggleTheme = () => {}, isDark = false } = useTheme() || {};
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const getDashboardPath = () => {
    if (isAuthority) return '/authority';
    if (isAdmin) return '/admin';
    return '/citizen';
  };

  const navLinks = [
    { label: t('platform'), path: '/' },
    { label: t('citizens'), path: '/citizen' },
    { label: t('authorities'), path: '/authority' },
    { label: 'Live Map', path: '/map' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2.5 flex items-center justify-between">
        
        {/* Brand Logo (Matches Screenshot 1) */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 fill-white/20 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
            CivicEye <span className="text-blue-600 dark:text-blue-400">AI</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-blue-600 dark:hover:text-blue-400 py-1 ${
                  isActive ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-bold' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle, Language, Role Switcher, Sign In & Sign Up buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 animate-in spin-in-180 duration-300" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
            title="Toggle English / Hindi"
          >
            <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Persona Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
              title="Switch demo persona"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
              <span className="capitalize font-bold">{user?.role?.toLowerCase() || 'Role'}</span>
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2.5 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-4 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Switch Persona (Demo)
                </div>
                <button
                  onClick={() => { switchRole && switchRole('CITIZEN'); setRoleMenuOpen(false); navigate('/citizen'); }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                    isCitizen ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-bold">Public / Citizen Portal</p>
                    <p className="text-xs text-slate-400">Pranjal Sharma</p>
                  </div>
                  {isCitizen && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                </button>
                <button
                  onClick={() => { switchRole && switchRole('AUTHORITY'); setRoleMenuOpen(false); navigate('/authority'); }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                    isAuthority ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-bold">Authority Officer</p>
                    <p className="text-xs text-slate-400">Rajesh Kumar (Roads)</p>
                  </div>
                  {isAuthority && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                </button>
                <button
                  onClick={() => { switchRole && switchRole('ADMIN'); setRoleMenuOpen(false); navigate('/admin'); }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                    isAdmin ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-bold">Municipal Admin</p>
                    <p className="text-xs text-slate-400">Dr. S. K. Sharma</p>
                  </div>
                  {isAdmin && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Auth Action Buttons: Login + Signup + Launch Dashboard */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                location.pathname === '/login' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>

            <Link
              to="/signup"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                location.pathname === '/signup' ? 'border-blue-600 text-blue-600 font-bold' : ''
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </Link>

            {/* Launch Dashboard Button (Blue Primary CTA) */}
            <Link
              to={getDashboardPath()}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02]"
            >
              {t('launchDashboard')}
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2.5">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Sign Up
            </Link>
          </div>

          <Link
            to={getDashboardPath()}
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl shadow-sm"
          >
            {t('launchDashboard')}
          </Link>
        </div>
      )}
    </header>
  );
}
