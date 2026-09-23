import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentOnboardingData } from '../../types';
import { Compass, Check, ArrowRight, X, Sparkles } from 'lucide-react';

const AVAILABLE_FIELDS = [
  'Computer Science & Software',
  'Engineering (Civil / Electrical / Mech)',
  'Medicine & Surgery (MB ChB)',
  'Pharmacy & Health Sciences',
  'Business Administration & Finance',
  'Agricultural Technology',
  'Renewable Energy',
  'Law & Legal Studies',
  'Mining & Petroleum Engineering'
];

const CAREER_INTERESTS = [
  'Software Engineer',
  'Physician / Doctor',
  'Data Scientist',
  'Renewable Energy Engineer',
  'Investment Analyst',
  'Mining Engineer',
  'Biomedical Researcher',
  'Tech Entrepreneur'
];

const PREFERRED_COUNTRIES = [
  'Ghana 🇬🇭',
  'South Africa 🇿🇦',
  'Kenya 🇰🇪',
  'Uganda 🇺🇬',
  'Nigeria 🇳🇬',
  'Rwanda 🇷🇼'
];

export const OnboardingModal: React.FC = () => {
  const { user, completeOnboarding } = useApp();
  const [step, setStep] = useState<number>(1);

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [country, setCountry] = useState(user?.country || 'Ghana');
  const [educationLevel, setEducationLevel] = useState<StudentOnboardingData['currentEducationLevel']>('High School / WASSCE');
  const [selectedFields, setSelectedFields] = useState<string[]>(['Computer Science & Software']);
  const [selectedCareers, setSelectedCareers] = useState<string[]>(['Software Engineer']);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['Ghana 🇬🇭']);
  const [fundingNeed, setFundingNeed] = useState<StudentOnboardingData['fundingNeed']>('Full Scholarship');
  const [wassceCompleted, setWassceCompleted] = useState<boolean>(true);
  const [approxAggregate, setApproxAggregate] = useState<number>(9);

  if (!user || user.role !== 'student' || user.onboardingComplete) {
    return null;
  }

  const toggleField = (field: string) => {
    if (selectedFields.includes(field)) {
      if (selectedFields.length > 1) {
        setSelectedFields(selectedFields.filter(f => f !== field));
      }
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const toggleCareer = (career: string) => {
    if (selectedCareers.includes(career)) {
      if (selectedCareers.length > 1) {
        setSelectedCareers(selectedCareers.filter(c => c !== career));
      }
    } else {
      setSelectedCareers([...selectedCareers, career]);
    }
  };

  const toggleCountry = (c: string) => {
    if (selectedCountries.includes(c)) {
      if (selectedCountries.length > 1) {
        setSelectedCountries(selectedCountries.filter(item => item !== c));
      }
    } else {
      setSelectedCountries([...selectedCountries, c]);
    }
  };

  const handleFinish = () => {
    const data: StudentOnboardingData = {
      fullName: fullName || user.fullName,
      country,
      currentEducationLevel: educationLevel,
      intendedFieldOfStudy: selectedFields,
      careerInterests: selectedCareers,
      preferredCountries: selectedCountries,
      fundingNeed,
      wassceCompleted,
      approximateAggregate: approxAggregate
    };
    completeOnboarding(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#141210]/85 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] dark:bg-[#181410] text-[#1A1815] dark:text-[#FAF7F2] w-full max-w-xl rounded-xl shadow-2xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col max-h-[90vh] my-auto overflow-hidden">
        {/* Sticky Header */}
        <div className="bg-[#1B4332] dark:bg-[#122B20] text-white p-5 sm:p-6 shrink-0 border-b border-[#122B20] dark:border-[#2D6A4F]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D49B37]">
              <Compass className="w-4 h-4" />
              <span>Student Profile Setup · Step {step} of 2</span>
            </div>
            {/* Highly visible instant exit button */}
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#C85A32] hover:bg-[#A84521] text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Save details and immediately enter platform"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Submit & Enter</span>
            </button>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-2 text-white">
            {step === 1 ? 'Educational Background & Qualifications' : 'Academic Field & Career Ambitions'}
          </h2>
          <p className="text-xs text-[#E8DFD5]/90 mt-1">
            Personalize your recommendations for university cut-offs, programmes, and scholarships.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {step === 1 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Kofi Mensah"
                    className="w-full px-3 py-2 bg-white border border-[#D8C7B5] rounded text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">Country of Residence</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D8C7B5] rounded text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#C85A32]"
                  >
                    <option value="Ghana">Ghana 🇬🇭</option>
                    <option value="Nigeria">Nigeria 🇳🇬</option>
                    <option value="South Africa">South Africa 🇿🇦</option>
                    <option value="Kenya">Kenya 🇰🇪</option>
                    <option value="Uganda">Uganda 🇺🇬</option>
                    <option value="Other">Other African Country</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1.5">Current Education Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['High School / WASSCE', 'Undergraduate', 'Graduate'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setEducationLevel(lvl)}
                      className={`p-2.5 text-xs font-semibold rounded border cursor-pointer text-center transition-all ${
                        educationLevel === lvl
                          ? 'bg-[#FAF2EB] border-[#C85A32] text-[#C85A32] shadow-xs'
                          : 'bg-white border-[#E8DFD5] text-[#4A3E35] hover:bg-[#F4EFEB]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-[#E8DFD5] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1A1815]">Have you taken WASSCE / SSCE examinations?</span>
                  <input
                    type="checkbox"
                    checked={wassceCompleted}
                    onChange={(e) => setWassceCompleted(e.target.checked)}
                    className="accent-[#C85A32] w-4 h-4 cursor-pointer"
                  />
                </div>
                {wassceCompleted && (
                  <div className="pt-2 border-t border-[#E8DFD5]">
                    <div className="flex items-center justify-between text-xs text-[#4A3E35] mb-1">
                      <span>Approximate Best 6 Aggregate Score:</span>
                      <span className="font-bold text-sm text-[#C85A32]">Aggregate {approxAggregate}</span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="36"
                      value={approxAggregate}
                      onChange={(e) => setApproxAggregate(parseInt(e.target.value, 10))}
                      className="w-full accent-[#C85A32] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#4A3E35]/80 mt-1">
                      <span>Agg 06 (Distinction)</span>
                      <span>Agg 15</span>
                      <span>Agg 24</span>
                      <span>Agg 36</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1.5">Financial Aid / Funding Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Full Scholarship', 'Partial Aid', 'Self-Funded'] as const).map(need => (
                    <button
                      key={need}
                      type="button"
                      onClick={() => setFundingNeed(need)}
                      className={`p-2.5 text-xs font-semibold rounded border cursor-pointer text-center transition-all ${
                        fundingNeed === need
                          ? 'bg-[#EBF2EE] border-[#1B4332] text-[#1B4332] shadow-xs'
                          : 'bg-white border-[#E8DFD5] text-[#4A3E35] hover:bg-[#F4EFEB]'
                      }`}
                    >
                      {need}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-2">
                  Intended Fields of Study (Select one or more)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_FIELDS.map(f => {
                    const isSelected = selectedFields.includes(f);
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => toggleField(f)}
                        className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#C85A32] text-white border-[#C85A32] font-semibold'
                            : 'bg-white text-[#4A3E35] border-[#D8C7B5] hover:border-[#C85A32]'
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-2">
                  Target Career Paths
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CAREER_INTERESTS.map(c => {
                    const isSelected = selectedCareers.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCareer(c)}
                        className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#1B4332] text-white border-[#1B4332] font-semibold'
                            : 'bg-white text-[#4A3E35] border-[#D8C7B5] hover:border-[#1B4332]'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-2">
                  Preferred African Countries for Study
                </label>
                <div className="flex flex-wrap gap-2">
                  {PREFERRED_COUNTRIES.map(ctry => {
                    const isSelected = selectedCountries.includes(ctry);
                    return (
                      <button
                        key={ctry}
                        type="button"
                        onClick={() => toggleCountry(ctry)}
                        className={`text-xs px-3 py-1.5 rounded border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#FAF4E5] text-[#8C6215] border-[#D49B37] font-semibold'
                            : 'bg-white text-[#4A3E35] border-[#D8C7B5]'
                        }`}
                      >
                        {ctry}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky, Prominent Footer Submit Bar */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] dark:bg-[#181410] border-t border-[#E8DFD5] dark:border-[#332A22] flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-inner z-20">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-[#4A3E35] dark:text-[#E8DFD5] hover:text-[#1A1815] dark:hover:text-white cursor-pointer px-3 py-2 rounded hover:bg-[#F4EFEB] dark:hover:bg-[#25201B]"
            >
              ← Back to Step 1
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/80 hover:underline cursor-pointer"
            >
              Skip setup & explore platform →
            </button>
          )}

          <div className="flex items-center gap-2">
            {step === 1 ? (
              <>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-3.5 py-2.5 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] hover:border-[#C85A32] text-[#1A1815] dark:text-[#FAF7F2] text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  Save & Go to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
                >
                  <span>Next: Fields of Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 bg-[#1B4332] dark:bg-[#2D6A4F] hover:bg-[#122B20] text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center gap-2 cursor-pointer shadow-md transition-colors ring-2 ring-[#D49B37]/40"
              >
                <Check className="w-4 h-4" />
                <span>Submit & Launch Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
