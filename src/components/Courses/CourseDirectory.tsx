import React, { useState, useMemo } from 'react';
import { COURSES } from '../../data/courses';
import { CourseProgram } from '../../types';
import { useApp } from '../../context/AppContext';
import { CourseDetailModal } from './CourseDetailModal';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  Bookmark, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  Building2
} from 'lucide-react';

export const CourseDirectory: React.FC = () => {
  const { 
    savedCourses, 
    toggleSaveCourse, 
    selectedCourseId, 
    setSelectedCourseId,
    setSelectedUniversityId,
    setActiveTab,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const [selectedUniversityFilter, setSelectedUniversityFilter] = useState<string>('All');
  const [selectedDegreeType, setSelectedDegreeType] = useState<string>('All');
  const [activeModalCourse, setActiveModalCourse] = useState<CourseProgram | null>(() => {
    if (selectedCourseId) {
      return COURSES.find(c => c.id === selectedCourseId) || null;
    }
    return null;
  });

  const universitiesList = useMemo(() => {
    const list = Array.from(new Set(COURSES.map(c => c.universityShortName)));
    return ['All', ...list];
  }, []);

  const degreeTypesList = useMemo(() => {
    const list = Array.from(new Set(COURSES.map(c => c.degreeType)));
    return ['All', ...list];
  }, []);

  const filteredCourses = useMemo(() => {
    return COURSES.filter(c => {
      if (selectedUniversityFilter !== 'All' && c.universityShortName !== selectedUniversityFilter) {
        return false;
      }
      if (selectedDegreeType !== 'All' && c.degreeType !== selectedDegreeType) {
        return false;
      }
      const query = globalSearchQuery.toLowerCase().trim();
      if (query) {
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesUni = c.universityName.toLowerCase().includes(query) || c.universityShortName.toLowerCase().includes(query);
        const matchesFaculty = c.faculty.toLowerCase().includes(query);
        const matchesCareers = c.careerProspects.some(car => car.toLowerCase().includes(query));
        const matchesDescription = c.description.toLowerCase().includes(query);
        if (!matchesName && !matchesUni && !matchesFaculty && !matchesCareers && !matchesDescription) {
          return false;
        }
      }
      return true;
    });
  }, [selectedUniversityFilter, selectedDegreeType, globalSearchQuery]);

  const handleOpenCourse = (course: CourseProgram) => {
    setActiveModalCourse(course);
    setSelectedCourseId(course.id);
  };

  const handleCloseModal = () => {
    setActiveModalCourse(null);
    setSelectedCourseId(null);
  };

  const handleViewUniversity = (uniId: string) => {
    setSelectedUniversityId(uniId);
    setActiveTab('universities');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1">
            Programmes · WASSCE Cut-Offs · Requirements
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1815]">
            University Programmes & Cut-Off Points
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] mt-1 max-w-2xl">
            Explore degree programmes with verified, programme-specific entry requirements, core/elective subject rules, and direct links to official application forms.
          </p>
        </div>

        <div className="text-xs text-[#4A3E35] shrink-0">
          Showing <strong>{filteredCourses.length}</strong> of {COURSES.length} programmes
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
            placeholder="Search programmes by name, university, or career (e.g., Computer Science, Medicine, KNUST, UG)..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#D8C7B5] rounded focus:outline-none focus:border-[#C85A32] text-[#1A1815]"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* University selector */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded border border-[#E8DFD5] text-xs">
            <span className="text-[11px] font-medium text-[#4A3E35] px-1.5">Institution:</span>
            {universitiesList.map(u => (
              <button
                key={u}
                onClick={() => setSelectedUniversityFilter(u)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedUniversityFilter === u
                    ? 'bg-[#1B4332] text-white font-medium shadow-xs'
                    : 'text-[#4A3E35] hover:text-[#1A1815]'
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          {/* Degree type */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded border border-[#E8DFD5] text-xs">
            <span className="text-[11px] font-medium text-[#4A3E35] px-1.5">Degree:</span>
            {degreeTypesList.slice(0, 4).map(d => (
              <button
                key={d}
                onClick={() => setSelectedDegreeType(d)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedDegreeType === d
                    ? 'bg-[#C85A32] text-white font-medium shadow-xs'
                    : 'text-[#4A3E35] hover:text-[#1A1815]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const isSaved = savedCourses.includes(course.id);

          return (
            <div
              key={course.id}
              className="bg-white rounded-lg border border-[#E8DFD5] p-5 flex flex-col justify-between hover:border-[#C85A32] hover:shadow-md transition-all group"
            >
              <div>
                {/* Header with Institution & Cut-off badge */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#C85A32] font-semibold uppercase tracking-wider">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{course.universityName} ({course.universityShortName})</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1815] mt-1 group-hover:text-[#C85A32] transition-colors">
                      {course.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 text-xs font-bold bg-[#FAF2EB] text-[#C85A32] border border-[#C85A32]/30 rounded">
                      Cut-off: {course.wassceCutoffAggregate}
                    </span>
                  </div>
                </div>

                {/* Metadata row with bullet separators (Zero-Pill discipline) */}
                <div className="flex items-center gap-2 text-xs text-[#4A3E35] mb-3">
                  <span>Degree: <strong>{course.degreeType}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>{course.durationYears} Years Duration</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate max-w-[200px]">{course.faculty}</span>
                </div>

                <p className="text-xs text-[#4A3E35] line-clamp-3 leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Requirements Highlight Box */}
                <div className="bg-[#FAF7F2] rounded p-3 border border-[#E8DFD5] space-y-2 mb-4 text-xs">
                  <div>
                    <span className="font-bold text-[#1B4332] block mb-0.5">Key Elective Rule:</span>
                    <p className="text-[#4A3E35] line-clamp-1">
                      {course.electiveRequirements[0]}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-[#4A3E35] block mb-0.5">Target Career Outcomes:</span>
                    <div className="text-[#4A3E35]/80 line-clamp-1">
                      {course.careerProspects.slice(0, 3).join(' · ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="pt-3 border-t border-[#E8DFD5] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenCourse(course)}
                    className="px-3 py-1.5 bg-white border border-[#D8C7B5] hover:border-[#C85A32] text-[#1A1815] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Requirements</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleSaveCourse(course.id)}
                    title={isSaved ? 'Saved to my list' : 'Save course'}
                    className={`p-1.5 rounded border transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-[#FAF2EB] border-[#C85A32] text-[#C85A32]'
                        : 'border-[#E8DFD5] text-[#4A3E35] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Apply Now Button - Direct Official Portal */}
                <a
                  href={course.officialProgramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-[#E8DFD5] p-6">
          <BookOpen className="w-10 h-10 text-[#C85A32] mx-auto mb-2 opacity-60" />
          <h3 className="font-serif text-lg font-bold text-[#1A1815]">No programmes match your filter criteria</h3>
          <p className="text-xs text-[#4A3E35] mt-1">Try resetting the university or degree filter.</p>
          <button
            onClick={() => {
              setSelectedUniversityFilter('All');
              setSelectedDegreeType('All');
              setGlobalSearchQuery('');
            }}
            className="mt-3 px-3 py-1.5 bg-[#1B4332] text-white text-xs font-medium rounded cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Course Detail Modal */}
      {activeModalCourse && (
        <CourseDetailModal
          course={activeModalCourse}
          onClose={handleCloseModal}
          onViewUniversity={handleViewUniversity}
        />
      )}
    </div>
  );
};
