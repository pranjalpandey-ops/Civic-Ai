import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createAccessRequest } from '../services/accessRequest';

export function SignupPage() {
  const navigate = useNavigate();

  const {
    register,
    loading: authLoading,
  } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    accountType: 'CITIZEN',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loading =
    authLoading || submitting;


  // ==========================================================
  // HANDLE INPUT
  // ==========================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError('');
    setSuccess('');
  };


  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');


    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      accountType,
    } = formData;


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!name.trim()) {
      setError(
        'Please enter your full name.'
      );
      return;
    }


    if (!email.trim()) {
      setError(
        'Please enter your email address.'
      );
      return;
    }


    if (!password) {
      setError(
        'Please enter a password.'
      );
      return;
    }


    if (password.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      );
      return;
    }


    if (password !== confirmPassword) {
      setError(
        'Passwords do not match.'
      );
      return;
    }


    if (
      ![
        'CITIZEN',
        'AUTHORITY',
        'ADMIN',
      ].includes(accountType)
    ) {
      setError(
        'Please select a valid account type.'
      );
      return;
    }


    setSubmitting(true);


    try {

      // ======================================================
      // CREATE FIREBASE ACCOUNT
      // ======================================================
      //
      // AuthContext ALWAYS creates the Firebase user as
      // CITIZEN. This is intentional.
      //
      // Admin/Authority access is granted only after approval.
      //

      const newUser = await register({
        name: name.trim(),

        email:
          email.trim().toLowerCase(),

        password,

        phone:
          phone.trim(),

        role: 'CITIZEN',
      });


      // ======================================================
      // CITIZEN
      // ======================================================

      if (accountType === 'CITIZEN') {

        setSuccess(
          'Citizen account created successfully. Redirecting...'
        );


        setTimeout(() => {

          navigate(
            '/citizen',
            {
              replace: true,
            }
          );

        }, 700);


        return;
      }


      // ======================================================
      // ADMIN / AUTHORITY APPLICATION
      // ======================================================
      //
      // Firebase account exists, but role is still CITIZEN.
      //
      // Now create an access request.
      //

      await createAccessRequest({

        name:
          newUser?.name ||
          name.trim(),

        email:
          newUser?.email ||
          email.trim().toLowerCase(),

        requestedRole:
          accountType,

      });


      // ======================================================
      // APPLICATION SUCCESS
      // ======================================================

      const roleName =
        accountType === 'ADMIN'
          ? 'Admin'
          : 'Authority';


      setSuccess(
        `${roleName} access request submitted successfully. Your account will remain a Citizen account until an authorized Admin approves your request.`
      );


      /*
       * Keep the user on the page for a moment so they
       * can read the confirmation.
       */

      setTimeout(() => {

        navigate(
          '/citizen',
          {
            replace: true,
          }
        );

      }, 1800);


    } catch (error) {

      console.error(
        'Signup error:',
        error
      );


      setError(
        error?.message ||
        'Unable to create your account. Please try again.'
      );

    } finally {

      setSubmitting(false);

    }
  };


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="min-h-screen bg-[#070b12] text-slate-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg">


        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">

            <svg
              className="w-7 h-7 text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
              />

              <circle
                cx="9"
                cy="7"
                r="4"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 8v6"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 11h-6"
              />

            </svg>

          </div>


          <h1 className="text-2xl font-bold tracking-tight">
            Create your Civic-AI account
          </h1>


          <p className="text-sm text-slate-400 mt-2">
            Join your city's digital civic platform
          </p>

        </div>


        {/* ====================================================
            CARD
        ==================================================== */}

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">


          {/* ERROR */}

          {error && (

            <div className="mb-5 p-4 rounded-lg border border-red-500/20 bg-red-500/10 text-red-300 text-sm">

              <p className="font-semibold mb-1">
                Registration failed
              </p>

              <p>
                {error}
              </p>

            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="mb-5 p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-sm leading-relaxed">

              {success}

            </div>

          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* ==================================================
                NAME
            ================================================== */}

            <div>

              <label
                htmlFor="name"
                className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
              >
                Full Name
              </label>


              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />

            </div>


            {/* ==================================================
                EMAIL
            ================================================== */}

            <div>

              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
              >
                Email Address
              </label>


              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />

            </div>


            {/* ==================================================
                PHONE
            ================================================== */}

            <div>

              <label
                htmlFor="phone"
                className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
              >
                Phone Number

                <span className="normal-case text-slate-600 ml-1">
                  (optional)
                </span>

              </label>


              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />

            </div>


            {/* ==================================================
                ACCOUNT TYPE
            ================================================== */}

            <div>

              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">

                Account Type

              </label>


              <div className="space-y-3">


                {/* CITIZEN */}

                <label
                  className={`
                    flex
                    items-center
                    gap-3
                    p-4
                    rounded-xl
                    border
                    cursor-pointer
                    transition-all

                    ${
                      formData.accountType === 'CITIZEN'

                        ? 'border-blue-500 bg-blue-500/10'

                        : 'border-slate-700 bg-slate-950 hover:border-slate-600'
                    }
                  `}
                >

                  <input
                    type="radio"
                    name="accountType"
                    value="CITIZEN"
                    checked={
                      formData.accountType ===
                      'CITIZEN'
                    }
                    onChange={handleChange}
                    disabled={loading}
                    className="accent-blue-600"
                  />


                  <div>

                    <p className="text-sm font-semibold">
                      Citizen
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Public / Citizen Resident
                    </p>

                  </div>

                </label>


                {/* AUTHORITY */}

                <label
                  className={`
                    flex
                    items-center
                    gap-3
                    p-4
                    rounded-xl
                    border
                    cursor-pointer
                    transition-all

                    ${
                      formData.accountType === 'AUTHORITY'

                        ? 'border-amber-500 bg-amber-500/10'

                        : 'border-slate-700 bg-slate-950 hover:border-slate-600'
                    }
                  `}
                >

                  <input
                    type="radio"
                    name="accountType"
                    value="AUTHORITY"
                    checked={
                      formData.accountType ===
                      'AUTHORITY'
                    }
                    onChange={handleChange}
                    disabled={loading}
                    className="accent-amber-500"
                  />


                  <div>

                    <p className="text-sm font-semibold">
                      Authority
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Municipal Authority / Operations
                    </p>

                  </div>

                </label>


                {/* ADMIN */}

                <label
                  className={`
                    flex
                    items-center
                    gap-3
                    p-4
                    rounded-xl
                    border
                    cursor-pointer
                    transition-all

                    ${
                      formData.accountType === 'ADMIN'

                        ? 'border-purple-500 bg-purple-500/10'

                        : 'border-slate-700 bg-slate-950 hover:border-slate-600'
                    }
                  `}
                >

                  <input
                    type="radio"
                    name="accountType"
                    value="ADMIN"
                    checked={
                      formData.accountType ===
                      'ADMIN'
                    }
                    onChange={handleChange}
                    disabled={loading}
                    className="accent-purple-500"
                  />


                  <div>

                    <p className="text-sm font-semibold">
                      Admin
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Municipal Administration
                    </p>

                  </div>

                </label>

              </div>


              {/* INFORMATION */}

              <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800">

                {formData.accountType === 'CITIZEN' && (

                  <p className="text-[11px] text-slate-500 leading-relaxed">

                    Citizen accounts are activated immediately.

                  </p>

                )}


                {formData.accountType === 'AUTHORITY' && (

                  <p className="text-[11px] text-slate-500 leading-relaxed">

                    Your Authority application will be reviewed
                    by an existing Admin. You will remain a
                    Citizen until your request is approved.

                  </p>

                )}


                {formData.accountType === 'ADMIN' && (

                  <p className="text-[11px] text-slate-500 leading-relaxed">

                    Your Admin application requires approval
                    from an existing authorized Admin. You will
                    remain a Citizen until approval.

                  </p>

                )}

              </div>

            </div>


            {/* ==================================================
                PASSWORD
            ================================================== */}

            <div>

              <label
                htmlFor="password"
                className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
              >
                Password
              </label>


              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />

            </div>


            {/* ==================================================
                CONFIRM PASSWORD
            ================================================== */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
              >
                Confirm Password
              </label>


              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />

            </div>


            {/* ==================================================
                SUBMIT
            ================================================== */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {loading
                ? 'Creating account...'
                : formData.accountType === 'CITIZEN'
                  ? 'Create Citizen Account'
                  : `Apply for ${
                      formData.accountType === 'ADMIN'
                        ? 'Admin'
                        : 'Authority'
                    } Access`
              }

            </button>

          </form>


          {/* ====================================================
              LOGIN
          ==================================================== */}

          <div className="mt-7 pt-6 border-t border-slate-800 text-center">

            <p className="text-sm text-slate-400">

              Already have an account?{' '}

              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign in
              </Link>

            </p>

          </div>


          {/* ====================================================
              SECURITY INFO
          ==================================================== */}

          <div className="mt-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800">

            <p className="text-xs font-semibold text-slate-300">

              Access approval

            </p>


            <p className="text-[11px] leading-relaxed text-slate-500 mt-1">

              Admin and Authority applications do not
              immediately grant elevated privileges. An
              existing authorized Admin must review your
              application before your account role changes.

            </p>

          </div>

        </div>


        <p className="text-center text-[11px] text-slate-600 mt-6">

          Civic-AI • Secure Digital Civic Platform

        </p>

      </div>

    </div>

  );
}


export default SignupPage;