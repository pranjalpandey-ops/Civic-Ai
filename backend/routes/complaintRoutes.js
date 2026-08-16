import express from 'express';
import { db } from '../data/database.js';
import { findNearbyDuplicates } from '../services/duplicateService.js';
import { calculatePriorityScore } from '../services/priorityService.js';

const router = express.Router();

// List all complaints with filters
router.get('/', (req, res) => {
  const filters = {
    citizenId: req.query.citizenId,
    departmentId: req.query.departmentId,
    status: req.query.status,
    priority: req.query.priority,
    categoryId: req.query.categoryId,
    wardId: req.query.wardId,
    search: req.query.search,
  };

  const list = db.getAllComplaints(filters);
  res.json({ complaints: list, total: list.length });
});

// Nearby complaints around lat/lng
router.get('/nearby', (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseInt(req.query.radius) || 5000; // 5km default

  const all = db.getAllComplaints();
  if (!lat || !lng) {
    return res.json({ complaints: all });
  }

  const nearby = all.filter(c => {
    if (!c.location?.lat || !c.location?.lng) return false;
    const dLat = Math.abs(c.location.lat - lat);
    const dLng = Math.abs(c.location.lng - lng);
    return (dLat * 111000) ** 2 + (dLng * 111000) ** 2 <= radius ** 2;
  });

  res.json({ complaints: nearby });
});

// Single complaint by ID
router.get('/:id', (req, res) => {
  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }
  res.json({ complaint });
});

// Create new complaint
router.post('/', (req, res) => {
  try {
    const data = req.body;
    const newComplaint = db.createComplaint(data);
    res.status(201).json({ complaint: newComplaint });
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ error: 'Failed to create complaint' });
  }
});

// Check duplicates
router.post('/check-duplicates', (req, res) => {
  const { lat, lng, categoryId, thresholdMeters } = req.body;
  const existing = db.getAllComplaints();
  const duplicateResult = findNearbyDuplicates(lat, lng, categoryId, existing, thresholdMeters || 150);
  res.json(duplicateResult);
});

// Join existing complaint
router.post('/:id/join', (req, res) => {
  const { citizenId, citizenName } = req.body;
  const updated = db.joinDuplicateComplaint(req.params.id, { id: citizenId, name: citizenName });
  if (!updated) {
    return res.status(404).json({ error: 'Target complaint not found' });
  }
  res.json({ complaint: updated, message: `Successfully joined complaint #${updated.id}` });
});

// Submit citizen feedback & rating
router.post('/:id/feedback', (req, res) => {
  const { rating, resolved, comment } = req.body;
  const updated = db.addFeedback(req.params.id, { rating, resolved, comment });
  if (!updated) {
    return res.status(404).json({ error: 'Complaint not found' });
  }
  res.json({ complaint: updated });
});

// Add internal note
router.post('/:id/notes', (req, res) => {
  const { author, text } = req.body;
  const updated = db.addInternalNote(req.params.id, author || 'Official', text);
  if (!updated) {
    return res.status(404).json({ error: 'Complaint not found' });
  }
  res.json({ complaint: updated });
});

// Update complaint status or reassign
router.put('/:id', (req, res) => {
  const { status, actorName, note, resolutionImageUrl, departmentId, assignedOfficer } = req.body;
  let complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  if (departmentId && departmentId !== complaint.departmentId) {
    complaint = db.reassignDepartment(complaint.id, departmentId, assignedOfficer, actorName);
  }

  if (status && status !== complaint.status) {
    complaint = db.updateComplaintStatus(complaint.id, status, actorName, note, resolutionImageUrl);
  }

  res.json({ complaint });
});

export default router;
