import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity, OpportunityType, OpportunityField } from '../../types';
import { 
  OPPORTUNITY_TYPES, 
  OPPORTUNITY_FIELDS, 
  WORK_ARRANGEMENTS 
} from '../../data/opportunitiesData';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Bookmark, 
  Filter, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  DollarSign, 
  ArrowRight, 
  X, 
  Award,
  Users,
  Code2,
  AlertCircle
} from 'lucide-react';

export const OpportunitiesExplorer: React.FC = () => {
  const { 
    opportunities, 
    savedOpportunities, 
    toggleSaveOpportunity 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [selectedField, setSelectedField] = useState<string>('All Fields');
  const [selectedMode, setSelectedMode] = useState<string>('All Modes');
  const [selectedCountry, setSelectedCountry] = useState<string>('All Locations');
  const [activeModalOpportunity, setActiveModalOpportunity] = useState<Opportunity | null>(null);

  const sampleSearchQueries = [
    'Software Engineering Internship',
    'Data Science Internship',
    'Ghana internships',
    'Remote internships',
    'African scholarships',
    'Hackathons',
    'Graduate programmes'
  ];

  const uniqueCountries = useMemo(() => {
    const set = new Set<string>();
    opportunities.forEach(opp => {
      if (opp.country) {
        opp.country.split('&').forEach(c => set.add(c.trim()));
      }
    });
    return ['All Locations', ...Array.from(set)];
  }, [opportunities]);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      // Type Filter
      if (selectedType !== 'All Types' && opp.type !== selectedType) {
        return false;
      }

      // Field Filter
      if (selectedField !== 'All Fields' && opp.category !== selectedField) {
        return false;
      }

      // Mode Filter
      if (selectedMode !== 'All Modes' && opp.remote !== selectedMode) {
        return false;
      }

      // Country Filter
      if (selectedCountry !== 'All Locations' && !opp.country.toLowerCase().includes(selectedCountry.toLowerCase())) {
        return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesOrg = opp.organization.toLowerCase().includes(q);
        const matchesDesc = opp.description.toLowerCase().includes(q);
        const matchesLocation = opp.location.toLowerCase().includes(q);
        const matchesCountry = opp.country.toLowerCase().includes(q);
        const matchesSkills = opp.skills.some(s => s.toLowerCase().includes(q));
        const matchesType = opp.type.toLowerCase().includes(q);
        const matchesField = opp.category.toLowerCase().includes(q);

        if (!matchesTitle && !matchesOrg && !matchesDesc && !matchesLocation && !matchesCountry && !matchesSkills && !matchesType && !matchesField) {
          return false;
        }
      }

      return true;
    });
  }, [opportunities, selectedType, selectedField, selectedMode, selectedCountry, searchQuery]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setSelectedField('All Fields');
    setSelectedMode('All Modes');
    setSelectedCountry('All Locations');
  };

  const hasActiveFilters = searchQuery !== '' || selectedType !== 'All Types' || selectedField !== 'All Fields' || selectedMode !== 'All Modes' || selectedCountry !== 'All Locations';

  return (
    <div className="space-y-8">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B4332] via-[#143225] to-[#0D1F17] text-white p-6 sm:p-10 md:p-12 shadow-xl border border-[#235841]">
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/10 backdrop-blur-xs text-[#E6A820] text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AfriVersity Opportunity Hub</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">
            Find Your Next Opportunity
          </h1>

          <p className="text-sm sm:text-base text-[#E8DFD5]/90 max-w-2xl leading-relaxed mb-6 font-light">
            Discover internships, fellowships, graduate jobs, competitions, volunteering opportunities, and hackathons across Africa and beyond. Only authentic positions from verified official career portals.
          </p>

          {/* Prominent Search Bar */}
          <div className="relative flex items-center bg-white dark:bg-[#1A1815] rounded-xl shadow-lg border-2 border-[#D8C7B5] dark:border-[#3E332A] p-1.5 focus-within:border-[#C85A32] transition-all">
            <Search className="w-5 h-5 text-[#4A3E35]/60 dark:text-[#E8DFD5]/60 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search opportunities (e.g., Software Engineering Internship, Ghana, Remote, Google, AfDB)..."
              className="w-full px-3 py-2.5 text-xs sm:text-sm text-[#1A1815] dark:text-[#FAF7F2] bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-[#4A3E35] dark:text-[#E8DFD5] hover:text-[#C85A32] cursor-pointer mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {}}
              className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs sm:text-sm font-semibold rounded-lg shrink-0 transition-colors shadow-xs"
            >
              Search
            </button>
          </div>

          {/* Quick Search Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#E8DFD5]/70 font-medium">Popular:</span>
            {sampleSearchQueries.map((query) => (
              <button
                key={query}
                onClick={() => setSearchQuery(query)}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[#FAF7F2] text-[11px] transition-colors cursor-pointer border border-white/10"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Source Integrity Badge in bottom right */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#E8DFD5]/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E6A820]" />
            <span className="font-medium">Zero-Fabrication Policy: All positions link to verified official employer platforms</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Direct Company Applications</span>
            <span>·</span>
            <span>No Application Intermediary Fees</span>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <section className="bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Type Chips Navigation */}
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#C85A32]" />
              Opportunity Types
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#C85A32] hover:underline font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {OPPORTUNITY_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedType === type
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-[#FAF7F2] dark:bg-[#25201B] text-[#4A3E35] dark:text-[#E8DFD5] hover:bg-[#E8DFD5]/50 dark:hover:bg-[#2E2822]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E8DFD5] dark:border-[#332A22]">
          {/* Field / Category */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-1">
              Field of Study / Discipline
            </label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-[#1A1815] dark:text-[#FAF7F2] focus:outline-none focus:border-[#C85A32]"
            >
              {OPPORTUNITY_FIELDS.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Work Arrangement */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-1">
              Work Arrangement
            </label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-[#1A1815] dark:text-[#FAF7F2] focus:outline-none focus:border-[#C85A32]"
            >
              {WORK_ARRANGEMENTS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Location / Country */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-1">
              Geographic Region
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-[#1A1815] dark:text-[#FAF7F2] focus:outline-none focus:border-[#C85A32]"
            >
              {uniqueCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 3. OPPORTUNITY RESULTS COUNTER & SUMMARY */}
      <div className="flex items-center justify-between text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80 px-1">
        <div>
          Showing <strong>{filteredOpportunities.length}</strong> verified {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'}
          {hasActiveFilters && ' (filtered)'}
        </div>
        <div className="text-[11px] text-[#4A3E35]/70 dark:text-[#E8DFD5]/60 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#D49B37]" />
          <span>Updated continuously from official sources</span>
        </div>
      </div>

      {/* 4. OPPORTUNITIES GRID */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] dark:bg-[#2E241A] text-[#C85A32] flex items-center justify-center mx-auto">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            No opportunities matched your criteria
          </h3>
          <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80">
            Try adjusting your search keywords, broadening your field of study, or clearing active filters to see all available listings.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-[#1B4332] text-white text-xs font-semibold rounded-lg hover:bg-[#122B20] transition-colors cursor-pointer"
          >
            Show All Opportunities
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => {
            const isSaved = savedOpportunities.includes(opp.id);
            return (
              <article
                key={opp.id}
                className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-5 flex flex-col justify-between hover:border-[#C85A32] hover:shadow-lg transition-all group relative"
              >
                <div>
                  {/* Top Bar: Badges & Bookmark */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FAF2EB] dark:bg-[#2E241A] text-[#C85A32] dark:text-[#E6A820]">
                        {opp.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        opp.remote === 'Remote' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40' 
                          : opp.remote === 'Hybrid'
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                            : 'bg-[#FAF7F2] dark:bg-[#25201B] text-[#4A3E35] dark:text-[#E8DFD5] border border-[#E8DFD5] dark:border-[#332A22]'
                      }`}>
                        {opp.remote}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-[#C85A32] text-white border-[#C85A32]'
                          : 'bg-[#FAF7F2] dark:bg-[#25201B] text-[#4A3E35] dark:text-[#E8DFD5] border-[#E8DFD5] dark:border-[#332A22] hover:text-[#C85A32]'
                      }`}
                      title={isSaved ? 'Remove from saved opportunities' : 'Save opportunity'}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2] group-hover:text-[#C85A32] transition-colors leading-snug line-clamp-2 mb-2">
                    {opp.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded bg-[#FAF7F2] dark:bg-[#25201B] border border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5 text-[#1B4332] dark:text-[#4EBA87]" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-[#1A1815] dark:text-[#FAF7F2] truncate">
                        {opp.organization}
                      </span>
                      <span className="block text-[10px] text-[#4A3E35]/80 dark:text-[#E8DFD5]/70 truncate">
                        {opp.organizationType}
                      </span>
                    </div>
                  </div>

                  {/* Location & Metadata */}
                  <div className="flex items-center gap-3 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80 mb-3 pb-2.5 border-b border-[#E8DFD5] dark:border-[#332A22]">
                    <div className="flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                      <span className="truncate">{opp.location} · {opp.country}</span>
                    </div>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80 line-clamp-3 leading-relaxed mb-4">
                    {opp.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {opp.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#25201B] text-[#1A1815] dark:text-[#FAF7F2] border border-[#E8DFD5] dark:border-[#332A22]"
                      >
                        {skill}
                      </span>
                    ))}
                    {opp.skills.length > 3 && (
                      <span className="text-[10px] text-[#4A3E35]/70 dark:text-[#E8DFD5]/60 self-center">
                        +{opp.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Compensation / Stipend notice if available */}
                  {(opp.stipend || opp.salary) && (
                    <div className="mb-4 text-[11px] p-2 bg-[#F4EFEB] dark:bg-[#221B16] rounded-lg border border-[#E8DFD5] dark:border-[#332A22] text-[#1B4332] dark:text-[#4EBA87] flex items-center gap-1.5 font-medium">
                      <DollarSign className="w-3 h-3 text-[#D49B37] shrink-0" />
                      <span className="truncate">{opp.stipend || opp.salary}</span>
                    </div>
                  )}
                </div>

                {/* Card Footer: Deadline, Source & Actions */}
                <div className="pt-3 border-t border-[#E8DFD5] dark:border-[#332A22] space-y-3">
                  {/* Source Attribution & Deadline */}
                  <div className="flex items-center justify-between text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] dark:text-[#4EBA87]" />
                      <span className="truncate max-w-[130px]" title={opp.source}>
                        Source: {opp.source}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#C85A32] font-semibold">
                      <Calendar className="w-3 h-3" />
                      <span>Deadline: {opp.deadline}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalOpportunity(opp)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF7F2] dark:bg-[#25201B] hover:bg-[#E8DFD5] dark:hover:bg-[#332A22] text-[#1A1815] dark:text-[#FAF7F2] border border-[#D8C7B5] dark:border-[#3E332A] transition-colors cursor-pointer text-center"
                    >
                      View Details
                    </button>

                    <a
                      href={opp.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#C85A32] hover:bg-[#A84521] text-white transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 5. OPPORTUNITY DETAILS MODAL */}
      {activeModalOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1815]/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FAF7F2] dark:bg-[#181410] text-[#1A1815] dark:text-[#FAF7F2] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E8DFD5] dark:border-[#332A22] overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-[#1B4332] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setActiveModalOpportunity(null)}
                className="absolute top-5 right-5 p-1 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#FAF7F2]/20 text-[#FAF7F2]">
                  {activeModalOpportunity.type}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E6A820] text-[#1A1815]">
                  {activeModalOpportunity.remote}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-medium bg-white/10 text-[#E8DFD5]">
                  {activeModalOpportunity.category}
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-white mb-2 leading-tight">
                {activeModalOpportunity.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#E8DFD5]">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Building2 className="w-3.5 h-3.5 text-[#E6A820]" />
                  {activeModalOpportunity.organization}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E6A820]" />
                  {activeModalOpportunity.location} ({activeModalOpportunity.country})
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Official Source Attribution Callout */}
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">
                    Verified Source: {activeModalOpportunity.source}
                  </p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                    AfriVersity is an open discovery index and never charges processing fees. Submitting your application takes place directly on {activeModalOpportunity.organization}'s official portal.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-2">
                  Role Overview
                </h4>
                <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/90 leading-relaxed font-light">
                  {activeModalOpportunity.description}
                </p>
              </div>

              {/* Requirements */}
              {activeModalOpportunity.requirements && activeModalOpportunity.requirements.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-2">
                    Key Requirements & Qualifications
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/90">
                    {activeModalOpportunity.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] dark:text-[#4EBA87] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Eligibility */}
              {activeModalOpportunity.eligibility && activeModalOpportunity.eligibility.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-2">
                    Eligibility Criteria
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/90">
                    {activeModalOpportunity.eligibility.map((el, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] shrink-0 mt-1.5" />
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-2">
                  Target Technical & Professional Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalOpportunity.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded bg-[#FAF7F2] dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] text-[#1A1815] dark:text-[#FAF7F2] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline & Compensation Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white dark:bg-[#221C17] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] text-xs">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#4A3E35]/70 dark:text-[#E8DFD5]/60">Application Deadline</span>
                  <span className="font-semibold text-[#C85A32]">{activeModalOpportunity.deadline}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#4A3E35]/70 dark:text-[#E8DFD5]/60">Estimated Start Date</span>
                  <span className="font-semibold text-[#1A1815] dark:text-[#FAF7F2]">{activeModalOpportunity.startDate || 'Rolling / Immediate'}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#4A3E35]/70 dark:text-[#E8DFD5]/60">Duration</span>
                  <span className="font-semibold text-[#1A1815] dark:text-[#FAF7F2]">{activeModalOpportunity.duration || 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#FAF7F2] dark:bg-[#141210] p-4 sm:p-6 border-t border-[#E8DFD5] dark:border-[#332A22] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleSaveOpportunity(activeModalOpportunity.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    savedOpportunities.includes(activeModalOpportunity.id)
                      ? 'bg-[#C85A32] text-white border-[#C85A32]'
                      : 'bg-white dark:bg-[#25201B] text-[#4A3E35] dark:text-[#FAF7F2] border-[#D8C7B5] dark:border-[#3E332A]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>{savedOpportunities.includes(activeModalOpportunity.id) ? 'Saved' : 'Save for Later'}</span>
                </button>

                <a
                  href={activeModalOpportunity.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] text-[#4A3E35] dark:text-[#FAF7F2] hover:bg-[#F4EFEB] dark:hover:bg-[#2E2822] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Original Listing</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <a
                href={activeModalOpportunity.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <span>Apply on Official Careers Site</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
