export const USER_ROLES = {
  CITIZEN: 'CITIZEN',
  AUTHORITY: 'AUTHORITY',
  ADMIN: 'ADMIN',
};

export const ISSUE_CATEGORIES = [
  { id: 'pothole', name: 'Pothole', departmentId: 'road_maintenance', defaultSeverity: 'High', icon: 'AlertTriangle' },
  { id: 'garbage', name: 'Garbage Overflow', departmentId: 'sanitation', defaultSeverity: 'Medium', icon: 'Trash2' },
  { id: 'water_leakage', name: 'Water Leakage', departmentId: 'water_supply', defaultSeverity: 'High', icon: 'Droplets' },
  { id: 'broken_streetlight', name: 'Broken Streetlight', departmentId: 'electrical', defaultSeverity: 'Medium', icon: 'Lightbulb' },
  { id: 'road_damage', name: 'Road Damage', departmentId: 'road_maintenance', defaultSeverity: 'High', icon: 'Construction' },
  { id: 'drainage', name: 'Drainage Issue / Clogged Drain', departmentId: 'drainage_flood', defaultSeverity: 'High', icon: 'Waves' },
  { id: 'illegal_dumping', name: 'Illegal Dumping', departmentId: 'sanitation', defaultSeverity: 'High', icon: 'Ban' },
  { id: 'damaged_property', name: 'Damaged Public Property', departmentId: 'road_maintenance', defaultSeverity: 'Medium', icon: 'ShieldAlert' },
  { id: 'traffic_signage', name: 'Traffic / Signage Issue', departmentId: 'traffic_mgmt', defaultSeverity: 'Medium', icon: 'Compass' },
  { id: 'other', name: 'Other Civic Issue', departmentId: 'road_maintenance', defaultSeverity: 'Low', icon: 'HelpCircle' }
];

export const DEPARTMENTS = [
  {
    id: 'road_maintenance',
    name: 'Road Maintenance Department',
    shortName: 'Roads & Infra',
    leadOfficer: 'Rajesh Kumar',
    email: 'roads@city.gov',
    phone: '+91 120 245 8890',
    color: '#3b82f6',
    activeTickets: 42,
    resolvedTickets: 312
  },
  {
    id: 'sanitation',
    name: 'Sanitation & Solid Waste Management',
    shortName: 'Sanitation',
    leadOfficer: 'Priya Verma',
    email: 'sanitation@city.gov',
    phone: '+91 120 245 8891',
    color: '#10b981',
    activeTickets: 28,
    resolvedTickets: 489
  },
  {
    id: 'water_supply',
    name: 'Water Supply & Sewerage Board',
    shortName: 'Water Board',
    leadOfficer: 'Amitabh Sen',
    email: 'water@city.gov',
    phone: '+91 120 245 8892',
    color: '#06b6d4',
    activeTickets: 19,
    resolvedTickets: 215
  },
  {
    id: 'electrical',
    name: 'Electrical & Street Lighting Department',
    shortName: 'Electrical',
    leadOfficer: 'Suresh Patel',
    email: 'lighting@city.gov',
    phone: '+91 120 245 8893',
    color: '#f59e0b',
    activeTickets: 15,
    resolvedTickets: 198
  },
  {
    id: 'drainage_flood',
    name: 'Drainage & Stormwater Management',
    shortName: 'Drainage',
    leadOfficer: 'Meera Nair',
    email: 'drainage@city.gov',
    phone: '+91 120 245 8894',
    color: '#6366f1',
    activeTickets: 22,
    resolvedTickets: 140
  },
  {
    id: 'traffic_mgmt',
    name: 'Traffic & Urban Transit Infrastructure',
    shortName: 'Traffic Infra',
    leadOfficer: 'Vikram Singh',
    email: 'traffic@city.gov',
    phone: '+91 120 245 8895',
    color: '#ec4899',
    activeTickets: 8,
    resolvedTickets: 85
  }
];

export const WARDS = [
  { id: 'ward_62', name: 'Ward 18 (Sector 62, Noida)', zone: 'Zone 3 (Central East)', lat: 28.6280, lng: 77.3649 },
  { id: 'ward_15', name: 'Ward 12 (Sector 15, Noida)', zone: 'Zone 1 (West)', lat: 28.5835, lng: 77.3117 },
  { id: 'ward_indirapuram', name: 'Ward 24 (Indirapuram, Ghaziabad)', zone: 'Zone 4 (East)', lat: 28.6415, lng: 77.3714 },
  { id: 'ward_cp', name: 'Ward 31 (Connaught Place, Central)', zone: 'Zone 2 (Central Hub)', lat: 28.6315, lng: 77.2167 },
  { id: 'ward_vaishali', name: 'Ward 45 (Vaishali, Ghaziabad)', zone: 'Zone 4 (East)', lat: 28.6480, lng: 77.3390 },
  { id: 'ward_50', name: 'Ward 08 (Sector 50, Noida)', zone: 'Zone 3 (Central East)', lat: 28.5770, lng: 77.3620 }
];

export const PRIORITIES = {
  P1: { code: 'P1', label: 'Critical', color: '#ef4444', slaHours: 4, badgeBg: 'bg-red-50 text-red-700 border-red-200' },
  P2: { code: 'P2', label: 'High', color: '#f97316', slaHours: 12, badgeBg: 'bg-orange-50 text-orange-700 border-orange-200' },
  P3: { code: 'P3', label: 'Medium', color: '#eab308', slaHours: 24, badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' },
  P4: { code: 'P4', label: 'Low', color: '#3b82f6', slaHours: 48, badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
};

export const COMPLAINT_STATUSES = {
  REPORTED: 'Reported',
  AI_VERIFIED: 'AI Verified',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CITIZEN_VERIFIED: 'Citizen Verified',
  CLOSED: 'Closed'
};
