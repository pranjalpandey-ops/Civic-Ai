import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  UploadCloud,
  Sparkles,
  Camera,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Image as ImageIcon,
  Edit3,
  Layers,
  Check,
  Building,
  ShieldAlert
} from 'lucide-react';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { fetchApi } from '../../utils/api';
import { SAMPLE_REPORT_PRESETS } from '../../utils/sampleImages';
import { AIScanningModal } from '../../components/ai/AIScanningModal';
import { DuplicateAlertModal } from '../../components/ai/DuplicateAlertModal';
import { LocationPickerMap } from '../../components/maps/LocationPickerMap';
import { BoundingBoxViewer } from '../../components/common/BoundingBoxViewer';
import { PriorityBadge } from '../../components/common/Badge';

export function ReportIssuePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEmergency = searchParams.get('emergency') === 'true';

  const { submitComplaint, joinDuplicate } = useComplaints();
  const { user } = useAuth();
  const { t } = useLanguage();

  // Wizard Steps: 1: Image & Sample, 2: AI Review & Details, 3: GPS Location, 4: Submission Complete
  const [step, setStep] = useState(1);
  const [scanning, setScanning] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [duplicatesFound, setDuplicatesFound] = useState([]);
  const [createdComplaintId, setCreatedComplaintId] = useState(null);

  // Form state
  const [selectedImage, setSelectedImage] = useState(SAMPLE_REPORT_PRESETS[0].url);
  const [imageFilename, setImageFilename] = useState(SAMPLE_REPORT_PRESETS[0].filename);
  const [userHint, setUserHint] = useState('');
  
  // AI analysis state
  const [aiData, setAiData] = useState({
    detectedIssue: 'Pothole',
    categoryId: 'pothole',
    confidence: 94,
    severity: isEmergency ? 'Critical' : 'High',
    estimatedPriority: isEmergency ? 'P1' : 'P2',
    suggestedDepartment: 'Road Maintenance Department',
    departmentId: 'road_maintenance',
    boundingBox: { x: 30, y: 35, width: 38, height: 32, label: 'Pothole (94%)' },
    title: isEmergency ? 'CRITICAL: Severe Road Hazard' : 'Large Pothole on Sector 62 Main Road',
    generatedDescription: 'Large pothole detected on the road surface. High risk to small vehicles and cyclists. Prompt repair recommended.',
    timings: { imageQuality: '0.12s', segmentation: '0.45s', classification: '0.89s' }
  });

  // Location state
  const [location, setLocation] = useState({
    address: 'Main Road near Gate 2, Sector 62, Noida',
    lat: 28.6280,
    lng: 77.3649,
    wardId: 'ward_62',
    wardName: 'Ward 18 (Sector 62, Noida)'
  });

  // Handle local file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setImageFilename(file.name);
    }
  };

  // Select sample preset
  const handleSelectPreset = (preset) => {
    setSelectedImage(preset.url);
    setImageFilename(preset.filename);
    setLocation({
      address: preset.address,
      lat: preset.lat,
      lng: preset.lng,
      wardId: preset.wardId,
      wardName: preset.wardName
    });
  };

  // Trigger AI Analysis
  const handleStartAnalysis = async () => {
    setScanning(true);
    try {
      const res = await fetchApi('/ai/analyze', {
        method: 'POST',
        body: JSON.stringify({
          imageUrl: selectedImage,
          filename: imageFilename,
          userHint,
          locationHint: location.address
        }),
      });

      if (res) {
        setAiData({
          ...res,
          severity: isEmergency ? 'Critical' : res.severity,
          estimatedPriority: isEmergency ? 'P1' : res.estimatedPriority
        });
      }
    } catch (err) {
      console.warn('AI analysis API error, using default analysis engine:', err);
    }
  };

  const handleScanFinished = () => {
    setScanning(false);
    setStep(2); // Advance to AI results review
  };

  // Check for duplicates before final submission
  const handleCheckDuplicatesAndProceed = async () => {
    try {
      const res = await fetchApi('/complaints/check-duplicates', {
        method: 'POST',
        body: JSON.stringify({
          lat: location.lat,
          lng: location.lng,
          categoryId: aiData.categoryId,
          thresholdMeters: 150
        }),
      });

      if (res && res.hasDuplicate && res.duplicates.length > 0) {
        setDuplicatesFound(res.duplicates);
        setDuplicateModalOpen(true);
      } else {
        await executeFinalSubmission();
      }
    } catch (err) {
      console.warn('Duplicate check failed, submitting directly:', err);
      await executeFinalSubmission();
    }
  };

  // Final ticket creation
  const executeFinalSubmission = async () => {
    const newComplaint = await submitComplaint({
      title: aiData.title,
      description: aiData.generatedDescription,
      categoryId: aiData.categoryId,
      categoryName: aiData.detectedIssue,
      departmentId: aiData.departmentId,
      departmentName: aiData.suggestedDepartment,
      priority: aiData.estimatedPriority,
      severity: aiData.severity,
      location,
      imageUrl: selectedImage,
      imageFilename,
      aiAnalysis: aiData
    });

    setCreatedComplaintId(newComplaint.id);
    setDuplicateModalOpen(false);
    setStep(4); // Success step
  };

  const handleJoinDuplicate = async (targetId) => {
    await joinDuplicate(targetId);
    setDuplicateModalOpen(false);
    navigate(`/complaints/${targetId}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Top Breadcrumb Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => step > 1 && step < 4 ? setStep(step - 1) : navigate('/citizen')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400">Step {step} of 3</span>
          </div>
        </div>

        {/* Wizard Stepper Indicators */}
        <div className="grid grid-cols-3 gap-2">
          <div className={`h-1.5 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          <div className={`h-1.5 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          <div className={`h-1.5 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
        </div>

        {/* STEP 1: Upload or Capture Photo */}
        {step === 1 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                <Camera className="w-4 h-4" />
                <span>Step 1 • Visual Evidence Capture</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                {isEmergency ? '🚨 Emergency Civic Incident Reporting' : 'Report a Civic Issue with a Single Photo'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Upload a photo of the problem. Our AI will automatically detect the issue, measure severity, extract GPS, and route the ticket.
              </p>
            </div>

            {/* Photo Preview & Upload Dropzone */}
            <div className="space-y-4">
              <div className="relative rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 transition-colors p-4 bg-slate-50 text-center overflow-hidden">
                {selectedImage ? (
                  <div className="relative max-h-72 w-full rounded-xl overflow-hidden shadow-inner flex items-center justify-center bg-slate-950">
                    <img
                      src={selectedImage}
                      alt="Selected issue"
                      className="max-h-72 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-mono text-[11px] px-2.5 py-1 rounded-md">
                      {imageFilename}
                    </div>
                  </div>
                ) : (
                  <div className="py-10 space-y-2">
                    <UploadCloud className="w-10 h-10 text-slate-400 mx-auto" />
                    <p className="text-sm font-semibold text-slate-700">Drag & drop photo here or click to browse</p>
                    <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP (Max 15MB)</p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* One-Click Realistic Sample Presets for Quick Testing */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Or test instantly with sample presets:</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {SAMPLE_REPORT_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2 rounded-xl border text-left text-xs transition-all flex flex-col items-center gap-1.5 ${
                        selectedImage === preset.url
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 font-bold text-blue-700'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-12 rounded-lg object-cover"
                      />
                      <span className="truncate w-full text-center text-[11px]">{preset.categoryName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action button: Analyze with AI */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={handleStartAnalysis}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Analyze with AI →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: AI Issue Analysis Review (Matching Requirements & Reference Screen 5) */}
        {step === 2 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Step 2 • AI Triage & Bounding Box Inspection</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  AI Incident Classification
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Confidence: {aiData.confidence}%
              </span>
            </div>

            {/* Split View: Bounding Box Viewer + Structured Complaint Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left: Image with Bounding Box Overlay */}
              <div>
                <BoundingBoxViewer
                  imageUrl={selectedImage}
                  imageFilename={imageFilename}
                  boundingBox={aiData.boundingBox}
                  showBox={true}
                />

                {/* Timing breakdown tag */}
                <div className="mt-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Quality: {aiData.timings?.imageQuality || '0.12s'}</span>
                  <span>Seg: {aiData.timings?.segmentation || '0.45s'}</span>
                  <span>Classify: {aiData.timings?.classification || '0.89s'}</span>
                </div>
              </div>

              {/* Right: AI-Generated Fields (Editable) */}
              <div className="space-y-4 text-xs">
                
                {/* Detected Issue Category */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Detected Civic Issue</label>
                  <input
                    type="text"
                    value={aiData.detectedIssue}
                    onChange={(e) => setAiData({ ...aiData, detectedIssue: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white"
                  />
                </div>

                {/* Severity & Priority */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">AI Severity</label>
                    <select
                      value={aiData.severity}
                      onChange={(e) => setAiData({ ...aiData, severity: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Estimated Priority</label>
                    <select
                      value={aiData.estimatedPriority}
                      onChange={(e) => setAiData({ ...aiData, estimatedPriority: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                    >
                      <option value="P1">P1 — Critical (4h SLA)</option>
                      <option value="P2">P2 — High (12h SLA)</option>
                      <option value="P3">P3 — Medium (24h SLA)</option>
                      <option value="P4">P4 — Low (48h SLA)</option>
                    </select>
                  </div>
                </div>

                {/* Suggested Department Routing */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Auto-Routed Municipal Department</span>
                    <span className="text-blue-600 text-[10px] font-mono">⚡ AI Routing</span>
                  </label>
                  <div className="flex items-center gap-2 p-2.5 bg-blue-50/70 border border-blue-100 rounded-lg text-blue-900 font-semibold">
                    <Building className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{aiData.suggestedDepartment}</span>
                  </div>
                </div>

                {/* Auto-Generated Title */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Complaint Title</label>
                  <input
                    type="text"
                    value={aiData.title}
                    onChange={(e) => setAiData({ ...aiData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white"
                  />
                </div>

                {/* Auto-Generated Description */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">AI Structured Description</label>
                  <textarea
                    rows={3}
                    value={aiData.generatedDescription}
                    onChange={(e) => setAiData({ ...aiData, generatedDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <span>Confirm & Set GPS Location →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GPS Geolocation & Submit */}
        {step === 3 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>Step 3 • GPS Geolocation & Spatial Verification</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Verify Incident Location
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Adjust the pin on the map or click "Use Current Location" to ensure municipal teams arrive at the exact spot.
              </p>
            </div>

            {/* Location Picker Map */}
            <LocationPickerMap
              location={location}
              onChange={(updatedLoc) => setLocation(updatedLoc)}
            />

            {/* Summary Ticket Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{aiData.title}</h4>
                <PriorityBadge priority={aiData.estimatedPriority} />
              </div>
              <p className="text-xs text-slate-600">{aiData.generatedDescription}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 font-mono">
                <span>Routing to: {aiData.suggestedDepartment}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleCheckDuplicatesAndProceed}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Submit Complaint Ticket</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success View */}
        {step === 4 && (
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Complaint Registered Successfully!
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your issue has been processed by AI, assigned a tracking number, and dispatched to the municipal department.
              </p>
              <div className="inline-block mt-3 px-4 py-2 bg-blue-50 rounded-xl border border-blue-200 font-mono text-base font-bold text-blue-700">
                Ticket ID: #{createdComplaintId}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => navigate(`/complaints/${createdComplaintId}`)}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span>Track Incident Lifecycle Timeline →</span>
              </button>
              <button
                onClick={() => navigate('/citizen')}
                className="w-full sm:w-auto px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Animated Scanning Modal */}
      <AIScanningModal
        isOpen={scanning}
        imageUrl={selectedImage}
        onComplete={handleScanFinished}
      />

      {/* Spatial Duplicate Alert Modal */}
      <DuplicateAlertModal
        isOpen={duplicateModalOpen}
        duplicates={duplicatesFound}
        onJoin={handleJoinDuplicate}
        onSubmitNew={executeFinalSubmission}
        onCancel={() => setDuplicateModalOpen(false)}
      />
    </div>
  );
}
