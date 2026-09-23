import React from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITIES } from '../../data/universities';
import { COURSES } from '../../data/courses';
import { SCHOLARSHIPS } from '../../data/scholarships';
import { MICROCOURSES } from '../../data/microcourses';
import { 
  School, 
  BookOpen, 
  Award, 
  Users, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  ExternalLink, 
  Compass, 
  MapPin, 
  Code2, 
  Play, 
  Clock,
  Briefcase,
  ShieldCheck
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { 
    user, 
    setActiveTab, 
    setSelectedUniversityId, 
    setSelectedCourseId, 
    setSelectedMicrocourseId,
    setTourUniversityId,
    opportunities,
    posts 
  } = useApp();

  // Top featured universities
  const featuredUniversities = UNIVERSITIES.slice(0, 3);
  // Active scholarships
  const activeScholarships = SCHOLARSHIPS.filter(s => s.deadlineStatus === 'Active').slice(0, 3);
  // Recent community questions
  const recentQuestions = posts.filter(p => p.isQuestion).slice(0, 3);
  // Featured microcourses
  const featuredMicrocourses = MICROCOURSES.slice(0, 2);
  // Featured opportunities
  const featuredOpportunities = (opportunities || []).slice(0, 3);

  const handleViewUniversity = (id: string) => {
    setSelectedUniversityId(id);
    setActiveTab('universities');
  };

  const handleStartTour = (id: string) => {
    setTourUniversityId(id);
    setActiveTab('universities');
  };

  const handleViewCourse = (id: string) => {
    setSelectedCourseId(id);
    setActiveTab('courses');
  };

  const handleViewMicrocourse = (id: string) => {
    setSelectedMicrocourseId(id);
    setActiveTab('microcourses');
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1B4332] via-[#214F3C] to-[#2D3A2F] text-white p-6 sm:p-8 shadow-sm">
        {/* Subtle patterned overlay */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('/images/campuses/ug_great_hall.jpg')`
          }}
        />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D49B37] uppercase tracking-wider">
            <span>Pan-African Higher Education & Skills Platform</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Welcome back, {user?.fullName || 'Scholar'}.
          </h1>

          <p className="text-xs sm:text-sm text-[#E8DFD5] leading-relaxed">
            {user?.role === 'student' && (
              <>Explore accredited degree programmes across Ghana & Africa, take interactive STEM & coding microcourses, and discover fully funded scholarships for your future.</>
            )}
            {user?.role === 'mentor' && (
              <>Guide aspiring African students through university admissions, answer technical questions, and empower the next generation of engineers and physicians.</>
            )}
            {user?.role === 'institution' && (
              <>Showcase your university's faculties, launch interactive campus tours, and connect prospective students directly with your official admission portal.</>
            )}
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('microcourses')}
              className="px-4 py-2 bg-[#E6A820] hover:bg-[#D49B37] text-[#141210] text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Take Microcourses</span>
            </button>

            <button
              onClick={() => setActiveTab('opportunities')}
              className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#1B4332] text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs border border-white/20"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Explore Internships</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className="px-4 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Cut-Off Points</span>
            </button>

            <button
              onClick={() => setActiveTab('advisor')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D49B37]" />
              <span>Ask AI Advisor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics / Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('universities')}
          className="p-4 sm:p-5 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] hover:border-[#C85A32] cursor-pointer transition-colors shadow-2xs"
        >
          <div className="flex items-center justify-between text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Universities</span>
            <School className="w-4 h-4 text-[#C85A32]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            {UNIVERSITIES.length}
          </div>
          <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/60 mt-1">Verified African Institutions</p>
        </div>

        <div 
          onClick={() => setActiveTab('microcourses')}
          className="p-4 sm:p-5 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] hover:border-[#C85A32] cursor-pointer transition-colors shadow-2xs"
        >
          <div className="flex items-center justify-between text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Microcourses</span>
            <Code2 className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            {MICROCOURSES.length}
          </div>
          <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/60 mt-1">Interactive Code & Quizzes</p>
        </div>

        <div 
          onClick={() => setActiveTab('courses')}
          className="p-4 sm:p-5 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] hover:border-[#C85A32] cursor-pointer transition-colors shadow-2xs"
        >
          <div className="flex items-center justify-between text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Programmes</span>
            <BookOpen className="w-4 h-4 text-[#D49B37]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            {COURSES.length}
          </div>
          <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/60 mt-1">With Official WASSCE Cut-Offs</p>
        </div>

        <div 
          onClick={() => setActiveTab('scholarships')}
          className="p-4 sm:p-5 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] hover:border-[#C85A32] cursor-pointer transition-colors shadow-2xs"
        >
          <div className="flex items-center justify-between text-[#4A3E35] dark:text-[#E8DFD5]/70 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Scholarships</span>
            <Award className="w-4 h-4 text-[#C85A32]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            {SCHOLARSHIPS.length}
          </div>
          <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/60 mt-1">Verified Real Opportunities</p>
        </div>
      </div>

      {/* Featured Universities & Campuses (with actual photos and Campus Tour button) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
              Featured Universities & Campuses
            </h2>
            <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
              Accredited institutions with direct links to official admission vouchers and interactive campus tours.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('universities')}
            className="text-xs font-semibold text-[#C85A32] dark:text-[#E6A820] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({UNIVERSITIES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredUniversities.map((uni) => (
            <div
              key={uni.id}
              className="bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] overflow-hidden flex flex-col justify-between hover:border-[#C85A32] dark:hover:border-[#D49B37] transition-all group shadow-2xs"
            >
              <div>
                <div className="relative h-44 w-full bg-[#1B1815] overflow-hidden">
                  <img
                    src={uni.campusImageUrl}
                    alt={uni.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = uni.fallbackCampusImageUrl || '/images/campuses/ug_balme_library.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/30 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] uppercase font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                      {uni.country} {uni.flag}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold text-[#D49B37] block">
                      {uni.shortName}
                    </span>
                    <h3 className="font-serif text-base font-bold text-white truncate">
                      {uni.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C85A32]" />
                      {uni.city}
                    </span>
                    <span>·</span>
                    <span>{uni.type}</span>
                    <span>·</span>
                    <span>Est. {uni.establishedYear}</span>
                  </div>
                  <p className="line-clamp-2 leading-relaxed">
                    {uni.description}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#FAF7F2] dark:bg-[#141210] border-t border-[#E8DFD5] dark:border-[#2E241A] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleStartTour(uni.id)}
                  className="px-2.5 py-1.5 bg-[#1B4332] hover:bg-[#122B20] text-[#D49B37] text-xs font-bold rounded-md flex items-center gap-1 transition-colors cursor-pointer border border-[#D49B37]/30 shadow-xs"
                >
                  <Compass className="w-3.5 h-3.5 text-[#D49B37]" />
                  <span>Campus Tour</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleViewUniversity(uni.id)}
                    className="px-2.5 py-1.5 text-xs font-semibold text-[#1A1815] dark:text-[#FAF7F2] hover:text-[#C85A32] cursor-pointer"
                  >
                    Details
                  </button>

                  <a
                    href={uni.officialAdmissionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-[11px] font-semibold rounded-md flex items-center gap-1 shadow-2xs"
                  >
                    <span>Apply</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Microcourses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" />
              <span>Hands-on Skill Labs (W3Schools & Coursera Standard)</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
              Interactive African Microcourses
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('microcourses')}
            className="text-xs font-semibold text-[#C85A32] dark:text-[#E6A820] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredMicrocourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] p-5 flex flex-col sm:flex-row items-start gap-4 hover:border-[#1B4332] dark:hover:border-[#4EBA87] transition-all shadow-xs"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full sm:w-32 h-28 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4EBA87] bg-[#EBF2EE] dark:bg-[#18281E] px-2 py-0.5 rounded">
                    {course.category}
                  </span>
                  <span className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/60 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.durationHours}</span>
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#1A1815] dark:text-[#FAF7F2]">
                  {course.title}
                </h3>
                <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 line-clamp-2">
                  {course.shortDescription}
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => handleViewMicrocourse(course.id)}
                    className="px-3 py-1.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Start Microcourse</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Internships & Opportunities Corner */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Real African & Global Career Openings</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
              Verified Internships & Opportunities
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('opportunities')}
            className="text-xs font-semibold text-[#1B4332] dark:text-[#4EBA87] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Opportunities</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-5 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col justify-between hover:border-[#C85A32] transition-colors shadow-2xs group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FAF2EB] dark:bg-[#2E241A] text-[#C85A32]">
                    {opp.type}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#25201B] text-[#4A3E35] dark:text-[#E8DFD5] border border-[#E8DFD5] dark:border-[#332A22]">
                    {opp.remote}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm text-[#1A1815] dark:text-[#FAF7F2] group-hover:text-[#C85A32] transition-colors line-clamp-1 mb-1">
                  {opp.title}
                </h3>
                <p className="text-xs font-semibold text-[#1B4332] dark:text-[#4EBA87] mb-2 truncate">
                  {opp.organization} · {opp.location}
                </p>
                <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80 line-clamp-2 mb-3">
                  {opp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between text-xs">
                <span className="text-[#C85A32] font-semibold text-[11px] truncate">
                  Deadline: {opp.deadline}
                </span>
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className="px-2.5 py-1 bg-[#1B4332] text-white text-[11px] font-semibold rounded-md hover:bg-[#122B20] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Scholarships & Community Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Open Scholarships */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2]">
              Verified Tertiary Scholarships
            </h2>
            <button
              onClick={() => setActiveTab('scholarships')}
              className="text-xs font-semibold text-[#C85A32] dark:text-[#E6A820] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {activeScholarships.map((sch) => (
              <div
                key={sch.id}
                className="p-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] space-y-2 hover:border-[#D49B37] transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#D49B37] uppercase tracking-wider">
                    {sch.provider}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF2EE] dark:bg-[#18281E] text-[#1B4332] dark:text-[#4EBA87]">
                    {sch.coverageType}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[#1A1815] dark:text-[#FAF7F2]">
                  {sch.title}
                </h3>
                <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 line-clamp-2">
                  {sch.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[#4A3E35] dark:text-[#E8DFD5]/60 text-[11px]">
                    Deadline: <strong>{sch.deadline}</strong>
                  </span>
                  <a
                    href={sch.officialApplicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C85A32] dark:text-[#E6A820] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Apply Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2]">
              Active Student Questions
            </h2>
            <button
              onClick={() => setActiveTab('community')}
              className="text-xs font-semibold text-[#C85A32] dark:text-[#E6A820] hover:underline cursor-pointer"
            >
              Ask Community →
            </button>
          </div>

          <div className="space-y-3">
            {recentQuestions.map((post) => (
              <div
                key={post.id}
                onClick={() => setActiveTab('community')}
                className="p-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] space-y-2 hover:border-[#1B4332] cursor-pointer transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#1A1815] dark:text-[#FAF7F2]">
                    {post.authorName}
                  </span>
                  <span className="text-[#4A3E35] dark:text-[#E8DFD5]/60">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-[#1A1815] dark:text-[#FAF7F2] line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 line-clamp-2">
                  {post.content}
                </p>
                <div className="pt-1 flex items-center gap-4 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/60">
                  <span>▲ {post.upvotes} Upvotes</span>
                  <span>💬 {post.comments.length} Answers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
