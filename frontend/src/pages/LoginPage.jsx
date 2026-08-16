import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  Mail,
  Lock,
  Building,
  KeyRound,
  ArrowRight,
  Eye,
  EyeOff,
  Sun,
  Moon,
  UserCheck,
  ShieldAlert,
  Crown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function LoginPage() {
  const [email, setEmail] = useState('pranjal@citizen.gov.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth() || {};
  const { isDark = false, toggleTheme = () => {} } = useTheme() || {};
  const navigate = useNavigate();

  // Real-time automatic role recognition based on email/input
  const getDetectedRole = (emailInput) => {
    const e = (emailInput || '').toLowerCase().trim();
    if (e.includes('admin') || e.includes('commissioner') || e.includes('mayor')) {
      return {
        role: 'ADMIN',
        label: 'City Administrator / Commissioner',
        icon: Crown,
        badgeBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
        route: '/admin'
      };
    }
    if (e.includes('authority') || e.includes('road') || e.includes('sanitation') || e.includes('water') || e.includes('electrical') || e.includes('.gov')) {
      return {
        role: 'AUTHORITY',
        label: 'Municipal Authority Officer',
        icon: ShieldAlert,
        badgeBg: 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        route: '/authority'
      };
    }
    return {
      role: 'CITIZEN',
      label: 'Public / Citizen Resident',
      icon: UserCheck,
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      route: '/citizen'
    };
  };

  const detected = getDetectedRole(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      const finalRole = loggedUser?.role || detected.role;
      if (finalRole === 'ADMIN') {
        navigate('/admin');
      } else if (finalRole === 'AUTHORITY') {
        navigate('/authority');
      } else {
        navigate('/citizen');
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = (type) => {
    if (type === 'citizen') {
      setEmail('pranjal@citizen.gov.in');
      setPassword('password123');
    } else if (type === 'authority') {
      setEmail('rajesh.kumar@city.gov');
      setPassword('password123');
    } else if (type === 'admin') {
      setEmail('admin@city.gov');
      setPassword('password123');
    }
  };

  const DetectedIcon = detected.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-[#090d16] text-slate-900 dark:text-white flex flex-col md:flex-row transition-colors duration-200">
      
      {/* Left Column: Sign In Form (Matches Screenshot 3) */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 max-w-xl mx-auto md:max-w-none">
        
        {/* Brand & Theme Toggle */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5 fill-white/20" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
              CivicEye <span className="text-blue-600 dark:text-blue-400">AI</span>
            </span>
          </Link>

          {/* Quick Demo Persona Chips & Theme Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('citizen')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  detected.role === 'CITIZEN'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Public
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('authority')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  detected.role === 'AUTHORITY'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Authority
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('admin')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  detected.role === 'ADMIN'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Admin
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
              title="Toggle Dark / Light Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="my-8 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Login to CivicEye AI to access the central hub.
            </p>
          </div>

          {/* Real-Time Auto-Identified Persona Tag */}
          <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${detected.badgeBg}`}>
            <div className="flex items-center gap-2">
              <DetectedIcon className="w-4 h-4 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Auto-Identified Persona</span>
                <p className="font-bold text-xs">{detected.label}</p>
              </div>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/60 dark:bg-black/30 font-semibold">
              Routes to {detected.route}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Work or Public Email */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-1.5 flex items-center justify-between">
                <span>Work or Public Email</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">✨ Auto-classified</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@city.gov or citizen@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password (Matches Screenshot 3) */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
              <span className="font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>{loading ? 'Signing In...' : `Sign In as ${detected.role}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social / GovSSO Login (Matches Screenshot 3) */}
          <div className="space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
              <span className="bg-white dark:bg-[#090d16] px-3 font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('authority')}
                className="py-2.5 px-3 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
              >
                <Building className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>GovSSO</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('citizen')}
                className="py-2.5 px-3 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
              >
                <KeyRound className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Passkey</span>
              </button>
            </div>
          </div>

          {/* Link to Sign Up */}
          <div className="text-center text-xs text-slate-600 dark:text-slate-400 pt-2">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Request access / Create Account
            </Link>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
          CivicEye AI v2.4 • Municipal Auth Node
        </div>
      </div>

      {/* Right Column: Visual Artwork Hero (Matches Screenshot 3) */}
      <div className="w-full md:w-1/2 relative bg-slate-950 overflow-hidden flex flex-col justify-end p-8 sm:p-12 lg:p-16 min-h-[400px] md:min-h-auto">
        
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80"
            alt="Futuristic Architecture"
            className="w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-blue-900/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
        </div>

        {/* Floating Glassmorphic Card (Matches Screenshot 3) */}
        <div className="relative z-10 glass-dark rounded-2xl p-6 sm:p-8 border border-white/15 text-white max-w-lg shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/30 border border-blue-400/30 rounded-xl text-blue-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Precision Urban Governance</h3>
              <p className="text-xs text-slate-400">Central Municipal Dispatch</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Experience omnipresent intelligence. CivicEye AI processes complex municipal data streams in real-time, delivering structured insights to central command.
          </p>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Encrypted Gov-Mesh Active • ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
