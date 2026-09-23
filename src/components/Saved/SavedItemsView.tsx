import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITIES } from '../../data/universities';
import { COURSES } from '../../data/courses';
import { SCHOLARSHIPS } from '../../data/scholarships';
import { MICROCOURSES } from '../../data/microcourses';
import { 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  Building2, 
  BookOpen, 
  Award, 
  MapPin, 
  GraduationCap, 
  ArrowRight,
  Code2,
  Briefcase,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const SavedItemsView: React.FC = () => {
  const { 
    savedUniversities, 
    savedCourses, 
    savedScholarships, 
    savedMicrocourses,
    savedOpportunities,
    opportunities,
    toggleSaveUniversity, 
    toggleSaveCourse, 
    toggleSaveScholarship,
    toggleSaveMicrocourse,
    toggleSaveOpportunity,
    setActiveTab,
    setSelectedCourseId,
    setSelectedUniversityId,
    setSelectedMicrocourseId,
    setTourUniversityId
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'universities' | 'microcourses' | 'courses' | 'scholarships' | 'opportunities'>('universities');

  const bookmarkedUniversities = UNIVERSITIES.filter(u => savedUniversities.includes(u.id));
  const bookmarkedCourses = COURSES.filter(c => savedCourses.includes(c.id));
  const bookmarkedScholarships = SCHOLARSHIPS.filter(s => savedScholarships.includes(s.id));
  const bookmarkedMicrocourses = MICROCOURSES.filter(m => (savedMicrocourses || []).includes(m.id));
  const bookmarkedOpportunities = (opportunities || []).filter(o => (savedOpportunities || []).includes(o.id));

  const totalCount = savedUniversities.length + 
    savedCourses.length + 
    savedScholarships.length + 
    (savedMicrocourses?.length || 0) + 
    (savedOpportunities?.length || 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#2E241A] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1">
            Personal Tracker · Saved Academic & Career Opportunities
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            My Saved Items & Shortlist
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Review your shortlisted universities, target degree programmes, enrolled microcourses, active scholarships, and bookmarked internships all in one place.
          </p>
        </div>

        <div className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 shrink-0">
          <strong>{totalCount}</strong> total items shortlisted
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E8DFD5] dark:border-[#2E241A] pb-2">
        <button
          onClick={() => setActiveCategory('universities')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
            activeCategory === 'universities'
              ? 'bg-[#1B4332] text-white shadow-xs'
              : 'text-[#4A3E35] dark:text-[#E8DFD5] hover:bg-[#F4EFEB] dark:hover:bg-[#1A1815]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Universities ({bookmarkedUniversities.length})</span>
        </button>

        <button
          onClick={() => setActiveCategory('opportunities')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
            activeCategory === 'opportunities'
              ? 'bg-[#C85A32] text-white shadow-xs'
              : 'text-[#4A3E35] dark:text-[#E8DFD5] hover:bg-[#F4EFEB] dark:hover:bg-[#1A1815]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Opportunities ({bookmarkedOpportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveCategory('microcourses')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
            activeCategory === 'microcourses'
              ? 'bg-[#E6A820] text-[#141210] font-bold shadow-xs'
              : 'text-[#4A3E35] dark:text-[#E8DFD5] hover:bg-[#F4EFEB] dark:hover:bg-[#1A1815]'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Microcourses ({bookmarkedMicrocourses.length})</span>
        </button>

        <button
          onClick={() => setActiveCategory('courses')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
            activeCategory === 'courses'
              ? 'bg-[#1B4332] text-white shadow-xs'
              : 'text-[#4A3E35] dark:text-[#E8DFD5] hover:bg-[#F4EFEB] dark:hover:bg-[#1A1815]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Programmes ({bookmarkedCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveCategory('scholarships')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
            activeCategory === 'scholarships'
              ? 'bg-[#D49B37] text-[#141210] font-bold shadow-xs'
              : 'text-[#4A3E35] dark:text-[#E8DFD5] hover:bg-[#F4EFEB] dark:hover:bg-[#1A1815]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Scholarships ({bookmarkedScholarships.length})</span>
        </button>
      </div>

      {/* Content Stream: Opportunities */}
      {activeCategory === 'opportunities' && (
        <div className="space-y-4">
          {bookmarkedOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-5 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col justify-between shadow-2xs hover:border-[#C85A32] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FAF2EB] dark:bg-[#2E241A] text-[#C85A32] dark:text-[#E6A820]">
                          {opp.type}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#25201B] text-[#4A3E35] dark:text-[#E8DFD5] border border-[#E8DFD5] dark:border-[#332A22]">
                          {opp.remote}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSaveOpportunity(opp.id)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-1">
                      {opp.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#1B4332] dark:text-[#4EBA87] mb-2">
                      {opp.organization} · {opp.location}
                    </p>
                    <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80 line-clamp-2 mb-3">
                      {opp.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between text-xs">
                    <span className="text-[#C85A32] font-semibold text-[11px] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Deadline: {opp.deadline}</span>
                    </span>
                    <a
                      href={opp.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <span>Apply on Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] space-y-3">
              <Briefcase className="w-10 h-10 text-[#C85A32] mx-auto" />
              <p className="text-sm font-semibold text-[#1A1815] dark:text-[#FAF7F2]">
                No opportunities saved yet
              </p>
              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 max-w-sm mx-auto">
                Discover verified internships at Google, Microsoft ADC, African Development Bank, and top African fintechs.
              </p>
              <button
                onClick={() => setActiveTab('opportunities')}
                className="px-4 py-2 bg-[#1B4332] text-white text-xs font-semibold rounded-lg hover:bg-[#122B20] transition-colors cursor-pointer"
              >
                Browse Real Opportunities →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content Stream: Universities */}
      {activeCategory === 'universities' && (
        <div className="space-y-4">
          {bookmarkedUniversities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedUniversities.map((uni) => (
                <div
                  key={uni.id}
                  className="p-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex gap-4 items-center justify-between shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={uni.campusImageUrl}
                      alt={uni.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = uni.fallbackCampusImageUrl || '/images/campuses/ug_balme_library.jpg';
                      }}
                      className="w-16 h-16 rounded-lg object-cover border border-[#E8DFD5] dark:border-[#332A22] shrink-0"
                    />
                    <div>
                      <span className="text-[11px] font-semibold text-[#C85A32] uppercase block">
                        {uni.country} {uni.flag}
                      </span>
                      <h3 className="font-serif text-sm font-bold text-[#1A1815] dark:text-[#FAF7F2] line-clamp-1">
                        {uni.name}
                      </h3>
                      <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 mt-0.5">
                        Est. {uni.establishedYear} · {uni.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setTourUniversityId(uni.id);
                        setActiveTab('universities');
                      }}
                      className="px-3 py-1.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Tour
                    </button>
                    <button
                      onClick={() => toggleSaveUniversity(uni.id)}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22]">
              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">You haven't saved any universities yet.</p>
              <button
                onClick={() => setActiveTab('universities')}
                className="mt-2 text-xs font-semibold text-[#C85A32] dark:text-[#E6A820] hover:underline cursor-pointer"
              >
                Explore Universities →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content Stream: Microcourses */}
      {activeCategory === 'microcourses' && (
        <div className="space-y-4">
          {bookmarkedMicrocourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedMicrocourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col justify-between shadow-2xs space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6A820]">
                        {course.instructor.institution} ({course.category})
                      </span>
                      <button
                        onClick={() => toggleSaveMicrocourse(course.id)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-serif text-sm font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 line-clamp-2 mt-1">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD5] dark:border-[#332A22] text-xs">
                    <span className="text-[#4A3E35] dark:text-[#E8DFD5]/70 text-[11px]">
                      {course.durationHours} · {course.level}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedMicrocourseId(course.id);
                        setActiveTab('microcourses');
                      }}
                      className="px-3 py-1 bg-[#1B4332] text-white font-semibold rounded-lg hover:bg-[#122B20] flex items-center gap-1 cursor-pointer text-xs"
                    >
                      <span>Study Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22]">
              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">No microcourses saved yet.</p>
              <button
                onClick={() => setActiveTab('microcourses')}
                className="mt-2 text-xs font-semibold text-[#E6A820] hover:underline cursor-pointer"
              >
                Browse W3Schools & STEM Microcourses →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content Stream: Courses */}
      {activeCategory === 'courses' && (
        <div className="space-y-4">
          {bookmarkedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedCourses.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col justify-between shadow-2xs space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-[#C85A32]">
                        {c.universityName}
                      </span>
                      <button
                        onClick={() => toggleSaveCourse(c.id)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-serif text-sm font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                      {c.name} ({c.degreeType})
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
                      <span>Cut-Off: <strong>{c.wassceCutoffAggregate}</strong></span>
                      <span>·</span>
                      <span>Duration: {c.durationYears} Years</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD5] dark:border-[#332A22] text-xs">
                    <button
                      onClick={() => {
                        setSelectedCourseId(c.id);
                        setActiveTab('courses');
                      }}
                      className="text-xs font-semibold text-[#1B4332] dark:text-[#4EBA87] hover:underline cursor-pointer"
                    >
                      View Subject Requirements →
                    </button>
                    <a
                      href={c.officialProgramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#C85A32] text-white font-semibold rounded-lg hover:bg-[#A84521] flex items-center gap-1 cursor-pointer text-xs"
                    >
                      <span>Admissions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22]">
              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">You haven't saved any programmes yet.</p>
              <button
                onClick={() => setActiveTab('courses')}
                className="mt-2 text-xs font-semibold text-[#C85A32] dark:text-[#E6A820] hover:underline cursor-pointer"
              >
                Browse WASSCE Programme Cut-Offs →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content Stream: Scholarships */}
      {activeCategory === 'scholarships' && (
        <div className="space-y-4">
          {bookmarkedScholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedScholarships.map((s) => (
                <div
                  key={s.id}
                  className="p-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col justify-between shadow-2xs space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-[#D49B37]">
                        {s.provider}
                      </span>
                      <button
                        onClick={() => toggleSaveScholarship(s.id)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-serif text-sm font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 line-clamp-2 mt-1">
                      {s.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD5] dark:border-[#332A22] text-xs">
                    <span className="text-[#C85A32] font-semibold text-[11px]">
                      Deadline: {s.deadline}
                    </span>
                    <a
                      href={s.officialApplicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#1B4332] text-white text-xs font-semibold rounded-lg flex items-center gap-1 hover:bg-[#122B20]"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22]">
              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">You haven't saved any scholarships yet.</p>
              <button
                onClick={() => setActiveTab('scholarships')}
                className="mt-2 text-xs font-semibold text-[#C85A32] dark:text-[#E6A820] hover:underline cursor-pointer"
              >
                Browse Scholarships →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
