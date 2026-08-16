import { PRIORITIES } from '../config/constants.js';

/**
 * Calculates priority score and returns P1-P4 category with breakdown
 * Factors:
 * 1. AI Severity: Critical (+40), High (+30), Medium (+20), Low (+10)
 * 2. Report Count: up to +30 points (5 points per additional report)
 * 3. Location Importance: Major Arterial/Metro/Hospital (+20), Commercial (+10), Residential (+5)
 * 4. Hazard Risk: Waterlogging, High Voltage, Deep Pothole (+15)
 */
export function calculatePriorityScore({
  severity = 'Medium',
  reportCount = 1,
  category = 'pothole',
  locationName = '',
  hazardKeywords = []
}) {
  let score = 0;
  const breakdown = [];

  // Severity Weight
  const severityMap = {
    'Critical': 40,
    'High': 30,
    'Medium': 20,
    'Low': 10
  };
  const sevScore = severityMap[severity] || 20;
  score += sevScore;
  breakdown.push({ factor: 'AI Severity Assessment', points: sevScore, detail: severity });

  // Report Volume Weight
  const reportWeight = Math.min((reportCount - 1) * 6, 30);
  if (reportWeight > 0) {
    score += reportWeight;
    breakdown.push({ factor: 'Aggregated Citizen Reports', points: reportWeight, detail: `${reportCount} reports` });
  }

  // Location Sensitivity
  const lowerLoc = (locationName || '').toLowerCase();
  let locScore = 5;
  let locDetail = 'Standard Zone';
  if (lowerLoc.includes('main road') || lowerLoc.includes('highway') || lowerLoc.includes('metro') || lowerLoc.includes('hospital') || lowerLoc.includes('school')) {
    locScore = 20;
    locDetail = 'High Traffic / Sensitive Arterial Corridor';
  } else if (lowerLoc.includes('market') || lowerLoc.includes('central') || lowerLoc.includes('sector')) {
    locScore = 12;
    locDetail = 'Commercial Hub';
  }
  score += locScore;
  breakdown.push({ factor: 'Location Traffic Density', points: locScore, detail: locDetail });

  // Hazard Category Specific
  const criticalCategories = ['water_leakage', 'drainage', 'pothole'];
  if (criticalCategories.includes(category)) {
    score += 10;
    breakdown.push({ factor: 'Public Safety Vulnerability', points: 10, detail: 'High impact infrastructure' });
  }

  // Determine Priority tier
  let priorityTier = 'P3';
  if (score >= 75) {
    priorityTier = 'P1';
  } else if (score >= 55) {
    priorityTier = 'P2';
  } else if (score >= 35) {
    priorityTier = 'P3';
  } else {
    priorityTier = 'P4';
  }

  return {
    score: Math.min(score, 100),
    priority: priorityTier,
    priorityDetails: PRIORITIES[priorityTier],
    slaHours: PRIORITIES[priorityTier].slaHours,
    breakdown
  };
}
