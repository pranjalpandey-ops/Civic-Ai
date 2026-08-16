import React from 'react';

import {
  Shield,
  Globe,
  Check,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  Bell,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react';

import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

import { NotificationDropdown } from './NotificationDropdown';

export function Navbar() {
  const {
    user,
    switchRole,
    isCitizen,
    isAuthority,
    isAdmin,
  } = useAuth() || {};

  const {
    lang = 'en',
    toggleLanguage = () => {},
    t = (key) => key,
  } = useLanguage() || {};

  const {
    toggleTheme = () => {},
    isDark = true,
  } = useTheme() || {};

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
    {
      label: t('platform'),
      path: '/',
    },
    {
      label: t('citizens'),
      path: '/citizen',
    },
    {
      label: t('authorities'),
      path: '/authority',
    },
    {
      label: 'Live Map',
      path: '/map',
    },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  const changeRole = (role, path) => {
    if (switchRole) {
      switchRole(role);
    }

    setRoleMenuOpen(false);
    setMobileMenuOpen(false);

    navigate(path);
  };

  return (
    <>
      {/* =========================================================
          DESKTOP / MAIN NAVBAR
      ========================================================= */}

      <header className="ce-navbar">

        <div className="ce-navbar-inner">

          {/* =====================================================
              LOGO
          ===================================================== */}

          <Link
            to="/"
            className="ce-brand"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="ce-brand-icon">
              <Shield
                className="w-5 h-5"
                fill="rgba(255,255,255,0.18)"
                strokeWidth={2.2}
              />
            </div>

            <span className="ce-brand-name">
              CivicEye
              <span className="text-blue-400 ml-1">
                AI
              </span>
            </span>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}

          <nav className="ce-nav-center">

            {navLinks.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`ce-nav-link ${
                    active ? 'active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

          </nav>

          {/* =====================================================
              RIGHT ACTIONS
          ===================================================== */}

          <div className="ce-nav-actions">

            {/* Theme */}
            <button
              type="button"
              onClick={toggleTheme}
              className="ce-icon-btn"
              title={
                isDark
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              {isDark ? (
                <Sun
                  className="w-4 h-4 text-amber-300"
                />
              ) : (
                <Moon
                  className="w-4 h-4"
                />
              )}
            </button>

            {/* Language */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="ce-language-btn"
              title="Toggle language"
            >
              <Globe className="w-4 h-4" />

              <span>
                {lang === 'en'
                  ? 'English'
                  : 'हिन्दी'}
              </span>

              <ChevronDown className="w-3 h-3" />
            </button>

            {/* =================================================
                ROLE SWITCHER
            ================================================= */}

            <div className="relative hidden lg:block">

              <button
                type="button"
                onClick={() =>
                  setRoleMenuOpen(
                    !roleMenuOpen
                  )
                }
                className="ce-role-btn"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />

                <span className="role-text capitalize">
                  {user?.role?.toLowerCase() ||
                    'Citizen'}
                </span>

                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    roleMenuOpen
                      ? 'rotate-180'
                      : ''
                  }`}
                />
              </button>

              {/* Role dropdown */}
              {roleMenuOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-[48px]
                    w-72
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-700/60
                    bg-[#0b1220]
                    shadow-2xl
                    shadow-black/40
                    z-[1100]
                  "
                >

                  <div className="px-4 py-3 border-b border-slate-800">
                    <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-slate-500">
                      Demo Persona
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Switch application experience
                    </p>
                  </div>

                  {/* Citizen */}
                  <button
                    type="button"
                    onClick={() =>
                      changeRole(
                        'CITIZEN',
                        '/citizen'
                      )
                    }
                    className={`
                      w-full
                      px-4
                      py-3
                      flex
                      items-center
                      justify-between
                      text-left
                      transition-colors
                      hover:bg-slate-800/60
                      ${
                        isCitizen
                          ? 'bg-blue-500/10'
                          : ''
                      }
                    `}
                  >
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          isCitizen
                            ? 'text-blue-400'
                            : 'text-slate-200'
                        }`}
                      >
                        Citizen Portal
                      </p>

                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Public reporting & tracking
                      </p>
                    </div>

                    {isCitizen && (
                      <Check className="w-4 h-4 text-blue-400" />
                    )}
                  </button>

                  {/* Authority */}
                  <button
                    type="button"
                    onClick={() =>
                      changeRole(
                        'AUTHORITY',
                        '/authority'
                      )
                    }
                    className={`
                      w-full
                      px-4
                      py-3
                      flex
                      items-center
                      justify-between
                      text-left
                      transition-colors
                      hover:bg-slate-800/60
                      ${
                        isAuthority
                          ? 'bg-blue-500/10'
                          : ''
                      }
                    `}
                  >
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          isAuthority
                            ? 'text-blue-400'
                            : 'text-slate-200'
                        }`}
                      >
                        Authority Command
                      </p>

                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Municipal operations
                      </p>
                    </div>

                    {isAuthority && (
                      <Check className="w-4 h-4 text-blue-400" />
                    )}
                  </button>

                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() =>
                      changeRole(
                        'ADMIN',
                        '/admin'
                      )
                    }
                    className={`
                      w-full
                      px-4
                      py-3
                      flex
                      items-center
                      justify-between
                      text-left
                      transition-colors
                      hover:bg-slate-800/60
                      ${
                        isAdmin
                          ? 'bg-blue-500/10'
                          : ''
                      }
                    `}
                  >
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          isAdmin
                            ? 'text-blue-400'
                            : 'text-slate-200'
                        }`}
                      >
                        Municipal Admin
                      </p>

                      <p className="text-[11px] text-slate-500 mt-0.5">
                        System administration
                      </p>
                    </div>

                    {isAdmin && (
                      <Check className="w-4 h-4 text-blue-400" />
                    )}
                  </button>

                </div>
              )}

            </div>

            {/* Notifications */}
            <div className="hidden sm:block">
              <NotificationDropdown />
            </div>

            {/* Login */}
            <Link
              to="/login"
              className="
                hidden
                xl:inline-flex
                items-center
                gap-1.5
                h-[39px]
                px-3
                rounded-lg
                text-xs
                font-bold
                text-slate-400
                hover:text-white
                transition-colors
              "
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>

            {/* Signup */}
            <Link
              to="/signup"
              className="
                hidden
                xl:inline-flex
                items-center
                gap-1.5
                h-[39px]
                px-3
                rounded-lg
                text-xs
                font-bold
                text-slate-300
                border
                border-slate-700/70
                hover:bg-slate-800
                hover:text-white
                transition-colors
              "
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>

            {/* Dashboard */}
            <Link
              to={getDashboardPath()}
              className="ce-dashboard-btn"
            >
              <span className="hidden sm:inline">
                Launch Dashboard
              </span>

              <span className="sm:hidden">
                Dashboard
              </span>

              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="
                lg:hidden
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                text-slate-300
              "
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>
        </div>

        {/* =======================================================
            MOBILE MENU
        ======================================================= */}

        {mobileMenuOpen && (
          <div className="ce-mobile-menu lg:hidden">

            <div className="px-4 py-4 space-y-1">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className={`
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    transition-colors
                    ${
                      isActive(link.path)
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-slate-300 hover:bg-slate-800'
                    }
                  `}
                >
                  {link.label}

                  {isActive(link.path) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  )}
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-800">

                <Link
                  to="/login"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    text-slate-300
                    hover:bg-slate-800
                  "
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    text-slate-300
                    hover:bg-slate-800
                  "
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>

                <Link
                  to={getDashboardPath()}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    mt-2
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    h-11
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    text-white
                    text-sm
                    font-bold
                  "
                >
                  Launch Dashboard
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

              </div>

            </div>
          </div>
        )}

      </header>
    </>
  );
}