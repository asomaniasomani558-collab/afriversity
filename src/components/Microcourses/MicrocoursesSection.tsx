import React, { useState, useMemo } from 'react';
import { MICROCOURSES } from '../../data/microcourses';
import { Microcourse } from '../../types';
import { useApp } from '../../context/AppContext';
import { MicrocourseDetailView } from './MicrocourseDetailView';
import { 
  Code2, 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowRight, 
  Bookmark, 
  Play, 
  GraduationCap, 
  Sparkles,
  Terminal
} from 'lucide-react';

export const MicrocoursesSection: React.FC = () => {
  const { 
    savedMicrocourses, 
    toggleSaveMicrocourse, 
    completedLessons, 
    selectedMicrocourseId, 
    setSelectedMicrocourseId,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCourse, setActiveCourse] = useState<Microcourse | null>(() => {
    if (selectedMicrocourseId) {
      return MICROCOURSES.find(c => c.id === selectedMicrocourseId) || null;
    }
    return null;
  });

  const categories = [
    'All',
    'Tech & Programming',
    'WASSCE & STEM Prep',
    'FinTech & African Markets',
    'Career & Scholarships'
  ];

  const filteredCourses = useMemo(() => {
    return MICROCOURSES.filter(c => {
      if (selectedCategory !== 'All' && c.category !== selectedCategory) {
        return false;
      }
      const query = globalSearchQuery.toLowerCase().trim();
      if (query) {
        const matchesTitle = c.title.toLowerCase().includes(query);
        const matchesDesc = c.shortDescription.toLowerCase().includes(query);
        const matchesCat = c.category.toLowerCase().includes(query);
        const matchesInstructor = c.instructor.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesInstructor) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, globalSearchQuery]);

  // If a course is actively open in player view
  if (activeCourse) {
    return (
      <MicrocourseDetailView
        course={activeCourse}
        onBack={() => {
          setActiveCourse(null);
          setSelectedMicrocourseId(null);
        }}
      />
    );
  }

  // Calculate total completed lessons
  const totalCompleted = completedLessons.length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#2E241A] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Learning Lab · W3Schools & Coursera Standard</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            AfriVersity Microcourses
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Hands-on educational microcourses for African students. Master Python programming, WASSCE Elective Maths calculus, FinTech telecom systems, and scholarship statements with live code execution and interactive knowledge checks.
          </p>
        </div>

        {/* Learning Stats Pill */}
        <div className="p-3 bg-[#EBF2EE] dark:bg-[#18281E] border border-[#1B4332]/20 dark:border-[#2D6A4F]/40 rounded-xl flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#1B4332] text-[#FAF7F2] flex items-center justify-center font-bold text-sm">
            {totalCompleted}
          </div>
          <div className="text-xs leading-tight">
            <span className="font-bold text-[#1B4332] dark:text-[#4EBA87] block">Lessons Mastered</span>
            <span className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70">Verifiable Skill Badges</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Search microcourses (e.g. Python, Calculus, Mobile Money, Scholarship)..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] dark:bg-[#141210] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg focus:outline-none focus:border-[#C85A32] text-[#1A1815] dark:text-[#FAF7F2]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-[#FAF7F2] dark:bg-[#141210] text-[#4A3E35] dark:text-[#E8DFD5] border border-[#E8DFD5] dark:border-[#332A22] hover:border-[#C85A32]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const isSaved = savedMicrocourses?.includes(course.id);
          // Calculate lessons in this course
          const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
          const completedInCourse = allLessonIds.filter(id => completedLessons.includes(id)).length;
          const progressPercent = Math.round((completedInCourse / (allLessonIds.length || 1)) * 100);

          return (
            <div
              key={course.id}
              className="bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] overflow-hidden flex flex-col justify-between hover:border-[#C85A32] dark:hover:border-[#D49B37] hover:shadow-lg transition-all group"
            >
              <div>
                {/* Course Thumbnail */}
                <div className="relative h-48 w-full bg-[#1B1815] overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-black/30 to-transparent" />

                  {/* Bookmark action button */}
                  <button
                    onClick={() => toggleSaveMicrocourse(course.id)}
                    title={isSaved ? 'Remove from saved' : 'Save course'}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors cursor-pointer z-10 ${
                      isSaved
                        ? 'bg-[#C85A32] text-white'
                        : 'bg-[#141210]/70 text-white hover:bg-[#141210]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-[#1B4332] text-[#D49B37] text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-[#D49B37]/30">
                    {course.category}
                  </div>

                  {/* Level and Duration */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-[#D49B37] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.durationHours}</span>
                    </span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#1A1815] dark:text-[#FAF7F2] group-hover:text-[#C85A32] transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Instructor Note */}
                  <div className="flex items-center gap-2.5 pt-2 border-t border-[#E8DFD5]/70 dark:border-[#332A22]">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#D49B37]"
                    />
                    <div className="text-xs leading-tight truncate">
                      <span className="font-semibold text-[#1A1815] dark:text-[#FAF7F2] block truncate">
                        {course.instructor.name}
                      </span>
                      <span className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/60 truncate block">
                        {course.instructor.institution}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {progressPercent > 0 && (
                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 font-semibold mb-1">
                        <span>Course Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-[#E8DFD5] dark:bg-[#332A22] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#1B4332] dark:bg-[#4EBA87] h-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-[#FAF7F2] dark:bg-[#141210] border-t border-[#E8DFD5] dark:border-[#2E241A] flex items-center justify-between">
                <div className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Interactive Exercises & Quizzes</span>
                </div>

                <button
                  onClick={() => setActiveCourse(course)}
                  className="px-4 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{progressPercent > 0 ? 'Continue' : 'Start Course'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
