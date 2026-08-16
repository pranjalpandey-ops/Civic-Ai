import express from 'express';
import { db } from '../data/database.js';

const router = express.Router();

// Overview metrics & charts
router.get('/overview', (req, res) => {
  const overview = db.getAnalyticsOverview();
  res.json(overview);
});

// Heatmap coordinates & intensity
router.get('/heatmap', (req, res) => {
  const categoryId = req.query.category;
  let list = db.getAllComplaints();

  if (categoryId && categoryId !== 'all') {
    list = list.filter(c => c.categoryId === categoryId);
  }

  const points = list
    .filter(c => c.location?.lat && c.location?.lng)
    .map(c => {
      // Intensity based on priority and report count
      let weight = 0.5;
      if (c.priority === 'P1') weight = 1.0;
      else if (c.priority === 'P2') weight = 0.8;
      else if (c.priority === 'P3') weight = 0.6;
      else weight = 0.4;

      if (c.reportCount > 3) weight = Math.min(1.0, weight + 0.2);

      return {
        id: c.id,
        title: c.title,
        lat: c.location.lat,
        lng: c.location.lng,
        category: c.categoryName,
        categoryId: c.categoryId,
        priority: c.priority,
        status: c.status,
        address: c.location.address,
        weight
      };
    });

  res.json({ points, total: points.length });
});

// CSV Export data
router.get('/export/csv', (req, res) => {
  const complaints = db.getAllComplaints();
  
  const headers = ['ID', 'Title', 'Category', 'Department', 'Priority', 'Status', 'Location', 'Ward', 'Citizen', 'Reported At', 'SLA Deadline'];
  const rows = complaints.map(c => [
    c.id,
    `"${c.title.replace(/"/g, '""')}"`,
    c.categoryName,
    `"${c.departmentName}"`,
    c.priority,
    c.status,
    `"${(c.location?.address || '').replace(/"/g, '""')}"`,
    `"${c.location?.wardName || ''}"`,
    `"${c.citizenName}"`,
    c.createdAt,
    c.slaDeadline
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="civiceye_complaints_report.csv"');
  res.send(csvContent);
});

export default router;
