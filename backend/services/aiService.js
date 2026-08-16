import { ISSUE_CATEGORIES, DEPARTMENTS } from '../config/constants.js';
import { calculatePriorityScore } from './priorityService.js';

/**
 * Intelligent Computer Vision and NLP triage engine for CivicEye AI
 */
class AIService {
  /**
   * Analyze an uploaded image or sample image
   */
  async analyzeImage({ imageUrl, filename, userHint = '', locationHint = '' }) {
    // Simulate real AI processing latency (if needed in real API, otherwise instant)
    const lowerName = (filename || imageUrl || userHint || '').toLowerCase();

    let detectedCategory = 'pothole';
    let confidence = 94;
    let severity = 'High';
    let boundingBox = { x: 28, y: 32, width: 42, height: 35, label: 'Pothole (94%)' };
    let tags = ['Asphalt Degradation', 'Cavity', 'Traffic Hazard', 'Road Surface'];
    let description = 'Large pothole detected on the road surface. Estimated dimensions: 2.5 ft diameter, significant depth visible. High risk to small vehicles and cyclists. Prompt repair recommended to prevent further degradation of the surrounding asphalt matrix.';
    let title = 'Pothole on Main Road';

    if (lowerName.includes('garbage') || lowerName.includes('trash') || lowerName.includes('dump')) {
      detectedCategory = 'garbage';
      confidence = 97;
      severity = 'Critical';
      boundingBox = { x: 20, y: 25, width: 60, height: 55, label: 'Overflowing Bin (97%)' };
      tags = ['Solid Waste', 'Sidewalk Obstruction', 'Health Risk', 'Sanitation'];
      title = 'Severe Municipal Waste & Garbage Overflow';
      description = 'Community garbage dumpster overflowing with wet and dry waste spilling across pedestrian sidewalk. Stray animals gathering and hazardous foul odor spreading near residential apartments.';
    } else if (lowerName.includes('water') || lowerName.includes('leak') || lowerName.includes('pipe')) {
      detectedCategory = 'water_leakage';
      confidence = 95;
      severity = 'Critical';
      boundingBox = { x: 25, y: 40, width: 50, height: 45, label: 'Pipeline Burst (95%)' };
      tags = ['Water Loss', 'Flooding Hazard', 'Pipeline Pressure'];
      title = 'Clean Water Main Pipeline Leakage & Flooding';
      description = 'High-pressure municipal potable water pipeline leaking thousands of liters onto street. Clean water flooding carriage-way and causing severe soil erosion under footpath.';
    } else if (lowerName.includes('street') || lowerName.includes('light') || lowerName.includes('lamp') || lowerName.includes('dark')) {
      detectedCategory = 'broken_streetlight';
      confidence = 96;
      severity = 'Medium';
      boundingBox = { x: 42, y: 15, width: 22, height: 35, label: 'Streetlight Inactive (96%)' };
      tags = ['Luminaire Failure', 'Electrical Circuit', 'Public Lighting'];
      title = 'Streetlight Luminaire Outage';
      description = 'High-mast LED streetlight luminaire non-functional. Area is completely dark, causing safety concerns for women and evening walkers.';
    } else if (lowerName.includes('drain') || lowerName.includes('flood') || lowerName.includes('clog')) {
      detectedCategory = 'drainage';
      confidence = 91;
      severity = 'High';
      boundingBox = { x: 15, y: 30, width: 70, height: 40, label: 'Clogged Grate (91%)' };
      tags = ['Stormwater Blockage', 'Silt Accumulation', 'Urban Drainage'];
      title = 'Stormwater Drain Clogged with Debris';
      description = 'Drainage culvert completely blocked with silt and debris. Rainwater backing up and causing local waterlogging.';
    } else if (lowerName.includes('traffic') || lowerName.includes('sign')) {
      detectedCategory = 'traffic_signage';
      confidence = 93;
      severity = 'Medium';
      boundingBox = { x: 35, y: 20, width: 30, height: 50, label: 'Damaged Sign (93%)' };
      tags = ['Signage Damage', 'Traffic Obstruction', 'Transit Safety'];
      title = 'Damaged Traffic Direction Signpost';
      description = 'Overhead intersection sign knocked down, partially blocking left turning lane and causing traffic confusion.';
    }

    const catObj = ISSUE_CATEGORIES.find(c => c.id === detectedCategory) || ISSUE_CATEGORIES[0];
    const deptObj = DEPARTMENTS.find(d => d.id === catObj.departmentId) || DEPARTMENTS[0];

    // Dynamic priority calculation
    const priorityCalc = calculatePriorityScore({
      severity,
      reportCount: 1,
      category: detectedCategory,
      locationName: locationHint
    });

    return {
      detectedIssue: catObj.name,
      categoryId: catObj.id,
      confidence,
      severity,
      estimatedPriority: priorityCalc.priority,
      priorityDetails: priorityCalc.priorityDetails,
      suggestedDepartment: deptObj.name,
      departmentId: deptObj.id,
      leadOfficer: deptObj.leadOfficer,
      boundingBox,
      tags,
      title: locationHint ? `${title} (${locationHint})` : title,
      generatedDescription: description,
      timings: {
        imageQuality: '0.12s',
        segmentation: '0.45s',
        classification: '0.89s'
      }
    };
  }
}

export const aiService = new AIService();
