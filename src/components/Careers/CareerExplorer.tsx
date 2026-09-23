import React, { useState } from 'react';
import { CAREER_PATHS } from '../../data/careers';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  DollarSign 
} from 'lucide-react';

export const CareerExplorer: React.FC = () => {
  const { setActiveTab, setSelectedCourseId } = useApp();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  const industries = ['All', 'Technology & FinTech', 'Clean Energy & Utilities', 'Healthcare & Public Health', 'Extractives & Mineral Resources', 'Agriculture & Food Security', 'Banking, Capital Markets & Private Equity'];

  const filteredCareers = selectedIndustry === 'All'
    ? CAREER_PATHS
    : CAREER_PATHS.filter(c => c.industry === selectedIndustry);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1">
            Continental Economic Growth Sectors · Career Pathways
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1815]">
            African Career & Industry Pathways
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] mt-1 max-w-2xl">
            Understand how university degree programmes map directly to high-demand industries across Africa. Key technical skills, top continental employers, and entry expectations.
          </p>
        </div>

        <div className="text-xs text-[#4A3E35] shrink-0">
          Showing <strong>{filteredCareers.length}</strong> growth sectors
        </div>
      </div>

      {/* Industry Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap transition-colors cursor-pointer ${
              selectedIndustry === ind
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'bg-white text-[#4A3E35] border border-[#E8DFD5] hover:bg-[#FAF7F2]'
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCareers.map((career) => (
          <div
            key={career.id}
            className="bg-white rounded-lg border border-[#E8DFD5] p-5 sm:p-6 flex flex-col justify-between hover:border-[#C85A32] hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C85A32] block">
                    {career.industry}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1A1815] group-hover:text-[#C85A32] transition-colors">
                    {career.title}
                  </h3>
                </div>

                <div className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DFD5] rounded text-right shrink-0">
                  <span className="text-[10px] text-[#4A3E35] block">Average Entry Comp</span>
                  <span className="text-xs font-bold text-[#1B4332]">{career.averageEntrySalaryUSD}</span>
                </div>
              </div>

              {/* Geographic Demand */}
              <div className="flex items-center gap-1.5 text-xs text-[#4A3E35] mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>High Demand in: {career.highDemandInCountries.join(', ')}</span>
              </div>

              <p className="text-xs text-[#4A3E35] leading-relaxed mb-4">
                {career.description}
              </p>

              {/* Recommended Programmes */}
              <div className="p-3 bg-[#FAF7F2] rounded border border-[#E8DFD5] mb-4 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B4332] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Accredited University Degrees to Pursue:</span>
                </span>
                <ul className="text-xs text-[#4A3E35] space-y-1">
                  {career.recommendedPrograms.map((prog, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-[#C85A32]">›</span>
                      <span>{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4A3E35]/80 block mb-1.5">
                  Key In-Demand Capabilities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {career.keySkills.map((sk, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] bg-white border border-[#D8C7B5] px-2 py-0.5 rounded text-[#1A1815]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Employers */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4A3E35]/80 block mb-1">
                  Top Continental Hiring Companies:
                </span>
                <p className="text-xs text-[#4A3E35] leading-relaxed">
                  {career.topAfricanEmployers.join(' · ')}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFD5] mt-4 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs font-semibold text-[#C85A32] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Find Matching University Programmes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
