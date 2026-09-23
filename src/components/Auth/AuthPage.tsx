import React, { useState } from 'react';
import { UserRole, MentorProfileData, InstitutionProfileData } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Users, 
  School, 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  User, 
  Check,
  Sun,
  Moon,
  Globe,
  Briefcase,
  Phone,
  MapPin,
  FileText,
  HeartHandshake
} from 'lucide-react';

const MENTORSHIP_AREAS_OPTIONS = [
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
  'International education',
  'Other'
];

const INSTITUTION_TYPES: Array<InstitutionProfileData['institutionType']> = [
  'University',
  'College',
  'Technical University',
  'Training Institution',
  'Professional Institution',
  'Scholarship Organization',
  'Educational Organization'
];

export const AuthPage: React.FC = () => {
  const { login, darkMode, toggleDarkMode } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  
  // Basic Auth Credentials
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [country, setCountry] = useState('Ghana');
  const [city, setCity] = useState('Accra');
  const [phone, setPhone] = useState('');

  // Mentor Specific Fields
  const [occupation, setOccupation] = useState('Lecturer & Tech Consultant');
  const [organization, setOrganization] = useState('Ashesi University');
  const [educationLevel, setEducationLevel] = useState('PhD');
  const [universityAttended, setUniversityAttended] = useState('KNUST / Cambridge');
  const [degree, setDegree] = useState('BSc Computer Engineering');
  const [fieldOfExpertise, setFieldOfExpertise] = useState('Computer Science & Machine Learning');
  const [yearsExperience, setYearsExperience] = useState(7);
  const [selectedMentorAreas, setSelectedMentorAreas] = useState<string[]>([
    'University applications',
    'Computer Science',
    'Scholarships'
  ]);
  const [aboutMe, setAboutMe] = useState('Academic researcher and mentor passionate about opening pathways for African youth.');
  const [whyMentor, setWhyMentor] = useState('I want to guide ambitious students through university admissions, scholarships, and STEM careers.');

  // Institution Specific Fields
  const [institutionName, setInstitutionName] = useState('University of Ghana, Legon');
  const [institutionType, setInstitutionType] = useState<InstitutionProfileData['institutionType']>('University');
  const [officialWebsite, setOfficialWebsite] = useState('https://ug.edu.gh');
  const [institutionDescription, setInstitutionDescription] = useState('Ghana premier higher education institution, founded in 1948, fostering research, academic excellence, and pan-African development.');

  const toggleMentorArea = (area: string) => {
    setSelectedMentorAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (authMode === 'login') {
      const defaultName = selectedRole === 'student' 
        ? 'Kwesi Appiah' 
        : selectedRole === 'mentor' 
          ? 'Victoria Mensah' 
          : 'UG Admissions Representative';
      login(email, selectedRole, defaultName);
      return;
    }

    // Sign up mode with role-tailored payloads
    if (selectedRole === 'mentor') {
      const mentorData: Partial<MentorProfileData> = {
        occupation,
        organization,
        educationLevel,
        universityAttended,
        degree,
        fieldOfExpertise,
        yearsExperience: Number(yearsExperience) || 5,
        expertiseAreas: selectedMentorAreas,
        aboutMe,
        whyMentor,
        verificationStatus: 'pending',
        countriesToAdvise: [country],
        languages: ['English'],
        mentorshipStyle: '1-on-1 Guidance & Application Feedback'
      };
      login(email, 'mentor', fullName || 'Academic Mentor', {
        mentorData,
        city,
        phone,
        country
      });
    } else if (selectedRole === 'institution') {
      const institutionData: Partial<InstitutionProfileData> = {
        institutionName: institutionName || fullName,
        institutionType,
        country,
        city,
        officialWebsite,
        officialEmail: email,
        phone,
        description: institutionDescription,
        verificationStatus: 'pending',
        campusPhotoUrls: ['/images/campuses/ug_balme_library.jpg', '/images/campuses/ug_great_hall.jpg'],
        admissionsPortalUrl: officialWebsite,
        faculties: ['Faculty of Science', 'Faculty of Arts', 'Business School']
      };
      login(email, 'institution', institutionName || fullName || 'University Representative', {
        institutionData,
        city,
        phone,
        country
      });
    } else {
      // Student signup
      login(email, 'student', fullName || 'African Student', {
        city,
        phone,
        country
      });
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#FAF7F2] dark:bg-[#0F0D0B] text-[#1A1815] dark:text-[#FAF7F2] overflow-x-hidden transition-colors duration-200">
      {/* Top Floating Dark Mode Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleDarkMode}
          className="px-3 py-2 bg-white/90 dark:bg-[#1A1815]/90 border border-[#D8C7B5] dark:border-[#3E332A] rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md hover:border-[#E6A820] cursor-pointer transition-colors backdrop-blur-xs text-[#1A1815] dark:text-[#FAF7F2]"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme mode"
        >
          {darkMode ? (
            <>
              <Sun className="w-4 h-4 text-[#E6A820]" />
              <span className="text-xs text-[#E6A820]">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-[#4A3E35]" />
              <span className="text-xs text-[#4A3E35]">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Decorative Traditional African Geometric Framing */}
      <div 
        className="fixed top-0 bottom-0 left-0 w-8 sm:w-14 pointer-events-none opacity-20 dark:opacity-30 z-0 bg-repeat-y"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 0L56 50L28 100L0 50L28 0Z' stroke='%23D49B37' stroke-width='1'/%3E%3Cpath d='M28 15L48 50L28 85L8 50L28 15Z' stroke='%23C85A32' stroke-width='0.75' stroke-dasharray='2 3'/%3E%3Ccircle cx='28' cy='50' r='4' fill='%23D49B37'/%3E%3C/svg%3E")`,
          backgroundSize: '56px 100px'
        }}
      />
      <div 
        className="fixed top-0 bottom-0 right-0 w-8 sm:w-14 pointer-events-none opacity-20 dark:opacity-30 z-0 bg-repeat-y"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 0L56 50L28 100L0 50L28 0Z' stroke='%23D49B37' stroke-width='1'/%3E%3Cpath d='M28 15L48 50L28 85L8 50L28 15Z' stroke='%23C85A32' stroke-width='0.75' stroke-dasharray='2 3'/%3E%3Ccircle cx='28' cy='50' r='4' fill='%23D49B37'/%3E%3C/svg%3E")`,
          backgroundSize: '56px 100px'
        }}
      />

      {/* Main Dual-Card Container */}
      <div className={`relative z-10 w-full ${authMode === 'signup' && selectedRole !== 'student' ? 'max-w-6xl' : 'max-w-5xl'} grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden shadow-2xl border border-[#E8DFD5] dark:border-[#332A22] bg-white dark:bg-[#141210]/95 backdrop-blur-md transition-all duration-300`}>
        {/* LEFT COLUMN: Authentic African Campus Photography + Constellation Map */}
        <div className="lg:col-span-5 relative min-h-[440px] lg:min-h-[640px] flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-[#1B1815]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: selectedRole === 'institution'
                ? `url('/images/campuses/ug_great_hall.jpg')`
                : selectedRole === 'mentor'
                  ? `url('/images/campuses/knust_main_gate.jpg')`
                  : `url('/images/campuses/ashesi_courtyard.jpg')`,
              filter: 'brightness(0.55) contrast(1.15)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12100E]/70 via-transparent to-transparent" />

          {/* Top Left Tag Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="border border-[#D49B37]/60 bg-[#12100E]/70 backdrop-blur-xs px-3.5 py-2 rounded-lg">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FAF7F2] uppercase">
                {selectedRole === 'mentor' ? 'ACADEMIC & INDUSTRY MENTORSHIP' : selectedRole === 'institution' ? 'ACCREDITED AFRICAN INSTITUTIONS' : "AFRICA'S FUTURE BUILDS HERE"}
              </span>
            </div>
          </div>

          {/* Golden Dotted African Continent Schematic */}
          <div className="relative z-10 my-auto py-6 flex justify-end">
            <div className="relative w-52 sm:w-60">
              <svg viewBox="0 0 300 320" className="w-full h-auto drop-shadow-md">
                <path
                  d="M 100 40 C 120 30, 160 28, 190 35 C 210 42, 230 55, 245 70 C 260 85, 275 105, 280 120 C 285 135, 280 150, 265 165 C 250 180, 245 195, 240 210 C 230 235, 205 270, 180 295 C 165 310, 145 315, 135 295 C 125 270, 110 240, 105 220 C 95 190, 75 180, 55 170 C 35 160, 25 140, 30 120 C 38 100, 60 85, 80 60 Z"
                  fill="rgba(212, 155, 55, 0.08)"
                  stroke="#E6A820"
                  strokeWidth="2"
                  strokeDasharray="3 4"
                />
                <circle cx="95" cy="165" r="3.5" fill="#FAF7F2" />
                <circle cx="150" cy="115" r="3" fill="#FAF7F2" />
                <circle cx="215" cy="95" r="3.5" fill="#FAF7F2" />
                <circle cx="210" cy="170" r="3.5" fill="#FAF7F2" />
                <circle cx="155" cy="275" r="3.5" fill="#FAF7F2" />
                <line x1="95" y1="165" x2="150" y2="115" stroke="#E6A820" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
                <line x1="150" y1="115" x2="215" y2="95" stroke="#E6A820" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
                <line x1="215" y1="95" x2="210" y2="170" stroke="#E6A820" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
                <line x1="95" y1="165" x2="155" y2="275" stroke="#E6A820" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
                <line x1="210" y1="170" x2="155" y2="275" stroke="#E6A820" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
              </svg>
              <div className="absolute top-10 left-4 text-right">
                <span className="font-serif italic text-base sm:text-lg text-[#FAF7F2] tracking-wide block drop-shadow-md">
                  {selectedRole === 'mentor' ? 'Guiding the Next Generation' : selectedRole === 'institution' ? 'Verified African Excellence' : 'African Scholars'}
                </span>
                <span className="font-serif italic text-base sm:text-lg text-[#E6A820] tracking-wide block drop-shadow-md">
                  {selectedRole === 'mentor' ? 'Mentorship & Impact' : selectedRole === 'institution' ? 'Accredited Programs' : 'Global Opportunities'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Heading & Brand */}
          <div className="relative z-10 space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-[#D49B37] font-semibold">
              WELCOME TO
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F2]">
              AfriVersity
            </h1>
            <p className="text-xs sm:text-sm text-[#E8DFD5]/90 font-light">
              Connecting students, mentors, and accredited higher institutions.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Adaptive Auth & Registration Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white dark:bg-[#141210] text-[#1A1815] dark:text-[#FAF7F2] max-h-[90vh] overflow-y-auto">
          {/* Header Insignia */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-10 h-10 flex items-center justify-center text-[#E6A820] mb-1">
              <svg viewBox="0 0 40 44" className="w-8 h-8 fill-current">
                <path d="M20 2C13 2 7 8 7 15C7 24 13 38 20 42C27 38 33 24 33 15C33 8 27 2 20 2ZM20 6C24 6 28 10 28 15C28 16.5 27.5 18 26.5 19.5L25 18C25 15.5 23 13.5 20.5 13.5C18 13.5 16 15.5 16 18L14.5 19.5C13.5 18 13 16.5 13 15C13 10 17 6 20 6ZM17 22H23V25H17V22ZM15 28H25V30H15V28ZM18 33H22V35H18V33Z" />
              </svg>
            </div>
            <h2 className="font-serif text-base sm:text-lg font-bold tracking-[0.25em] text-[#C85A32] dark:text-[#E6A820] uppercase">
              AFRIVERSITY
            </h2>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#4A3E35]/70 dark:text-[#E8DFD5]/60">
              DISCOVER · GUIDE · VERIFY
            </span>
          </div>

          {/* Toggle Pills: Sign In vs Create Account */}
          <div className="flex p-1 bg-[#FAF4EB] dark:bg-[#1F1915] rounded-full border border-[#E8DFD5] dark:border-[#332A22] mb-5">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'login'
                  ? 'bg-[#1B4332] text-white dark:bg-[#2E241A] dark:text-[#E6A820] shadow-sm'
                  : 'text-[#4A3E35] dark:text-[#E8DFD5]/70 hover:text-[#1A1815] dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'bg-[#1B4332] text-white dark:bg-[#2E241A] dark:text-[#E6A820] shadow-sm'
                  : 'text-[#4A3E35] dark:text-[#E8DFD5]/70 hover:text-[#1A1815] dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* ROLE SELECTION BEFORE REGISTRATION (Section 1 Requirement) */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] uppercase tracking-wider text-[#C85A32] dark:text-[#D49B37] font-bold">
                {authMode === 'signup' ? '1. Select Your Account Type:' : 'Choose Login Portal:'}
              </label>
              {authMode === 'signup' && (
                <span className="text-[10px] text-[#4A3E35]/70 dark:text-[#E8DFD5]/60">Adapts registration fields</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Student Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'student'
                    ? 'bg-[#FAF4E5] dark:bg-[#2E241A] border-[#D49B37] shadow-sm ring-2 ring-[#D49B37]/30'
                    : 'bg-white dark:bg-[#1A1815] border-[#E8DFD5] dark:border-[#332A22] hover:border-[#D49B37]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C85A32]/10 dark:bg-[#C85A32]/20 flex items-center justify-center text-[#C85A32]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  {selectedRole === 'student' && <Check className="w-4 h-4 text-[#D49B37]" />}
                </div>
                <div className="font-bold text-xs text-[#1A1815] dark:text-[#FAF7F2]">Student</div>
                <p className="text-[10px] text-[#4A3E35] dark:text-[#E8DFD5]/70 mt-1 leading-tight">
                  "I want to discover educational opportunities and get guidance."
                </p>
              </button>

              {/* Mentor Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('mentor')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'mentor'
                    ? 'bg-[#EBF4EE] dark:bg-[#18281E] border-[#2D6A4F] shadow-sm ring-2 ring-[#2D6A4F]/30'
                    : 'bg-white dark:bg-[#1A1815] border-[#E8DFD5] dark:border-[#332A22] hover:border-[#2D6A4F]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1B4332]/10 dark:bg-[#2D6A4F]/20 flex items-center justify-center text-[#1B4332] dark:text-[#4EBA87]">
                    <Users className="w-4 h-4" />
                  </div>
                  {selectedRole === 'mentor' && <Check className="w-4 h-4 text-[#2D6A4F]" />}
                </div>
                <div className="font-bold text-xs text-[#1A1815] dark:text-[#FAF7F2]">Mentor</div>
                <p className="text-[10px] text-[#4A3E35] dark:text-[#E8DFD5]/70 mt-1 leading-tight">
                  "I want to guide students and share my experience."
                </p>
              </button>

              {/* Institution Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('institution')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'institution'
                    ? 'bg-[#FDF2EC] dark:bg-[#2E241A] border-[#C85A32] shadow-sm ring-2 ring-[#C85A32]/30'
                    : 'bg-white dark:bg-[#1A1815] border-[#E8DFD5] dark:border-[#332A22] hover:border-[#C85A32]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C85A32]/10 dark:bg-[#C85A32]/20 flex items-center justify-center text-[#C85A32]">
                    <School className="w-4 h-4" />
                  </div>
                  {selectedRole === 'institution' && <Check className="w-4 h-4 text-[#C85A32]" />}
                </div>
                <div className="font-bold text-xs text-[#1A1815] dark:text-[#FAF7F2]">Institution</div>
                <p className="text-[10px] text-[#4A3E35] dark:text-[#E8DFD5]/70 mt-1 leading-tight">
                  "We represent a university, college, or scholarship provider."
                </p>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* SIGN IN VIEW */}
            {authMode === 'login' ? (
              <>
                <div>
                  <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                    {selectedRole === 'institution' ? 'Official Institutional Email' : 'Email address or phone'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#D49B37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        selectedRole === 'student'
                          ? 'student@afriversity.org'
                          : selectedRole === 'mentor'
                            ? 'victoria.mensah@afriversity-mentors.org'
                            : 'admissions@ug.edu.gh'
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs sm:text-sm text-[#1A1815] dark:text-white placeholder:text-[#4A3E35]/40 dark:placeholder:text-[#E8DFD5]/40 focus:outline-none focus:border-[#E6A820] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#D49B37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs sm:text-sm text-[#1A1815] dark:text-white placeholder:text-[#4A3E35]/40 dark:placeholder:text-[#E8DFD5]/40 focus:outline-none focus:border-[#E6A820] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A3E35]/60 dark:text-[#E8DFD5]/60 hover:text-[#1A1815] dark:hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-[#4A3E35] dark:text-[#E8DFD5]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-[#E6A820] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="text-[#C85A32] dark:text-[#E6A820] hover:underline font-medium cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            ) : (
              /* SIGN UP VIEW - ADAPTIVE FIELDS (Sections 1, 2, 15) */
              <div className="space-y-4">
                {/* 1. STUDENT REGISTRATION */}
                {selectedRole === 'student' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#D49B37] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g., Kwesi Mensah"
                            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#D49B37] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@afriversity.org"
                            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Country *
                        </label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        >
                          <option value="Ghana">Ghana</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Tanzania">Tanzania</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          City/Location
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g., Kumasi, Accra"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+233 24 000 0000"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* 2. MENTOR REGISTRATION (Section 2) */}
                {selectedRole === 'mentor' && (
                  <div className="space-y-3.5">
                    <div className="p-3 bg-[#EBF4EE] dark:bg-[#18281E] border border-[#2D6A4F]/30 rounded-xl text-xs text-[#1B4332] dark:text-[#4EBA87] flex items-center gap-2">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>Mentor accounts undergo administrative verification before public badge assignment.</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g., Dr. Kwame Mensah"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Professional Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="mentor@institution.edu or company.com"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Current Occupation / Role *
                        </label>
                        <input
                          type="text"
                          required
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                          placeholder="e.g., Senior Software Engineer / Lecturer"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Organization / Company *
                        </label>
                        <input
                          type="text"
                          required
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="e.g., Ashesi University / Paystack"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          University Attended *
                        </label>
                        <input
                          type="text"
                          required
                          value={universityAttended}
                          onChange={(e) => setUniversityAttended(e.target.value)}
                          placeholder="e.g., KNUST"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Degree *
                        </label>
                        <input
                          type="text"
                          required
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          placeholder="e.g., BSc Computer Science"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Years Experience
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="45"
                          value={yearsExperience}
                          onChange={(e) => setYearsExperience(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    {/* Mentorship Areas Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1815] dark:text-[#FAF7F2] mb-1.5">
                        Areas You Can Mentor Students In (Select all that apply):
                      </label>
                      <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg">
                        {MENTORSHIP_AREAS_OPTIONS.map((area) => {
                          const isSelected = selectedMentorAreas.includes(area);
                          return (
                            <button
                              key={area}
                              type="button"
                              onClick={() => toggleMentorArea(area)}
                              className={`px-2.5 py-1 text-[11px] rounded-md font-medium transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1B4332] text-white'
                                  : 'bg-white dark:bg-[#2E241A] text-[#4A3E35] dark:text-[#E8DFD5] border border-[#D8C7B5] dark:border-[#3E332A]'
                              }`}
                            >
                              {isSelected ? '✓ ' : '+ '}
                              {area}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          About Me (Short Bio)
                        </label>
                        <textarea
                          rows={2}
                          value={aboutMe}
                          onChange={(e) => setAboutMe(e.target.value)}
                          placeholder="Summarize your professional background..."
                          className="w-full px-3 py-1.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Why I want to mentor students
                        </label>
                        <textarea
                          rows={2}
                          value={whyMentor}
                          onChange={(e) => setWhyMentor(e.target.value)}
                          placeholder="Your motivation for advising African students..."
                          className="w-full px-3 py-1.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. INSTITUTION REGISTRATION (Section 15) */}
                {selectedRole === 'institution' && (
                  <div className="space-y-3.5">
                    <div className="p-3 bg-[#FDF2EC] dark:bg-[#2E241A] border border-[#C85A32]/30 rounded-xl text-xs text-[#C85A32] dark:text-[#E87A55] flex items-center gap-2">
                      <School className="w-4 h-4 shrink-0" />
                      <span>Official institution accounts require verification via institutional domain (.edu, .edu.gh, .ac.za).</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Institution Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                          placeholder="e.g., University of Ghana, Legon"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Institution Type *
                        </label>
                        <select
                          value={institutionType}
                          onChange={(e) => setInstitutionType(e.target.value as any)}
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        >
                          {INSTITUTION_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Official Institutional Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admissions@ug.edu.gh or registrar@..."
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Official Website *
                        </label>
                        <input
                          type="url"
                          required
                          value={officialWebsite}
                          onChange={(e) => setOfficialWebsite(e.target.value)}
                          placeholder="https://ug.edu.gh"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Country *
                        </label>
                        <input
                          type="text"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Ghana"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          City / Campus Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Legon, Accra"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                          Admissions Office Phone
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+233 30 221 3820"
                          className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                        Institution Description / Overview
                      </label>
                      <textarea
                        rows={2}
                        value={institutionDescription}
                        onChange={(e) => setInstitutionDescription(e.target.value)}
                        placeholder="Accreditation, mission, and key academic faculties..."
                        className="w-full px-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Password input for sign up */}
                <div>
                  <label className="block text-xs font-medium text-[#4A3E35] dark:text-[#E8DFD5]/90 mb-1">
                    Set Secure Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#D49B37] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full pl-9 pr-10 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A3E35]/60 dark:text-[#E8DFD5]/60 hover:text-[#1A1815] dark:hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Glowing Amber / Gold CTA Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3.5 px-4 bg-[#E6A820] hover:bg-[#D49B37] text-[#141210] font-bold text-sm rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg hover:shadow-xl ring-2 ring-[#E6A820]/40"
            >
              <ArrowRight className="w-4 h-4 text-[#141210]" />
              <span>
                {authMode === 'login' 
                  ? `Sign In to ${selectedRole === 'student' ? 'Student' : selectedRole === 'mentor' ? 'Mentor' : 'Institution'} Portal` 
                  : `Create ${selectedRole === 'student' ? 'Student' : selectedRole === 'mentor' ? 'Mentor' : 'Institution'} Account`}
              </span>
            </button>
          </form>

          {/* Quick toggle footer */}
          <div className="mt-5 text-center text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
            {authMode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-[#C85A32] dark:text-[#E6A820] font-bold hover:underline cursor-pointer"
                >
                  Create one here
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-[#C85A32] dark:text-[#E6A820] font-bold hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
