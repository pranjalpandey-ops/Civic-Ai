import React from "react";
import {
  Check,
  Globe,
  LogIn,
  Menu,
  Moon,
  Shield,
  Sun,
  UserPlus,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { NotificationDropdown } from "./NotificationDropdown";

export function Navbar() {
  const {
    user,
    switchRole,
    isCitizen,
    isAuthority,
    isAdmin,
  } = useAuth() || {};

  const {
    lang = "en",
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

  const roleMenuRef = React.useRef(null);

  const getDashboardPath = () => {
    if (isAuthority) return "/authority";
    if (isAdmin) return "/admin";

    return "/citizen";
  };

  const navLinks = [
    {
      label: t("platform"),
      path: "/",
    },
    {
      label: t("citizens"),
      path: "/citizen",
    },
    {
      label: t("authorities"),
      path: "/authority",
    },
    {
      label: "Live Map",
      path: "/map",
    },
  ];

  const isCurrentPath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  /* -------------------------------------------------------
     Close role menu when clicking outside
     ------------------------------------------------------- */

  React.useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        roleMenuRef.current &&
        !roleMenuRef.current.contains(event.target)
      ) {
        setRoleMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );
    };
  }, []);

  /* -------------------------------------------------------
     Close mobile menu after route changes
     ------------------------------------------------------- */

  React.useEffect(() => {
    setMobileMenuOpen(false);
    setRoleMenuOpen(false);
  }, [location.pathname]);

  /* -------------------------------------------------------
     Escape closes menus
     ------------------------------------------------------- */

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setRoleMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const handleRoleSwitch = (role, path) => {
    if (switchRole) {
      switchRole(role);
    }

    setRoleMenuOpen(false);
    navigate(path);
  };

  const currentRole =
    user?.role?.toLowerCase() || "role";

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        border-b border-[#202c42]/80
        bg-[#050811]/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto flex min-h-[68px] max-w-[1500px]
          items-center justify-between
          gap-4 px-4 sm:px-6 lg:px-8
        "
      >
        {/* =================================================
            BRAND
        ================================================= */}

        <Link
          to="/"
          aria-label="CivicEye AI home"
          className="
            group flex shrink-0 items-center gap-3
            rounded-lg
            outline-none
          "
        >
          <div
            className="
              relative flex h-9 w-9 items-center justify-center
              overflow-hidden rounded-[11px]
              border border-blue-400/20
              bg-blue-600
              text-white
              shadow-[0_8px_24px_rgba(59,130,246,0.2)]
              transition-transform duration-200
              group-hover:-translate-y-0.5
            "
          >
            <Shield
              className="h-[19px] w-[19px]"
              strokeWidth={2.3}
            />

            <span
              className="
                absolute inset-0
                bg-gradient-to-br
                from-white/15
                via-transparent
                to-transparent
              "
            />
          </div>

          <div className="flex items-baseline gap-1.5">
            <span
              className="
                text-[1.05rem] font-extrabold
                tracking-[-0.025em]
                text-white
              "
            >
              CivicEye
            </span>

            <span
              className="
                text-[1.05rem] font-extrabold
                tracking-[-0.025em]
                text-blue-400
              "
            >
              AI
            </span>
          </div>
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav
          aria-label="Primary navigation"
          className="
            hidden md:flex
            items-center
            gap-1
            rounded-xl
            border border-[#202c42]/70
            bg-[#0a1020]/65
            p-1
          "
        >
          {navLinks.map((link) => {
            const active = isCurrentPath(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? "page" : undefined}
                className={`
                  relative rounded-lg
                  px-3.5 py-2
                  text-[0.78rem]
                  font-semibold
                  transition-all duration-200
                  ${
                    active
                      ? "bg-[#182235] text-white shadow-sm"
                      : "text-[#9aa8be] hover:bg-[#10182a] hover:text-white"
                  }
                `}
              >
                {link.label}

                {active && (
                  <span
                    className="
                      absolute
                      bottom-0.5
                      left-1/2
                      h-0.5
                      w-5
                      -translate-x-1/2
                      rounded-full
                      bg-blue-400
                    "
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* =================================================
            RIGHT ACTIONS
        ================================================= */}

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="
              hidden sm:flex
              h-9 w-9
              items-center justify-center
              rounded-lg
              border border-[#26344b]
              bg-[#0a1020]
              text-[#9aa8be]
              transition-all duration-200
              hover:border-[#3a4a65]
              hover:bg-[#10182a]
              hover:text-white
              active:scale-95
            "
          >
            {isDark ? (
              <Sun
                className="h-4 w-4 text-amber-300"
                strokeWidth={2}
              />
            ) : (
              <Moon
                className="h-4 w-4"
                strokeWidth={2}
              />
            )}
          </button>

          {/* Language */}

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Change language"
            title="Toggle English / Hindi"
            className="
              hidden sm:flex
              h-9
              items-center
              gap-1.5
              rounded-lg
              border border-[#26344b]
              bg-[#0a1020]
              px-2.5
              text-[0.7rem]
              font-semibold
              text-[#9aa8be]
              transition-all duration-200
              hover:border-[#3a4a65]
              hover:bg-[#10182a]
              hover:text-white
            "
          >
            <Globe
              className="h-3.5 w-3.5"
              strokeWidth={1.9}
            />

            <span>
              {lang === "en" ? "हिन्दी" : "English"}
            </span>
          </button>

          {/* =================================================
              ROLE SWITCHER
          ================================================= */}

          <div
            ref={roleMenuRef}
            className="relative hidden sm:block"
          >
            <button
              type="button"
              onClick={() =>
                setRoleMenuOpen((previous) => !previous)
              }
              aria-expanded={roleMenuOpen}
              aria-haspopup="menu"
              className="
                flex h-9
                items-center
                gap-2
                rounded-lg
                border border-blue-500/20
                bg-blue-500/[0.07]
                px-2.5
                text-[0.7rem]
                font-semibold
                text-blue-300
                transition-all duration-200
                hover:border-blue-400/30
                hover:bg-blue-500/[0.11]
              "
            >
              <span
                className="
                  h-1.5 w-1.5
                  rounded-full
                  bg-blue-400
                  shadow-[0_0_10px_rgba(59,130,246,0.7)]
                "
              />

              <span className="capitalize">
                {currentRole}
              </span>
            </button>

            {roleMenuOpen && (
              <div
                role="menu"
                className="
                  absolute right-0 top-[calc(100%+10px)]
                  z-[70]
                  w-[280px]
                  overflow-hidden
                  rounded-xl
                  border border-[#26344b]
                  bg-[#0a1020]
                  shadow-[0_24px_70px_rgba(0,0,0,0.42)]
                "
              >
                <div
                  className="
                    border-b border-[#202c42]
                    px-4 py-3
                  "
                >
                  <p
                    className="
                      text-[0.62rem]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-[#68758a]
                    "
                  >
                    Demo Persona
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[#9aa8be]
                    "
                  >
                    Switch your CivicEye workspace
                  </p>
                </div>

                {/* Citizen */}

                <button
                  type="button"
                  role="menuitem"
                  onClick={() =>
                    handleRoleSwitch(
                      "CITIZEN",
                      "/citizen"
                    )
                  }
                  className={`
                    flex w-full items-center
                    justify-between
                    px-4 py-3
                    text-left
                    transition-colors duration-150
                    ${
                      isCitizen
                        ? "bg-blue-500/[0.08]"
                        : "hover:bg-[#10182a]"
                    }
                  `}
                >
                  <div>
                    <p
                      className={`
                        text-xs font-bold
                        ${
                          isCitizen
                            ? "text-blue-300"
                            : "text-white"
                        }
                      `}
                    >
                      Public / Citizen
                    </p>

                    <p className="mt-0.5 text-[0.65rem] text-[#68758a]">
                      Pranjal Sharma
                    </p>
                  </div>

                  {isCitizen && (
                    <Check className="h-4 w-4 text-blue-400" />
                  )}
                </button>

                {/* Authority */}

                <button
                  type="button"
                  role="menuitem"
                  onClick={() =>
                    handleRoleSwitch(
                      "AUTHORITY",
                      "/authority"
                    )
                  }
                  className={`
                    flex w-full items-center
                    justify-between
                    px-4 py-3
                    text-left
                    transition-colors duration-150
                    ${
                      isAuthority
                        ? "bg-blue-500/[0.08]"
                        : "hover:bg-[#10182a]"
                    }
                  `}
                >
                  <div>
                    <p
                      className={`
                        text-xs font-bold
                        ${
                          isAuthority
                            ? "text-blue-300"
                            : "text-white"
                        }
                      `}
                    >
                      Authority Officer
                    </p>

                    <p className="mt-0.5 text-[0.65rem] text-[#68758a]">
                      Rajesh Kumar · Roads
                    </p>
                  </div>

                  {isAuthority && (
                    <Check className="h-4 w-4 text-blue-400" />
                  )}
                </button>

                {/* Admin */}

                <button
                  type="button"
                  role="menuitem"
                  onClick={() =>
                    handleRoleSwitch(
                      "ADMIN",
                      "/admin"
                    )
                  }
                  className={`
                    flex w-full items-center
                    justify-between
                    px-4 py-3
                    text-left
                    transition-colors duration-150
                    ${
                      isAdmin
                        ? "bg-blue-500/[0.08]"
                        : "hover:bg-[#10182a]"
                    }
                  `}
                >
                  <div>
                    <p
                      className={`
                        text-xs font-bold
                        ${
                          isAdmin
                            ? "text-blue-300"
                            : "text-white"
                        }
                      `}
                    >
                      Municipal Admin
                    </p>

                    <p className="mt-0.5 text-[0.65rem] text-[#68758a]">
                      Dr. S. K. Sharma
                    </p>
                  </div>

                  {isAdmin && (
                    <Check className="h-4 w-4 text-blue-400" />
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
            className={`
              hidden lg:inline-flex
              h-9
              items-center
              gap-1.5
              rounded-lg
              px-2.5
              text-[0.72rem]
              font-semibold
              transition-colors duration-200
              ${
                isCurrentPath("/login")
                  ? "text-blue-400"
                  : "text-[#9aa8be] hover:text-white"
              }
            `}
          >
            <LogIn
              className="h-3.5 w-3.5"
              strokeWidth={2}
            />

            Login
          </Link>

          {/* Sign up */}

          <Link
            to="/signup"
            className="
              hidden lg:inline-flex
              h-9
              items-center
              gap-1.5
              rounded-lg
              border border-[#26344b]
              bg-[#0a1020]
              px-3
              text-[0.72rem]
              font-semibold
              text-[#c0cad9]
              transition-all duration-200
              hover:border-[#3a4a65]
              hover:bg-[#10182a]
              hover:text-white
            "
          >
            <UserPlus
              className="h-3.5 w-3.5"
              strokeWidth={2}
            />

            Sign Up
          </Link>

          {/* Dashboard */}

          <Link
            to={getDashboardPath()}
            className="
              hidden sm:inline-flex
              h-9
              items-center
              justify-center
              rounded-lg
              border border-blue-400/20
              bg-blue-600
              px-3.5
              text-[0.72rem]
              font-bold
              text-white
              shadow-[0_7px_20px_rgba(59,130,246,0.16)]
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-blue-500
              hover:shadow-[0_10px_26px_rgba(59,130,246,0.23)]
              active:translate-y-0
            "
          >
            {t("launchDashboard")}
          </Link>

          {/* Mobile menu */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((previous) => !previous)
            }
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              border border-[#26344b]
              bg-[#0a1020]
              text-[#9aa8be]
              transition-all duration-200
              hover:border-[#3a4a65]
              hover:bg-[#10182a]
              hover:text-white
              sm:hidden
            "
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ===================================================
          MOBILE NAVIGATION
      =================================================== */}

      {mobileMenuOpen && (
        <div
          className="
            border-t border-[#202c42]
            bg-[#070c16]/98
            backdrop-blur-xl
            md:hidden
          "
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-[1500px] px-4 py-4"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isCurrentPath(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`
                      flex items-center
                      rounded-lg
                      px-3.5 py-3
                      text-sm
                      font-semibold
                      transition-colors duration-150
                      ${
                        active
                          ? "bg-blue-500/[0.08] text-blue-300"
                          : "text-[#9aa8be] hover:bg-[#10182a] hover:text-white"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile utilities */}

            <div
              className="
                mt-3
                grid grid-cols-2
                gap-2
                border-t border-[#202c42]
                pt-3
              "
            >
              <button
                type="button"
                onClick={toggleTheme}
                className="
                  flex items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border border-[#26344b]
                  bg-[#0a1020]
                  px-3 py-2.5
                  text-xs
                  font-semibold
                  text-[#9aa8be]
                "
              >
                {isDark ? (
                  <>
                    <Sun className="h-4 w-4 text-amber-300" />
                    Light mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    Dark mode
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                className="
                  flex items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border border-[#26344b]
                  bg-[#0a1020]
                  px-3 py-2.5
                  text-xs
                  font-semibold
                  text-[#9aa8be]
                "
              >
                <Globe className="h-4 w-4" />

                {lang === "en"
                  ? "हिन्दी"
                  : "English"}
              </button>
            </div>

            {/* Mobile auth */}

            <div
              className="
                mt-3
                grid grid-cols-2
                gap-2
              "
            >
              <Link
                to="/login"
                className="
                  flex items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border border-[#26344b]
                  bg-[#0a1020]
                  px-3 py-2.5
                  text-xs
                  font-bold
                  text-[#c0cad9]
                "
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>

              <Link
                to="/signup"
                className="
                  flex items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border border-[#26344b]
                  bg-[#0a1020]
                  px-3 py-2.5
                  text-xs
                  font-bold
                  text-[#c0cad9]
                "
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Link>
            </div>

            {/* Mobile dashboard */}

            <Link
              to={getDashboardPath()}
              className="
                mt-3
                flex w-full
                items-center
                justify-center
                rounded-lg
                bg-blue-600
                px-4 py-3
                text-sm
                font-bold
                text-white
                shadow-[0_8px_24px_rgba(59,130,246,0.18)]
              "
            >
              {t("launchDashboard")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;