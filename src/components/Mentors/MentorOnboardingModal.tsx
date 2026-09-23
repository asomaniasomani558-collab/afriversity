import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MentorOnboardingData } from '../../types';
import { Users, Check, ArrowRight, ShieldCheck, Sparkles, Clock, Globe } from 'lucide-react';

const REGIONS_OPTIONS = [
  'Ghana',
  'Nigeria',
  'Kenya',
  'South Africa',
  'Uganda',
  'Rwanda',
  'Tanzania',
  'International / Pan-Africa'
];

const EDUCATION_LEVELS_OPTIONS = [
  'High School / WASSCE Candidates',
  'Undergraduate University Students',
  'Postgraduate / Masters Applicants',
  'Early Career Professionals'
];

const LANGUAGES_OPTIONS = [
  'English',
  'French',
  'Twi',
  'Swahili',
  'Yoruba',
  'Hausa',
  'Igbo',
  'Arabic'
];

const STYLES_OPTIONS = [
  '1-on-1 Q&A & Admissions Advice',
  'Application Essay & CV Review',
  'Bi-weekly Strategy & Goal-Setting',
  'Technical Portfolio Mentorship'
];

const TIME_OPTIONS = [
  '1 - 2 hours / week',
  '3 - 5 hours / week',
  'Flexible / As-needed'
];

export const MentorOnboardingModal: React.FC = () => {
  const { user, completeMentorOnboarding } = useApp();
  const [step, setStep] = useState<number>(1);

  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    user?.mentorData?.expertiseAreas || ['University applications', 'Computer Science', 'Scholarships']
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['Ghana', 'Nigeria']);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([
    'High School / WASSCE Candidates',
    'Undergraduate University Students'
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English', 'Twi']);
  const [mentorshipStyle, setMentorshipStyle] = useState<string>('1-on-1 Q&A & Admissions Advice');
  const [availability, setAvailability] = useState<string>('1 - 2 hours / week');

  if (!user || user.role !== 'mentor' || user.onboardingComplete) {
    return null;
  }

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      if (list.length > 1) {
        setList(list.filter(i => i !== item));
      }
    } else {
      setList([...list, item]);
    }
  };

  const handleFinish = () => {
    const data: MentorOnboardingData = {
      expertiseAreas: selectedAreas,
      countriesToAdvise: selectedRegions,
      targetEducationLevels: selectedLevels,
      languages: selectedLanguages,
      mentorshipStyle,
      weeklyAvailabilityHours: availability
    };
    completeMentorOnboarding(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#141210]/85 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] dark:bg-[#181410] text-[#1A1815] dark:text-[#FAF7F2] w-full max-w-xl rounded-xl shadow-2xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col max-h-[90vh] my-auto overflow-hidden">
        {/* Header */}
        <div className="bg-[#1B4332] text-white p-5 sm:p-6 shrink-0 border-b border-[#122B20]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D49B37]">
              <Users className="w-4 h-4" />
              <span>Mentor Onboarding · Step {step} of 2</span>
            </div>
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#C85A32] hover:bg-[#A84521] text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Save details and enter dashboard"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save & Enter</span>
            </button>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-2 text-white">
            {step === 1 ? 'Advisory Focus & Regions' : 'Mentorship Style & Availability'}
          </h2>
          <p className="text-xs text-[#E8DFD5]/90 mt-1">
            {step === 1 
              ? 'Tell us which students, levels, and African regions you are best positioned to mentor.' 
              : 'Set your preferred mentorship rhythm, communication languages, and availability.'}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {step === 1 ? (
            <>
              {/* Target Education Levels */}
              <div>
                <label className="block text-xs font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-2">
                  What education levels can you help?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EDUCATION_LEVELS_OPTIONS.map((lvl) => {
                    const isSelected = selectedLevels.includes(lvl);
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => toggleItem(selectedLevels, setSelectedLevels, lvl)}
                        className={`p-2.5 rounded-lg border text-left flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#EBF4EE] dark:bg-[#18281E] border-[#2D6A4F] text-[#1B4332] dark:text-[#4EBA87] font-semibold'
                            : 'bg-white dark:bg-[#25201B] border-[#D8C7B5] dark:border-[#3E332A] text-[#4A3E35] dark:text-[#E8DFD5]'
                        }`}
                      >
                        <span>{lvl}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#2D6A4F]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Geographic Regions */}
              <div>
                <label className="block text-xs font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-2">
                  Which countries/regions can you advise students about?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {REGIONS_OPTIONS.map((region) => {
                    const isSelected = selectedRegions.includes(region);
                    return (
                      <button
                        key={region}
                        type="button"
                        onClick={() => toggleItem(selectedRegions, setSelectedRegions, region)}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#1B4332] text-white border-[#1B4332]'
                            : 'bg-white dark:bg-[#25201B] border-[#D8C7B5] dark:border-[#3E332A] text-[#4A3E35] dark:text-[#E8DFD5]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {region}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Verification Notice */}
              <div className="p-3 bg-[#FAF4E5] dark:bg-[#2E241A] border border-[#D49B37]/40 rounded-xl flex items-start gap-2.5 text-[#8C6215] dark:text-[#E6A820]">
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold block">Verification Workflow Ready</span>
                  Your profile starts in <strong>Pending Verification</strong>. Once administrators confirm your credentials or university email, a verified badge will appear on your profile and community posts.
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Languages */}
              <div>
                <label className="block text-xs font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-2">
                  What languages can you comfortably communicate in?
                </label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES_OPTIONS.map((lang) => {
                    const isSelected = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleItem(selectedLanguages, setSelectedLanguages, lang)}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#C85A32] text-white border-[#C85A32]'
                            : 'bg-white dark:bg-[#25201B] border-[#D8C7B5] dark:border-[#3E332A] text-[#4A3E35] dark:text-[#E8DFD5]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mentorship Style */}
              <div>
                <label className="block text-xs font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-2">
                  What is your preferred mentorship style?
                </label>
                <div className="space-y-2">
                  {STYLES_OPTIONS.map((style) => (
                    <label
                      key={style}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
                        mentorshipStyle === style
                          ? 'bg-[#FAF4E5] dark:bg-[#2E241A] border-[#D49B37] text-[#8C6215] dark:text-[#E6A820] font-semibold'
                          : 'bg-white dark:bg-[#25201B] border-[#D8C7B5] dark:border-[#3E332A] text-[#4A3E35] dark:text-[#E8DFD5]'
                      }`}
                    >
                      <span>{style}</span>
                      <input
                        type="radio"
                        name="style"
                        checked={mentorshipStyle === style}
                        onChange={() => setMentorshipStyle(style)}
                        className="accent-[#D49B37]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Weekly Time */}
              <div>
                <label className="block text-xs font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>How much time are you available to mentor?</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_OPTIONS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setAvailability(time)}
                      className={`p-2 rounded-lg border text-center cursor-pointer transition-colors text-[11px] font-medium ${
                        availability === time
                          ? 'bg-[#1B4332] text-white border-[#1B4332]'
                          : 'bg-white dark:bg-[#25201B] border-[#D8C7B5] dark:border-[#3E332A] text-[#4A3E35] dark:text-[#E8DFD5]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] dark:bg-[#181410] border-t border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between gap-3 shrink-0">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-[#4A3E35] dark:text-[#E8DFD5] hover:underline cursor-pointer"
            >
              ← Back to Focus
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80 hover:underline cursor-pointer"
            >
              Skip setup →
            </button>
          )}

          <div className="flex items-center gap-2">
            {step === 1 ? (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
              >
                <span>Next: Mentorship Style</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer shadow-md transition-colors ring-2 ring-[#D49B37]/40"
              >
                <Check className="w-4 h-4" />
                <span>Launch Mentor Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
