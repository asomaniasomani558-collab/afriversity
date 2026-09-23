import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentOnboardingData } from '../../types';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Check, 
  ShieldCheck, 
  DollarSign, 
  Save 
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, completeOnboarding } = useApp();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [country, setCountry] = useState(user?.country || 'Ghana');
  const [city, setCity] = useState(user?.city || 'Accra');
  const [bio, setBio] = useState(user?.bio || '');
  const [approxAggregate, setApproxAggregate] = useState<number>(user?.studentData?.approximateAggregate || 9);
  const [fundingNeed, setFundingNeed] = useState<StudentOnboardingData['fundingNeed']>(user?.studentData?.fundingNeed || 'Full Scholarship');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!user) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.role === 'student') {
      completeOnboarding({
        fullName,
        country,
        currentEducationLevel: user.studentData?.currentEducationLevel || 'High School / WASSCE',
        intendedFieldOfStudy: user.studentData?.intendedFieldOfStudy || ['Computer Science'],
        careerInterests: user.studentData?.careerInterests || ['Software Engineer'],
        preferredCountries: user.studentData?.preferredCountries || ['Ghana 🇬🇭'],
        fundingNeed,
        wassceCompleted: true,
        approximateAggregate: approxAggregate
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#E8DFD5] pb-5">
        <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1">
          Account Credentials & Personalization
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1A1815]">
          Profile & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-[#4A3E35] mt-1">
          Manage your personal educational credentials, target programs, and funding priorities.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* User Card */}
        <div className="p-6 bg-white rounded-lg border border-[#E8DFD5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1B4332] text-white text-2xl font-bold flex items-center justify-center">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold text-[#1A1815]">{user.fullName}</h2>
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-[#FAF2EB] text-[#C85A32] border border-[#C85A32]/30">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-[#4A3E35]">{user.email}</p>
              <p className="text-xs text-[#4A3E35] mt-0.5">{user.city ? `${user.city}, ` : ''}{user.country}</p>
            </div>
          </div>

          <div className="text-xs text-[#1B4332] bg-[#EBF2EE] p-3 rounded border border-[#1B4332]/20 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
            <span>Authenticated AfriVersity Member</span>
          </div>
        </div>

        {/* Basic Information */}
        <div className="p-6 bg-white rounded-lg border border-[#E8DFD5] space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#1A1815] border-b border-[#E8DFD5] pb-2">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4A3E35] mb-1">Display Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D8C7B5] rounded text-xs text-[#1A1815]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#4A3E35] mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D8C7B5] rounded text-xs text-[#1A1815]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4A3E35] mb-1">Academic & Professional Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell mentors and admissions coordinators about your aspirations..."
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D8C7B5] rounded text-xs text-[#1A1815]"
            />
          </div>
        </div>

        {/* Student Specific Preferences */}
        {user.role === 'student' && user.studentData && (
          <div className="p-6 bg-white rounded-lg border border-[#E8DFD5] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1A1815] border-b border-[#E8DFD5] pb-2">
              Academic & Admission Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4A3E35] mb-1">Current Education Level</label>
                <div className="p-2.5 bg-[#FAF7F2] rounded text-xs font-semibold text-[#1A1815] border border-[#E8DFD5]">
                  {user.studentData.currentEducationLevel}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A3E35] mb-1">WASSCE Aggregate Benchmark</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="6"
                    max="36"
                    value={approxAggregate}
                    onChange={(e) => setApproxAggregate(parseInt(e.target.value, 10))}
                    className="flex-1 accent-[#C85A32]"
                  />
                  <span className="font-bold text-xs text-[#C85A32] w-20 text-right">
                    Aggregate {approxAggregate}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A3E35] mb-1">Intended Fields of Study</label>
              <div className="flex flex-wrap gap-1.5">
                {user.studentData.intendedFieldOfStudy.map((f, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-[#FAF2EB] text-[#C85A32] border border-[#C85A32]/30 rounded">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A3E35] mb-1">Funding Need</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Full Scholarship', 'Partial Aid', 'Self-Funded'] as const).map(need => (
                  <button
                    key={need}
                    type="button"
                    onClick={() => setFundingNeed(need)}
                    className={`p-2 text-xs font-medium rounded border cursor-pointer text-center ${
                      fundingNeed === need
                        ? 'bg-[#EBF2EE] border-[#1B4332] text-[#1B4332]'
                        : 'bg-[#FAF7F2] border-[#E8DFD5] text-[#4A3E35]'
                    }`}
                  >
                    {need}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="text-xs text-[#1B4332] font-semibold flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Profile updated successfully!</span>
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-5 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
