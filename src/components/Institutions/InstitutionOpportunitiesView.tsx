import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstitutionOpportunity } from '../../types';
import { 
  Award, 
  Plus, 
  ExternalLink, 
  Check, 
  Calendar, 
  Clock, 
  Filter, 
  Search,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const InstitutionOpportunitiesView: React.FC = () => {
  const { 
    user, 
    institutionOpportunities, 
    addInstitutionOpportunity, 
    toggleOpportunityStatus 
  } = useApp();

  const [filter, setFilter] = useState<'All' | 'Active' | 'Closed'>('All');
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<InstitutionOpportunity['type']>('Full Scholarship');
  const [eligibility, setEligibility] = useState('Undergraduate STEM students with WASSCE aggregate 06-10 or needy backgrounds.');
  const [deadline, setDeadline] = useState('2026-11-30');
  const [applicationUrl, setApplicationUrl] = useState(user?.institutionData?.officialWebsite || 'https://ug.edu.gh');

  const institutionName = user?.institutionData?.institutionName || user?.fullName || 'University of Ghana, Legon';

  const myOpportunities = institutionOpportunities.filter(
    o => o.institutionId === user?.id || o.institutionName === institutionName
  );

  const filteredOpportunities = myOpportunities.filter(o => {
    if (filter !== 'All' && o.status !== filter) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addInstitutionOpportunity({
      institutionId: user?.id || 'inst-current',
      institutionName,
      title: title.trim(),
      type,
      eligibility,
      deadline,
      applicationUrl,
      status: 'Active'
    });

    setTitle('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Institution Portal · Funding & Aid</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            Institutional Scholarships & Aid
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Post verified university bursaries, merit scholarships, and tuition waiver schemes for prospective African scholars.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#D49B37]" />
          <span>Post New Scholarship</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-white dark:bg-[#181410] p-1.5 rounded-xl border border-[#E8DFD5] dark:border-[#332A22] w-fit shadow-xs text-xs">
        {(['All', 'Active', 'Closed'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === s
                ? 'bg-[#1B4332] text-white'
                : 'text-[#4A3E35] dark:text-[#E8DFD5]/70 hover:bg-[#FAF4EB] dark:hover:bg-[#25201B]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOpportunities.map((opp) => {
          const isActive = opp.status === 'Active';

          return (
            <div
              key={opp.id}
              className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-5 shadow-xs flex flex-col justify-between space-y-4 text-xs"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EB] dark:bg-[#2E241A] text-[#C85A32] dark:text-[#E6A820] uppercase">
                    {opp.type}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleOpportunityStatus(opp.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'bg-[#EBF4EE] dark:bg-[#18281E] text-[#1B4332] dark:text-[#4EBA87] border border-[#2D6A4F]/30'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}
                    title="Click to toggle Active / Closed status"
                  >
                    <span>{opp.status}</span>
                    <span className="text-[9px] underline ml-0.5">Toggle</span>
                  </button>
                </div>

                <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                  {opp.title}
                </h3>

                <div className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/90 bg-[#FAF7F2] dark:bg-[#1F1915] p-3 rounded-xl border border-[#E8DFD5]/60 dark:border-[#332A22] leading-relaxed">
                  <strong>Eligibility:</strong> {opp.eligibility}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#C85A32] font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Application Deadline: {opp.deadline}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between">
                <span className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50">
                  Posted {opp.createdAt}
                </span>

                <a
                  href={opp.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#FAF4EB] dark:bg-[#2E241A] hover:bg-[#1B4332] hover:text-white border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Portal Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Scholarship Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181410] rounded-2xl p-6 max-w-lg w-full border border-[#E8DFD5] dark:border-[#332A22] shadow-2xl space-y-4 text-xs text-[#1A1815] dark:text-[#FAF7F2]">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B4332] dark:text-[#4EBA87]">
                <Award className="w-4 h-4" />
                <span>Post Institutional Scholarship / Bursary</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#4A3E35] dark:text-[#E8DFD5] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold mb-1">Scholarship / Aid Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Vice-Chancellor's Needy Student Bursary Scheme"
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Funding Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                  >
                    <option value="Full Scholarship">Full Scholarship</option>
                    <option value="Partial Scholarship">Partial Scholarship</option>
                    <option value="Bursary">Need-Based Bursary</option>
                    <option value="Internship">Internship / Work-Study</option>
                    <option value="Research Grant">Undergraduate Research Grant</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Application Deadline *</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Eligibility Criteria *</label>
                <textarea
                  rows={3}
                  required
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  placeholder="Target students, academic minimum, country or regional criteria..."
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Official Application URL *</label>
                <input
                  type="url"
                  required
                  value={applicationUrl}
                  onChange={(e) => setApplicationUrl(e.target.value)}
                  placeholder="https://ug.edu.gh/financial-aid"
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DFD5] dark:border-[#332A22]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-[#4A3E35] dark:text-[#E8DFD5] font-semibold hover:underline cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg shadow-sm cursor-pointer"
                >
                  Publish Scholarship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
