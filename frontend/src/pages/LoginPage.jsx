import React, {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  Shield,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  UserCheck,
  ShieldAlert,
  Crown,
  Sun,
  Moon,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';


export function LoginPage() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');


  const {
    login,
    user,
  } =
    useAuth() || {};


  const {
    isDark = true,
    toggleTheme = () => {},
  } =
    useTheme() || {};


  const {
    t = (key) => key,
  } =
    useLanguage() || {};


  const navigate =
    useNavigate();


  const location =
    useLocation();


  // ==========================================================
  // ROLE
  // ==========================================================

  const role =
    String(
      user?.role ||
      'CITIZEN'
    ).toUpperCase();


  // ==========================================================
  // REDIRECT AFTER AUTH STATE UPDATES
  // ==========================================================

  useEffect(() => {

    if (
      !user ||
      loading
    ) {

      return;

    }


    console.log(
      'LOGIN PAGE USER ROLE:',
      user.role
    );


    if (
      user.role ===
      'ADMIN'
    ) {

      navigate(
        '/admin',
        {
          replace: true,
        }
      );

      return;

    }


    if (
      user.role ===
      'AUTHORITY'
    ) {

      navigate(
        '/authority',
        {
          replace: true,
        }
      );

      return;

    }


    navigate(
      '/citizen',
      {
        replace: true,
      }
    );

  }, [
    user,
    loading,
    navigate,
  ]);


  // ==========================================================
  // LOGIN
  // ==========================================================

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    setError('');

    setLoading(true);


    try {

      const loggedUser =
        await login(
          email,
          password
        );


      console.log(
        'LOGIN RESULT:',
        loggedUser
      );


      console.log(
        'LOGIN RESULT ROLE:',
        loggedUser?.role
      );


      /*
       * DO NOT navigate here.
       *
       * AuthContext has just updated `user`.
       *
       * The useEffect above will navigate once React
       * receives the updated authenticated user.
       */


    } catch (err) {

      console.error(
        'Login error:',
        err
      );


      setError(
        err?.message ||
        'Login failed. Please check your credentials.'
      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // DEMO FILL
  // ==========================================================

  const handleQuickDemoFill = (
    type
  ) => {

    if (
      type ===
      'citizen'
    ) {

      setEmail(
        'pranjal@citizen.gov.in'
      );

      setPassword(
        'password123'
      );

    }


    if (
      type ===
      'authority'
    ) {

      setEmail(
        'pushp@gmail.com'
      );

      /*
       * Put the actual password for this account here
       * if you want the demo button to work.
       */

      setPassword(
        ''
      );

    }


    if (
      type ===
      'admin'
    ) {

      setEmail(
        'admin@city.gov'
      );

      setPassword(
        ''
      );

    }

  };


  // ==========================================================
  // DISPLAY ROLE
  // ==========================================================

  let roleLabel =
    'Public / Citizen Resident';

  let RoleIcon =
    UserCheck;

  let roleClasses =
    'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';

  if (
    role ===
    'AUTHORITY'
  ) {

    roleLabel =
      'Municipal Authority Officer';

    RoleIcon =
      ShieldAlert;

    roleClasses =
      'bg-blue-500/10 border-blue-500/20 text-blue-400';

  }


  if (
    role ===
    'ADMIN'
  ) {

    roleLabel =
      'City Administrator / Commissioner';

    RoleIcon =
      Crown;

    roleClasses =
      'bg-purple-500/10 border-purple-500/20 text-purple-400';

  }


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="min-h-screen bg-white dark:bg-[#090d16] text-slate-900 dark:text-white flex flex-col md:flex-row">


      {/* ======================================================
          LEFT
      ====================================================== */}

      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 max-w-xl mx-auto md:max-w-none">


        {/* BRAND */}

        <div className="flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-2.5"
          >

            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">

              <Shield
                className="w-5 h-5"
                fill="rgba(255,255,255,0.2)"
              />

            </div>


            <span className="font-bold text-lg">

              CivicEye{' '}

              <span className="text-blue-500">
                AI
              </span>

            </span>

          </Link>


          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
          >

            {isDark
              ? (
                <Sun className="w-4 h-4 text-amber-400" />
              )
              : (
                <Moon className="w-4 h-4" />
              )
            }

          </button>

        </div>


        {/* FORM */}

        <div className="my-8 space-y-6">


          <div>

            <h1 className="text-3xl font-extrabold">

              {t('welcomeBack') ||
                'Welcome back'}

            </h1>


            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">

              Sign in — CivicEye AI.

            </p>

          </div>


          {/* ==================================================
              ROLE
          ================================================== */}

          <div
            className={`
              p-4
              rounded-xl
              border
              flex
              items-center
              gap-3
              ${roleClasses}
            `}
          >

            <RoleIcon
              className="w-5 h-5"
            />


            <div>

              <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">

                Account Role

              </p>


              <p className="font-bold text-sm">

                {roleLabel}

              </p>


              <p className="text-[10px] opacity-70 mt-1">

                Permissions are verified from Firebase.

              </p>

            </div>

          </div>


          {/* ERROR */}

          {error && (

            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">

              {error}

            </div>

          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >


            {/* EMAIL */}

            <div>

              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-2">

                Email

              </label>


              <div className="relative">

                <Mail
                  className="absolute left-3.5 top-3 w-4 h-4 text-slate-400"
                />


                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-blue-500"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-2">

                Password

              </label>


              <div className="relative">

                <Lock
                  className="absolute left-3.5 top-3 w-4 h-4 text-slate-400"
                />


                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  required
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-blue-500"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) =>
                        !value
                    )
                  }
                  className="absolute right-3 top-3 text-slate-400"
                >

                  {showPassword
                    ? (
                      <EyeOff className="w-4 h-4" />
                    )
                    : (
                      <Eye className="w-4 h-4" />
                    )
                  }

                </button>

              </div>

            </div>


            {/* REMEMBER */}

            <label className="flex items-center gap-2 text-sm text-slate-500">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(
                    event.target.checked
                  )
                }
                className="accent-blue-600"
              />

              Remember me

            </label>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >

              {loading
                ? 'Signing In...'
                : 'Sign In'
              }


              {!loading && (

                <ArrowRight
                  className="w-5 h-5"
                />

              )}

            </button>

          </form>


          {/* SIGN UP */}

          <div className="pt-6 border-t border-slate-800 text-center">

            <p className="text-sm text-slate-500">

              Don't have an account?{' '}

              <Link
                to="/signup"
                className="text-blue-500 font-bold"
              >

                Create Account

              </Link>

            </p>

          </div>

        </div>


        <p className="text-[10px] text-slate-500">

          CivicEye AI • Secure Digital Civic Platform

        </p>

      </div>


      {/* ======================================================
          RIGHT
      ====================================================== */}

      <div className="hidden md:flex w-1/2 bg-slate-900 relative overflow-hidden items-end justify-center">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-slate-950 to-slate-950" />


        <div className="relative z-10 mb-12 mx-10 max-w-xl p-8 rounded-2xl border border-slate-700/70 bg-slate-950/80">

          <div className="flex items-center gap-3 mb-3">

            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

              <Shield className="w-6 h-6 text-blue-400" />

            </div>


            <div>

              <h2 className="font-bold text-lg">

                Precision Urban Governance

              </h2>


              <p className="text-sm text-slate-400">

                Central Municipal Dispatch

              </p>

            </div>

          </div>


          <p className="text-sm text-slate-500">

            Secure access to citizen services,
            municipal authority operations and
            administrative controls.

          </p>

        </div>

      </div>

    </div>

  );
}


export default LoginPage;