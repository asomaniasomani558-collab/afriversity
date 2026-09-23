import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MentorProfileData } from '../../types';
import { 
  User, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Clock, 
  HeartHandshake, 
  Edit3, 
  Check, 
  Save, 
  MapPin, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

const ALL_EXPERTISE_OPTIONS = [
  'University applications',
  'Computer Science',
  'Engineering',
  'Business',
  'Medicine',
  'Law',
  'Scholarships',
  'Career development',
  'Entrepreneurship',
  'Technology',
  'Study skills',
  'International education'
];

export const MentorProfileView: React.FC = () => {
  const { user, updateMentorProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const mentorData = user?.mentorData;

  // Form State for editing
  const [occupation, setOccupation] = useState(mentorData?.occupation || 'Senior Research Fellow & Academic Advisor');
  const [organization, setOrganization] = useState(mentorData?.organization || 'Ashesi University / AI Africa Lab');
  const [universityAttended, setUniversityAttended] = useState(mentorData?.universityAttended || 'KNUST / Cambridge University');
  const [degree, setDegree] = useState(mentorData?.degree || 'BSc Computer Engineering · PhD');
  const [fieldOfExpertise, setFieldOfExpertise] = useState(mentorData?.fieldOfExpertise || 'Computer Science & STEM Admissions');
  const [yearsExperience, setYearsExperience] = useState(mentorData?.yearsExperience || 8);
  const [aboutMe, setAboutMe] = useState(mentorData?.aboutMe || '');
  const [whyMentor, setWhyMentor] = useState(mentorData?.whyMentor || '');
  const [weeklyHours, setWeeklyHours] = useState(mentorData?.weeklyAvailabilityHours || '2-4 hours / week');
  const [mentorshipStyle, setMentorshipStyle] = useState(mentorData?.mentorshipStyle || '1-on-1 Guidance & Application Feedback');
  const [expertise, setExpertise] = useState<string[]>(mentorData?.expertiseAreas || ['University applications', 'Computer Science', 'Scholarships']);

  const toggleExpertise = (area: string) => {
    if (expertise.includes(area)) {
      if (expertise.length > 1) {
        setExpertise(expertise.filter(a => a !== area));
      }
    } else {
      setExpertise([...expertise, area]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMentorProfile({
      occupation,
      organization,
      universityAttended,
      degree,
      fieldOfExpertise,
      yearsExperience: Number(yearsExperience) || 5,
      aboutMe,
      whyMentor,
      weeklyAvailabilityHours: weeklyHours,
      mentorshipStyle,
      expertiseAreas: expertise
    });

    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const isVerified = user?.verificationStatus === 'verified';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>Mentor Profile Management</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            {user?.fullName || 'Academic Mentor'}
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1">
            Manage your public advisory identity, credentials, and mentorship availability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Saved!</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#FAF4EB] dark:bg-[#2E241A] hover:bg-[#1B4332] hover:text-white border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {isEditing ? (
        /* EDIT FORM */
        <form onSubmit={handleSave} className="bg-white dark:bg-[#181410] p-6 sm:p-8 rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Occupation / Role *</label>
              <input
                type="text"
                required
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Organization / University *</label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">University Attended *</label>
              <input
                type="text"
                required
                value={universityAttended}
                onChange={(e) => setUniversityAttended(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Degree Earned *</label>
              <input
                type="text"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Years of Experience</label>
              <input
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Mentorship Areas */}
          <div>
            <label className="block font-semibold mb-1.5">Mentorship Areas</label>
            <div className="flex flex-wrap gap-2">
              {ALL_EXPERTISE_OPTIONS.map((area) => {
                const isSelected = expertise.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleExpertise(area)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-white dark:bg-[#25201B] border-[#D8C7B5] dark:border-[#3E332A] text-[#4A3E35] dark:text-[#E8DFD5]'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {area}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Weekly Availability</label>
              <input
                type="text"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value)}
                placeholder="e.g., 2-4 hours / week"
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Mentorship Style</label>
              <input
                type="text"
                value={mentorshipStyle}
                onChange={(e) => setMentorshipStyle(e.target.value)}
                placeholder="e.g., 1-on-1 Guidance & Essay Review"
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">About Me (Bio)</label>
            <textarea
              rows={3}
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Why I want to mentor students</label>
            <textarea
              rows={3}
              value={whyMentor}
              onChange={(e) => setWhyMentor(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E8DFD5] dark:border-[#332A22]">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-[#4A3E35] dark:text-[#E8DFD5] font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      ) : (
        /* PUBLIC MENTOR CARD VIEW (Authentic African styling, verified badge) */
        <div className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] overflow-hidden shadow-xs">
          {/* Top Banner Pattern */}
          <div className="bg-[#1B4332] h-28 relative">
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%23D49B37' fill-opacity='0.5'/%3E%3C/svg%3E")`
              }}
            />
          </div>

          <div className="p-6 sm:p-8 relative -mt-12 space-y-6">
            {/* Avatar & Key Identification */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="w-20 h-20 rounded-2xl bg-[#1B4332] border-4 border-white dark:border-[#181410] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                  {user?.fullName?.charAt(0) || 'M'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                      {user?.fullName}
                    </h2>
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF4EE] dark:bg-[#18281E] border border-[#2D6A4F] text-[#1B4332] dark:text-[#4EBA87] text-[11px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Mentor</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF4E5] dark:bg-[#2E241A] border border-[#D49B37] text-[#8C6215] dark:text-[#E6A820] text-[11px] font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Pending Verification</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-0.5 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>{mentorData?.occupation} at <strong>{mentorData?.organization}</strong></span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D49B37]" />
                  <span>{user?.city || 'Accra'}, {user?.country || 'Ghana'}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D49B37]" />
                  <span>{mentorData?.weeklyAvailabilityHours || '2-4 hours/week'}</span>
                </span>
              </div>
            </div>

            {/* Academic Credentials Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#FAF7F2] dark:bg-[#1F1915] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] text-xs">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 uppercase">University Attended</div>
                  <div className="font-semibold text-[#1A1815] dark:text-[#FAF7F2]">{mentorData?.universityAttended}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-[#C85A32] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 uppercase">Degree & Field</div>
                  <div className="font-semibold text-[#1A1815] dark:text-[#FAF7F2]">{mentorData?.degree}</div>
                </div>
              </div>
            </div>

            {/* Expertise Tags */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#C85A32] dark:text-[#E6A820] mb-2">
                Advisory Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {mentorData?.expertiseAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-[#FAF4EB] dark:bg-[#2E241A] border border-[#E8DFD5] dark:border-[#332A22] text-[#4A3E35] dark:text-[#FAF7F2] rounded-lg text-xs font-semibold"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* About & Motivation */}
            <div className="space-y-4 pt-2 border-t border-[#E8DFD5] dark:border-[#332A22] text-xs">
              <div>
                <h3 className="font-serif text-sm font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-1">
                  About Me
                </h3>
                <p className="text-[#4A3E35] dark:text-[#E8DFD5]/80 leading-relaxed">
                  {mentorData?.aboutMe || 'Dedicated academic researcher and mentor assisting students in high school and undergraduate STEM education across Africa.'}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-sm font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-1 flex items-center gap-1.5 text-[#1B4332] dark:text-[#4EBA87]">
                  <HeartHandshake className="w-4 h-4 text-[#C85A32]" />
                  <span>Why I Want to Mentor Students</span>
                </h3>
                <p className="text-[#4A3E35] dark:text-[#E8DFD5]/80 leading-relaxed">
                  {mentorData?.whyMentor || 'To ensure capable African youth have the guidance, scholarship essay preparation, and curriculum advice they need to compete globally.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
