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
  Sparkles,
  Map,
  Users,
  Building2,
  Settings2,
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
      icon: Sparkles,
    },
    {
      label: t('citizens'),
      path: '/citizen',
      icon: Users,
    },
    {
      label: t('authorities'),
      path: '/authority',
      icon: Building2,
    },
    {
      label: 'Live Map',
      path: '/map',
      icon: Map,
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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setRoleMenuOpen(false);
  };

  const currentRole = user?.role?.toLowerCase() || 'citizen';

  return (
    <>
      <header
        className={`ce-navbar ${
          mobileMenuOpen ? 'ce-navbar-open' : ''
        }`}
      >
        {/* =====================================================
            NAVBAR AMBIENT 3D LIGHT
        ===================================================== */}

        <div className="ce-navbar-orb ce-navbar-orb-one" />
        <div className="ce-navbar-orb ce-navbar-orb-two" />

        <div className="ce-navbar-inner">

          {/* ===================================================
              BRAND
          =================================================== */}

          <Link
            to="/"
            className="ce-brand"
            onClick={closeMobileMenu}
            aria-label="CivicEye AI home"
          >
            <div className="ce-brand-icon-wrap">
              <div className="ce-brand-icon">
                <Shield
                  className="w-5 h-5"
                  fill="rgba(255,255,255,0.18)"
                  strokeWidth={2.2}
                />
              </div>

              <span className="ce-brand-orbit" />
            </div>

            <div className="ce-brand-copy">
              <span className="ce-brand-name">
                CivicEye
                <span className="ce-brand-ai">
                  AI
                </span>
              </span>

              <span className="ce-brand-subtitle">
                Civic Intelligence
              </span>
            </div>
          </Link>

          {/* ===================================================
              DESKTOP NAVIGATION
          =================================================== */}

          <nav
            className="ce-nav-center"
            aria-label="Primary navigation"
          >
            <div className="ce-nav-pill">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`ce-nav-link ${
                      active ? 'active' : ''
                    }`}
                    aria-current={
                      active ? 'page' : undefined
                    }
                  >
                    <Icon className="ce-nav-link-icon" />

                    <span>{link.label}</span>

                    {active && (
                      <span className="ce-nav-active-dot" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ===================================================
              RIGHT ACTIONS
          =================================================== */}

          <div className="ce-nav-actions">

            {/* =================================================
                THEME
            ================================================= */}

            <button
              type="button"
              onClick={toggleTheme}
              className="ce-nav-control ce-theme-btn"
              title={
                isDark
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              aria-label={
                isDark
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              <span className="ce-control-icon">
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </span>

              <span className="ce-control-label">
                {isDark ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* =================================================
                LANGUAGE
            ================================================= */}

            <button
              type="button"
              onClick={toggleLanguage}
              className="ce-nav-control ce-language-btn"
              title="Toggle language"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />

              <span>
                {lang === 'en'
                  ? 'EN'
                  : 'हिन्दी'}
              </span>

              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>

            {/* =================================================
                ROLE SWITCHER
            ================================================= */}

            <div className="ce-role-wrapper">
              <button
                type="button"
                onClick={() =>
                  setRoleMenuOpen((open) => !open)
                }
                className={`ce-role-btn ${
                  roleMenuOpen ? 'open' : ''
                }`}
                aria-expanded={roleMenuOpen}
                aria-haspopup="menu"
              >
                <span className="ce-role-status" />

                <span className="ce-role-label">
                  {currentRole}
                </span>

                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    roleMenuOpen
                      ? 'rotate-180'
                      : ''
                  }`}
                />
              </button>

              {/* ROLE DROPDOWN */}

              {roleMenuOpen && (
                <div className="ce-role-dropdown">

                  <div className="ce-role-dropdown-glow" />

                  <div className="ce-role-dropdown-header">
                    <div className="ce-role-dropdown-icon">
                      <Settings2 className="w-4 h-4" />
                    </div>

                    <div>
                      <p className="ce-role-dropdown-kicker">
                        Application Mode
                      </p>

                      <p className="ce-role-dropdown-title">
                        Switch workspace
                      </p>
                    </div>
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
                    className={`ce-role-option ${
                      isCitizen ? 'selected' : ''
                    }`}
                  >
                    <div className="ce-role-option-icon citizen">
                      <Users className="w-4 h-4" />
                    </div>

                    <div className="ce-role-option-content">
                      <p>
                        Citizen Portal
                      </p>

                      <span>
                        Public reporting & tracking
                      </span>
                    </div>

                    {isCitizen && (
                      <Check className="ce-role-check" />
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
                    className={`ce-role-option ${
                      isAuthority ? 'selected' : ''
                    }`}
                  >
                    <div className="ce-role-option-icon authority">
                      <Building2 className="w-4 h-4" />
                    </div>

                    <div className="ce-role-option-content">
                      <p>
                        Authority Command
                      </p>

                      <span>
                        Municipal operations
                      </span>
                    </div>

                    {isAuthority && (
                      <Check className="ce-role-check" />
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
                    className={`ce-role-option ${
                      isAdmin ? 'selected' : ''
                    }`}
                  >
                    <div className="ce-role-option-icon admin">
                      <Shield className="w-4 h-4" />
                    </div>

                    <div className="ce-role-option-content">
                      <p>
                        Municipal Admin
                      </p>

                      <span>
                        System administration
                      </span>
                    </div>

                    {isAdmin && (
                      <Check className="ce-role-check" />
                    )}
                  </button>

                </div>
              )}
            </div>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <div className="ce-notification-wrapper">
              <NotificationDropdown />
            </div>

            {/* =================================================
                LOGIN
            ================================================= */}

            <Link
              to="/login"
              className="ce-login-btn"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>

            {/* =================================================
                SIGN UP
            ================================================= */}

            <Link
              to="/signup"
              className="ce-signup-btn"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </Link>

            {/* =================================================
                DASHBOARD
            ================================================= */}

            <Link
              to={getDashboardPath()}
              className="ce-dashboard-btn"
            >
              <span className="ce-dashboard-dot" />

              <span className="ce-dashboard-label">
                <span className="ce-dashboard-small">
                  Workspace
                </span>

                <span className="ce-dashboard-main">
                  Dashboard
                </span>
              </span>

              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((open) => !open)
              }
              className="ce-mobile-menu-btn"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}

        {mobileMenuOpen && (
          <div className="ce-mobile-menu">

            <div className="ce-mobile-menu-inner">

              {/* Mobile Navigation */}

              <div className="ce-mobile-section">

                <div className="ce-mobile-section-label">
                  Navigation
                </div>

                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`ce-mobile-nav-link ${
                        active ? 'active' : ''
                      }`}
                    >
                      <span className="ce-mobile-nav-icon">
                        <Icon className="w-4 h-4" />
                      </span>

                      <span>
                        {link.label}
                      </span>

                      {active && (
                        <span className="ce-mobile-active">
                          Active
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Controls */}

              <div className="ce-mobile-section">

                <div className="ce-mobile-section-label">
                  Controls
                </div>

                <div className="ce-mobile-control-grid">

                  {/* Theme */}

                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="ce-mobile-control"
                  >
                    <span className="ce-mobile-control-icon">
                      {isDark ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </span>

                    <span>
                      {isDark
                        ? 'Light mode'
                        : 'Dark mode'}
                    </span>
                  </button>

                  {/* Language */}

                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="ce-mobile-control"
                  >
                    <span className="ce-mobile-control-icon">
                      <Globe className="w-4 h-4" />
                    </span>

                    <span>
                      {lang === 'en'
                        ? 'English'
                        : 'हिन्दी'}
                    </span>
                  </button>

                  {/* Notifications */}

                  <div className="ce-mobile-control ce-mobile-notification-control">
                    <span className="ce-mobile-control-icon">
                      <Bell className="w-4 h-4" />
                    </span>

                    <span>
                      Notifications
                    </span>

                    <div className="ce-mobile-notification">
                      <NotificationDropdown />
                    </div>
                  </div>

                </div>
              </div>

              {/* Role Switcher */}

              <div className="ce-mobile-section">

                <div className="ce-mobile-section-label">
                  Current Workspace
                </div>

                <div className="ce-mobile-role-card">

                  <div className="ce-mobile-role-header">
                    <div className="ce-mobile-role-avatar">
                      <Shield className="w-4 h-4" />
                    </div>

                    <div>
                      <p>
                        {currentRole}
                      </p>

                      <span>
                        Switch workspace
                      </span>
                    </div>
                  </div>

                  <div className="ce-mobile-role-options">

                    <button
                      type="button"
                      onClick={() =>
                        changeRole(
                          'CITIZEN',
                          '/citizen'
                        )
                      }
                      className={`ce-mobile-role-option ${
                        isCitizen
                          ? 'selected'
                          : ''
                      }`}
                    >
                      <Users className="w-4 h-4" />

                      <span>
                        Citizen
                      </span>

                      {isCitizen && (
                        <Check className="w-4 h-4 ml-auto" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        changeRole(
                          'AUTHORITY',
                          '/authority'
                        )
                      }
                      className={`ce-mobile-role-option ${
                        isAuthority
                          ? 'selected'
                          : ''
                      }`}
                    >
                      <Building2 className="w-4 h-4" />

                      <span>
                        Authority
                      </span>

                      {isAuthority && (
                        <Check className="w-4 h-4 ml-auto" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        changeRole(
                          'ADMIN',
                          '/admin'
                        )
                      }
                      className={`ce-mobile-role-option ${
                        isAdmin
                          ? 'selected'
                          : ''
                      }`}
                    >
                      <Shield className="w-4 h-4" />

                      <span>
                        Admin
                      </span>

                      {isAdmin && (
                        <Check className="w-4 h-4 ml-auto" />
                      )}
                    </button>

                  </div>
                </div>
              </div>

              {/* Account */}

              <div className="ce-mobile-account">

                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="ce-mobile-login"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="ce-mobile-signup"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>

              </div>

              {/* Dashboard */}

              <Link
                to={getDashboardPath()}
                onClick={closeMobileMenu}
                className="ce-mobile-dashboard"
              >
                <div>
                  <span>
                    YOUR WORKSPACE
                  </span>

                  <strong>
                    Launch Dashboard
                  </strong>
                </div>

                <ArrowUpRight className="w-5 h-5" />
              </Link>

            </div>
          </div>
        )}
      </header>
    </>
  );
}