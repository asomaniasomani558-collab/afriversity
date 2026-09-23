import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthPage } from './components/Auth/AuthPage';
import { OnboardingModal } from './components/Auth/OnboardingModal';
import { MentorOnboardingModal } from './components/Mentors/MentorOnboardingModal';
import { InstitutionOnboardingModal } from './components/Institutions/InstitutionOnboardingModal';
import { Navbar } from './components/Navigation/Navbar';

// Student Views
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { UniversityDirectory } from './components/Universities/UniversityDirectory';
import { CourseDirectory } from './components/Courses/CourseDirectory';
import { MicrocoursesSection } from './components/Microcourses/MicrocoursesSection';
import { ScholarshipDirectory } from './components/Scholarships/ScholarshipDirectory';
import { CareerExplorer } from './components/Careers/CareerExplorer';
import { MentorDirectory } from './components/Mentors/MentorDirectory';
import { CommunityHub } from './components/Community/CommunityHub';
import { AfriVersityAdvisor } from './components/AIAssistant/AfriVersityAdvisor';
import { SavedItemsView } from './components/Saved/SavedItemsView';
import { ProfileView } from './components/Profile/ProfileView';
import { OpportunitiesExplorer } from './components/Opportunities/OpportunitiesExplorer';

// Mentor Views
import { MentorDashboard } from './components/Mentors/MentorDashboard';
import { MentorRequestsView } from './components/Mentors/MentorRequestsView';
import { MentorSessionsView } from './components/Mentors/MentorSessionsView';
import { MentorMessagesView } from './components/Mentors/MentorMessagesView';
import { MentorResourcesView } from './components/Mentors/MentorResourcesView';
import { MentorProfileView } from './components/Mentors/MentorProfileView';

// Institution Views
import { InstitutionDashboard } from './components/Institutions/InstitutionDashboard';
import { InstitutionProgramsView } from './components/Institutions/InstitutionProgramsView';
import { InstitutionOpportunitiesView } from './components/Institutions/InstitutionOpportunitiesView';
import { InstitutionAnnouncementsView } from './components/Institutions/InstitutionAnnouncementsView';
import { InstitutionProfileView } from './components/Institutions/InstitutionProfileView';

import { GraduationCap, ShieldCheck, Globe, BookOpen, Code2, Users, School, Briefcase } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { isAuthenticated, user, activeTab, setActiveTab } = useApp();

  // If user is not authenticated, show Auth Page as the very first screen
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Determine which dashboard component to show when activeTab === 'dashboard'
  const renderDashboard = () => {
    if (user?.role === 'mentor') {
      return <MentorDashboard />;
    }
    if (user?.role === 'institution') {
      return <InstitutionDashboard />;
    }
    return <DashboardOverview />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0F0D0B] text-[#1A1815] dark:text-[#FAF7F2] transition-colors duration-200">
      {/* Role-Specific First-Time Onboarding Modals */}
      {user?.role === 'student' && <OnboardingModal />}
      {user?.role === 'mentor' && <MentorOnboardingModal />}
      {user?.role === 'institution' && <InstitutionOnboardingModal />}

      {/* Main Top Navigation with adaptive role items */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}

        {/* Mentor Specific Tabs */}
        {activeTab === 'requests' && <MentorRequestsView />}
        {activeTab === 'sessions' && <MentorSessionsView />}
        {activeTab === 'messages' && <MentorMessagesView />}
        {activeTab === 'resources' && <MentorResourcesView />}
        {activeTab === 'mentor-profile' && <MentorProfileView />}

        {/* Institution Specific Tabs */}
        {activeTab === 'institution-programs' && <InstitutionProgramsView />}
        {activeTab === 'institution-opportunities' && <InstitutionOpportunitiesView />}
        {activeTab === 'institution-announcements' && <InstitutionAnnouncementsView />}
        {activeTab === 'institution-profile' && <InstitutionProfileView />}

        {/* Student & Shared Views */}
        {activeTab === 'universities' && <UniversityDirectory />}
        {activeTab === 'courses' && <CourseDirectory />}
        {activeTab === 'microcourses' && <MicrocoursesSection />}
        {activeTab === 'scholarships' && <ScholarshipDirectory />}
        {activeTab === 'opportunities' && <OpportunitiesExplorer />}
        {activeTab === 'careers' && <CareerExplorer />}
        {activeTab === 'mentors' && <MentorDirectory />}
        {activeTab === 'community' && <CommunityHub />}
        {activeTab === 'advisor' && <AfriVersityAdvisor />}
        {activeTab === 'saved' && <SavedItemsView />}
        {activeTab === 'profile' && (
          user?.role === 'mentor' ? <MentorProfileView /> :
          user?.role === 'institution' ? <InstitutionProfileView /> :
          <ProfileView />
        )}
      </main>

      {/* Global African Higher Education Footer */}
      <footer className="bg-[#1B1815] dark:bg-[#141210] text-[#E8DFD5] border-t border-[#332A22] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[#C85A32] flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-serif text-xl font-bold text-[#FAF7F2]">AfriVersity</span>
              </div>
              <p className="text-xs text-[#E8DFD5]/70 leading-relaxed font-light">
                Empowering African students with verified higher education discovery, virtual campus tours, interactive STEM & programming microcourses, authentic WASSCE cut-offs, and an ecosystem connecting students, alumni mentors, and accredited universities.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#D49B37]">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero-Fabrication African Education</span>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold text-[#FAF7F2] mb-3">Discovery & Tours</h4>
              <ul className="space-y-2 text-xs text-[#E8DFD5]/80">
                <li>
                  <button onClick={() => setActiveTab('universities')} className="hover:text-white cursor-pointer">
                    African Universities Directory
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('microcourses')} className="hover:text-[#E6A820] text-[#D49B37] font-semibold flex items-center gap-1 cursor-pointer">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Microcourses (W3Schools & Coursera)</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('courses')} className="hover:text-white cursor-pointer">
                    WASSCE Programme Cut-Offs
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('opportunities')} className="hover:text-[#E6A820] text-[#D49B37] font-semibold flex items-center gap-1 cursor-pointer">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Real Internships & Opportunities</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('scholarships')} className="hover:text-white cursor-pointer">
                    Mastercard & Tertiary Scholarships
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('careers')} className="hover:text-white cursor-pointer">
                    African Growth Sectors & Careers
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold text-[#FAF7F2] mb-3">Pan-African Ecosystem</h4>
              <ul className="space-y-2 text-xs text-[#E8DFD5]/80">
                <li>
                  <button onClick={() => setActiveTab('mentors')} className="hover:text-white cursor-pointer flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#E6A820]" />
                    <span>Alumni Mentors & Advisors</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('community')} className="hover:text-white cursor-pointer">
                    Student Discussions & Q&A
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('universities')} className="hover:text-white cursor-pointer flex items-center gap-1">
                    <School className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>Accredited Institutions</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('advisor')} className="hover:text-white cursor-pointer">
                    AI Educational Advisor
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#FAF7F2] mb-1">Source Transparency</h4>
              <p className="text-xs text-[#E8DFD5]/70 leading-relaxed font-light">
                All course cut-offs and requirements reflect published admissions brochures from KNUST, University of Ghana Legon, UCC, Ashesi, and accredited partner institutions.
              </p>
              <div className="p-2.5 bg-[#26211C] rounded-lg border border-[#3E352D] text-[11px] text-[#D49B37]">
                Applications must be submitted via official university domains. AfriVersity never charges admission or voucher fees.
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#332A22] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DFD5]/60">
            <div>
              © {new Date().getFullYear()} AfriVersity. The Three-Sided African Higher Education Platform.
            </div>
            <div className="flex items-center gap-4">
              <span>Verified Data</span>
              <span>·</span>
              <span>Students · Mentors · Institutions</span>
              <span>·</span>
              <span>Official Portals Only</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
