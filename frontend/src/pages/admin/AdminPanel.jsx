import React, { useEffect, useState } from 'react';

import {
  ShieldCheck,
  Users,
  UserPlus,
  Crown,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Download,
  LogOut,
  RefreshCw,
  Check,
  X,
  Mail,
  Activity,
  BarChart3,
  ChevronRight,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';

import {
  getPendingAccessRequests,
  approveAccessRequest,
  rejectAccessRequest,
} from '../../services/accessRequest';


export function AdminPanelPage() {

  const navigate = useNavigate();

  const {
    complaints = [],
  } = useComplaints();

  const {
    user,
    logout,
  } = useAuth();


  // ==========================================================
  // ACCESS REQUESTS
  // ==========================================================

  const [
    accessRequests,
    setAccessRequests,
  ] = useState([]);

  const [
    accessRequestsLoading,
    setAccessRequestsLoading,
  ] = useState(true);

  const [
    accessRequestsError,
    setAccessRequestsError,
  ] = useState('');

  const [
    processingRequestId,
    setProcessingRequestId,
  ] = useState(null);


  // ==========================================================
  // CONFIGURATION
  // ==========================================================

  const [
    configs,
    setConfigs,
  ] = useState({
    aiConfidence: '87',
    slaResponse: '15',
    slaResolution: '120',
    escalation: '3',
  });

  const [
    savedMessage,
    setSavedMessage,
  ] = useState('');


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = async () => {

    try {

      await logout();

      navigate(
        '/login',
        {
          replace: true,
        }
      );

    } catch (error) {

      console.error(
        'Logout failed:',
        error
      );

    }

  };


  // ==========================================================
  // LOAD ACCESS REQUESTS
  // ==========================================================

  const loadPendingAccessRequests =
    async () => {

      try {

        setAccessRequestsLoading(
          true
        );

        setAccessRequestsError(
          ''
        );


        const requests =
          await getPendingAccessRequests();


        /*
         * Only ADMIN and AUTHORITY
         * applications belong here.
         */

        const filteredRequests =
          requests.filter(
            (request) => {

              const role =
                String(
                  request.requestedRole ||
                  ''
                ).toUpperCase();

              return (
                role === 'ADMIN' ||
                role === 'AUTHORITY'
              );

            }
          );


        filteredRequests.sort(
          (a, b) => {

            const aTime =
              a.createdAt?.toMillis?.() ||
              0;

            const bTime =
              b.createdAt?.toMillis?.() ||
              0;

            return bTime - aTime;

          }
        );


        setAccessRequests(
          filteredRequests
        );


      } catch (error) {

        console.error(
          'Failed to load access requests:',
          error
        );


        setAccessRequestsError(
          error?.message ||
          'Unable to load access requests.'
        );


      } finally {

        setAccessRequestsLoading(
          false
        );

      }

    };


  useEffect(
    () => {

      loadPendingAccessRequests();

    },
    []
  );


  // ==========================================================
  // APPROVE ACCESS REQUEST
  // ==========================================================

  const handleApprove =
    async (
      request
    ) => {

      if (!request?.id) {
        return;
      }


      const role =
        String(
          request.requestedRole ||
          ''
        ).toUpperCase();


      const confirmed =
        window.confirm(
          `Approve ${request.name || 'this user'} for ${role} access?`
        );


      if (!confirmed) {
        return;
      }


      try {

        setProcessingRequestId(
          request.id
        );

        setAccessRequestsError(
          ''
        );


        await approveAccessRequest(
          request.id
        );


        setAccessRequests(
          (current) =>
            current.filter(
              (item) =>
                item.id !== request.id
            )
        );


        setSavedMessage(
          `${request.name || 'User'} is now ${role}.`
        );


        setTimeout(
          () => setSavedMessage(''),
          4000
        );


      } catch (error) {

        console.error(
          'Approval failed:',
          error
        );


        setAccessRequestsError(
          error?.message ||
          'Unable to approve request.'
        );


      } finally {

        setProcessingRequestId(
          null
        );

      }

    };


  // ==========================================================
  // REJECT ACCESS REQUEST
  // ==========================================================

  const handleReject =
    async (
      request
    ) => {

      if (!request?.id) {
        return;
      }


      const confirmed =
        window.confirm(
          `Reject ${request.name || 'this user'}'s ${request.requestedRole || ''} request?`
        );


      if (!confirmed) {
        return;
      }


      try {

        setProcessingRequestId(
          request.id
        );

        setAccessRequestsError(
          ''
        );


        await rejectAccessRequest(
          request.id
        );


        setAccessRequests(
          (current) =>
            current.filter(
              (item) =>
                item.id !== request.id
            )
        );


        setSavedMessage(
          'Access request rejected.'
        );


        setTimeout(
          () => setSavedMessage(''),
          4000
        );


      } catch (error) {

        console.error(
          'Rejection failed:',
          error
        );


        setAccessRequestsError(
          error?.message ||
          'Unable to reject request.'
        );


      } finally {

        setProcessingRequestId(
          null
        );

      }

    };


  // ==========================================================
  // CONFIGURATION
  // ==========================================================

  const handleConfigChange = (
    key,
    value
  ) => {

    setConfigs(
      (previous) => ({
        ...previous,
        [key]: value,
      })
    );

  };


  const handleSaveConfigs = (
    event
  ) => {

    event.preventDefault();

    setSavedMessage(
      'System configuration updated successfully.'
    );


    setTimeout(
      () => setSavedMessage(''),
      4000
    );

  };


  // ==========================================================
  // COMPLAINT OVERVIEW
  // ==========================================================

  const totalComplaints =
    complaints.length;


  const pendingComplaints =
    complaints.filter(
      (item) =>
        String(
          item.status || ''
        ).toUpperCase() ===
        'PENDING'
    ).length;


  const resolvedComplaints =
    complaints.filter(
      (item) =>
        String(
          item.status || ''
        ).toUpperCase() ===
        'RESOLVED'
    ).length;


  const escalatedComplaints =
    complaints.filter(
      (item) =>
        String(
          item.status || ''
        ).toUpperCase() ===
        'ESCALATED'
    ).length;


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="min-h-screen bg-slate-50 text-slate-900">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">

                <ShieldCheck
                  className="w-6 h-6"
                />

              </div>


              <div>

                <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-blue-600 font-bold">

                  System Administration

                </p>


                <h1 className="text-2xl font-extrabold">

                  Municipal Administration

                </h1>

              </div>

            </div>


            <p className="text-sm text-slate-500 mt-2">

              Central administration for users,
              access control, complaints, departments
              and municipal system operations.

            </p>

          </div>


          <div className="flex items-center gap-2">


            <button
              type="button"
              onClick={() =>
                navigate('/admin/reports')
              }
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
            >

              <Download
                className="w-4 h-4"
              />

              Reports

            </button>


            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2"
            >

              <LogOut
                className="w-4 h-4"
              />

              Logout

            </button>

          </div>

        </div>


        {/* ====================================================
            SUCCESS
        ==================================================== */}

        {savedMessage && (

          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200">

            <div className="flex items-center gap-2 text-emerald-700">

              <CheckCircle2
                className="w-4 h-4"
              />

              <span className="text-sm font-semibold">

                {savedMessage}

              </span>

            </div>

          </div>

        )}


        {/* ====================================================
            OVERVIEW
        ==================================================== */}

        <section className="mb-8">

          <div className="flex items-center gap-2 mb-4">

            <Activity
              className="w-5 h-5 text-blue-600"
            />

            <h2 className="text-lg font-bold">

              Administration Overview

            </h2>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">


            {/* ACCESS REQUESTS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-slate-500">

                    Pending Access Requests

                  </p>


                  <p className="text-3xl font-extrabold mt-1">

                    {accessRequests.length}

                  </p>


                  <p className="text-[10px] text-purple-600 mt-1 font-semibold">

                    Authority / Admin

                  </p>

                </div>


                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">

                  <UserPlus
                    className="w-5 h-5 text-purple-600"
                  />

                </div>

              </div>

            </div>


            {/* TOTAL COMPLAINTS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-slate-500">

                    Total Complaints

                  </p>


                  <p className="text-3xl font-extrabold mt-1">

                    {totalComplaints}

                  </p>


                  <p className="text-[10px] text-slate-400 mt-1">

                    System-wide

                  </p>

                </div>


                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                  <FileText
                    className="w-5 h-5 text-blue-600"
                  />

                </div>

              </div>

            </div>


            {/* PENDING */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-slate-500">

                    Pending Complaints

                  </p>


                  <p className="text-3xl font-extrabold mt-1">

                    {pendingComplaints}

                  </p>


                  <p className="text-[10px] text-amber-600 mt-1">

                    Require attention

                  </p>

                </div>


                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">

                  <Clock
                    className="w-5 h-5 text-amber-600"
                  />

                </div>

              </div>

            </div>


            {/* ESCALATED */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-slate-500">

                    Escalated Complaints

                  </p>


                  <p className="text-3xl font-extrabold mt-1">

                    {escalatedComplaints}

                  </p>


                  <p className="text-[10px] text-red-600 mt-1">

                    Priority oversight

                  </p>

                </div>


                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">

                  <AlertTriangle
                    className="w-5 h-5 text-red-600"
                  />

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ====================================================
            ELEVATED ACCESS APPROVALS
        ==================================================== */}

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-8 overflow-hidden">


          <div className="p-6 border-b border-slate-200">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">

                  <UserPlus
                    className="w-5 h-5 text-purple-600"
                  />

                </div>


                <div>

                  <div className="flex items-center gap-2 flex-wrap">

                    <h2 className="text-lg font-bold">

                      Elevated Access Approvals

                    </h2>


                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">

                      {accessRequests.length} Pending

                    </span>

                  </div>


                  <p className="text-xs text-slate-500 mt-1">

                    Review applications from users requesting
                    Authority or Admin privileges.

                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={
                  loadPendingAccessRequests
                }
                disabled={
                  accessRequestsLoading
                }
                className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-2 disabled:opacity-50"
              >

                <RefreshCw
                  className={`w-4 h-4 ${
                    accessRequestsLoading
                      ? 'animate-spin'
                      : ''
                  }`}
                />

                Refresh

              </button>

            </div>

          </div>


          {accessRequestsError && (

            <div className="mx-6 mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">

              <div className="flex items-center gap-2">

                <AlertTriangle
                  className="w-4 h-4"
                />

                <span className="text-xs font-semibold">

                  {accessRequestsError}

                </span>

              </div>

            </div>

          )}


          {accessRequestsLoading ? (

            <div className="py-14 text-center">

              <RefreshCw
                className="w-7 h-7 text-purple-600 animate-spin mx-auto mb-3"
              />


              <p className="text-sm font-bold">

                Loading access applications...

              </p>


              <p className="text-xs text-slate-500 mt-1">

                Checking pending Authority and Admin requests.

              </p>

            </div>

          ) : accessRequests.length === 0 ? (

            <div className="p-8">

              <div className="py-12 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50">

                <CheckCircle2
                  className="w-9 h-9 text-emerald-500 mx-auto mb-3"
                />


                <p className="text-sm font-bold text-slate-700">

                  No Pending Access Applications

                </p>


                <p className="text-xs text-slate-500 mt-1">

                  New Authority or Admin applications
                  will appear here.

                </p>

              </div>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {accessRequests.map(
                (request) => {

                  const role =
                    String(
                      request.requestedRole ||
                      ''
                    ).toUpperCase();


                  const isAdmin =
                    role === 'ADMIN';


                  const processing =
                    processingRequestId ===
                    request.id;


                  const createdAt =
                    request.createdAt?.toDate
                      ? request.createdAt.toDate()
                      : null;


                  return (

                    <div
                      key={request.id}
                      className="p-6 hover:bg-slate-50 transition-colors"
                    >

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">


                        <div className="flex items-start gap-4 min-w-0">

                          <div
                            className={`
                              w-12
                              h-12
                              rounded-xl
                              flex
                              items-center
                              justify-center
                              shrink-0
                              ${
                                isAdmin
                                  ? 'bg-purple-50 text-purple-600'
                                  : 'bg-blue-50 text-blue-600'
                              }
                            `}
                          >

                            {isAdmin ? (

                              <Crown
                                className="w-5 h-5"
                              />

                            ) : (

                              <ShieldCheck
                                className="w-5 h-5"
                              />

                            )}

                          </div>


                          <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                              <h3 className="font-bold text-sm">

                                {request.name ||
                                  'Unknown User'}

                              </h3>


                              <span
                                className={`
                                  px-2.5
                                  py-1
                                  rounded-full
                                  text-[10px]
                                  font-bold
                                  ${
                                    isAdmin
                                      ? 'bg-purple-100 text-purple-700'
                                      : 'bg-blue-100 text-blue-700'
                                  }
                                `}
                              >

                                {role}

                              </span>


                              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">

                                PENDING

                              </span>

                            </div>


                            <div className="mt-2 space-y-1">

                              <p className="text-xs text-slate-500 flex items-center gap-1.5">

                                <Mail
                                  className="w-3.5 h-3.5"
                                />

                                {request.email ||
                                  'No email'}

                              </p>


                              <p className="text-[10px] text-slate-400 font-mono break-all">

                                UID: {request.uid ||
                                  'Missing'}

                              </p>


                              {createdAt && (

                                <p className="text-[10px] text-slate-400">

                                  Submitted:{' '}

                                  {createdAt.toLocaleString()}

                                </p>

                              )}

                            </div>

                          </div>

                        </div>


                        <div className="flex items-center gap-2 shrink-0">


                          <button
                            type="button"
                            disabled={processing}
                            onClick={() =>
                              handleReject(
                                request
                              )
                            }
                            className="px-4 py-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                          >

                            <X
                              className="w-4 h-4"
                            />

                            Reject

                          </button>


                          <button
                            type="button"
                            disabled={processing}
                            onClick={() =>
                              handleApprove(
                                request
                              )
                            }
                            className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                          >

                            <Check
                              className="w-4 h-4"
                            />

                            {processing
                              ? 'Processing...'
                              : 'Approve'
                            }

                          </button>

                        </div>

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          )}

        </section>


        {/* ====================================================
            COMPLAINT MANAGEMENT
        ==================================================== */}

        <section className="mb-8">

          <div className="flex items-center justify-between mb-4">

            <div>

              <div className="flex items-center gap-2">

                <FileText
                  className="w-5 h-5 text-blue-600"
                />

                <h2 className="text-lg font-bold">

                  Complaint Management

                </h2>

              </div>


              <p className="text-xs text-slate-500 mt-1">

                System-wide oversight of citizen complaints.

              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate(
                  '/admin/complaints'
                )
              }
              className="text-xs font-bold text-blue-600 flex items-center gap-1"
            >

              View All

              <ChevronRight
                className="w-3.5 h-3.5"
              />

            </button>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <p className="text-xs text-slate-500">

                All Complaints

              </p>


              <p className="text-2xl font-extrabold mt-1">

                {totalComplaints}

              </p>

            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <p className="text-xs text-slate-500">

                Pending

              </p>


              <p className="text-2xl font-extrabold text-amber-600 mt-1">

                {pendingComplaints}

              </p>

            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <p className="text-xs text-slate-500">

                Resolved

              </p>


              <p className="text-2xl font-extrabold text-emerald-600 mt-1">

                {resolvedComplaints}

              </p>

            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <p className="text-xs text-slate-500">

                Escalated

              </p>


              <p className="text-2xl font-extrabold text-red-600 mt-1">

                {escalatedComplaints}

              </p>

            </div>

          </div>

        </section>


        {/* ====================================================
            ADMIN MANAGEMENT CARDS
        ==================================================== */}

        <section className="mb-8">

          <div className="flex items-center gap-2 mb-4">

            <Settings
              className="w-5 h-5 text-slate-600"
            />

            <h2 className="text-lg font-bold">

              Administration

            </h2>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


            {/* USERS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">

                <Users
                  className="w-5 h-5 text-blue-600"
                />

              </div>


              <h3 className="font-bold">

                User Administration

              </h3>


              <p className="text-xs text-slate-500 mt-2">

                Review user accounts and administrative
                access levels.

              </p>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    '/admin/departments'
                  )
                }
                className="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1"
              >

                Manage Users

                <ChevronRight
                  className="w-3.5 h-3.5"
                />

              </button>

            </div>


            {/* DEPARTMENTS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">

                <Building2
                  className="w-5 h-5 text-emerald-600"
                />

              </div>


              <h3 className="font-bold">

                Municipal Departments

              </h3>


              <p className="text-xs text-slate-500 mt-2">

                Manage departments, wards and municipal
                responsibilities.

              </p>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    '/admin/departments'
                  )
                }
                className="mt-4 text-xs font-bold text-emerald-600 flex items-center gap-1"
              >

                Manage Departments

                <ChevronRight
                  className="w-3.5 h-3.5"
                />

              </button>

            </div>


            {/* REPORTS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">

                <BarChart3
                  className="w-5 h-5 text-purple-600"
                />

              </div>


              <h3 className="font-bold">

                Reports & Analytics

              </h3>


              <p className="text-xs text-slate-500 mt-2">

                Review municipal performance and export
                administrative reports.

              </p>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    '/admin/reports'
                  )
                }
                className="mt-4 text-xs font-bold text-purple-600 flex items-center gap-1"
              >

                Open Reports

                <ChevronRight
                  className="w-3.5 h-3.5"
                />

              </button>

            </div>

          </div>

        </section>


        {/* ====================================================
            SYSTEM CONFIGURATION
        ==================================================== */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">

          <div className="mb-6">

            <div className="flex items-center gap-2">

              <Settings
                className="w-5 h-5 text-blue-600"
              />

              <h2 className="text-lg font-bold">

                System Configuration

              </h2>

            </div>


            <p className="text-xs text-slate-500 mt-1">

              Configure AI, SLA and municipal operational parameters.

            </p>

          </div>


          <form
            onSubmit={
              handleSaveConfigs
            }
          >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-2">

                  AI Confidence (%)

                </label>


                <input
                  type="number"
                  min="0"
                  max="100"
                  value={
                    configs.aiConfidence
                  }
                  onChange={(event) =>
                    handleConfigChange(
                      'aiConfidence',
                      event.target.value
                    )
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 text-sm"
                />

              </div>


              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-2">

                  Response SLA (min)

                </label>


                <input
                  type="number"
                  value={
                    configs.slaResponse
                  }
                  onChange={(event) =>
                    handleConfigChange(
                      'slaResponse',
                      event.target.value
                    )
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 text-sm"
                />

              </div>


              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-2">

                  Resolution SLA (min)

                </label>


                <input
                  type="number"
                  value={
                    configs.slaResolution
                  }
                  onChange={(event) =>
                    handleConfigChange(
                      'slaResolution',
                      event.target.value
                    )
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 text-sm"
                />

              </div>


              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-2">

                  Escalation Level

                </label>


                <input
                  type="number"
                  min="1"
                  value={
                    configs.escalation
                  }
                  onChange={(event) =>
                    handleConfigChange(
                      'escalation',
                      event.target.value
                    )
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 text-sm"
                />

              </div>

            </div>


            <div className="flex justify-end mt-5">

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2"
              >

                <Check
                  className="w-4 h-4"
                />

                Save Configuration

              </button>

            </div>

          </form>

        </section>


        {/* ====================================================
            DEPARTMENTS
        ==================================================== */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">


          <div className="p-6 border-b border-slate-200">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">

                <Building2
                  className="w-5 h-5 text-emerald-600"
                />

              </div>


              <div>

                <h2 className="font-bold">

                  Municipal Departments

                </h2>


                <p className="text-xs text-slate-500 mt-1">

                  Departments responsible for civic operations.

                </p>

              </div>

            </div>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-50 border-b border-slate-200">

                  <th className="px-6 py-3 text-left text-[10px] uppercase tracking-wider text-slate-400">

                    Department

                  </th>


                  <th className="px-6 py-3 text-left text-[10px] uppercase tracking-wider text-slate-400">

                    Officers

                  </th>


                  <th className="px-6 py-3 text-left text-[10px] uppercase tracking-wider text-slate-400">

                    Status

                  </th>


                  <th className="px-6 py-3 text-right text-[10px] uppercase tracking-wider text-slate-400">

                    Action

                  </th>

                </tr>

              </thead>


              <tbody>

                {[
                  {
                    name: 'Public Works',
                    officers: 24,
                  },
                  {
                    name: 'Traffic Management',
                    officers: 18,
                  },
                  {
                    name: 'Sanitation',
                    officers: 31,
                  },
                  {
                    name: 'Water & Drainage',
                    officers: 14,
                  },
                ].map(
                  (department) => (

                    <tr
                      key={
                        department.name
                      }
                      className="border-b border-slate-100 last:border-0"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2">

                          <Building2
                            className="w-4 h-4 text-slate-400"
                          />

                          <span className="text-sm font-semibold">

                            {department.name}

                          </span>

                        </div>

                      </td>


                      <td className="px-6 py-4 text-sm text-slate-600">

                        {department.officers}

                      </td>


                      <td className="px-6 py-4">

                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">

                          ACTIVE

                        </span>

                      </td>


                      <td className="px-6 py-4 text-right">

                        <button
                          type="button"
                          className="text-xs font-bold text-blue-600 hover:text-blue-700"
                        >

                          Manage

                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>


        {/* ====================================================
            ADMIN SECURITY
        ==================================================== */}

        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">

          <div className="flex items-start gap-3">

            <ShieldCheck
              className="w-5 h-5 text-blue-600 shrink-0"
            />


            <div>

              <p className="text-sm font-bold text-blue-900">

                Administrative Security

              </p>


              <p className="text-xs text-blue-800/70 mt-1">

                Elevated access requests must be reviewed
                by an existing authorized administrator.
                Approving a request changes the applicant's
                municipal role to Authority or Admin.

              </p>

            </div>

          </div>

        </div>


      </div>

    </div>

  );
}


export default AdminPanelPage;