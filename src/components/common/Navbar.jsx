import React from 'react';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  ArrowRight,
  Check,
  ChevronDown,
  Command,
  Globe,
  LogIn,
  Menu,
  Moon,
  Shield,
  Sparkles,
  Sun,
  UserPlus,
  X,
} from 'lucide-react';

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
    isDark = true,
    toggleTheme = () => {},
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
      label: 'Platform',
      path: '/',
    },
    {
      label: 'Citizens',
      path: '/citizen',
    },
    {
      label: 'Authorities',
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

  const switchPersona = (role, path) => {
    if (switchRole) {
      switchRole(role);
    }

    setRoleMenuOpen(false);
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="civic-navbar">
      <div className="civic-navbar-inner">

        {/* =========================
            BRAND
        ========================== */}
        <Link
          to="/"
          className="civic-brand"
          aria-label="CivicEye AI home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="civic-brand-mark">
            <Shield
              size={20}
              strokeWidth={2.2}
            />

            <span className="civic-brand-orbit" />
          </span>

          <span className="civic-brand-name">
            CivicEye
            <span>AI</span>
          </span>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <nav
          className="civic-nav-links"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`civic-nav-link ${
                isActive(link.path)
                  ? 'is-active'
                  : ''
              }`}
            >
              {link.label}

              {link.path === '/map' && (
                <span className="civic-live-dot" />
              )}
            </Link>
          ))}
        </nav>

        {/* =========================
            RIGHT ACTIONS
        ========================== */}
        <div className="civic-nav-actions">

          {/* Command hint */}
          <button
            type="button"
            className="civic-command-trigger"
            onClick={() => {
              // Command palette will be added in Phase 5.
              navigate('/map');
            }}
            title="CivicEye command search"
          >
            <Command size={14} />
            <span className="hidden xl:inline">
              Search
            </span>
            <kbd>⌘K</kbd>
          </button>

          {/* Theme */}
          <button
            type="button"
            onClick={toggleTheme}
            className="civic-icon-button"
            title={`Switch to ${
              isDark ? 'light' : 'dark'
            } mode`}
            aria-label={`Switch to ${
              isDark ? 'light' : 'dark'
            } mode`}
          >
            {isDark ? (
              <Sun
                size={17}
                className="text-amber-300"
              />
            ) : (
              <Moon
                size={17}
              />
            )}
          </button>

          {/* Language */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="civic-language-button"
            title="Toggle English / Hindi"
          >
            <Globe size={15} />

            <span>
              {lang === 'en'
                ? 'हिन्दी'
                : 'English'}
            </span>
          </button>

          {/* =========================
              PERSONA SWITCHER
          ========================== */}
          <div className="civic-role-wrapper">
            <button
              type="button"
              className="civic-role-button"
              onClick={() =>
                setRoleMenuOpen((value) => !value)
              }
              aria-expanded={roleMenuOpen}
            >
              <span className="civic-status-dot" />

              <span className="capitalize">
                {user?.role?.toLowerCase() ||
                  'citizen'}
              </span>

              <ChevronDown
                size={14}
                className={`transition-transform ${
                  roleMenuOpen
                    ? 'rotate-180'
                    : ''
                }`}
              />
            </button>

            {roleMenuOpen && (
              <div className="civic-role-menu">

                <div className="civic-role-menu-header">
                  <span>DEMO PERSONA</span>
                  <span className="civic-live-label">
                    LIVE
                  </span>
                </div>

                {/* Citizen */}
                <button
                  type="button"
                  className={`civic-role-option ${
                    isCitizen
                      ? 'is-selected'
                      : ''
                  }`}
                  onClick={() =>
                    switchPersona(
                      'CITIZEN',
                      '/citizen'
                    )
                  }
                >
                  <span className="civic-role-avatar citizen">
                    C
                  </span>

                  <span>
                    <strong>
                      Citizen
                    </strong>

                    <small>
                      Pranjal Sharma
                    </small>
                  </span>

                  {isCitizen && (
                    <Check size={15} />
                  )}
                </button>

                {/* Authority */}
                <button
                  type="button"
                  className={`civic-role-option ${
                    isAuthority
                      ? 'is-selected'
                      : ''
                  }`}
                  onClick={() =>
                    switchPersona(
                      'AUTHORITY',
                      '/authority'
                    )
                  }
                >
                  <span className="civic-role-avatar authority">
                    A
                  </span>

                  <span>
                    <strong>
                      Authority
                    </strong>

                    <small>
                      Rajesh Kumar · Roads
                    </small>
                  </span>

                  {isAuthority && (
                    <Check size={15} />
                  )}
                </button>

                {/* Admin */}
                <button
                  type="button"
                  className={`civic-role-option ${
                    isAdmin
                      ? 'is-selected'
                      : ''
                  }`}
                  onClick={() =>
                    switchPersona(
                      'ADMIN',
                      '/admin'
                    )
                  }
                >
                  <span className="civic-role-avatar admin">
                    A
                  </span>

                  <span>
                    <strong>
                      Municipal Admin
                    </strong>

                    <small>
                      Dr. S. K. Sharma
                    </small>
                  </span>

                  {isAdmin && (
                    <Check size={15} />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="civic-notification-wrapper">
            <NotificationDropdown />
          </div>

          {/* Login */}
          <Link
            to="/login"
            className="civic-login-link"
          >
            <LogIn size={15} />
            <span>Login</span>
          </Link>

          {/* Signup */}
          <Link
            to="/signup"
            className="civic-signup-button"
          >
            <UserPlus size={15} />
            <span>Sign Up</span>
          </Link>

          {/* Dashboard */}
          <Link
            to={getDashboardPath()}
            className="civic-dashboard-button"
          >
            <span>
              {t('launchDashboard') ||
                'Launch Dashboard'}
            </span>

            <ArrowRight size={15} />
          </Link>

          {/* Mobile */}
          <button
            type="button"
            className="civic-mobile-toggle"
            onClick={() =>
              setMobileMenuOpen(
                (value) => !value
              )
            }
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================== */}
      {mobileMenuOpen && (
        <div className="civic-mobile-menu">

          <div className="civic-mobile-menu-inner">

            <div className="civic-mobile-status">
              <span>
                <span className="civic-status-dot" />
                CivicEye Network
              </span>

              <span>
                CENTRAL NCR NODE
              </span>
            </div>

            <nav className="civic-mobile-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className={`civic-mobile-link ${
                    isActive(link.path)
                      ? 'is-active'
                      : ''
                  }`}
                >
                  <span>
                    {link.label}
                  </span>

                  {link.path === '/map' && (
                    <span className="civic-live-badge">
                      LIVE
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="civic-mobile-actions">
              <Link
                to="/login"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="civic-mobile-secondary"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="civic-mobile-primary"
              >
                Create Account
              </Link>
            </div>

            <Link
              to={getDashboardPath()}
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="civic-mobile-dashboard"
            >
              Launch Dashboard
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;