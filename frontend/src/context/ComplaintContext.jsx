import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { SEED_COMPLAINTS, SEED_NOTIFICATIONS } from '../data/localDb';

const ComplaintContext = createContext();

// Deep clone seed data so it stays isolated per session
const initComplaints = () => JSON.parse(JSON.stringify(SEED_COMPLAINTS));
const initNotifications = () => JSON.parse(JSON.stringify(SEED_NOTIFICATIONS));

let _complaints = initComplaints();
let _notifications = initNotifications();
let _idCounter = 125;

// ── Pure in-memory helpers ────────────────────────────────────────────────────
function generateId() {
  return `CE-2026-00${_idCounter++}`;
}

function hoursFromNow(h) {
  return new Date(Date.now() + h * 3600000).toISOString();
}

function addNotification(notifData) {
  const n = {
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    read: false,
    createdAt: new Date().toISOString(),
    ...notifData,
  };
  _notifications = [n, ..._notifications];
  return n;
}

// ── Context Provider ──────────────────────────────────────────────────────────
export function ComplaintProvider({ children }) {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState(_complaints);
  const [notifications, setNotifications] = useState(_notifications);
  const [loading] = useState(false);
  const [activeComplaint, setActiveComplaint] = useState(null);

  const syncState = useCallback(() => {
    setComplaints([..._complaints]);
    setNotifications([..._notifications]);
  }, []);

  // ── Submit a new complaint ───────────────────────────────────────────────
  const submitComplaint = useCallback(async (complaintData) => {
    const id = generateId();
    const slaHours = complaintData.priority === 'P1' ? 4 : complaintData.priority === 'P2' ? 8 : 24;

    const newComplaint = {
      id,
      title: complaintData.title || 'Reported Civic Issue',
      description: complaintData.description || '',
      categoryId: complaintData.categoryId || 'other',
      categoryName: complaintData.categoryName || 'Civic Issue',
      departmentId: complaintData.departmentId || 'road_maintenance',
      departmentName: complaintData.departmentName || 'Road Maintenance Department',
      assignedOfficer: complaintData.assignedOfficer || 'Rajesh Kumar',
      priority: complaintData.priority || 'P3',
      severity: complaintData.severity || 'Medium',
      status: 'AI Verified',
      citizenId: user?.id || 'usr_citizen_1',
      citizenName: user?.name || 'Pranjal Sharma',
      citizenPhone: user?.phone || '+91 98765 43210',
      location: complaintData.location || {
        address: 'Sector 62, Noida',
        lat: 28.6280,
        lng: 77.3649,
        wardId: 'ward_62',
        wardName: 'Ward 18 (Sector 62)',
      },
      imageUrl: complaintData.imageUrl ||
        'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1000&auto=format&fit=crop&q=80',
      imageFilename: `IMG_${Math.floor(1000 + Math.random() * 9000)}_RAW.jpg`,
      aiAnalysis: complaintData.aiAnalysis || {
        detectedIssue: complaintData.categoryName || 'Pothole',
        confidence: 92,
        severity: complaintData.severity || 'High',
        estimatedPriority: complaintData.priority || 'P2',
        boundingBox: { x: 30, y: 35, width: 40, height: 30, label: `${complaintData.categoryName || 'Issue'} (92%)` },
        timings: { imageQuality: '0.12s', segmentation: '0.42s', classification: '0.85s' },
        tags: ['Civic Report', 'Automated Triage'],
        duplicateCheck: { similarFound: 0, nearestDistanceMeters: null },
      },
      reportCount: 1,
      upvotes: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slaDeadline: hoursFromNow(slaHours),
      timeline: [
        {
          status: 'Reported',
          timestamp: new Date().toISOString(),
          actor: user?.name || 'Citizen',
          note: 'Complaint submitted with geotagged photo evidence.',
        },
        {
          status: 'AI Verified',
          timestamp: new Date(Date.now() + 800).toISOString(),
          actor: 'CivicEye Neural Vision v2.4',
          note: `AI classified as ${complaintData.categoryName || 'Issue'} with ${complaintData.priority || 'P3'} Priority.`,
        },
      ],
      internalNotes: [],
      feedback: null,
    };

    _complaints = [newComplaint, ..._complaints];

    // Notify citizen
    addNotification({
      userId: newComplaint.citizenId,
      title: 'Complaint Registered ✅',
      message: `Your complaint #${newComplaint.id} (${newComplaint.title}) has been verified by AI and logged.`,
      type: 'complaint_created',
      complaintId: newComplaint.id,
    });

    syncState();
    return newComplaint;
  }, [user, syncState]);

  // ── Update status ────────────────────────────────────────────────────────
  const updateStatus = useCallback(async (id, status, note, resolutionImageUrl) => {
    _complaints = _complaints.map((c) => {
      if (c.id !== id) return c;
      const updated = {
        ...c,
        status,
        updatedAt: new Date().toISOString(),
        ...(resolutionImageUrl ? { resolutionImageUrl } : {}),
        timeline: [
          ...c.timeline,
          {
            status,
            timestamp: new Date().toISOString(),
            actor: user?.name || 'Municipal Authority',
            note: note || `Status updated to ${status}.`,
          },
        ],
      };
      addNotification({
        userId: c.citizenId,
        title: `Update on Ticket #${c.id} 🔄`,
        message: `Your complaint is now ${status}. ${note || ''}`,
        type: status === 'Resolved' ? 'resolution' : 'status_update',
        complaintId: c.id,
      });
      return updated;
    });
    syncState();
    return _complaints.find((c) => c.id === id);
  }, [user, syncState]);

  // ── Reassign department ──────────────────────────────────────────────────
  const reassignDepartment = useCallback(async (id, departmentId, assignedOfficer) => {
    const deptNameMap = {
      road_maintenance: 'Road Maintenance Department',
      sanitation: 'Sanitation & Solid Waste Management',
      water_supply: 'Water Supply & Sewerage Board',
      electrical: 'Electrical & Street Lighting Department',
      drainage_flood: 'Drainage & Stormwater Management',
      traffic_mgmt: 'Traffic & Urban Transit Infrastructure',
    };

    _complaints = _complaints.map((c) => {
      if (c.id !== id) return c;
      return {
        ...c,
        departmentId,
        departmentName: deptNameMap[departmentId] || departmentId,
        assignedOfficer: assignedOfficer || c.assignedOfficer,
        updatedAt: new Date().toISOString(),
        timeline: [
          ...c.timeline,
          {
            status: c.status,
            timestamp: new Date().toISOString(),
            actor: user?.name || 'Superintendent',
            note: `Department reassigned to ${deptNameMap[departmentId] || departmentId}.`,
          },
        ],
      };
    });
    syncState();
    return _complaints.find((c) => c.id === id);
  }, [user, syncState]);

  // ── Join duplicate complaint ─────────────────────────────────────────────
  const joinDuplicate = useCallback(async (targetId) => {
    _complaints = _complaints.map((c) => {
      if (c.id !== targetId) return c;
      const updated = {
        ...c,
        reportCount: (c.reportCount || 1) + 1,
        upvotes: (c.upvotes || 1) + 1,
        updatedAt: new Date().toISOString(),
        timeline: [
          ...c.timeline,
          {
            status: c.status,
            timestamp: new Date().toISOString(),
            actor: user?.name || 'Additional Citizen',
            note: `Additional citizen report attached. Total: ${(c.reportCount || 1) + 1}.`,
          },
        ],
      };
      addNotification({
        userId: user?.id || 'usr_citizen_1',
        title: 'Joined Existing Report',
        message: `Your report has been aggregated into #${c.id} (${c.title}).`,
        type: 'duplicate_joined',
        complaintId: c.id,
      });
      return updated;
    });
    syncState();
    return _complaints.find((c) => c.id === targetId);
  }, [user, syncState]);

  // ── Citizen feedback ─────────────────────────────────────────────────────
  const submitFeedback = useCallback(async (id, rating, resolved, comment) => {
    _complaints = _complaints.map((c) => {
      if (c.id !== id) return c;
      const newStatus = resolved ? 'Citizen Verified' : 'In Progress';
      return {
        ...c,
        status: newStatus,
        updatedAt: new Date().toISOString(),
        feedback: { rating, resolved, comment, submittedAt: new Date().toISOString() },
        timeline: [
          ...c.timeline,
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            actor: `${c.citizenName} (Feedback)`,
            note: resolved
              ? `Citizen verified resolution. Rating: ${rating}/5. "${comment || 'Satisfied'}"`
              : `Citizen flagged issue not resolved: "${comment}". Ticket reopened.`,
          },
        ],
      };
    });
    syncState();
    return _complaints.find((c) => c.id === id);
  }, [syncState]);

  // ── Notifications ────────────────────────────────────────────────────────
  const markNotificationRead = useCallback((notifId) => {
    _notifications = _notifications.map((n) =>
      n.id === notifId ? { ...n, read: true } : n
    );
    setNotifications([..._notifications]);
  }, []);

  const refreshComplaints = useCallback(() => {
    setComplaints([..._complaints]);
  }, []);

  const refreshNotifications = useCallback(() => {
    setNotifications([..._notifications]);
  }, []);

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        notifications,
        loading,
        activeComplaint,
        setActiveComplaint,
        refreshComplaints,
        refreshNotifications,
        submitComplaint,
        joinDuplicate,
        updateStatus,
        reassignDepartment,
        submitFeedback,
        markNotificationRead,
        unreadNotificationCount: notifications.filter((n) => !n.read).length,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  return useContext(ComplaintContext);
}
