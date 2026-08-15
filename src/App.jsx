import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ComplaintProvider } from './context/ComplaintContext';
import { LanguageProvider } from './context/LanguageContext';

import { Navbar } from './components/common/Navbar';

// Public
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

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
              <div className="civic-app min-h-screen flex flex-col">
                <Navbar />

                <div className="relative z-0 flex-1">
                  <Routes>
                    {/* ================================
                        PUBLIC
                    ================================= */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/map" element={<LiveCityMapPage />} />

                    {/* ================================
                        CITIZEN
                    ================================= */}
                    <Route
                      path="/citizen"
                      element={<CitizenDashboard />}
                    />

                    <Route
                      path="/citizen/complaints"
                      element={<MyComplaintsPage />}
                    />

                    <Route
                      path="/report"
                      element={<ReportIssuePage />}
                    />

                    <Route
                      path="/complaints/:id"
                      element={<ComplaintDetailPage />}
                    />

                    {/* ================================
                        AUTHORITY
                    ================================= */}
                    <Route
                      path="/authority"
                      element={<AuthorityDashboard />}
                    />

                    <Route
                      path="/authority/inspection"
                      element={<IncidentAnalysisPage />}
                    />

                    <Route
                      path="/authority/inspection/:id"
                      element={<IncidentAnalysisPage />}
                    />

                    <Route
                      path="/authority/queue"
                      element={<AuthorityQueuePage />}
                    />

                    <Route
                      path="/authority/feed"
                      element={<AuthorityQueuePage />}
                    />

                    <Route
                      path="/authority/map"
                      element={<LiveCityMapPage />}
                    />

                    <Route
                      path="/authority/analytics"
                      element={<AuthorityDashboard />}
                    />

                    <Route
                      path="/authority/departments"
                      element={<AdminPanelPage />}
                    />

                    <Route
                      path="/authority/settings"
                      element={<AdminPanelPage />}
                    />

                    {/* ================================
                        ADMIN
                    ================================= */}
                    <Route
                      path="/admin"
                      element={<AdminPanelPage />}
                    />

                    <Route
                      path="/admin/complaints"
                      element={<AuthorityQueuePage />}
                    />

                    <Route
                      path="/admin/departments"
                      element={<AdminPanelPage />}
                    />

                    <Route
                      path="/admin/wards"
                      element={<AdminPanelPage />}
                    />

                    <Route
                      path="/admin/reports"
                      element={<ReportsExportPage />}
                    />

                    {/* ================================
                        FALLBACK
                    ================================= */}
                    <Route
                      path="*"
                      element={<Navigate to="/" replace />}
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