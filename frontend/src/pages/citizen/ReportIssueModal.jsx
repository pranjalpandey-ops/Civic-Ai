import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  UploadCloud,
  Sparkles,
  Camera,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Building,
  Check,
  ShieldAlert,
  BrainCircuit,
  LocateFixed,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { fetchApi } from '../../utils/api';

import { SAMPLE_REPORT_PRESETS } from '../../utils/sampleImages';

import { AIScanningModal } from '../../components/ai/AIScanningModal';
import { DuplicateAlertModal } from '../../components/ai/DuplicateAlertModal';
import { LocationPickerMap } from '../../components/maps/LocationPickerMap';
import { BoundingBoxViewer } from '../../components/common/BoundingBoxViewer';
import { PriorityBadge } from '../../components/common/Badge';

import { Sidebar } from '../../components/common/Sidebar';

export function ReportIssuePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isEmergency =
    searchParams.get('emergency') === 'true';

  const { submitComplaint, joinDuplicate } =
    useComplaints();

  const { user } = useAuth();

  const [step, setStep] = useState(1);

  const [scanning, setScanning] = useState(false);

  const [duplicateModalOpen, setDuplicateModalOpen] =
    useState(false);

  const [duplicatesFound, setDuplicatesFound] =
    useState([]);

  const [createdComplaintId, setCreatedComplaintId] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState(SAMPLE_REPORT_PRESETS[0].url);

  const [imageFilename, setImageFilename] =
    useState(SAMPLE_REPORT_PRESETS[0].filename);

  const [userHint, setUserHint] = useState('');

  const [aiData, setAiData] = useState({
    detectedIssue: 'Pothole',
    categoryId: 'pothole',
    confidence: 94,
    severity: isEmergency ? 'Critical' : 'High',
    estimatedPriority: isEmergency ? 'P1' : 'P2',
    suggestedDepartment: 'Road Maintenance Department',
    departmentId: 'road_maintenance',
    boundingBox: {
      x: 30,
      y: 35,
      width: 38,
      height: 32,
      label: 'Pothole (94%)'
    },
    title: isEmergency
      ? 'CRITICAL: Severe Road Hazard'
      : 'Large Pothole on Sector 62 Main Road',
    generatedDescription:
      'Large pothole detected on the road surface. High risk to small vehicles and cyclists. Prompt repair recommended.',
    timings: {
      imageQuality: '0.12s',
      segmentation: '0.45s',
      classification: '0.89s'
    }
  });

  const [location, setLocation] = useState({
    address: 'Main Road near Gate 2, Sector 62, Noida',
    lat: 28.6280,
    lng: 77.3649,
    wardId: 'ward_62',
    wardName: 'Ward 18 (Sector 62, Noida)'
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setSelectedImage(url);
    setImageFilename(file.name);
  };

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
        })
      });

      if (res) {
        setAiData({
          ...res,
          severity: isEmergency
            ? 'Critical'
            : res.severity,
          estimatedPriority: isEmergency
            ? 'P1'
            : res.estimatedPriority
        });
      }
    } catch (err) {
      console.warn(
        'AI analysis API error:',
        err
      );
    }
  };

  const handleScanFinished = () => {
    setScanning(false);
    setStep(2);
  };

  const handleCheckDuplicatesAndProceed =
    async () => {
      try {
        const res = await fetchApi(
          '/complaints/check-duplicates',
          {
            method: 'POST',
            body: JSON.stringify({
              lat: location.lat,
              lng: location.lng,
              categoryId: aiData.categoryId,
              thresholdMeters: 150
            })
          }
        );

        if (
          res &&
          res.hasDuplicate &&
          res.duplicates.length > 0
        ) {
          setDuplicatesFound(res.duplicates);
          setDuplicateModalOpen(true);
        } else {
          await executeFinalSubmission();
        }
      } catch (err) {
        console.warn(
          'Duplicate check failed:',
          err
        );

        await executeFinalSubmission();
      }
    };

  const executeFinalSubmission =
    async () => {
      const newComplaint =
        await submitComplaint({
          title: aiData.title,
          description:
            aiData.generatedDescription,
          categoryId: aiData.categoryId,
          categoryName:
            aiData.detectedIssue,
          departmentId:
            aiData.departmentId,
          departmentName:
            aiData.suggestedDepartment,
          priority:
            aiData.estimatedPriority,
          severity: aiData.severity,
          location,
          imageUrl: selectedImage,
          imageFilename,
          aiAnalysis: aiData
        });

      setCreatedComplaintId(
        newComplaint.id
      );

      setDuplicateModalOpen(false);
      setStep(4);
    };

  const handleJoinDuplicate = async (
    targetId
  ) => {
    await joinDuplicate(targetId);

    setDuplicateModalOpen(false);

    navigate(
      `/complaints/${targetId}`
    );
  };

  const stepTitles = [
    'Visual Evidence',
    'AI Analysis',
    'Location',
    'Complete'
  ];

  return (
    <div className="min-h-screen bg-[#060914] text-slate-100 flex">

      <Sidebar type="citizen" />

      <main className="flex-1 min-w-0 overflow-y-auto">

        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-10 py-7">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">

            <button
              onClick={() =>
                step > 1 && step < 4
                  ? setStep(step - 1)
                  : navigate('/citizen')
              }
              className="
                inline-flex items-center gap-2
                text-xs font-bold
                text-slate-500
                hover:text-white
                transition-colors
              "
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>

            <div className="
              px-3 py-1.5
              rounded-full
              bg-white/[0.03]
              border border-white/[0.07]
              text-[10px]
              font-mono
              text-slate-500
            ">
              STEP {Math.min(step, 3)} / 3
            </div>
          </div>

          {/* HERO */}
          <div className="
            relative overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-[#10182d]
            via-[#0b1020]
            to-[#080c16]
            border border-white/[0.08]
            p-6 sm:p-8
            mb-6
            shadow-[0_25px_70px_rgba(0,0,0,0.35)]
          ">

            <div className="
              absolute
              -right-20
              -top-32
              w-72 h-72
              rounded-full
              bg-blue-600/15
              blur-3xl
            " />

            <div className="
              absolute
              -left-20
              -bottom-32
              w-64 h-64
              rounded-full
              bg-purple-600/10
              blur-3xl
            " />

            <div className="relative">

              <div className="flex items-center gap-3">

                <div className="
                  w-11 h-11
                  rounded-2xl
                  bg-blue-500/10
                  border border-blue-500/20
                  flex items-center justify-center
                  shadow-[0_0_30px_rgba(59,130,246,0.12)]
                ">
                  {isEmergency ? (
                    <ShieldAlert className="w-5 h-5 text-red-400" />
                  ) : (
                    <BrainCircuit className="w-5 h-5 text-blue-400" />
                  )}
                </div>

                <div>

                  <p className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-blue-400
                  ">
                    CivicEye AI
                  </p>

                  <h1 className="
                    text-2xl sm:text-3xl
                    font-black
                    text-white
                    tracking-tight
                  ">
                    {isEmergency
                      ? 'Emergency Incident'
                      : 'Report a Civic Issue'}
                  </h1>
                </div>
              </div>

              <p className="
                text-xs sm:text-sm
                text-slate-500
                max-w-2xl
                mt-4
                leading-6
              ">
                Upload one photo and let CivicEye AI
                classify the issue, estimate severity,
                route it to the correct authority and
                verify its location.
              </p>

              {/* STEPPER */}
              <div className="
                grid grid-cols-3
                gap-2
                mt-7
              ">

                {[1, 2, 3].map((item) => (

                  <div key={item}>

                    <div className={`
                      h-1.5
                      rounded-full
                      ${
                        step >= item
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                          : 'bg-white/[0.06]'
                      }
                    `} />

                    <p className={`
                      text-[9px]
                      font-bold
                      mt-2
                      ${
                        step >= item
                          ? 'text-blue-400'
                          : 'text-slate-700'
                      }
                    `}>
                      {item}. {stepTitles[item - 1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================
              STEP 1
          ======================================== */}
          {step === 1 && (

            <section className="
              rounded-3xl
              bg-[#0b101d]
              border border-white/[0.07]
              shadow-[0_25px_65px_rgba(0,0,0,0.3)]
              overflow-hidden
            ">

              <div className="p-5 sm:p-7">

                <div className="mb-6">

                  <div className="
                    flex items-center gap-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-blue-400
                    mb-2
                  ">
                    <Camera className="w-4 h-4" />
                    Step 1 • Visual Evidence
                  </div>

                  <h2 className="
                    text-xl sm:text-2xl
                    font-black
                    text-white
                  ">
                    Capture the civic issue
                  </h2>

                  <p className="
                    text-xs
                    text-slate-500
                    mt-2
                  ">
                    Upload a clear image. Our AI
                    will inspect it automatically.
                  </p>
                </div>

                {/* UPLOAD */}
                <div className="
                  relative
                  rounded-3xl
                  border border-white/[0.08]
                  bg-black/30
                  p-3
                  overflow-hidden
                ">

                  {selectedImage ? (

                    <div className="
                      relative
                      h-72 sm:h-96
                      rounded-2xl
                      overflow-hidden
                      bg-black
                    ">

                      <img
                        src={selectedImage}
                        alt="Selected civic issue"
                        className="
                          w-full h-full
                          object-cover
                        "
                      />

                      <div className="
                        absolute
                        left-3 top-3
                        px-3 py-1.5
                        rounded-xl
                        bg-black/70
                        backdrop-blur-xl
                        border border-white/10
                        text-[10px]
                        font-mono
                        text-white
                      ">
                        {imageFilename}
                      </div>

                      <div className="
                        absolute
                        right-3 bottom-3
                        px-3 py-1.5
                        rounded-xl
                        bg-emerald-500/90
                        text-white
                        text-[10px]
                        font-bold
                        flex items-center gap-1.5
                      ">
                        <CheckCircle2 className="w-3 h-3" />
                        Image Ready
                      </div>
                    </div>

                  ) : (

                    <div className="
                      h-72
                      flex flex-col
                      items-center
                      justify-center
                    ">
                      <UploadCloud className="w-10 h-10 text-slate-600" />

                      <p className="text-sm font-bold text-slate-400 mt-3">
                        Drop your image here
                      </p>

                      <p className="text-[10px] text-slate-600 mt-1">
                        JPG, PNG or WEBP • Max 15MB
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="
                      absolute inset-0
                      opacity-0
                      cursor-pointer
                    "
                  />
                </div>

                {/* PRESETS */}
                <div className="mt-6">

                  <div className="
                    flex items-center gap-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-500
                    mb-3
                  ">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Quick Test Presets
                  </div>

                  <div className="
                    grid
                    grid-cols-2
                    sm:grid-cols-5
                    gap-3
                  ">

                    {SAMPLE_REPORT_PRESETS.map(
                      (preset) => {

                        const selected =
                          selectedImage ===
                          preset.url;

                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() =>
                              handleSelectPreset(
                                preset
                              )
                            }
                            className={`
                              p-2
                              rounded-2xl
                              border
                              text-left
                              transition-all
                              ${
                                selected
                                  ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.12)]'
                                  : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05]'
                              }
                            `}
                          >

                            <img
                              src={preset.url}
                              alt={preset.name}
                              className="
                                w-full h-14
                                rounded-xl
                                object-cover
                              "
                            />

                            <span className="
                              block
                              text-[10px]
                              font-bold
                              text-slate-400
                              text-center
                              mt-2
                              truncate
                            ">
                              {preset.categoryName}
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* USER HINT */}
                <div className="mt-6">

                  <label className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-slate-500
                    font-bold
                  ">
                    Optional Description
                  </label>

                  <textarea
                    value={userHint}
                    onChange={(e) =>
                      setUserHint(e.target.value)
                    }
                    rows={3}
                    placeholder="Tell AI anything important about the issue..."
                    className="
                      mt-2
                      w-full
                      rounded-2xl
                      bg-white/[0.03]
                      border border-white/[0.07]
                      p-3
                      text-xs text-white
                      placeholder:text-slate-700
                      resize-none
                      focus:outline-none
                      focus:border-blue-500/40
                    "
                  />
                </div>

                <div className="
                  flex justify-end
                  pt-6 mt-6
                  border-t border-white/[0.06]
                ">

                  <button
                    onClick={handleStartAnalysis}
                    className="
                      w-full sm:w-auto
                      px-7 py-3.5
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      hover:from-blue-500
                      hover:to-indigo-500
                      text-white
                      text-xs font-bold
                      shadow-[0_15px_35px_rgba(37,99,235,0.3)]
                      hover:-translate-y-0.5
                      transition-all
                      flex items-center
                      justify-center gap-2
                    "
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Analyze with CivicEye AI
                  </button>
                </div>

              </div>
            </section>
          )}

          {/* ========================================
              STEP 2
          ======================================== */}
          {step === 2 && (

            <section className="
              rounded-3xl
              bg-[#0b101d]
              border border-white/[0.07]
              shadow-[0_25px_65px_rgba(0,0,0,0.3)]
              overflow-hidden
            ">

              <div className="p-5 sm:p-7">

                <div className="
                  flex flex-col sm:flex-row
                  sm:items-center
                  justify-between
                  gap-4
                  mb-6
                ">

                  <div>
                    <div className="
                      flex items-center gap-2
                      text-[10px]
                      uppercase
                      tracking-widest
                      font-bold
                      text-emerald-400
                    ">
                      <BrainCircuit className="w-4 h-4" />
                      AI Analysis Complete
                    </div>

                    <h2 className="
                      text-xl sm:text-2xl
                      font-black
                      text-white
                      mt-1
                    ">
                      Review AI Classification
                    </h2>
                  </div>

                  <div className="
                    px-3 py-2
                    rounded-xl
                    bg-emerald-500/10
                    border border-emerald-500/20
                    text-emerald-400
                    text-[10px]
                    font-bold
                  ">
                    {aiData.confidence}% Confidence
                  </div>
                </div>

                <div className="
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  gap-6
                ">

                  <div>

                    <BoundingBoxViewer
                      imageUrl={selectedImage}
                      imageFilename={imageFilename}
                      boundingBox={aiData.boundingBox}
                      showBox={true}
                    />

                    <div className="
                      mt-3
                      grid grid-cols-3
                      gap-2
                    ">

                      <div className="
                        p-2.5
                        rounded-xl
                        bg-white/[0.025]
                        border border-white/[0.06]
                      ">
                        <p className="text-[9px] text-slate-600">
                          IMAGE
                        </p>

                        <p className="text-[10px] font-mono text-slate-400 mt-1">
                          {aiData.timings?.imageQuality || '0.12s'}
                        </p>
                      </div>

                      <div className="
                        p-2.5
                        rounded-xl
                        bg-white/[0.025]
                        border border-white/[0.06]
                      ">
                        <p className="text-[9px] text-slate-600">
                          SEGMENT
                        </p>

                        <p className="text-[10px] font-mono text-slate-400 mt-1">
                          {aiData.timings?.segmentation || '0.45s'}
                        </p>
                      </div>

                      <div className="
                        p-2.5
                        rounded-xl
                        bg-white/[0.025]
                        border border-white/[0.06]
                      ">
                        <p className="text-[9px] text-slate-600">
                          CLASSIFY
                        </p>

                        <p className="text-[10px] font-mono text-slate-400 mt-1">
                          {aiData.timings?.classification || '0.89s'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Detected Issue
                      </label>

                      <input
                        value={aiData.detectedIssue}
                        onChange={(e) =>
                          setAiData({
                            ...aiData,
                            detectedIssue:
                              e.target.value
                          })
                        }
                        className="
                          mt-2
                          w-full
                          px-3 py-3
                          rounded-xl
                          bg-white/[0.03]
                          border border-white/[0.07]
                          text-xs font-bold text-white
                          focus:outline-none
                          focus:border-blue-500/40
                        "
                      />
                    </div>

                    <div className="
                      grid grid-cols-2
                      gap-3
                    ">

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Severity
                        </label>

                        <select
                          value={aiData.severity}
                          onChange={(e) =>
                            setAiData({
                              ...aiData,
                              severity:
                                e.target.value
                            })
                          }
                          className="
                            mt-2
                            w-full
                            px-3 py-3
                            rounded-xl
                            bg-[#101625]
                            border border-white/[0.07]
                            text-xs font-bold text-white
                            focus:outline-none
                          "
                        >
                          <option>Critical</option>
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Priority
                        </label>

                        <select
                          value={aiData.estimatedPriority}
                          onChange={(e) =>
                            setAiData({
                              ...aiData,
                              estimatedPriority:
                                e.target.value
                            })
                          }
                          className="
                            mt-2
                            w-full
                            px-3 py-3
                            rounded-xl
                            bg-[#101625]
                            border border-white/[0.07]
                            text-xs font-bold text-white
                            focus:outline-none
                          "
                        >
                          <option value="P1">
                            P1 — Critical
                          </option>
                          <option value="P2">
                            P2 — High
                          </option>
                          <option value="P3">
                            P3 — Medium
                          </option>
                          <option value="P4">
                            P4 — Low
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      ">
                        AI Department Routing
                      </label>

                      <div className="
                        mt-2
                        p-3
                        rounded-xl
                        bg-blue-500/[0.06]
                        border border-blue-500/15
                        flex items-center gap-3
                      ">
                        <div className="
                          w-9 h-9
                          rounded-xl
                          bg-blue-500/10
                          flex items-center
                          justify-center
                        ">
                          <Building className="w-4 h-4 text-blue-400" />
                        </div>

                        <div>
                          <p className="text-xs font-bold text-white">
                            {aiData.suggestedDepartment}
                          </p>

                          <p className="text-[9px] text-blue-400 mt-0.5">
                            ⚡ AI AUTO ROUTING
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      ">
                        Complaint Title
                      </label>

                      <input
                        value={aiData.title}
                        onChange={(e) =>
                          setAiData({
                            ...aiData,
                            title: e.target.value
                          })
                        }
                        className="
                          mt-2
                          w-full
                          px-3 py-3
                          rounded-xl
                          bg-white/[0.03]
                          border border-white/[0.07]
                          text-xs font-bold text-white
                          focus:outline-none
                          focus:border-blue-500/40
                        "
                      />
                    </div>

                    <div>
                      <label className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      ">
                        AI Description
                      </label>

                      <textarea
                        rows={4}
                        value={
                          aiData.generatedDescription
                        }
                        onChange={(e) =>
                          setAiData({
                            ...aiData,
                            generatedDescription:
                              e.target.value
                          })
                        }
                        className="
                          mt-2
                          w-full
                          px-3 py-3
                          rounded-xl
                          bg-white/[0.03]
                          border border-white/[0.07]
                          text-xs text-slate-300
                          focus:outline-none
                          focus:border-blue-500/40
                          resize-none
                          leading-5
                        "
                      />
                    </div>

                  </div>
                </div>

                <div className="
                  flex items-center
                  justify-between
                  gap-3
                  mt-7 pt-5
                  border-t border-white/[0.06]
                ">

                  <button
                    onClick={() => setStep(1)}
                    className="
                      px-5 py-2.5
                      rounded-xl
                      border border-white/[0.08]
                      text-xs font-bold
                      text-slate-500
                      hover:text-white
                      hover:bg-white/[0.04]
                    "
                  >
                    Back
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="
                      px-6 py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      text-white
                      text-xs font-bold
                      shadow-[0_12px_30px_rgba(37,99,235,0.25)]
                      flex items-center gap-2
                    "
                  >
                    Confirm & Set Location
                    <LocateFixed className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ========================================
              STEP 3
          ======================================== */}
          {step === 3 && (

            <section className="
              rounded-3xl
              bg-[#0b101d]
              border border-white/[0.07]
              shadow-[0_25px_65px_rgba(0,0,0,0.3)]
              overflow-hidden
            ">

              <div className="p-5 sm:p-7">

                <div className="mb-6">

                  <div className="
                    flex items-center gap-2
                    text-[10px]
                    uppercase
                    tracking-widest
                    font-bold
                    text-cyan-400
                  ">
                    <MapPin className="w-4 h-4" />
                    Step 3 • Spatial Verification
                  </div>

                  <h2 className="
                    text-xl sm:text-2xl
                    font-black
                    text-white
                    mt-1
                  ">
                    Confirm incident location
                  </h2>

                  <p className="
                    text-xs
                    text-slate-500
                    mt-2
                  ">
                    Make sure the pin accurately represents
                    where the civic issue is located.
                  </p>
                </div>

                <div className="
                  rounded-2xl
                  overflow-hidden
                  border border-white/[0.08]
                ">
                  <LocationPickerMap
                    location={location}
                    onChange={(updatedLoc) =>
                      setLocation(updatedLoc)
                    }
                  />
                </div>

                {/* SUMMARY */}
                <div className="
                  mt-5
                  p-4
                  rounded-2xl
                  bg-white/[0.025]
                  border border-white/[0.07]
                ">

                  <div className="
                    flex flex-col sm:flex-row
                    sm:items-center
                    justify-between
                    gap-3
                  ">

                    <div>

                      <p className="text-[9px] uppercase tracking-widest text-slate-600">
                        AI Classified Incident
                      </p>

                      <h3 className="text-sm font-bold text-white mt-1">
                        {aiData.title}
                      </h3>

                    </div>

                    <PriorityBadge
                      priority={aiData.estimatedPriority}
                    />
                  </div>

                  <p className="
                    text-xs
                    text-slate-500
                    leading-5
                    mt-3
                  ">
                    {aiData.generatedDescription}
                  </p>

                  <div className="
                    flex flex-wrap
                    items-center
                    gap-3
                    mt-4
                    pt-3
                    border-t border-white/[0.05]
                    text-[10px]
                    text-slate-600
                  ">

                    <span className="flex items-center gap-1.5">
                      <Building className="w-3 h-3" />
                      {aiData.suggestedDepartment}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      {location.address}
                    </span>
                  </div>
                </div>

                <div className="
                  flex items-center
                  justify-between
                  gap-3
                  mt-6 pt-5
                  border-t border-white/[0.06]
                ">

                  <button
                    onClick={() => setStep(2)}
                    className="
                      px-5 py-2.5
                      rounded-xl
                      border border-white/[0.08]
                      text-xs font-bold
                      text-slate-500
                      hover:text-white
                      hover:bg-white/[0.04]
                    "
                  >
                    Back
                  </button>

                  <button
                    onClick={
                      handleCheckDuplicatesAndProceed
                    }
                    className="
                      px-6 sm:px-8 py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      hover:from-blue-500
                      hover:to-indigo-500
                      text-white
                      text-xs font-bold
                      shadow-[0_15px_35px_rgba(37,99,235,0.3)]
                      hover:-translate-y-0.5
                      transition-all
                      flex items-center gap-2
                    "
                  >
                    <Check className="w-4 h-4" />
                    Submit Complaint
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ========================================
              STEP 4 SUCCESS
          ======================================== */}
          {step === 4 && (

            <section className="
              relative overflow-hidden
              rounded-3xl
              bg-gradient-to-br
              from-[#101c22]
              via-[#0b1518]
              to-[#080c16]
              border border-emerald-500/15
              shadow-[0_30px_80px_rgba(0,0,0,0.4)]
              p-8 sm:p-12
              text-center
            ">

              <div className="
                absolute
                left-1/2 top-0
                -translate-x-1/2
                w-72 h-72
                rounded-full
                bg-emerald-500/10
                blur-3xl
              " />

              <div className="relative">

                <div className="
                  w-20 h-20
                  rounded-3xl
                  bg-emerald-500/10
                  border border-emerald-500/20
                  flex items-center justify-center
                  mx-auto
                  shadow-[0_0_50px_rgba(16,185,129,0.12)]
                ">
                  <FileCheck2 className="w-9 h-9 text-emerald-400" />
                </div>

                <p className="
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  font-bold
                  text-emerald-400
                  mt-6
                ">
                  Successfully Registered
                </p>

                <h2 className="
                  text-2xl sm:text-3xl
                  font-black
                  text-white
                  mt-2
                ">
                  Your civic report is live
                </h2>

                <p className="
                  max-w-lg mx-auto
                  text-xs
                  text-slate-500
                  leading-6
                  mt-3
                ">
                  CivicEye AI has analyzed your evidence,
                  created a tracking ticket and routed the
                  incident to the appropriate municipal team.
                </p>

                <div className="
                  inline-flex
                  items-center gap-2
                  mt-6
                  px-5 py-3
                  rounded-2xl
                  bg-blue-500/10
                  border border-blue-500/20
                  text-blue-400
                  font-mono
                  text-sm font-bold
                ">
                  <CheckCircle2 className="w-4 h-4" />
                  #{createdComplaintId}
                </div>

                <div className="
                  flex flex-col
                  sm:flex-row
                  justify-center
                  gap-3
                  mt-8
                ">

                  <button
                    onClick={() =>
                      navigate(
                        `/complaints/${createdComplaintId}`
                      )
                    }
                    className="
                      px-6 py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      text-white
                      text-xs font-bold
                      shadow-[0_15px_35px_rgba(37,99,235,0.3)]
                      flex items-center
                      justify-center gap-2
                    "
                  >
                    Track Complaint
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() =>
                      navigate('/citizen')
                    }
                    className="
                      px-6 py-3
                      rounded-xl
                      border border-white/[0.08]
                      bg-white/[0.02]
                      text-slate-400
                      hover:text-white
                      hover:bg-white/[0.05]
                      text-xs font-bold
                    "
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </section>
          )}

        </div>
      </main>

      <AIScanningModal
        isOpen={scanning}
        imageUrl={selectedImage}
        onComplete={handleScanFinished}
      />

      <DuplicateAlertModal
        isOpen={duplicateModalOpen}
        duplicates={duplicatesFound}
        onJoin={handleJoinDuplicate}
        onSubmitNew={executeFinalSubmission}
        onCancel={() =>
          setDuplicateModalOpen(false)
        }
      />

    </div>
  );
}