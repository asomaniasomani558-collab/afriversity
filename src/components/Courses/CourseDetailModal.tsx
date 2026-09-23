import React from 'react';
import { CourseProgram } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Clock, 
  Building2 
} from 'lucide-react';

interface CourseDetailModalProps {
  course: CourseProgram;
  onClose: () => void;
  onViewUniversity: (universityId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onViewUniversity
}) => {
  const { savedCourses, toggleSaveCourse } = useApp();
  const isSaved = savedCourses.includes(course.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1815]/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] text-[#1A1815] w-full max-w-3xl rounded-xl shadow-2xl border border-[#E8DFD5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Banner */}
        <div className="bg-[#1B4332] text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#D49B37] uppercase tracking-wider mb-2">
            <span>{course.universityName}</span>
            <span>·</span>
            <span>{course.faculty}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            {course.name}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#E8DFD5]">
            <div className="flex items-center gap-1.5 bg-[#122B20] px-2.5 py-1 rounded border border-white/10">
              <GraduationCap className="w-3.5 h-3.5 text-[#D49B37]" />
              <span>Degree: {course.degreeType}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#122B20] px-2.5 py-1 rounded border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#D49B37]" />
              <span>Duration: {course.durationYears} Years</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#C85A32] text-white px-2.5 py-1 rounded font-bold">
              <span>Cut-off: {course.wassceCutoffAggregate}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Programme Description */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#1A1815] mb-2">
              Curriculum & Programme Scope
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3E35] leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Programme-Specific WASSCE Admission Requirements */}
          <div className="bg-white rounded-lg border border-[#E8DFD5] p-5 space-y-4">
            <div className="border-b border-[#E8DFD5] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-[#1A1815] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
                  <span>Official Programme Admission Requirements</span>
                </h3>
                <p className="text-[11px] text-[#4A3E35] mt-0.5">
                  Distinct from general university requirements. Sourced from official admissions brochure.
                </p>
              </div>

              <span className="text-xs font-bold text-[#C85A32] bg-[#FAF2EB] px-2.5 py-1 rounded border border-[#C85A32]/30">
                Agg: {course.wassceCutoffAggregate}
              </span>
            </div>

            {/* Core Subject Requirements */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-2">
                Mandatory Core Subjects (Minimum C6 / Credit Pass)
              </h4>
              <div className="space-y-1.5 text-xs text-[#4A3E35]">
                {course.coreRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-[#F4EFEB] p-2 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Elective Subject Requirements */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C85A32] mb-2">
                Prescribed Elective Subjects (Best 3 Electives)
              </h4>
              <div className="space-y-1.5 text-xs text-[#4A3E35]">
                {course.electiveRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-[#FAF2EB] p-2 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A32] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Criteria */}
            {course.additionalCriteria && (
              <div className="p-3 bg-[#FAF4E5] border-l-3 border-[#D49B37] rounded text-xs text-[#8C6215]">
                <span className="font-bold">Specific Criteria / Interview Notes: </span>
                <span>{course.additionalCriteria}</span>
              </div>
            )}
          </div>

          {/* Career Prospects */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#1A1815] mb-2.5 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#C85A32]" />
              <span>Career Outcomes in Africa & Globally</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.careerProspects.map((career, idx) => (
                <div 
                  key={idx}
                  className="px-3 py-1.5 bg-white border border-[#D8C7B5] rounded text-xs font-medium text-[#1A1815] shadow-2xs"
                >
                  {career}
                </div>
              ))}
            </div>
          </div>

          {/* Source Transparency */}
          <div className="p-3.5 bg-[#EBF2EE] border-l-4 border-[#1B4332] rounded text-xs text-[#143024]">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
              <span>Verified Source Attribution</span>
            </p>
            <p className="text-[11px] mt-1 text-[#143024]">
              <strong>Source:</strong> {course.verifiedSource}. Direct admissions applications are processed solely on the official university portal at <span className="underline font-mono">{course.officialProgramUrl}</span>.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-[#F4EFEB] border-t border-[#E8DFD5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveCourse(course.id)}
              className={`px-3 py-2 text-xs font-semibold rounded border flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#C85A32] text-white border-[#C85A32]'
                  : 'bg-white text-[#4A3E35] border-[#D8C7B5] hover:bg-[#FAF7F2]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved' : 'Save Course'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onViewUniversity(course.universityId);
              }}
              className="px-3 py-2 text-xs font-semibold text-[#1B4332] bg-white border border-[#D8C7B5] hover:bg-[#FAF7F2] rounded cursor-pointer"
            >
              <span>View {course.universityShortName} Campus</span>
            </button>
          </div>

          {/* Official Apply Now Button */}
          <a
            href={course.officialProgramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow transition-colors"
          >
            <span>Apply Now (Official University Site)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
