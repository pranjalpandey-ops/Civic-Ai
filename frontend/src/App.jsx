import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ComplaintProvider } from './context/ComplaintContext';
import { LanguageProvider } from './context/LanguageContext';

import { Navbar } from './components/common/Navbar';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// Access Request
import { AccessRequest } from './pages/AccessRequest';

// Citizen
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { MyComplaintsPage } from './pages/citizen/MyComplaints';
import { ReportIssuePage } from './pages/citizen/ReportIssueModal';
import { ComplaintDetailPage } from './pages/citizen/ComplaintDetail';

// Authority
import { AuthorityDashboard } from './pages/authority/AuthorityDashboard';
import { IncidentAnalysisPage } from './pages/authority/IncidentAnalysis';
import { AuthorityQueuePage } from './pages/authority/AuthorityQueue';
import { LiveCityMapPage } from './pages/authority/LiveCityMap';

// Admin
import { AdminPanelPage } from './pages/admin/AdminPanel';
import { ReportsExportPage } from './pages/admin/ReportsExport';


export function App() {
  return (
    <ThemeProvider>

      <LanguageProvider>

        <AuthProvider>

          <ComplaintProvider>

            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >

              <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col">

                {/* Global Navigation */}
                <Navbar />

                {/* Application Content */}
                <div className="flex-1 min-w-0">

                  <Routes>

                    {/* =================================================
                        PUBLIC ROUTES
                    ================================================= */}

                    <Route
                      path="/"
                      element={<LandingPage />}
                    />

                    <Route
                      path="/login"
                      element={<LoginPage />}
                    />

                    <Route
                      path="/signup"
                      element={<SignupPage />}
                    />

                    <Route
                      path="/map"
                      element={<LiveCityMapPage />}
                    />


                    {/* =================================================
                        CITIZEN ROUTES
                    ================================================= */}

                    <Route
                      path="/citizen"
                      element={
                        <ProtectedRoute allowedRole="CITIZEN">
                          <CitizenDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/citizen/complaints"
                      element={
                        <ProtectedRoute allowedRole="CITIZEN">
                          <MyComplaintsPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/report"
                      element={
                        <ProtectedRoute allowedRole="CITIZEN">
                          <ReportIssuePage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/complaints/:id"
                      element={
                        <ProtectedRoute allowedRole="CITIZEN">
                          <ComplaintDetailPage />
                        </ProtectedRoute>
                      }
                    />


                    {/* =================================================
                        ACCESS REQUEST
                    ================================================= */}

                    <Route
                      path="/access-request"
                      element={
                        <ProtectedRoute allowedRole="CITIZEN">
                          <AccessRequest />
                        </ProtectedRoute>
                      }
                    />


                    {/* =================================================
                        AUTHORITY ROUTES
                    ================================================= */}

                    <Route
                      path="/authority"
                      element={
                        <ProtectedRoute allowedRole="AUTHORITY">
                          <AuthorityDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/authority/inspection"
                      element={
                        <ProtectedRoute allowedRole="AUTHORITY">
                          <IncidentAnalysisPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/authority/inspection/:id"
                      element={
                        <ProtectedRoute allowedRole="AUTHORITY">
                          <IncidentAnalysisPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/authority/queue"
                      element={
                        <ProtectedRoute allowedRole="AUTHORITY">
                          <AuthorityQueuePage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/authority/feed"
                      element={
                        <ProtectedRoute allowedRole="AUTHORITY">
                          <AuthorityQueuePage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/authority/map"
                      element={
                        <ProtectedRoute allowedRole="AUTHORITY">
                          <LiveCityMapPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/authority/analytics"
                      element={
                        <ProtectedRoute allowedRole="AUTHORITY">
                          <AuthorityDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/authority/departments"
                      element={
                        <ProtectedRoute allowedRole="AUTHORITY">
                          <AdminPanelPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/authority/settings"
                      element={
                        <ProtectedRoute allowedRole="AUTHORITY">
                          <AdminPanelPage />
                        </ProtectedRoute>
                      }
                    />


                    {/* =================================================
                        ADMIN ROUTES
                    ================================================= */}

                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute allowedRole="ADMIN">
                          <AdminPanelPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/admin/complaints"
                      element={
                        <ProtectedRoute allowedRole="ADMIN">
                          <AuthorityQueuePage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/admin/departments"
                      element={
                        <ProtectedRoute allowedRole="ADMIN">
                          <AdminPanelPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/admin/wards"
                      element={
                        <ProtectedRoute allowedRole="ADMIN">
                          <AdminPanelPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/admin/reports"
                      element={
                        <ProtectedRoute allowedRole="ADMIN">
                          <ReportsExportPage />
                        </ProtectedRoute>
                      }
                    />


                    {/* =================================================
                        FALLBACK
                    ================================================= */}

                    <Route
                      path="*"
                      element={
                        <Navigate
                          to="/"
                          replace
                        />
                      }
                    />

                  </Routes>

                </div>

              </div>

            </BrowserRouter>

          </ComplaintProvider>

        </AuthProvider>

      </LanguageProvider>

    </ThemeProvider>
  );
}


export default App;

