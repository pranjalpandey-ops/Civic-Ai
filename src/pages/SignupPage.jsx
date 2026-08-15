import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Sun,
  Moon,
  UserCheck,
  ShieldAlert,
  Crown,
  MapPin,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CITIZEN');
  const [ward, setWard] = useState('ward_62');
  const [department, setDepartment] = useState('road_maintenance');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth() || {};
  const { isDark = false, toggleTheme = () => {} } = useTheme() || {};
  const navigate = useNavigate();

  // Real-time automatic persona classification
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

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
    const det = getDetectedRole(newEmail);
    setRole(det.role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = await register({
        name: name || 'New Resident',
        email,
        role,
        password,
        wardId: ward,
        departmentId: role === 'AUTHORITY' ? department : null
      });

      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'AUTHORITY') {
        navigate('/authority');
      } else {
        navigate('/citizen');
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const DetectedIcon = detected.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-[#090d16] text-slate-900 dark:text-white flex flex-col md:flex-row transition-colors duration-200">
      
      {/* Left Column: Sign Up Form (Matches Screenshot 4) */}
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

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2.5 py-1"
            >
              Sign In Instead
            </Link>
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
              Create your account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Join the central hub for precision urban governance and citizen engagement.
            </p>
          </div>

          {/* Real-Time Auto-Identified Persona Tag */}
          <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${detected.badgeBg}`}>
            <div className="flex items-center gap-2">
              <DetectedIcon className="w-4 h-4 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Target Account Classification</span>
                <p className="font-bold text-xs">{detected.label}</p>
              </div>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/60 dark:bg-black/30 font-semibold">
              Auto-Routes to {detected.route}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-1.5 flex items-center justify-between">
                <span>Email Address</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">✨ Auto-classified</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="jane.doe@example.com or officer@city.gov"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-mono"
                />
              </div>
            </div>

            {/* User Type (Dropdown) */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-1.5">
                User Type
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
              >
                <option value="CITIZEN">Public / Citizen Resident</option>
                <option value="AUTHORITY">Municipal Authority Officer</option>
                <option value="ADMIN">City Administrator / Commissioner</option>
              </select>
            </div>

            {/* If Authority, show Department picker */}
            {role === 'AUTHORITY' && (
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-1.5">
                  Assigned Municipal Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100"
                >
                  <option value="road_maintenance">Road Maintenance Department</option>
                  <option value="sanitation">Sanitation & Waste Management</option>
                  <option value="water_supply">Water Supply & Sewerage</option>
                  <option value="electrical">Electrical & Street Lighting</option>
                  <option value="drainage_flood">Drainage & Stormwater</option>
                  <option value="traffic_mgmt">Traffic & Transit Infra</option>
                </select>
              </div>
            )}

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
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Must be at least 8 characters long.
              </p>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
              />
              <span>
                I agree to the <a href="#terms" className="text-blue-600 dark:text-blue-400 underline">Terms of Service</a> and{' '}
                <a href="#privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</a>.
              </span>
            </div>

            {/* Create Account Button (Matches Screenshot 4) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Already have account */}
          <div className="text-center text-xs text-slate-600 dark:text-slate-400 pt-2">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Log in here
            </Link>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
          CivicEye AI v2.4 • Municipal Auth Node
        </div>
      </div>

      {/* Right Column: Visual Artwork Hero (Matches Screenshot 4) */}
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

        {/* Floating Glassmorphic Card (Matches Screenshot 4) */}
        <div className="relative z-10 glass-dark rounded-2xl p-6 sm:p-8 border border-white/15 text-white max-w-lg shadow-2xl backdrop-blur-xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Platform v2.4 Active
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Empowering cities with <span className="text-blue-400">precision intelligence.</span>
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed">
            CivicEye AI seamlessly connects municipal authorities and citizens through real-time data integration, enhancing public safety, sustainability, and urban planning.
          </p>

          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-extrabold text-white">98%</div>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">Response Time Improvement</p>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">12M+</div>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">Data Points Analyzed Daily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
