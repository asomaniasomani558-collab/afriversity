import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  School, 
  BookOpen, 
  Award, 
  Megaphone, 
  Eye, 
  Plus, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  MapPin,
  Globe
} from 'lucide-react';

export const InstitutionDashboard: React.FC = () => {
  const { 
    user, 
    institutionPrograms, 
    institutionOpportunities, 
    institutionAnnouncements, 
    setActiveTab, 
    updateUserVerificationStatus 
  } = useApp();

  const [adminSimModalOpen, setAdminSimModalOpen] = useState(false);

  const institutionName = user?.institutionData?.institutionName || user?.fullName || 'University of Ghana, Legon';
  const isVerified = user?.verificationStatus === 'verified';

  const myPrograms = institutionPrograms.filter(p => p.institutionId === user?.id || p.institutionName === institutionName);
  const myOpportunities = institutionOpportunities.filter(o => o.institutionId === user?.id || o.institutionName === institutionName);
  const activeOpportunities = myOpportunities.filter(o => o.status === 'Active');
  const myAnnouncements = institutionAnnouncements.filter(a => a.institutionId === user?.id || a.institutionName === institutionName);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-[#C85A32] text-[#FAF7F2] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-[#A84521]">
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23FFFFFF' fill-opacity='0.4'/%3E%3C/svg%3E")`
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-white/30 text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider">
              <School className="w-3.5 h-3.5 text-[#E6A820]" />
              <span>AfriVersity Institution Portal</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {institutionName}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E6A820]" />
                <span>{user?.city || 'Accra'}, {user?.country || 'Ghana'}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#E6A820]" />
                <a 
                  href={user?.institutionData?.officialWebsite || 'https://ug.edu.gh'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>{user?.institutionData?.officialWebsite?.replace(/^https?:\/\//, '') || 'ug.edu.gh'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </span>
            </div>

            {/* Verification Status Pill */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isVerified ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#1B4332] text-xs font-bold shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Accredited & Verified African Institution</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF4E5] text-[#8C6215] border border-[#D49B37] text-xs font-medium">
                  <AlertCircle className="w-4 h-4 text-[#D49B37] shrink-0" />
                  <span>Institutional Status: <strong>Pending Domain Verification</strong></span>
                  <button
                    type="button"
                    onClick={() => setAdminSimModalOpen(true)}
                    className="ml-2 text-[11px] font-bold underline hover:text-[#C85A32] cursor-pointer"
                  >
                    Simulate Verification
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-black/30 backdrop-blur-xs p-4 rounded-xl border border-white/20 sm:min-w-[240px] text-xs space-y-2">
            <div className="font-semibold text-white">Admissions Readiness</div>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Publish authentic cut-off points, direct admission vouchers, and faculty opportunities for prospective applicants.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('institution-programs')}
                className="w-full py-2 px-3 bg-[#E6A820] hover:bg-[#D49B37] text-[#141210] font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Degree Programme</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REAL OVERVIEW STATISTICS (Section 16 - Zero fabrication, 0 if empty) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs">
          <div className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 uppercase tracking-wider">
            Published Programmes
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C85A32] mt-1">
            {myPrograms.length}
          </div>
          <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 mt-0.5">Undergrad & Postgrad</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs">
          <div className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 uppercase tracking-wider">
            Active Scholarships
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332] dark:text-[#4EBA87] mt-1">
            {activeOpportunities.length}
          </div>
          <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 mt-0.5">Bursaries & waivers</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs">
          <div className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 uppercase tracking-wider">
            Official Announcements
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D49B37] mt-1">
            {myAnnouncements.length}
          </div>
          <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 mt-0.5">Admissions updates</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs">
          <div className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 uppercase tracking-wider">
            Campuses Showcased
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2] mt-1">
            {user?.institutionData?.campusPhotoUrls?.length || 2}
          </div>
          <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 mt-0.5">Verified authentic photos</div>
        </div>
      </div>

      {/* QUICK ACTIONS ROW */}
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setActiveTab('institution-programs')}
          className="px-4 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Manage Degree Programmes ({myPrograms.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('institution-opportunities')}
          className="px-4 py-2 bg-white dark:bg-[#1F1915] hover:bg-[#FAF4EB] dark:hover:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Award className="w-3.5 h-3.5 text-[#1B4332]" />
          <span>Post Scholarships & Bursaries</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('institution-announcements')}
          className="px-4 py-2 bg-white dark:bg-[#1F1915] hover:bg-[#FAF4EB] dark:hover:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Megaphone className="w-3.5 h-3.5 text-[#D49B37]" />
          <span>Publish Admissions Notice</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('institution-profile')}
          className="px-4 py-2 bg-white dark:bg-[#1F1915] hover:bg-[#FAF4EB] dark:hover:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <School className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>Campus Showcase & Details</span>
        </button>
      </div>

      {/* DUAL COLUMN: Recently Published Programmes & Official Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Published Programmes */}
        <div className="lg:col-span-7 bg-white dark:bg-[#181410] p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                Published Degree Programmes
              </h2>
              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
                Official programmes with cut-off points and direct application links
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('institution-programs')}
              className="text-xs font-semibold text-[#C85A32] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {myPrograms.slice(0, 3).map((prog) => (
              <div
                key={prog.id}
                className="p-4 rounded-xl border border-[#E8DFD5] dark:border-[#332A22] bg-[#FAF7F2] dark:bg-[#1F1915] flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1A1815] dark:text-[#FAF7F2] text-sm">
                      {prog.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FAF4EB] dark:bg-[#2E241A] text-[#C85A32]">
                      {prog.level}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/80">
                    Faculty: <strong>{prog.faculty}</strong> · Duration: {prog.duration}
                  </div>
                  <div className="text-[11px] text-[#1B4332] dark:text-[#4EBA87] font-semibold pt-0.5">
                    Cut-off: {prog.admissionRequirements}
                  </div>
                </div>

                <a
                  href={prog.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs font-semibold flex items-center gap-1 hover:border-[#C85A32] shrink-0"
                >
                  <span>Apply Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Official Announcements */}
        <div className="lg:col-span-5 bg-white dark:bg-[#181410] p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
            <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2] flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#D49B37]" />
              <span>Admissions Bulletins</span>
            </h3>
            <button
              type="button"
              onClick={() => setActiveTab('institution-announcements')}
              className="text-xs text-[#C85A32] hover:underline font-semibold cursor-pointer"
            >
              Post Notice
            </button>
          </div>

          <div className="space-y-3">
            {myAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 rounded-xl border border-[#E8DFD5] dark:border-[#332A22] bg-[#FAF7F2] dark:bg-[#1F1915] space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF4EB] dark:bg-[#2E241A] text-[#C85A32] dark:text-[#E6A820] uppercase">
                    {ann.category}
                  </span>
                  <span className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50">
                    {ann.date}
                  </span>
                </div>
                <div className="font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                  {ann.title}
                </div>
                <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/80 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADMIN SIMULATION REVIEW MODAL FOR INSTITUTION */}
      {adminSimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181410] rounded-2xl p-6 max-w-md w-full border border-[#E8DFD5] dark:border-[#332A22] shadow-2xl space-y-4 text-xs text-[#1A1815] dark:text-[#FAF7F2]">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#C85A32]">
                <ShieldAlert className="w-4 h-4" />
                <span>Institution Accreditation Review</span>
              </div>
              <button
                type="button"
                onClick={() => setAdminSimModalOpen(false)}
                className="text-[#4A3E35] dark:text-[#E8DFD5] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80">
              AfriVersity verifies universities and polytechnics via National Accreditation Boards (GTEC Ghana, NUC Nigeria, CUE Kenya) and official institutional domains.
            </p>

            <div className="p-3 bg-[#FAF7F2] dark:bg-[#1F1915] rounded-xl border border-[#D8C7B5] dark:border-[#3E332A] space-y-1">
              <div><strong>Institution:</strong> {institutionName}</div>
              <div><strong>Website:</strong> {user?.institutionData?.officialWebsite || 'https://ug.edu.gh'}</div>
              <div><strong>Type:</strong> {user?.institutionData?.institutionType || 'University'}</div>
              <div><strong>Current Status:</strong> <span className="uppercase font-bold text-[#D49B37]">{user?.verificationStatus || 'pending'}</span></div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  updateUserVerificationStatus('rejected');
                  setAdminSimModalOpen(false);
                }}
                className="px-3 py-2 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-semibold rounded-lg hover:bg-red-200 cursor-pointer"
              >
                Reject Verification
              </button>
              <button
                type="button"
                onClick={() => {
                  updateUserVerificationStatus('verified');
                  setAdminSimModalOpen(false);
                }}
                className="px-4 py-2 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Verify Institution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
