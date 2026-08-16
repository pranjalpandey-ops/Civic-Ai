import express from 'express';
import { db } from '../data/database.js';

const router = express.Router();

// Authority dashboard stats
router.get('/dashboard', (req, res) => {
  const departmentId = req.query.departmentId;
  const overview = db.getAnalyticsOverview();

  let complaints = db.getAllComplaints();
  if (departmentId && departmentId !== 'all') {
    complaints = complaints.filter(c => c.departmentId === departmentId);
  }

  const p1Queue = complaints.filter(c => c.priority === 'P1' && c.status !== 'Resolved' && c.status !== 'Closed');
  const inProgressQueue = complaints.filter(c => c.status === 'In Progress');
  const pendingDispatch = complaints.filter(c => c.status === 'Reported' || c.status === 'AI Verified');

  res.json({
    metrics: overview.metrics,
    p1Queue,
    inProgressQueue,
    pendingDispatch,
    totalComplaints: complaints.length,
    departments: db.departments,
    wards: db.wards
  });
});

// Authority queue with filters
router.get('/queue', (req, res) => {
  const filters = {
    departmentId: req.query.departmentId,
    status: req.query.status,
    priority: req.query.priority,
    wardId: req.query.wardId,
    search: req.query.search,
  };

  const queue = db.getAllComplaints(filters);
  res.json({ queue, count: queue.length });
});

// Update complaint from authority
router.put('/complaints/:id', (req, res) => {
  const { status, actorName, note, resolutionImageUrl, departmentId, assignedOfficer, priority } = req.body;
  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  if (priority && priority !== complaint.priority) {
    complaint.priority = priority;
    complaint.timeline.push({
      status: complaint.status,
      timestamp: new Date().toISOString(),
      actor: actorName || 'Authority Lead',
      note: `Priority manually updated to ${priority}.`
    });
  }

  if (departmentId && departmentId !== complaint.departmentId) {
    db.reassignDepartment(complaint.id, departmentId, assignedOfficer, actorName);
  }

  if (status && status !== complaint.status) {
    db.updateComplaintStatus(complaint.id, status, actorName, note, resolutionImageUrl);
  }

  res.json({ complaint: db.getComplaintById(req.params.id) });
});

export default router;
