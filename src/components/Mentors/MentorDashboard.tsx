import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  BookOpen, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const MentorDashboard: React.FC = () => {
  const { 
    user, 
    requests, 
    sessions, 
    messages, 
    mentorResources, 
    posts,
    setActiveTab, 
    respondToMentorshipRequest,
    updateUserVerificationStatus 
  } = useApp();

  const [adminSimModalOpen, setAdminSimModalOpen] = useState(false);

  const mentorName = user?.fullName || 'Academic Mentor';
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  // Compute actual real statistics (zero fabrication - 0 if no data)
  const myRequests = requests.filter(r => r.mentorId === user?.id || r.mentorName === user?.fullName);
  const pendingRequests = myRequests.filter(r => r.status === 'pending');
  const activeRequests = myRequests.filter(r => r.status === 'accepted' || r.status === 'active');
  const completedRequests = myRequests.filter(r => r.status === 'completed');

  const mySessions = sessions.filter(s => s.mentorId === user?.id || s.mentorName === user?.fullName);
  const upcomingSessions = mySessions.filter(s => s.status === 'scheduled');

  const myResources = mentorResources.filter(r => r.mentorId === user?.id || r.authorName === user?.fullName);
  const myPosts = posts.filter(p => p.authorName === user?.fullName);

  const isVerified = user?.verificationStatus === 'verified';
  const isPending = user?.verificationStatus === 'pending' || !user?.verificationStatus;

  // Profile completeness check
  const hasBio = !!user?.mentorData?.aboutMe;
  const hasWhyMentor = !!user?.mentorData?.whyMentor;
  const hasLanguages = (user?.mentorData?.languages?.length || 0) > 0;
  const hasRegions = (user?.mentorData?.countriesToAdvise?.length || 0) > 0;
  const completionScore = [hasBio, hasWhyMentor, hasLanguages, hasRegions, isVerified].filter(Boolean).length * 20;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-[#1B4332] text-[#FAF7F2] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-[#122B20]">
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23D49B37' fill-opacity='0.4'/%3E%3C/svg%3E")`
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122B20]/80 border border-[#D49B37]/40 text-[#D49B37] text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>AfriVersity Mentor Portal</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {greeting}, {mentorName.split(' ')[0]}.
            </h1>

            <p className="text-xs sm:text-sm text-[#E8DFD5]/90 font-light leading-relaxed">
              Guiding ambitious students from Ghana, Nigeria, Kenya, and across the African continent in university admissions, scholarships, and STEM careers.
            </p>

            {/* Verification Status Pill */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {isVerified ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4EE] dark:bg-[#18281E] border border-[#2D6A4F] text-[#1B4332] dark:text-[#4EBA87] text-xs font-bold shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Verified Mentor Badge Active</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF4E5] dark:bg-[#2E241A] border border-[#D49B37] text-[#8C6215] dark:text-[#E6A820] text-xs font-medium">
                  <AlertCircle className="w-4 h-4 text-[#D49B37] shrink-0" />
                  <span>Status: <strong>Pending Administrator Verification</strong></span>
                  <button
                    type="button"
                    onClick={() => setAdminSimModalOpen(true)}
                    className="ml-2 text-[11px] font-bold underline hover:text-[#C85A32] cursor-pointer"
                  >
                    Simulate Admin Review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Completeness Card */}
          <div className="bg-[#122B20]/90 backdrop-blur-xs p-4 rounded-xl border border-[#2D6A4F]/60 sm:min-w-[240px] text-xs space-y-2">
            <div className="flex items-center justify-between text-[#FAF7F2]">
              <span className="font-semibold">Mentor Profile Status</span>
              <span className="font-bold text-[#D49B37]">{completionScore}%</span>
            </div>
            <div className="w-full bg-[#1B4332] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#D49B37] h-full rounded-full transition-all duration-500"
                style={{ width: `${completionScore}%` }}
              />
            </div>
            <p className="text-[11px] text-[#E8DFD5]/70">
              {completionScore < 100 
                ? 'Tip: Add bio details, languages, and submit credentials for 100% verified status.'
                : 'All credentials and advisory preferences complete!'}
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="text-[#D49B37] hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>Manage Profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* REAL OVERVIEW STATISTICS (Section 5 Requirement - Real data, 0 if empty) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs">
          <div className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 uppercase tracking-wider">
            Students Guided
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332] dark:text-[#4EBA87] mt-1">
            {completedRequests.length}
          </div>
          <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 mt-0.5">Completed sessions</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs">
          <div className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 uppercase tracking-wider">
            Active Mentorships
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C85A32] mt-1">
            {activeRequests.length}
          </div>
          <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 mt-0.5">In progress</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs">
          <div className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 uppercase tracking-wider">
            Pending Requests
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D49B37] mt-1">
            {pendingRequests.length}
          </div>
          <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 mt-0.5">Awaiting review</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs">
          <div className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 uppercase tracking-wider">
            Upcoming Sessions
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2] mt-1">
            {upcomingSessions.length}
          </div>
          <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 mt-0.5">Scheduled slots</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs col-span-2 sm:col-span-1">
          <div className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 uppercase tracking-wider">
            Resources Shared
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#8C6215] dark:text-[#E6A820] mt-1">
            {myResources.length}
          </div>
          <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 mt-0.5">Guides & links</div>
        </div>
      </div>

      {/* QUICK ACTIONS ROW */}
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setActiveTab('requests')}
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Users className="w-3.5 h-3.5 text-[#D49B37]" />
          <span>Review Mentorship Requests ({pendingRequests.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sessions')}
          className="px-4 py-2 bg-white dark:bg-[#1F1915] hover:bg-[#FAF4EB] dark:hover:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>Mentorship Sessions</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('messages')}
          className="px-4 py-2 bg-white dark:bg-[#1F1915] hover:bg-[#FAF4EB] dark:hover:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#1B4332]" />
          <span>Student Messages</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('resources')}
          className="px-4 py-2 bg-white dark:bg-[#1F1915] hover:bg-[#FAF4EB] dark:hover:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#D49B37]" />
          <span>Share Educational Resource</span>
        </button>
      </div>

      {/* DUAL COLUMN: Pending Requests & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Requests Queue */}
        <div className="lg:col-span-7 bg-white dark:bg-[#181410] p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                Student Mentorship Requests
              </h2>
              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
                African high school graduates and undergraduates requesting your guidance
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('requests')}
              className="text-xs font-semibold text-[#C85A32] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-8 text-center bg-[#FAF7F2] dark:bg-[#1F1915] rounded-xl border border-dashed border-[#D8C7B5] dark:border-[#3E332A] space-y-2">
              <Users className="w-8 h-8 text-[#D49B37] mx-auto opacity-70" />
              <div className="font-semibold text-xs text-[#1A1815] dark:text-[#FAF7F2]">
                No pending mentorship requests
              </div>
              <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 max-w-sm mx-auto">
                Students will request guidance based on your expertise in Computer Science, Engineering, and Scholarships.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.slice(0, 3).map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl border border-[#E8DFD5] dark:border-[#332A22] bg-[#FAF7F2] dark:bg-[#1F1915] space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-xs text-[#1A1815] dark:text-[#FAF7F2]">
                        {req.topic}
                      </div>
                      <div className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-[#1B4332] dark:text-[#4EBA87]">{req.studentName}</span>
                        <span>·</span>
                        <span>{req.studentCountry}</span>
                        <span>·</span>
                        <span>{req.studentEducationLevel}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF4E5] dark:bg-[#2E241A] text-[#8C6215] dark:text-[#E6A820] uppercase">
                      {req.requestedArea}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/90 line-clamp-2">
                    "{req.description}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-[#E8DFD5]/60 dark:border-[#332A22]">
                    <span className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50">
                      Received {req.date}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => respondToMentorshipRequest(req.id, 'declined')}
                        className="px-2.5 py-1 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 hover:text-red-600 dark:hover:text-red-400 font-medium cursor-pointer"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => respondToMentorshipRequest(req.id, 'accepted', 'Glad to guide you on this path!')}
                        className="px-3 py-1 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-md shadow-xs cursor-pointer"
                      >
                        Accept & Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Upcoming Sessions & Community Questions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Mentorship Sessions */}
          <div className="bg-white dark:bg-[#181410] p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C85A32]" />
                <span>Upcoming Sessions</span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('sessions')}
                className="text-xs text-[#C85A32] hover:underline font-semibold cursor-pointer"
              >
                Schedule
              </button>
            </div>

            {upcomingSessions.length === 0 ? (
              <div className="p-6 text-center bg-[#FAF7F2] dark:bg-[#1F1915] rounded-xl border border-dashed border-[#D8C7B5] dark:border-[#3E332A] space-y-1">
                <Calendar className="w-6 h-6 text-[#C85A32] mx-auto opacity-70" />
                <div className="text-xs font-semibold text-[#1A1815] dark:text-[#FAF7F2]">
                  No sessions scheduled
                </div>
                <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70">
                  Accept a student request or suggest a meeting slot.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {upcomingSessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-3.5 rounded-xl border border-[#E8DFD5] dark:border-[#332A22] bg-[#FAF7F2] dark:bg-[#1F1915] space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1B4332] dark:text-[#4EBA87]">
                        {sess.studentName}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF4EE] dark:bg-[#18281E] text-[#1B4332] dark:text-[#4EBA87]">
                        {sess.meetingFormat}
                      </span>
                    </div>
                    <div className="font-medium text-[#1A1815] dark:text-[#FAF7F2]">
                      {sess.topic}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#D49B37]" />
                        {sess.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D49B37]" />
                        {sess.time} ({sess.durationMinutes} mins)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Community Q&A quick jump for mentors */}
          <div className="bg-[#FAF4EB] dark:bg-[#1F1915] p-5 rounded-2xl border border-[#D8C7B5] dark:border-[#3E332A] space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-[#C85A32] font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Answer Student Questions</span>
            </div>
            <p className="text-[#4A3E35] dark:text-[#E8DFD5]/80 leading-relaxed text-xs">
              As an academic mentor, your responses in the AfriVersity Community appear with an official <strong>Verified Mentor Answer</strong> badge to assist thousands of prospective candidates.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('community')}
              className="mt-1 px-4 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <span>Explore Community Q&A</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ADMIN SIMULATION REVIEW MODAL (Section 29: Admin-Ready Architecture) */}
      {adminSimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181410] rounded-2xl p-6 max-w-md w-full border border-[#E8DFD5] dark:border-[#332A22] shadow-2xl space-y-4 text-xs text-[#1A1815] dark:text-[#FAF7F2]">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B4332] dark:text-[#4EBA87]">
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Review Simulation</span>
              </div>
              <button
                type="button"
                onClick={() => setAdminSimModalOpen(false)}
                className="text-[#4A3E35] dark:text-[#E8DFD5] hover:text-black dark:hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80">
              AfriVersity verifies mentors by reviewing degrees, institutional emails, or publications. You can simulate the administrative decision here:
            </p>

            <div className="p-3 bg-[#FAF7F2] dark:bg-[#1F1915] rounded-xl border border-[#D8C7B5] dark:border-[#3E332A] space-y-1">
              <div><strong>Applicant:</strong> {user?.fullName}</div>
              <div><strong>Institution / Org:</strong> {user?.mentorData?.organization || 'Ashesi University'}</div>
              <div><strong>University Attended:</strong> {user?.mentorData?.universityAttended || 'KNUST'}</div>
              <div><strong>Current Status:</strong> <span className="uppercase font-bold text-[#D49B37]">{user?.verificationStatus || 'pending'}</span></div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  updateUserVerificationStatus('rejected');
                  setAdminSimModalOpen(false);
                }}
                className="px-3 py-2 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-semibold rounded-lg hover:bg-red-200 cursor-pointer"
              >
                Reject Verification
              </button>
              <button
                type="button"
                onClick={() => {
                  updateUserVerificationStatus('verified');
                  setAdminSimModalOpen(false);
                }}
                className="px-4 py-2 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Grant "Verified Mentor" Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
