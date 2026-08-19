import React, {
  useEffect,
  useState,
} from 'react';

import { useAuth } from '../context/AuthContext';

import {
  createAccessRequest,
  getUserAccessRequests,
} from '../services/accessRequest';


function AccessRequest() {

  const { user } = useAuth();


  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');


  // ==========================================================
  // LOAD EXISTING REQUESTS
  // ==========================================================

  useEffect(() => {

    async function loadRequests() {

      try {

        setError('');


        const existingRequests =
          await getUserAccessRequests();


        console.log(
          'User access requests:',
          existingRequests
        );


        setRequests(
          existingRequests
        );


      } catch (err) {

        console.error(
          'Failed to load access requests:',
          err
        );


        setError(
          err?.message ||
          'Unable to load your access requests.'
        );


      } finally {

        setLoading(false);

      }

    }


    if (user) {

      loadRequests();

    } else {

      setLoading(false);

    }

  }, [user]);


  // ==========================================================
  // SUBMIT ACCESS REQUEST
  // ==========================================================

  const handleRequest =
    async (requestedRole) => {

      if (!user) {

        setError(
          'You must be signed in to request access.'
        );

        return;

      }


      setSubmitting(
        requestedRole
      );

      setMessage('');

      setError('');


      try {

        /*
         * IMPORTANT:
         *
         * We do NOT pass uid.
         *
         * accessRequest.js gets UID from:
         *
         * auth.currentUser.uid
         */

        await createAccessRequest({

          name:
            user?.name ||
            user?.displayName ||
            'User',

          email:
            user?.email ||
            '',

          requestedRole,

        });


        const roleName =
          requestedRole === 'ADMIN'
            ? 'Admin'
            : 'Authority';


        setMessage(
          `${roleName} access request submitted successfully.`
        );


        // Refresh requests

        const updatedRequests =
          await getUserAccessRequests();


        setRequests(
          updatedRequests
        );


      } catch (err) {

        console.error(
          'Access request error:',
          err
        );


        setError(
          err?.message ||
          'Unable to submit access request.'
        );


      } finally {

        setSubmitting('');

      }

    };


  // ==========================================================
  // CHECK PENDING REQUEST
  // ==========================================================

  const hasPendingRequest =
    (role) => {

      return requests.some(
        (request) =>

          request.requestedRole === role &&

          request.status === 'pending'
      );

    };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#070b12] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-sm text-slate-400">
            Loading access requests...
          </p>

        </div>

      </div>

    );

  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="min-h-screen bg-[#070b12] text-slate-100 px-4 py-10">

      <div className="max-w-4xl mx-auto">


        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-8">

          <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">

            Account Permissions

          </p>


          <h1 className="text-3xl font-bold">

            Request Elevated Access

          </h1>


          <p className="text-slate-400 mt-2 max-w-2xl">

            Request access to the Admin or Authority portal.
            Your request must be reviewed and approved by an
            existing authorized user.

          </p>

        </div>


        {/* ====================================================
            SUCCESS MESSAGE
        ==================================================== */}

        {message && (

          <div className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">

            {message}

          </div>

        )}


        {/* ====================================================
            ERROR MESSAGE
        ==================================================== */}

        {error && (

          <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300">

            {error}

          </div>

        )}


        {/* ====================================================
            ACCESS CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {/* ==================================================
              AUTHORITY ACCESS
          ================================================== */}

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5">

              <span className="text-2xl">
                🏛️
              </span>

            </div>


            <h2 className="text-xl font-semibold">
              Authority Access
            </h2>


            <p className="text-sm text-slate-400 mt-2 leading-relaxed">

              Access municipal authority tools for incident
              management, inspections, queues, analytics and
              city operations.

            </p>


            <button
              type="button"

              onClick={() =>
                handleRequest(
                  'AUTHORITY'
                )
              }

              disabled={
                submitting === 'AUTHORITY' ||
                hasPendingRequest(
                  'AUTHORITY'
                )
              }

              className="w-full mt-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {submitting === 'AUTHORITY'

                ? 'Submitting...'

                : hasPendingRequest(
                    'AUTHORITY'
                  )

                  ? 'Request Pending'

                  : 'Request Authority Access'

              }

            </button>

          </div>


          {/* ==================================================
              ADMIN ACCESS
          ================================================== */}

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">

            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">

              <span className="text-2xl">
                🛡️
              </span>

            </div>


            <h2 className="text-xl font-semibold">
              Admin Access
            </h2>


            <p className="text-sm text-slate-400 mt-2 leading-relaxed">

              Access municipal administration tools for
              departments, wards, reports and system-level
              management.

            </p>


            <button
              type="button"

              onClick={() =>
                handleRequest(
                  'ADMIN'
                )
              }

              disabled={
                submitting === 'ADMIN' ||
                hasPendingRequest(
                  'ADMIN'
                )
              }

              className="w-full mt-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {submitting === 'ADMIN'

                ? 'Submitting...'

                : hasPendingRequest(
                    'ADMIN'
                  )

                  ? 'Request Pending'

                  : 'Request Admin Access'

              }

            </button>

          </div>

        </div>


        {/* ====================================================
            REQUEST HISTORY
        ==================================================== */}

        <div className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-lg font-semibold">
            Your Access Requests
          </h2>


          {requests.length === 0 ? (

            <p className="text-sm text-slate-500 mt-4">

              You have not submitted any access requests yet.

            </p>

          ) : (

            <div className="mt-4 space-y-3">

              {requests.map(
                (request) => (

                  <div
                    key={request.id}

                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800"
                  >

                    <div>

                      <p className="text-sm font-medium">

                        {request.requestedRole === 'ADMIN'

                          ? 'Admin Access'

                          : 'Authority Access'

                        }

                      </p>


                      <p className="text-xs text-slate-500 mt-1">

                        Request ID:
                        {' '}
                        {request.id}

                      </p>

                    </div>


                    <span
                      className={`
                        inline-flex
                        w-fit
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium

                        ${
                          request.status === 'approved'

                            ? 'bg-emerald-500/10 text-emerald-400'

                            : request.status === 'rejected'

                              ? 'bg-red-500/10 text-red-400'

                              : 'bg-amber-500/10 text-amber-400'
                        }
                      `}
                    >

                      {String(
                        request.status ||
                        'pending'
                      ).toUpperCase()}

                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* ====================================================
            SECURITY INFORMATION
        ==================================================== */}

        <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800">

          <p className="text-xs text-slate-500 leading-relaxed">

            <span className="text-slate-300 font-medium">
              Security:
            </span>

            {' '}

            Submitting a request does not grant elevated
            privileges. An existing authorized administrator
            must review and approve the request before your
            account role can be changed.

          </p>

        </div>

      </div>

    </div>

  );
}


// ============================================================
// EXPORTS
// ============================================================

export { AccessRequest };

export default AccessRequest;