import { SEED_USERS, SEED_COMPLAINTS, SEED_NOTIFICATIONS } from './seedData.js';
import { DEPARTMENTS, WARDS, ISSUE_CATEGORIES, PRIORITIES, COMPLAINT_STATUSES } from '../config/constants.js';

class CivicDatabase {
  constructor() {
    this.users = [...SEED_USERS];
    this.complaints = [...SEED_COMPLAINTS];
    this.notifications = [...SEED_NOTIFICATIONS];
    this.departments = [...DEPARTMENTS];
    this.wards = [...WARDS];
    this.categories = [...ISSUE_CATEGORIES];
  }

  // Users
  getUserById(id) {
    return this.users.find(u => u.id === id);
  }

  getUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(userData) {
    const newUser = {
      id: `usr_${Date.now()}`,
      role: userData.role || 'CITIZEN',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      ...userData,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Complaints
  getAllComplaints(filters = {}) {
    let list = [...this.complaints];

    if (filters.citizenId) {
      list = list.filter(c => c.citizenId === filters.citizenId);
    }
    if (filters.departmentId && filters.departmentId !== 'all') {
      list = list.filter(c => c.departmentId === filters.departmentId);
    }
    if (filters.status && filters.status !== 'all') {
      list = list.filter(c => c.status === filters.status);
    }
    if (filters.priority && filters.priority !== 'all') {
      list = list.filter(c => c.priority === filters.priority);
    }
    if (filters.categoryId && filters.categoryId !== 'all') {
      list = list.filter(c => c.categoryId === filters.categoryId);
    }
    if (filters.wardId && filters.wardId !== 'all') {
      list = list.filter(c => c.location?.wardId === filters.wardId);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c => 
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.location?.address && c.location.address.toLowerCase().includes(q))
      );
    }

    // Sort newest first by default
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getComplaintById(id) {
    return this.complaints.find(c => c.id === id);
  }

  createComplaint(data) {
    const complaintNumber = 100 + this.complaints.length + 1;
    const year = new Date().getFullYear();
    const id = `CE-${year}-00${complaintNumber}`;

    const priorityInfo = PRIORITIES[data.priority] || PRIORITIES.P3;
    const slaHours = priorityInfo.slaHours || 24;
    const slaDeadline = new Date(Date.now() + slaHours * 3600000).toISOString();

    const newComplaint = {
      id,
      title: data.title || 'Reported Civic Issue',
      description: data.description || '',
      categoryId: data.categoryId || 'other',
      categoryName: data.categoryName || 'Civic Issue',
      departmentId: data.departmentId || 'road_maintenance',
      departmentName: data.departmentName || 'Road Maintenance Department',
      assignedOfficer: data.assignedOfficer || 'Rajesh Kumar',
      priority: data.priority || 'P3',
      severity: data.severity || 'Medium',
      status: COMPLAINT_STATUSES.REPORTED,
      citizenId: data.citizenId || 'usr_citizen_1',
      citizenName: data.citizenName || 'Pranjal Sharma',
      citizenPhone: data.citizenPhone || '+91 98765 43210',
      location: data.location || {
        address: 'Sector 62, Noida',
        lat: 28.6280,
        lng: 77.3649,
        wardId: 'ward_62',
        wardName: 'Ward 18 (Sector 62, Noida)'
      },
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1000&auto=format&fit=crop&q=80',
      imageFilename: data.imageFilename || `IMG_${Math.floor(1000 + Math.random() * 9000)}_RAW.jpg`,
      aiAnalysis: data.aiAnalysis || {
        detectedIssue: data.categoryName || 'Pothole',
        confidence: 92,
        severity: data.severity || 'High',
        estimatedPriority: data.priority || 'P2',
        boundingBox: { x: 30, y: 35, width: 40, height: 30, label: `${data.categoryName || 'Issue'} (92%)` },
        timings: { imageQuality: '0.12s', segmentation: '0.42s', classification: '0.85s' },
        tags: ['Civic Report', 'Automated Triage'],
        duplicateCheck: { similarFound: 0, nearestDistanceMeters: null }
      },
      reportCount: 1,
      upvotes: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slaDeadline,
      timeline: [
        {
          status: 'Reported',
          timestamp: new Date().toISOString(),
          actor: `${data.citizenName || 'Citizen'}`,
          note: 'Complaint submitted with geotagged photo evidence.'
        },
        {
          status: 'AI Verified',
          timestamp: new Date(Date.now() + 1000).toISOString(),
          actor: 'CivicEye Neural Vision v2.4',
          note: `AI classified as ${data.categoryName || 'Issue'} with ${data.priority || 'P3'} Priority.`
        }
      ],
      internalNotes: [],
      feedback: null
    };

    this.complaints.unshift(newComplaint);

    // Notify citizen
    this.createNotification({
      userId: newComplaint.citizenId,
      title: 'Complaint Registered',
      message: `Your complaint #${newComplaint.id} (${newComplaint.title}) has been verified by AI and logged.`,
      type: 'complaint_created',
      complaintId: newComplaint.id
    });

    // Notify authority
    const dept = this.departments.find(d => d.id === newComplaint.departmentId);
    if (dept) {
      const authUser = this.users.find(u => u.departmentId === dept.id) || this.users.find(u => u.role === 'AUTHORITY');
      if (authUser) {
        this.createNotification({
          userId: authUser.id,
          title: `New ${newComplaint.priority} Ticket: #${newComplaint.id}`,
          message: `${newComplaint.title} located at ${newComplaint.location.address}`,
          type: newComplaint.priority === 'P1' ? 'critical_alert' : 'new_ticket',
          complaintId: newComplaint.id
        });
      }
    }

    return newComplaint;
  }

  updateComplaintStatus(id, newStatus, actorName, note = '', resolutionImageUrl = null) {
    const complaint = this.getComplaintById(id);
    if (!complaint) return null;

    complaint.status = newStatus;
    complaint.updatedAt = new Date().toISOString();
    if (resolutionImageUrl) {
      complaint.resolutionImageUrl = resolutionImageUrl;
    }

    complaint.timeline.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      actor: actorName || 'Municipal Authority',
      note: note || `Status updated to ${newStatus}.`
    });

    // Notify citizen of progress
    this.createNotification({
      userId: complaint.citizenId,
      title: `Update on Ticket #${complaint.id}`,
      message: `Your complaint is now ${newStatus}. Note: ${note || 'Updated by municipal team.'}`,
      type: newStatus === 'Resolved' ? 'resolution' : 'status_update',
      complaintId: complaint.id
    });

    return complaint;
  }

  joinDuplicateComplaint(targetId, citizenData) {
    const complaint = this.getComplaintById(targetId);
    if (!complaint) return null;

    complaint.reportCount = (complaint.reportCount || 1) + 1;
    complaint.upvotes = (complaint.upvotes || 1) + 1;
    complaint.updatedAt = new Date().toISOString();

    complaint.timeline.push({
      status: complaint.status,
      timestamp: new Date().toISOString(),
      actor: `${citizenData.name || 'Additional Citizen'}`,
      note: `Additional citizen report attached (+1 report volume). Total reports: ${complaint.reportCount}.`
    });

    this.createNotification({
      userId: citizenData.id || 'usr_citizen_1',
      title: 'Joined Existing Report',
      message: `Your report has been aggregated into ongoing complaint #${complaint.id} (${complaint.title}). You will receive live updates.`,
      type: 'duplicate_joined',
      complaintId: complaint.id
    });

    return complaint;
  }

  addFeedback(id, { rating, resolved, comment }) {
    const complaint = this.getComplaintById(id);
    if (!complaint) return null;

    complaint.feedback = {
      rating,
      resolved,
      comment,
      submittedAt: new Date().toISOString()
    };

    if (resolved === false) {
      // Reopen complaint automatically!
      complaint.status = COMPLAINT_STATUSES.IN_PROGRESS;
      complaint.timeline.push({
        status: 'In Progress',
        timestamp: new Date().toISOString(),
        actor: `${complaint.citizenName} (Citizen Feedback)`,
        note: `Citizen flagged that issue was not resolved properly: "${comment}". Ticket reopened automatically.`
      });
    } else {
      complaint.status = COMPLAINT_STATUSES.CITIZEN_VERIFIED;
      complaint.timeline.push({
        status: 'Citizen Verified',
        timestamp: new Date().toISOString(),
        actor: `${complaint.citizenName} (Citizen Feedback)`,
        note: `Citizen verified resolution and rated ${rating}/5 stars. Feedback: "${comment || 'Satisfied'}"`
      });
    }

    complaint.updatedAt = new Date().toISOString();
    return complaint;
  }

  addInternalNote(id, author, text) {
    const complaint = this.getComplaintById(id);
    if (!complaint) return null;

    const noteObj = {
      id: `note_${Date.now()}`,
      author,
      text,
      timestamp: new Date().toISOString()
    };

    if (!complaint.internalNotes) complaint.internalNotes = [];
    complaint.internalNotes.push(noteObj);
    return complaint;
  }

  reassignDepartment(id, newDepartmentId, assignedOfficer, actorName) {
    const complaint = this.getComplaintById(id);
    if (!complaint) return null;

    const dept = this.departments.find(d => d.id === newDepartmentId);
    if (dept) {
      complaint.departmentId = dept.id;
      complaint.departmentName = dept.name;
      complaint.assignedOfficer = assignedOfficer || dept.leadOfficer;
      complaint.updatedAt = new Date().toISOString();

      complaint.timeline.push({
        status: complaint.status,
        timestamp: new Date().toISOString(),
        actor: actorName || 'Superintendent',
        note: `Department reassigned to ${dept.name} (Lead: ${complaint.assignedOfficer}).`
      });
    }

    return complaint;
  }

  // Notifications
  getNotificationsForUser(userId) {
    return this.notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createNotification(notifData) {
    const newNotif = {
      id: `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      read: false,
      createdAt: new Date().toISOString(),
      ...notifData
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }

  markNotificationAsRead(id) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.read = true;
    return notif;
  }

  markAllNotificationsAsRead(userId) {
    this.notifications.forEach(n => {
      if (n.userId === userId) n.read = true;
    });
    return true;
  }

  // Analytics
  getAnalyticsOverview() {
    const total = this.complaints.length;
    const active = this.complaints.filter(c => ['Reported', 'AI Verified', 'Assigned', 'In Progress'].includes(c.status)).length;
    const inProgress = this.complaints.filter(c => c.status === 'In Progress').length;
    const resolved = this.complaints.filter(c => ['Resolved', 'Citizen Verified', 'Closed'].includes(c.status)).length;
    const critical = this.complaints.filter(c => c.priority === 'P1').length;
    
    // SLA Breaches
    const now = new Date();
    const slaBreaches = this.complaints.filter(c => {
      if (['Resolved', 'Citizen Verified', 'Closed'].includes(c.status)) return false;
      return new Date(c.slaDeadline) < now;
    }).length;

    // Categories Breakdown
    const categoryCount = {};
    this.complaints.forEach(c => {
      categoryCount[c.categoryName] = (categoryCount[c.categoryName] || 0) + 1;
    });

    const categoryData = Object.keys(categoryCount).map(name => ({
      name,
      count: categoryCount[name]
    }));

    // Department Breakdown
    const departmentData = this.departments.map(dept => {
      const deptComplaints = this.complaints.filter(c => c.departmentId === dept.id);
      return {
        id: dept.id,
        name: dept.shortName,
        fullName: dept.name,
        total: deptComplaints.length,
        resolved: deptComplaints.filter(c => ['Resolved', 'Citizen Verified', 'Closed'].includes(c.status)).length,
        pending: deptComplaints.filter(c => !['Resolved', 'Citizen Verified', 'Closed'].includes(c.status)).length,
        color: dept.color
      };
    });

    // Ward Breakdown
    const wardData = this.wards.map(ward => {
      const wardComplaints = this.complaints.filter(c => c.location?.wardId === ward.id);
      return {
        id: ward.id,
        name: ward.name,
        count: wardComplaints.length,
        critical: wardComplaints.filter(c => c.priority === 'P1').length
      };
    });

    return {
      metrics: {
        totalReports: 1284 + total - 6, // High baseline for smart-city feel
        activeReports: 342 + active - 3,
        inProgressReports: 186 + inProgress - 2,
        resolvedReports: 942 + resolved - 2,
        criticalReports: 37 + critical - 2,
        slaBreaches: 14 + slaBreaches,
        avgResolutionHours: 4.2,
        satisfactionRate: 94.6,
      },
      categoryData,
      departmentData,
      wardData,
      recentFeed: this.complaints.slice(0, 8)
    };
  }
}

export const db = new CivicDatabase();
