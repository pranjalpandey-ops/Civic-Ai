export const SEED_USERS = [
  {
    id: 'usr_citizen_1',
    name: 'Pranjal Sharma',
    email: 'pranjal@citizen.gov.in',
    role: 'CITIZEN',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    wardId: 'ward_62',
    address: 'Sector 62, Noida, Uttar Pradesh'
  },
  {
    id: 'usr_authority_road',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@city.gov',
    role: 'AUTHORITY',
    departmentId: 'road_maintenance',
    title: 'Senior Executive Engineer (Roads)',
    phone: '+91 120 245 8890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    wardId: 'ward_62'
  },
  {
    id: 'usr_authority_sanitation',
    name: 'Priya Verma',
    email: 'priya.verma@city.gov',
    role: 'AUTHORITY',
    departmentId: 'sanitation',
    title: 'Zonal Sanitation Superintendent',
    phone: '+91 120 245 8891',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    wardId: 'ward_indirapuram'
  },
  {
    id: 'usr_admin',
    name: 'Dr. S. K. Sharma',
    email: 'admin@city.gov',
    role: 'ADMIN',
    title: 'Chief Municipal Commissioner & Urban Operations Lead',
    phone: '+91 120 250 0001',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const SEED_COMPLAINTS = [
  {
    id: 'CE-2026-00124',
    title: 'Large Pothole on Sector 62 Main Arterial Road',
    description: 'Large pothole detected on the road surface. Estimated dimensions: 2.5 ft diameter, significant depth visible. High risk to small vehicles and cyclists. Prompt repair recommended to prevent further degradation of the surrounding asphalt matrix.',
    categoryId: 'pothole',
    categoryName: 'Pothole',
    departmentId: 'road_maintenance',
    departmentName: 'Road Maintenance Department',
    assignedOfficer: 'Rajesh Kumar',
    priority: 'P2',
    severity: 'High',
    status: 'In Progress',
    citizenId: 'usr_citizen_1',
    citizenName: 'Pranjal Sharma',
    citizenPhone: '+91 98765 43210',
    location: {
      address: 'Main Road near Gate 2, Sector 62, Noida',
      lat: 28.6280,
      lng: 77.3649,
      wardId: 'ward_62',
      wardName: 'Ward 18 (Sector 62, Noida)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1000&auto=format&fit=crop&q=80',
    imageFilename: 'IMG_8492_RAW.jpg',
    aiAnalysis: {
      detectedIssue: 'Pothole',
      confidence: 94,
      severity: 'High',
      estimatedPriority: 'P2',
      boundingBox: { x: 30, y: 35, width: 38, height: 32, label: 'Pothole (94%)' },
      timings: {
        imageQuality: '0.12s',
        segmentation: '0.45s',
        classification: '0.89s'
      },
      tags: ['Asphalt Degradation', 'Cavity', 'Traffic Hazard', 'Road Surface'],
      duplicateCheck: {
        similarFound: 0,
        nearestDistanceMeters: null
      }
    },
    reportCount: 4,
    upvotes: 8,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(), // 6 hours ago
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    slaDeadline: new Date(Date.now() + 3600000 * 6).toISOString(),
    timeline: [
      { status: 'Reported', timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), actor: 'Pranjal Sharma (Citizen)', note: 'Complaint submitted via Citizen Mobile Portal with geotagged photo.' },
      { status: 'AI Verified', timestamp: new Date(Date.now() - 3600000 * 5.9).toISOString(), actor: 'CivicEye Neural Vision v2.4', note: 'AI classified as Pothole (94% confidence) with High Severity. Auto-routed to Road Maintenance.' },
      { status: 'Assigned', timestamp: new Date(Date.now() - 3600000 * 4.5).toISOString(), actor: 'Automated Dispatch System', note: 'Work order dispatched to Senior Executive Engineer Rajesh Kumar (Noida Zone 3).' },
      { status: 'In Progress', timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(), actor: 'Rajesh Kumar (Road Maintenance)', note: 'Road repair crew #4 dispatched with quick-setting cold asphalt mix.' }
    ],
    internalNotes: [
      { id: 'note_1', author: 'Rajesh Kumar', text: 'Crew scheduled for tarmac filling by 3:00 PM today. Traffic cones placed.', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() }
    ],
    feedback: null
  },
  {
    id: 'CE-2026-00123',
    title: 'Streetlight Outage near Sector 15 Community Park',
    description: 'High-mast LED streetlight luminaire non-functional for 2 consecutive nights. Area is completely dark, causing safety concerns for women and evening walkers.',
    categoryId: 'broken_streetlight',
    categoryName: 'Broken Streetlight',
    departmentId: 'electrical',
    departmentName: 'Electrical & Street Lighting Department',
    assignedOfficer: 'Suresh Patel',
    priority: 'P4',
    severity: 'Low',
    status: 'Resolved',
    citizenId: 'usr_citizen_1',
    citizenName: 'Pranjal Sharma',
    citizenPhone: '+91 98765 43210',
    location: {
      address: 'Lane 4, Pocket B, Sector 15, Noida',
      lat: 28.5835,
      lng: 77.3117,
      wardId: 'ward_15',
      wardName: 'Ward 12 (Sector 15, Noida)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=1000&auto=format&fit=crop&q=80',
    imageFilename: 'IMG_7719_NIGHT.jpg',
    resolutionImageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1000&auto=format&fit=crop&q=80',
    aiAnalysis: {
      detectedIssue: 'Broken Streetlight',
      confidence: 96,
      severity: 'Low',
      estimatedPriority: 'P4',
      boundingBox: { x: 42, y: 15, width: 22, height: 35, label: 'Streetlight Inactive (96%)' },
      timings: { imageQuality: '0.10s', segmentation: '0.38s', classification: '0.72s' },
      tags: ['Luminaire Failure', 'Electrical Circuit', 'Public Lighting'],
      duplicateCheck: { similarFound: 1, nearestDistanceMeters: 45 }
    },
    reportCount: 2,
    upvotes: 5,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    slaDeadline: new Date(Date.now() + 3600000 * 18).toISOString(),
    timeline: [
      { status: 'Reported', timestamp: new Date(Date.now() - 3600000 * 30).toISOString(), actor: 'Pranjal Sharma (Citizen)', note: 'Complaint filed.' },
      { status: 'AI Verified', timestamp: new Date(Date.now() - 3600000 * 29.9).toISOString(), actor: 'CivicEye Neural Vision', note: 'AI confirmed broken street luminaire.' },
      { status: 'Assigned', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), actor: 'Central Dispatch', note: 'Assigned to Electrical Dept Lineman Team 2.' },
      { status: 'In Progress', timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), actor: 'Suresh Patel (Electrical)', note: 'Faulty MCB replaced and new 90W LED bulb installed.' },
      { status: 'Resolved', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), actor: 'Suresh Patel (Electrical)', note: 'Streetlight tested and fully operational. Resolution photo uploaded.' }
    ],
    internalNotes: [],
    feedback: {
      rating: 5,
      resolved: true,
      comment: 'Very fast resolution! Light is working perfectly now, thank you team.',
      submittedAt: new Date(Date.now() - 3600000 * 3).toISOString()
    }
  },
  {
    id: 'CE-2026-00125',
    title: 'Severe Municipal Waste & Garbage Overflow',
    description: 'Community garbage dumpster overflowing with wet and dry waste spilling across pedestrian sidewalk. Stray animals gathering and hazardous foul odor spreading near residential apartments.',
    categoryId: 'garbage',
    categoryName: 'Garbage Overflow',
    departmentId: 'sanitation',
    departmentName: 'Sanitation & Solid Waste Management',
    assignedOfficer: 'Priya Verma',
    priority: 'P1',
    severity: 'Critical',
    status: 'Reported',
    citizenId: 'usr_citizen_2',
    citizenName: 'Aarav Gupta',
    citizenPhone: '+91 98111 22334',
    location: {
      address: 'Near Shipra Mall Road, Ahinsa Khand 2, Indirapuram',
      lat: 28.6415,
      lng: 77.3714,
      wardId: 'ward_indirapuram',
      wardName: 'Ward 24 (Indirapuram, Ghaziabad)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=1000&auto=format&fit=crop&q=80',
    imageFilename: 'GARBAGE_DUMP_01.jpg',
    aiAnalysis: {
      detectedIssue: 'Garbage Overflow',
      confidence: 97,
      severity: 'Critical',
      estimatedPriority: 'P1',
      boundingBox: { x: 20, y: 25, width: 60, height: 55, label: 'Overflowing Bin (97%)' },
      timings: { imageQuality: '0.14s', segmentation: '0.48s', classification: '0.91s' },
      tags: ['Solid Waste', 'Sidewalk Obstruction', 'Health Risk', 'Sanitation'],
      duplicateCheck: { similarFound: 2, nearestDistanceMeters: 30 }
    },
    reportCount: 7,
    upvotes: 14,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    slaDeadline: new Date(Date.now() + 3600000 * 2).toISOString(),
    timeline: [
      { status: 'Reported', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), actor: 'Aarav Gupta (Citizen)', note: 'Complaint logged with photo evidence.' },
      { status: 'AI Verified', timestamp: new Date(Date.now() - 3600000 * 1.9).toISOString(), actor: 'CivicEye Neural Vision', note: 'P1 Critical escalation triggered due to health hazard and high report volume.' }
    ],
    internalNotes: [],
    feedback: null
  },
  {
    id: 'CE-2026-00126',
    title: 'Underground Clean Water Main Pipeline Burst & Flooding',
    description: 'High-pressure municipal potable water pipeline leaking thousands of liters per minute onto street. Clean water flooding carriage-way and causing severe soil erosion under footpath.',
    categoryId: 'water_leakage',
    categoryName: 'Water Leakage',
    departmentId: 'water_supply',
    departmentName: 'Water Supply & Sewerage Board',
    assignedOfficer: 'Amitabh Sen',
    priority: 'P1',
    severity: 'Critical',
    status: 'In Progress',
    citizenId: 'usr_citizen_3',
    citizenName: 'Rohan Mehra',
    citizenPhone: '+91 98222 33445',
    location: {
      address: 'Outer Circle near Block B, Connaught Place, New Delhi',
      lat: 28.6315,
      lng: 77.2167,
      wardId: 'ward_cp',
      wardName: 'Ward 31 (Connaught Place, Central)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1000&auto=format&fit=crop&q=80',
    imageFilename: 'WATER_LEAK_CP.jpg',
    aiAnalysis: {
      detectedIssue: 'Water Leakage',
      confidence: 95,
      severity: 'Critical',
      estimatedPriority: 'P1',
      boundingBox: { x: 25, y: 40, width: 50, height: 45, label: 'Pipeline Burst (95%)' },
      timings: { imageQuality: '0.11s', segmentation: '0.42s', classification: '0.85s' },
      tags: ['Water Loss', 'Flooding Hazard', 'Pipeline Pressure'],
      duplicateCheck: { similarFound: 3, nearestDistanceMeters: 15 }
    },
    reportCount: 9,
    upvotes: 21,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    slaDeadline: new Date(Date.now() - 3600000 * 1).toISOString(), // Breached
    timeline: [
      { status: 'Reported', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), actor: 'Rohan Mehra (Citizen)', note: 'Reported with GPS tag.' },
      { status: 'AI Verified', timestamp: new Date(Date.now() - 3600000 * 4.9).toISOString(), actor: 'CivicEye Neural Vision', note: 'Critical water waste detected.' },
      { status: 'Assigned', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), actor: 'Emergency Dispatch', note: 'Assigned to Water Board Rapid Response Team #1.' },
      { status: 'In Progress', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), actor: 'Amitabh Sen (Water Board)', note: 'Main valve isolated. Excavation underway to replace 400mm ductile iron pipe joint.' }
    ],
    internalNotes: [
      { id: 'note_2', author: 'Amitabh Sen', text: 'Valve #12 shut down. Water tanker dispatched to CP Block B for emergency supply.', timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString() }
    ],
    feedback: null
  },
  {
    id: 'CE-2026-00127',
    title: 'Stormwater Drain Clogged with Construction Debris',
    description: 'Drainage culvert completely blocked with silt, plastic waste and construction debris. Rainwater backing up during monsoon downpours.',
    categoryId: 'drainage',
    categoryName: 'Drainage Issue / Clogged Drain',
    departmentId: 'drainage_flood',
    departmentName: 'Drainage & Stormwater Management',
    assignedOfficer: 'Meera Nair',
    priority: 'P3',
    severity: 'Medium',
    status: 'Assigned',
    citizenId: 'usr_citizen_4',
    citizenName: 'Sneha Kapoor',
    citizenPhone: '+91 98333 44556',
    location: {
      address: 'Near Sector 50 Central Market, Noida',
      lat: 28.5770,
      lng: 77.3620,
      wardId: 'ward_50',
      wardName: 'Ward 08 (Sector 50, Noida)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&auto=format&fit=crop&q=80',
    imageFilename: 'DRAIN_CLOG_50.jpg',
    aiAnalysis: {
      detectedIssue: 'Drainage Issue',
      confidence: 91,
      severity: 'Medium',
      estimatedPriority: 'P3',
      boundingBox: { x: 15, y: 30, width: 70, height: 40, label: 'Clogged Grate (91%)' },
      timings: { imageQuality: '0.13s', segmentation: '0.40s', classification: '0.79s' },
      tags: ['Stormwater Blockage', 'Silt Accumulation', 'Urban Drainage'],
      duplicateCheck: { similarFound: 0, nearestDistanceMeters: null }
    },
    reportCount: 1,
    upvotes: 3,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    slaDeadline: new Date(Date.now() + 3600000 * 6).toISOString(),
    timeline: [
      { status: 'Reported', timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), actor: 'Sneha Kapoor (Citizen)', note: 'Submitted via Web.' },
      { status: 'AI Verified', timestamp: new Date(Date.now() - 3600000 * 17.9).toISOString(), actor: 'CivicEye Neural Vision', note: 'Classified as Medium Severity drainage block.' },
      { status: 'Assigned', timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), actor: 'Central Dispatch', note: 'Assigned to Desilting Super Sucker Unit #3.' }
    ],
    internalNotes: [],
    feedback: null
  },
  {
    id: 'CE-2026-00128',
    title: 'Broken Traffic Direction Signpost near Metro Station',
    description: 'Major overhead intersection sign knocked down by storm, partially blocking left turning lane and causing traffic confusion during rush hour.',
    categoryId: 'traffic_signage',
    categoryName: 'Traffic / Signage Issue',
    departmentId: 'traffic_mgmt',
    departmentName: 'Traffic & Urban Transit Infrastructure',
    assignedOfficer: 'Vikram Singh',
    priority: 'P3',
    severity: 'Medium',
    status: 'Resolved',
    citizenId: 'usr_citizen_1',
    citizenName: 'Pranjal Sharma',
    citizenPhone: '+91 98765 43210',
    location: {
      address: 'Vaishali Metro Station Pillar 42, Ghaziabad',
      lat: 28.6480,
      lng: 77.3390,
      wardId: 'ward_vaishali',
      wardName: 'Ward 45 (Vaishali, Ghaziabad)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=1000&auto=format&fit=crop&q=80',
    imageFilename: 'TRAFFIC_SIGN_VSH.jpg',
    resolutionImageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1000&auto=format&fit=crop&q=80',
    aiAnalysis: {
      detectedIssue: 'Traffic / Signage Issue',
      confidence: 93,
      severity: 'Medium',
      estimatedPriority: 'P3',
      boundingBox: { x: 35, y: 20, width: 30, height: 50, label: 'Damaged Sign (93%)' },
      timings: { imageQuality: '0.12s', segmentation: '0.41s', classification: '0.81s' },
      tags: ['Signage Damage', 'Traffic Obstruction', 'Transit Safety'],
      duplicateCheck: { similarFound: 0, nearestDistanceMeters: null }
    },
    reportCount: 3,
    upvotes: 6,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    slaDeadline: new Date(Date.now() - 3600000 * 24).toISOString(),
    timeline: [
      { status: 'Reported', timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), actor: 'Pranjal Sharma (Citizen)', note: 'Reported with photo.' },
      { status: 'AI Verified', timestamp: new Date(Date.now() - 3600000 * 47.9).toISOString(), actor: 'CivicEye Neural Vision', note: 'Classified.' },
      { status: 'Assigned', timestamp: new Date(Date.now() - 3600000 * 36).toISOString(), actor: 'Central Dispatch', note: 'Assigned to Traffic Maintenance.' },
      { status: 'In Progress', timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), actor: 'Vikram Singh', note: 'New post fabricated and re-anchored.' },
      { status: 'Resolved', timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), actor: 'Vikram Singh', note: 'Sign reinstalled and repainted. Complete.' }
    ],
    internalNotes: [],
    feedback: {
      rating: 4,
      resolved: true,
      comment: 'Good work, traffic flow is back to normal.',
      submittedAt: new Date(Date.now() - 3600000 * 8).toISOString()
    }
  }
];

export const SEED_NOTIFICATIONS = [
  {
    id: 'notif_1',
    userId: 'usr_citizen_1',
    title: 'Work Order Dispatched',
    message: 'Your complaint CE-2026-00124 (Pothole on Sector 62) has been assigned to Road Maintenance Lead Rajesh Kumar and is now In Progress.',
    type: 'status_update',
    complaintId: 'CE-2026-00124',
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString()
  },
  {
    id: 'notif_2',
    userId: 'usr_citizen_1',
    title: 'Issue Resolved & Verification Required',
    message: 'Complaint CE-2026-00123 (Streetlight Outage) has been marked Resolved. Please verify and submit feedback.',
    type: 'resolution',
    complaintId: 'CE-2026-00123',
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'notif_3',
    userId: 'usr_authority_road',
    title: 'New High Priority Ticket Assigned',
    message: 'High Priority P2 complaint #CE-2026-00124 detected in your ward (Sector 62). SLA: 12 Hours.',
    type: 'urgent_dispatch',
    complaintId: 'CE-2026-00124',
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 4.5).toISOString()
  },
  {
    id: 'notif_4',
    userId: 'usr_authority_sanitation',
    title: 'P1 Critical Health Hazard Escalation',
    message: 'Severe garbage overflow reported at Indirapuram (#CE-2026-00125). 7 citizen reports aggregated. Immediate dispatch required.',
    type: 'critical_alert',
    complaintId: 'CE-2026-00125',
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];
