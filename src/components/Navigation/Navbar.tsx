import React, { useState } from 'react';
import { UserRole } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  School, 
  BookOpen, 
  Award, 
  Compass, 
  Users, 
  MessageSquare, 
  Sparkles, 
  Bookmark, 
  Search, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Sun, 
  Moon, 
  Code2,
  Calendar,
  Megaphone,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Briefcase
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    user, 
    logout, 
    activeTab, 
    setActiveTab, 
    savedUniversities, 
    savedCourses, 
    savedScholarships,
    savedMicrocourses,
    savedOpportunities,
    globalSearchQuery,
    setGlobalSearchQuery,
    darkMode,
    toggleDarkMode,
    requests
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const totalSaved = savedUniversities.length + 
    savedCourses.length + 
    savedScholarships.length + 
    (savedMicrocourses?.length || 0) + 
    (savedOpportunities?.length || 0);

  const pendingRequestsCount = requests.filter(r => r.status === 'pending').length;

  // Adaptive Nav Items per Role
  let navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'universities', label: 'Universities', icon: School },
    { id: 'courses', label: 'Courses & Cut-offs', icon: BookOpen },
    { id: 'microcourses', label: 'Microcourses', icon: Code2 },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'careers', label: 'Careers', icon: Compass },
    { id: 'mentors', label: 'Mentors', icon: Users },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
    { id: 'community', label: 'Community', icon: MessageSquare },
    { id: 'advisor', label: 'AI Advisor', icon: Sparkles }
  ];

  if (user?.role === 'mentor') {
    navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Compass },
      { id: 'requests', label: `Student Requests${pendingRequestsCount > 0 ? ` (${pendingRequestsCount})` : ''}`, icon: Users },
      { id: 'sessions', label: 'Advisory Sessions', icon: Calendar },
      { id: 'messages', label: 'Direct Messages', icon: MessageSquare },
      { id: 'resources', label: 'Guides & Resources', icon: BookOpen },
      { id: 'community', label: 'Community Q&A', icon: MessageSquare },
      { id: 'mentor-profile', label: 'Mentor Profile', icon: User }
    ];
  } else if (user?.role === 'institution') {
    navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Compass },
      { id: 'institution-programs', label: 'Degree Programmes', icon: BookOpen },
      { id: 'institution-opportunities', label: 'Scholarships & Aid', icon: Award },
      { id: 'institution-announcements', label: 'Admissions Notices', icon: Megaphone },
      { id: 'institution-profile', label: 'Campus Showcase', icon: School },
      { id: 'community', label: 'Student Q&A', icon: MessageSquare }
    ];
  }

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const getPortalSubtitle = () => {
    if (user?.role === 'mentor') return 'Mentor & Advisory Portal';
    if (user?.role === 'institution') return 'Institution Portal';
    return 'Education Portal';
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2] dark:bg-[#141210] border-b border-[#E8DFD5] dark:border-[#2E241A] transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button
              onClick={() => handleTabClick('dashboard')}
              className="flex items-center gap-2.5 text-left cursor-pointer group shrink-0"
            >
              <div className={`w-9 h-9 rounded flex items-center justify-center text-white shadow-xs transition-colors ${
                user?.role === 'mentor' ? 'bg-[#1B4332] group-hover:bg-[#122B20]' : 
                user?.role === 'institution' ? 'bg-[#C85A32] group-hover:bg-[#A84521]' : 
                'bg-[#C85A32] group-hover:bg-[#A84521]'
              }`}>
                {user?.role === 'institution' ? (
                  <School className="w-5 h-5 text-white" />
                ) : user?.role === 'mentor' ? (
                  <Users className="w-5 h-5 text-[#E6A820]" />
                ) : (
                  <GraduationCap className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#1A1815] dark:text-[#FAF7F2] group-hover:text-[#C85A32] transition-colors">
                  AfriVersity
                </span>
                <span className="block text-[10px] tracking-wider uppercase text-[#D49B37] font-semibold -mt-0.5">
                  {getPortalSubtitle()}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1B4332] text-white dark:bg-[#1B4332] dark:text-[#FAF7F2]'
                        : 'text-[#4A3E35] dark:text-[#E8DFD5]/80 hover:text-[#1A1815] dark:hover:text-white hover:bg-[#F4EFEB] dark:hover:bg-[#1F1915]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D49B37]' : 'text-[#4A3E35] dark:text-[#D49B37]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search for Student Mode */}
            {(!user || user.role === 'student') && (
              <div className="relative hidden md:block w-36 lg:w-48">
                <Search className="w-3.5 h-3.5 text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  placeholder="Search programmes..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg focus:outline-none focus:border-[#C85A32] text-[#1A1815] dark:text-[#FAF7F2]"
                />
              </div>
            )}

            {/* Dark Mode / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 text-[#4A3E35] dark:text-[#E6A820] hover:bg-[#F4EFEB] dark:hover:bg-[#1F1915] rounded-lg transition-colors cursor-pointer border border-[#E8DFD5] dark:border-[#332A22]"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-[#E6A820]" />
              ) : (
                <Moon className="w-4 h-4 text-[#4A3E35]" />
              )}
            </button>

            {/* Saved Items Bookmark Counter (Students only) */}
            {(!user || user.role === 'student') && (
              <button
                onClick={() => handleTabClick('saved')}
                className="relative p-2 text-[#4A3E35] dark:text-[#E8DFD5] hover:bg-[#F4EFEB] dark:hover:bg-[#1F1915] rounded-lg transition-colors cursor-pointer border border-[#E8DFD5] dark:border-[#332A22]"
                title="Saved opportunities & courses"
              >
                <Bookmark className="w-4 h-4" />
                {totalSaved > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C85A32] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalSaved}
                  </span>
                )}
              </button>
            )}

            {/* User Profile Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 bg-white dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg hover:bg-[#F4EFEB] dark:hover:bg-[#25201B] transition-colors cursor-pointer"
                >
                  <div className={`w-6 h-6 rounded-full text-white text-[11px] font-bold flex items-center justify-center ${
                    user.role === 'mentor' ? 'bg-[#1B4332]' : user.role === 'institution' ? 'bg-[#C85A32]' : 'bg-[#D49B37]'
                  }`}>
                    {user.fullName.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left text-xs leading-tight">
                    <span className="block font-semibold text-[#1A1815] dark:text-[#FAF7F2] truncate max-w-[100px]">
                      {user.fullName.split(' ')[0]}
                    </span>
                    <span className="block text-[10px] capitalize text-[#C85A32] dark:text-[#D49B37] font-medium">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#4A3E35] dark:text-[#E8DFD5]/70" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-[#1A1815] border border-[#D8C7B5] dark:border-[#3E332A] rounded-xl shadow-xl py-2 z-50 text-xs text-[#1A1815] dark:text-[#FAF7F2]">
                    <div className="px-3.5 py-2.5 border-b border-[#E8DFD5] dark:border-[#332A22]">
                      <p className="font-semibold text-sm truncate">{user.fullName}</p>
                      <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#FAF2EB] dark:bg-[#2E241A] text-[#C85A32] dark:text-[#E6A820]">
                          {user.role}
                        </span>
                        {user.verificationStatus === 'verified' && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {user.role === 'mentor' ? (
                      <button
                        onClick={() => {
                          handleTabClick('mentor-profile');
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-[#F4EFEB] dark:hover:bg-[#25201B] cursor-pointer flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-[#1B4332]" />
                        <span>Mentor Profile & Advisory Info</span>
                      </button>
                    ) : user.role === 'institution' ? (
                      <button
                        onClick={() => {
                          handleTabClick('institution-profile');
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-[#F4EFEB] dark:hover:bg-[#25201B] cursor-pointer flex items-center gap-2"
                      >
                        <School className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span>Institution Profile & Showcase</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleTabClick('profile');
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-[#F4EFEB] dark:hover:bg-[#25201B] cursor-pointer flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span>Student Profile & Settings</span>
                      </button>
                    )}

                    <div className="border-t border-[#E8DFD5] dark:border-[#332A22] my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#4A3E35] dark:text-[#FAF7F2] hover:bg-[#F4EFEB] dark:hover:bg-[#1F1915] rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-[#E8DFD5] dark:border-[#2E241A] space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#1B4332] text-white'
                      : 'text-[#4A3E35] dark:text-[#E8DFD5] hover:bg-[#F4EFEB] dark:hover:bg-[#1F1915]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
