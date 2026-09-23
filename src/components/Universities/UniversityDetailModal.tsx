import React from 'react';
import { University } from '../../types';
import { COURSES } from '../../data/courses';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ExternalLink, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Bookmark, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  BookOpen, 
  Calendar,
  CheckCircle2,
  Users,
  Compass
} from 'lucide-react';

interface UniversityDetailModalProps {
  university: University;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
  onOpenTour?: () => void;
}

export const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({
  university,
  onClose,
  onSelectCourse,
  onOpenTour
}) => {
  const { savedUniversities, toggleSaveUniversity } = useApp();
  const isSaved = savedUniversities.includes(university.id);

  const universityCourses = COURSES.filter(c => c.universityId === university.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] dark:bg-[#141210] text-[#1A1815] dark:text-[#FAF7F2] w-full max-w-4xl rounded-xl shadow-2xl border border-[#E8DFD5] dark:border-[#332A22] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Header with Campus Photograph */}
        <div className="relative h-64 sm:h-72 w-full bg-[#1B1815] overflow-hidden shrink-0">
          <img
            src={university.campusImageUrl}
            alt={`${university.name} campus in ${university.city}`}
            className="w-full h-full object-cover brightness-[0.85]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = university.fallbackCampusImageUrl || '/images/campuses/ug_balme_library.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-[#1B1815]/80 text-white hover:bg-[#1B1815] transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top-left flag/type indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-[#1B1815]/85 text-[#FAF7F2] text-xs font-semibold px-2.5 py-1 rounded backdrop-blur-xs border border-white/10">
              {university.flag} {university.country}
            </span>
            <span className="bg-[#C85A32] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
              {university.type} University
            </span>
          </div>

          {/* Bottom Title & Action Strip inside Banner */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D49B37] font-semibold">
                {university.shortName} · Established {university.establishedYear}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {university.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {/* Campus Tour Launch Button */}
              {onOpenTour && (
                <button
                  onClick={onOpenTour}
                  className="px-3.5 py-2 rounded-lg bg-[#1B4332] hover:bg-[#122B20] text-[#D49B37] text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer border border-[#D49B37]/30"
                >
                  <Compass className="w-4 h-4 text-[#D49B37]" />
                  <span>Campus Tour ({university.campusTourStops?.length || 4} Stops)</span>
                </button>
              )}

              <button
                onClick={() => toggleSaveUniversity(university.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-[#C85A32] text-white'
                    : 'bg-white/90 text-[#1A1815] hover:bg-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <a
                href={university.officialAdmissionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors"
              >
                <span>Admissions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Virtual Tour Banner Callout */}
          {onOpenTour && (
            <div className="p-4 bg-gradient-to-r from-[#1B4332] to-[#122B20] text-white rounded-xl flex items-center justify-between gap-4 shadow-sm border border-[#2D6A4F]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D49B37] text-[#141210] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#FAF7F2]">
                    Explore {university.shortName} via Interactive Campus Tour
                  </h4>
                  <p className="text-xs text-[#E8DFD5]/80">
                    Walk through the library quadrangles, science halls, residential hubs, and research labs.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenTour}
                className="px-4 py-2 bg-[#D49B37] hover:bg-[#B87333] text-[#141210] font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                Start Tour →
              </button>
            </div>
          )}

          {/* Institutional Overview */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C85A32]" />
              <span>Institutional Overview</span>
            </h3>
            <p className="text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 leading-relaxed">
              {university.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {university.highlightBadges.map((badge, idx) => (
                <div 
                  key={idx}
                  className="text-xs text-[#1B4332] dark:text-[#4EBA87] bg-[#EBF2EE] dark:bg-[#18281E] border border-[#1B4332]/20 dark:border-[#2D6A4F]/40 px-2.5 py-1 rounded-md"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Key Facts & Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#F4EFEB] dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22]">
            <div className="space-y-2 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span><strong>Location:</strong> {university.city}, {university.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87] shrink-0" />
                <span><strong>Estimated Student Body:</strong> ~{university.studentCountApprox}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D49B37] shrink-0" />
                <span><strong>Founded:</strong> Year {university.establishedYear}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87] shrink-0" />
                <a 
                  href={university.officialWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#C85A32] dark:hover:text-[#E6A820] underline truncate"
                >
                  {university.officialWebsite}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span className="truncate">{university.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#4A3E35] dark:text-[#E8DFD5] shrink-0" />
                <span>{university.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Verified Colleges and Faculties */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87]" />
              <span>Colleges, Faculties & Schools</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {university.faculties.map((fac, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-white dark:bg-[#1A1815] border border-[#E8DFD5] dark:border-[#332A22] rounded-lg text-xs text-[#1A1815] dark:text-[#FAF7F2] flex items-center gap-2 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87] shrink-0" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Programmes Offered with Cut-off Points */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C85A32]" />
                <span>Programmes & Cut-off Aggregates</span>
              </h3>
              <span className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
                {universityCourses.length} mapped programmes
              </span>
            </div>

            {universityCourses.length > 0 ? (
              <div className="space-y-3">
                {universityCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 bg-white dark:bg-[#1A1815] border border-[#E8DFD5] dark:border-[#332A22] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#C85A32] dark:hover:border-[#D49B37] transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#1B4332] dark:text-[#4EBA87] bg-[#EBF2EE] dark:bg-[#18281E] px-2 py-0.5 rounded">
                          {c.degreeType}
                        </span>
                        <h4 className="font-semibold text-sm text-[#1A1815] dark:text-[#FAF7F2]">
                          {c.name}
                        </h4>
                      </div>
                      <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 mt-1 line-clamp-1">
                        Faculty: {c.faculty} · Duration: {c.durationYears} Years
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-[#4A3E35] dark:text-[#E8DFD5]/60 block">WASSCE Cut-Off</span>
                        <span className="text-sm font-bold text-[#C85A32] dark:text-[#E6A820]">
                          Agg. {c.wassceCutoffAggregate}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectCourse(c.id);
                        }}
                        className="px-3 py-1.5 bg-[#FAF7F2] dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] hover:bg-[#F4EFEB] text-xs font-semibold text-[#1A1815] dark:text-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
                      >
                        View Requirements
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 italic">
                General degree catalogue available via university portal. Check back for specific cutoff aggregations.
              </p>
            )}
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="p-4 bg-[#FAF7F2] dark:bg-[#141210] border-t border-[#E8DFD5] dark:border-[#2E241A] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87]" />
            <span>National Accreditation Board (GTEC) Verified Institution</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] text-xs font-semibold text-[#1A1815] dark:text-[#FAF7F2] rounded-lg hover:bg-[#F4EFEB] cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
