import React, { useState } from 'react';
import { University, CampusTourStop } from '../../types';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Building2, 
  ExternalLink, 
  Compass, 
  BookOpen, 
  Sparkles, 
  Info, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

interface CampusTourModalProps {
  university: University | null;
  onClose: () => void;
}

export const CampusTourModal: React.FC<CampusTourModalProps> = ({ university, onClose }) => {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!university) return null;

  const tourStops: CampusTourStop[] = university.campusTourStops || [];
  const currentStop = tourStops[currentStopIndex] || {
    id: 'default',
    name: `${university.name} Main Campus Grounds`,
    category: 'Landmark',
    imageUrl: university.campusImageUrl,
    fallbackImageUrl: university.fallbackCampusImageUrl || university.campusImageUrl,
    description: university.description,
    keyFeatures: university.highlightBadges,
    historicalFact: `Established in ${university.establishedYear}, serving over ${university.studentCountApprox} scholars.`
  };

  const handleNext = () => {
    setImageError(false);
    if (currentStopIndex < tourStops.length - 1) {
      setCurrentStopIndex(currentStopIndex + 1);
    } else {
      setCurrentStopIndex(0); // loop back
    }
  };

  const handlePrev = () => {
    setImageError(false);
    if (currentStopIndex > 0) {
      setCurrentStopIndex(currentStopIndex - 1);
    } else {
      setCurrentStopIndex(tourStops.length - 1);
    }
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FAF7F2] dark:bg-[#141210] text-[#1A1815] dark:text-[#FAF7F2] w-full max-w-5xl rounded-2xl shadow-2xl border border-[#E8DFD5] dark:border-[#332A22] overflow-hidden flex flex-col max-h-[95vh] my-auto">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-[#1B4332] text-white flex items-center justify-between shrink-0 border-b border-[#122B20]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C85A32] flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D49B37]">
                  Interactive Campus Tour · {university.flag} {university.country}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white">
                  Stop {currentStopIndex + 1} of {tourStops.length}
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-white">
                {university.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-[#D49B37] text-[#141210]' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Toggle Audio Tour Guide"
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'Narration Playing' : 'Audio Guide'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tour Stop Slider / Navigation Bar */}
        <div className="px-4 py-2 bg-[#FAF4EB] dark:bg-[#1A1815] border-b border-[#E8DFD5] dark:border-[#2E241A] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold uppercase text-[#4A3E35] dark:text-[#D49B37] whitespace-nowrap pl-1">
            Tour Stops:
          </span>
          {tourStops.map((stop, idx) => (
            <button
              key={stop.id}
              onClick={() => {
                setImageError(false);
                setCurrentStopIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                currentStopIndex === idx
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'bg-white dark:bg-[#25201B] text-[#4A3E35] dark:text-[#E8DFD5] border border-[#E8DFD5] dark:border-[#3E332A] hover:border-[#C85A32]'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                {idx + 1}
              </span>
              <span>{stop.name.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Main Tour Stop Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Visual Campus Stop Photography (with resilient onError handling) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative h-[280px] sm:h-[380px] rounded-xl overflow-hidden bg-[#1B1815] border border-[#E8DFD5] dark:border-[#332A22] shadow-inner group">
              <img
                src={imageError ? currentStop.fallbackImageUrl : currentStop.imageUrl}
                alt={currentStop.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Category Badge on Photo */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1B4332] text-[#D49B37] border border-[#D49B37]/30 shadow-md">
                  {currentStop.category}
                </span>
              </div>

              {/* Prev / Next Navigation Arrows over Photo */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xs transition-colors cursor-pointer"
                title="Previous Stop"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xs transition-colors cursor-pointer"
                title="Next Stop"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Stop Title Overlay */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold text-[#D49B37] uppercase tracking-wider block">
                  Campus Stop #{currentStopIndex + 1}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight">
                  {currentStop.name}
                </h3>
              </div>
            </div>

            {/* Audio Transcript / Narration Box if active */}
            {isPlayingAudio && (
              <div className="p-3.5 bg-[#FAF2EB] dark:bg-[#251E18] rounded-lg border border-[#D49B37]/40 flex items-start gap-3 text-xs text-[#4A3E35] dark:text-[#FAF7F2] animate-fade-in">
                <Volume2 className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#C85A32] block mb-0.5">Virtual Tour Guide Voiceover:</span>
                  <p className="leading-relaxed">
                    "Welcome to {currentStop.name}. {currentStop.description} {currentStop.historicalFact || ''}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Architectural, Research & Facility Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#C85A32] dark:text-[#E6A820] font-semibold uppercase mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{university.city} · {university.type} University</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                {currentStop.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-2 leading-relaxed">
                {currentStop.description}
              </p>
            </div>

            {/* Key Architectural & Lab Features */}
            {currentStop.keyFeatures && currentStop.keyFeatures.length > 0 && (
              <div className="p-4 bg-white dark:bg-[#1F1915] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] space-y-2">
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#1B4332] dark:text-[#D49B37] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] dark:text-[#D49B37]" />
                  <span>Key Facilities & Highlights</span>
                </h4>
                <ul className="space-y-1.5 pl-1 text-xs text-[#4A3E35] dark:text-[#E8DFD5]">
                  {currentStop.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C85A32] font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Historical Lore / Cultural Note */}
            {currentStop.historicalFact && (
              <div className="p-3.5 bg-[#EBF2EE] dark:bg-[#18281E] rounded-xl border border-[#1B4332]/20 dark:border-[#2D6A4F]/40 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4EBA87] flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>Historical Significance</span>
                </span>
                <p className="text-xs text-[#1B4332]/90 dark:text-[#FAF7F2]/90 leading-relaxed">
                  {currentStop.historicalFact}
                </p>
              </div>
            )}

            {/* Official University Link Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={university.officialAdmissionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Official Admissions Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={university.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] hover:border-[#C85A32] text-[#1A1815] dark:text-[#FAF7F2] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Visit Website</span>
                <Building2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="p-4 bg-[#FAF7F2] dark:bg-[#1A1815] border-t border-[#E8DFD5] dark:border-[#2E241A] flex items-center justify-between shrink-0 text-xs">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded border border-[#D8C7B5] dark:border-[#3E332A] hover:bg-white dark:hover:bg-[#25201B] text-[#1A1815] dark:text-[#FAF7F2] font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Stop</span>
          </button>

          <div className="text-[#4A3E35] dark:text-[#E8DFD5]/70 hidden sm:block">
            Use arrows or tabs above to navigate across campus facilities.
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 rounded bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Next Stop</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
