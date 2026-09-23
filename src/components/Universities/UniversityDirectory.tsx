import React, { useState, useMemo } from 'react';
import { UNIVERSITIES } from '../../data/universities';
import { University } from '../../types';
import { useApp } from '../../context/AppContext';
import { UniversityDetailModal } from './UniversityDetailModal';
import { CampusTourModal } from './CampusTourModal';
import { 
  Search, 
  MapPin, 
  School, 
  ExternalLink, 
  Bookmark, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Building2 
} from 'lucide-react';

export const UniversityDirectory: React.FC = () => {
  const { 
    savedUniversities, 
    toggleSaveUniversity, 
    setSelectedCourseId, 
    setActiveTab,
    globalSearchQuery,
    setGlobalSearchQuery,
    tourUniversityId,
    setTourUniversityId
  } = useApp();

  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activeModalUniversity, setActiveModalUniversity] = useState<University | null>(null);
  const [activeTourUniversity, setActiveTourUniversity] = useState<University | null>(null);

  // If AppContext has a tourUniversityId request, open it
  React.useEffect(() => {
    if (tourUniversityId) {
      const found = UNIVERSITIES.find(u => u.id === tourUniversityId);
      if (found) {
        setActiveTourUniversity(found);
      }
    }
  }, [tourUniversityId]);

  const countries = useMemo(() => {
    const list = Array.from(new Set(UNIVERSITIES.map(u => u.country)));
    return ['All', ...list];
  }, []);

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter(u => {
      if (selectedCountry !== 'All' && u.country !== selectedCountry) {
        return false;
      }
      if (selectedType !== 'All' && u.type !== selectedType) {
        return false;
      }
      const query = globalSearchQuery.toLowerCase().trim();
      if (query) {
        const matchesName = u.name.toLowerCase().includes(query) || u.shortName.toLowerCase().includes(query);
        const matchesCity = u.city.toLowerCase().includes(query) || u.country.toLowerCase().includes(query);
        const matchesFaculties = u.faculties.some(f => f.toLowerCase().includes(query));
        const matchesDescription = u.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCity && !matchesFaculties && !matchesDescription) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCountry, selectedType, globalSearchQuery]);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('courses');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#2E241A] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1">
            Verified Institutions · Ghana & Pan-Africa
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            African Universities Directory & Virtual Tours
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Explore accredited public and private universities across Africa. Verified campus photography, interactive 360 tour stops, faculty cut-offs, and direct admissions vouchers.
          </p>
        </div>

        <div className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 shrink-0">
          Showing <strong>{filteredUniversities.length}</strong> of {UNIVERSITIES.length} institutions
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
            placeholder="Search universities by name, location, or faculty (e.g., KNUST, Legon, Ashesi, Cape Coast)..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] dark:bg-[#141210] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg focus:outline-none focus:border-[#C85A32] text-[#1A1815] dark:text-[#FAF7F2]"
          />
        </div>

        {/* Filter segment controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Country filter */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] dark:bg-[#141210] p-1 rounded-lg border border-[#E8DFD5] dark:border-[#332A22] text-xs">
            <span className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 px-1.5">Country:</span>
            {countries.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedCountry === c
                    ? 'bg-[#1B4332] text-white font-medium shadow-xs'
                    : 'text-[#4A3E35] dark:text-[#E8DFD5]/80 hover:text-[#1A1815] dark:hover:text-white'
                }`}
              >
                {c === 'Ghana' ? 'Ghana 🇬🇭' : c === 'South Africa' ? 'South Africa 🇿🇦' : c}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] dark:bg-[#141210] p-1 rounded-lg border border-[#E8DFD5] dark:border-[#332A22] text-xs">
            {['All', 'Public', 'Private'].map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedType === t
                    ? 'bg-[#C85A32] text-white font-medium shadow-xs'
                    : 'text-[#4A3E35] dark:text-[#E8DFD5]/80 hover:text-[#1A1815] dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((uni) => {
          const isSaved = savedUniversities.includes(uni.id);

          return (
            <div
              key={uni.id}
              className="bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] overflow-hidden flex flex-col justify-between hover:border-[#C85A32] dark:hover:border-[#D49B37] hover:shadow-lg transition-all group"
            >
              <div>
                {/* Real Campus Photography */}
                <div className="relative h-48 w-full bg-[#1B1815] overflow-hidden">
                  <img
                    src={uni.campusImageUrl}
                    alt={`${uni.name} campus in ${uni.city}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = uni.fallbackCampusImageUrl || '/images/campuses/ug_balme_library.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-black/20 to-transparent" />

                  {/* Bookmark action button */}
                  <button
                    onClick={() => toggleSaveUniversity(uni.id)}
                    title={isSaved ? 'Remove from saved' : 'Save university'}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors cursor-pointer z-10 ${
                      isSaved
                        ? 'bg-[#C85A32] text-white'
                        : 'bg-[#141210]/70 text-white hover:bg-[#141210]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  {/* Caption badge */}
                  <div className="absolute top-3 left-3 bg-[#141210]/80 text-[#FAF7F2] text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-xs max-w-[70%] truncate border border-white/10">
                    {uni.country} {uni.flag} · {uni.type}
                  </div>

                  {/* University title on image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D49B37] block">
                      {uni.shortName}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white line-clamp-1">
                      {uni.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                      {uni.city}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Est. {uni.establishedYear}</span>
                    <span aria-hidden="true">·</span>
                    <span>~{uni.studentCountApprox}</span>
                  </div>

                  <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 line-clamp-3 leading-relaxed">
                    {uni.description}
                  </p>

                  {/* Campus tour stop teaser badge */}
                  {uni.campusTourStops && (
                    <div className="pt-2 border-t border-[#E8DFD5]/70 dark:border-[#332A22]">
                      <div className="flex items-center justify-between text-[11px] text-[#1B4332] dark:text-[#4EBA87] font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5" />
                          <span>Campus Tour Available</span>
                        </span>
                        <span className="text-[10px] text-[#4A3E35] dark:text-[#E8DFD5]/60">
                          {uni.campusTourStops.length} key tour stops
                        </span>
                      </div>
                      <div className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 truncate">
                        Highlights: {uni.campusTourStops.map(s => s.name.split('&')[0].trim()).join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3.5 bg-[#FAF7F2] dark:bg-[#141210] border-t border-[#E8DFD5] dark:border-[#2E241A] flex items-center justify-between gap-1.5">
                <button
                  onClick={() => setActiveModalUniversity(uni)}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#1A1815] dark:text-[#FAF7F2] bg-white dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] hover:border-[#C85A32] rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                {/* Campus Tour Launch Button */}
                <button
                  onClick={() => setActiveTourUniversity(uni)}
                  className="px-2.5 py-1.5 text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#122B20] rounded-lg flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
                  title={`Start virtual tour of ${uni.name}`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#D49B37]" />
                  <span>Campus Tour</span>
                </button>

                {/* Apply Now Button */}
                <a
                  href={uni.officialAdmissionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 text-xs font-semibold text-white bg-[#C85A32] hover:bg-[#A84521] rounded-lg flex items-center gap-1 transition-colors shadow-xs"
                >
                  <span>Apply</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] p-6">
          <School className="w-10 h-10 text-[#C85A32] mx-auto mb-2 opacity-60" />
          <h3 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2]">No universities match your filters</h3>
          <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 mt-1">Try resetting your search query or choosing "All Countries".</p>
          <button
            onClick={() => {
              setSelectedCountry('All');
              setSelectedType('All');
              setGlobalSearchQuery('');
            }}
            className="mt-3 px-3 py-1.5 bg-[#1B4332] text-white text-xs font-medium rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* University Detail Modal */}
      {activeModalUniversity && (
        <UniversityDetailModal
          university={activeModalUniversity}
          onClose={() => setActiveModalUniversity(null)}
          onSelectCourse={handleSelectCourse}
          onOpenTour={() => {
            const uni = activeModalUniversity;
            setActiveModalUniversity(null);
            setActiveTourUniversity(uni);
          }}
        />
      )}

      {/* Interactive Virtual Campus Tour Modal */}
      {activeTourUniversity && (
        <CampusTourModal
          university={activeTourUniversity}
          onClose={() => {
            setActiveTourUniversity(null);
            setTourUniversityId(null);
          }}
        />
      )}
    </div>
  );
};
