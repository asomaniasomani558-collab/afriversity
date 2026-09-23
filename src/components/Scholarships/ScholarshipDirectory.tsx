import React, { useState, useMemo } from 'react';
import { SCHOLARSHIPS } from '../../data/scholarships';
import { Scholarship, ScholarshipStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  ExternalLink, 
  Bookmark, 
  Search, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign, 
  GraduationCap 
} from 'lucide-react';

export const ScholarshipDirectory: React.FC = () => {
  const { 
    savedScholarships, 
    toggleSaveScholarship,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS.filter((s) => {
      if (statusFilter !== 'All' && s.deadlineStatus !== statusFilter) {
        return false;
      }
      if (levelFilter !== 'All' && !s.levelOfStudy.includes(levelFilter as any)) {
        return false;
      }
      const query = globalSearchQuery.toLowerCase().trim();
      if (query) {
        const matchesTitle = s.title.toLowerCase().includes(query);
        const matchesProvider = s.provider.toLowerCase().includes(query);
        const matchesRegion = s.countryRegion.toLowerCase().includes(query);
        const matchesDesc = s.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesProvider && !matchesRegion && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [statusFilter, levelFilter, globalSearchQuery]);

  const getStatusBadge = (status: ScholarshipStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-[#EBF2EE] text-[#1B4332] border-[#1B4332]/30';
      case 'Upcoming':
        return 'bg-[#FAF4E5] text-[#8C6215] border-[#D49B37]/40';
      case 'Closed':
        return 'bg-[#F4EFEB] text-[#4A3E35] border-[#D8C7B5]';
      case 'Rolling':
        return 'bg-[#FAF2EB] text-[#C85A32] border-[#C85A32]/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1">
            Real Financial Aid · Pan-Africa & Ghana
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1815]">
            Verified Higher Education Scholarships
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] mt-1 max-w-2xl">
            Explore authentic tertiary scholarships including Mastercard Foundation, MTN Bright, GNPC, and government schemes with transparent deadlines and direct application portals.
          </p>
        </div>

        <div className="text-xs text-[#4A3E35] shrink-0">
          Showing <strong>{filteredScholarships.length}</strong> verified opportunities
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-lg border border-[#E8DFD5] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#4A3E35]/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Search scholarships by name, sponsor, or region (e.g., Mastercard, MTN, GNPC, DAAD)..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#D8C7B5] rounded focus:outline-none focus:border-[#C85A32] text-[#1A1815]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded border border-[#E8DFD5] text-xs">
            <span className="text-[11px] font-medium text-[#4A3E35] px-1.5">Status:</span>
            {['All', 'Active', 'Upcoming', 'Closed'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  statusFilter === s
                    ? 'bg-[#1B4332] text-white font-medium shadow-xs'
                    : 'text-[#4A3E35] hover:text-[#1A1815]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Level filter */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded border border-[#E8DFD5] text-xs">
            <span className="text-[11px] font-medium text-[#4A3E35] px-1.5">Level:</span>
            {['All', 'Undergraduate', 'Postgraduate'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  levelFilter === lvl
                    ? 'bg-[#C85A32] text-white font-medium shadow-xs'
                    : 'text-[#4A3E35] hover:text-[#1A1815]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScholarships.map((s) => {
          const isSaved = savedScholarships.includes(s.id);

          return (
            <div
              key={s.id}
              className="bg-white rounded-lg border border-[#E8DFD5] p-5 flex flex-col justify-between hover:border-[#C85A32] hover:shadow-md transition-all group"
            >
              <div>
                {/* Header: Provider & Status */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C85A32] block">
                      {s.provider}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1A1815] mt-0.5 group-hover:text-[#C85A32] transition-colors">
                      {s.title}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 text-xs font-semibold rounded border ${getStatusBadge(s.deadlineStatus)} shrink-0`}>
                    {s.deadlineStatus}
                  </span>
                </div>

                {/* Unboxed clean metadata (Zero-Pill discipline) */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A3E35] mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C85A32]" />
                    {s.countryRegion}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{s.levelOfStudy.join(' / ')}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#1B4332]">{s.coverageType}</span>
                </div>

                <p className="text-xs text-[#4A3E35] line-clamp-3 leading-relaxed mb-3">
                  {s.description}
                </p>

                {/* Funding summary box */}
                <div className="p-3 bg-[#FAF7F2] rounded border border-[#E8DFD5] mb-3 text-xs">
                  <div className="font-semibold text-[#1B4332] mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#1B4332]" />
                    <span>Funding & Package Coverage:</span>
                  </div>
                  <p className="text-[#4A3E35] leading-relaxed text-[11px]">
                    {s.fundingSummary}
                  </p>
                </div>

                {/* Eligibility highlights */}
                <div className="space-y-1 mb-4 text-xs text-[#4A3E35]">
                  <span className="font-semibold text-[11px] uppercase tracking-wider text-[#4A3E35]/80 block mb-1">
                    Key Eligibility Criteria:
                  </span>
                  {s.eligibilityCriteria.slice(0, 2).map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-[#1B4332] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-[#E8DFD5] flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-[#4A3E35]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>Deadline: <strong>{s.deadline}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveScholarship(s.id)}
                    title={isSaved ? 'Saved to my list' : 'Save scholarship'}
                    className={`p-1.5 rounded border transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-[#FAF2EB] border-[#C85A32] text-[#C85A32]'
                        : 'border-[#E8DFD5] text-[#4A3E35] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  {/* Official Direct Application Link */}
                  <a
                    href={s.officialApplicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Apply on Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Source Verification Note */}
      <div className="p-4 bg-[#EBF2EE] border-l-4 border-[#1B4332] rounded text-xs text-[#143024]">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
          <span>Legitimate Scholarship Verification Guarantee</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          AfriVersity strictly tracks and verifies genuine educational scholarships. We never host scam links, fake lottery grants, or third-party fee aggregators. Applications are processed directly through the official foundation or institution portals shown above.
        </p>
      </div>
    </div>
  );
};
