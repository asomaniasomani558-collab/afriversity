import React, { useState, useMemo } from 'react';
import { MENTORS } from '../../data/mentors';
import { Mentor } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  MessageSquare, 
  Briefcase, 
  ShieldCheck, 
  X, 
  Send 
} from 'lucide-react';

export const MentorDirectory: React.FC = () => {
  const { user, submitMentorshipRequest } = useApp();
  const [selectedExpertise, setSelectedExpertise] = useState<string>('All');
  const [selectedMentorForQuestion, setSelectedMentorForQuestion] = useState<Mentor | null>(null);
  const [topic, setTopic] = useState('University Admissions & Course Cut-Off Strategy');
  const [questionText, setQuestionText] = useState('');
  const [questionSent, setQuestionSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allExpertiseAreas = useMemo(() => {
    const set = new Set<string>();
    MENTORS.forEach(m => m.expertiseAreas.forEach(a => set.add(a)));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredMentors = useMemo(() => {
    return MENTORS.filter((m) => {
      if (selectedExpertise !== 'All' && !m.expertiseAreas.includes(selectedExpertise)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesOrg = m.currentCompanyOrInstitution.toLowerCase().includes(q);
        const matchesAlma = m.almaMater.toLowerCase().includes(q);
        const matchesBio = m.bio.toLowerCase().includes(q);
        if (!matchesName && !matchesOrg && !matchesAlma && !matchesBio) {
          return false;
        }
      }
      return true;
    });
  }, [selectedExpertise, searchQuery]);

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !selectedMentorForQuestion) return;

    submitMentorshipRequest({
      studentId: user?.id || 'std-guest',
      studentName: user?.fullName || 'African Student',
      studentCountry: user?.country || 'Ghana',
      studentEducationLevel: user?.studentData?.currentEducationLevel || 'High School / WASSCE',
      mentorId: selectedMentorForQuestion.id,
      mentorName: selectedMentorForQuestion.name,
      topic: topic.trim() || 'Academic & Admissions Guidance',
      description: questionText.trim(),
      requestedArea: selectedMentorForQuestion.expertiseAreas[0] || 'University applications'
    });

    setQuestionSent(true);
    setTimeout(() => {
      setQuestionSent(false);
      setSelectedMentorForQuestion(null);
      setQuestionText('');
    }, 2200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Academic Mentorship · Pan-African Alumni Network</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            Verified Mentors & Academic Advisors
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Connect directly with graduates, research fellows, and engineers from KNUST, Legon, Ashesi, and top continental institutions to navigate admissions, scholarship essays, and STEM careers.
          </p>
        </div>

        <div className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 shrink-0">
          Showing <strong>{filteredMentors.length}</strong> active mentors
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors by name, company, or alma mater..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg focus:outline-none focus:border-[#C85A32] text-[#1A1815] dark:text-[#FAF7F2]"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#FAF7F2] dark:bg-[#1F1915] p-1 rounded-lg border border-[#E8DFD5] dark:border-[#332A22] text-xs overflow-x-auto">
          <span className="text-[11px] font-medium text-[#4A3E35] dark:text-[#E8DFD5]/70 px-1.5 whitespace-nowrap">Domain:</span>
          {allExpertiseAreas.slice(0, 5).map((exp) => (
            <button
              key={exp}
              onClick={() => setSelectedExpertise(exp)}
              className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedExpertise === exp
                  ? 'bg-[#1B4332] text-white font-medium shadow-xs'
                  : 'text-[#4A3E35] dark:text-[#E8DFD5]/80 hover:text-[#1A1815] dark:hover:text-white'
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-5 flex flex-col justify-between hover:border-[#C85A32] hover:shadow-md transition-all group"
          >
            <div>
              {/* Mentor Profile Header */}
              <div className="flex items-start gap-3.5 mb-3">
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D8C7B5] dark:border-[#3E332A] shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                      {mentor.name}
                    </h3>
                    {mentor.verified && (
                      <span title="Verified Mentor">
                        <CheckCircle2 className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87] shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#C85A32]">
                    {mentor.title}
                  </p>
                  <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 mt-0.5">
                    {mentor.currentCompanyOrInstitution}
                  </p>
                </div>
              </div>

              {/* Alma Mater & Location */}
              <div className="flex items-center gap-2 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80 mb-3 pb-2 border-b border-[#E8DFD5] dark:border-[#332A22]">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#1B4332] dark:text-[#4EBA87]" />
                  {mentor.almaMater}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C85A32]" />
                  {mentor.country}
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/90 leading-relaxed mb-4 line-clamp-3">
                {mentor.bio}
              </p>

              {/* Expertise areas list */}
              <div className="space-y-1 mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#4A3E35]/70 dark:text-[#E8DFD5]/60 block">
                  Expertise Areas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.expertiseAreas.map((exp, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] bg-[#FAF7F2] dark:bg-[#25201B] text-[#1A1815] dark:text-[#FAF7F2] border border-[#E8DFD5] dark:border-[#332A22] px-2 py-0.5 rounded"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="pt-3 border-t border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between">
              <span className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70">
                <strong>{mentor.sessionsCompleted}</strong> students guided
              </span>

              <button
                type="button"
                onClick={() => {
                  setSelectedMentorForQuestion(mentor);
                  setTopic(`Guidance on ${mentor.expertiseAreas[0] || 'Admissions'}`);
                }}
                className="px-3.5 py-1.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#D49B37]" />
                <span>Request Mentorship</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Mentorship Modal */}
      {selectedMentorForQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1815]/80 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] dark:bg-[#181410] text-[#1A1815] dark:text-[#FAF7F2] w-full max-w-lg rounded-2xl shadow-2xl border border-[#E8DFD5] dark:border-[#332A22] overflow-hidden">
            <div className="bg-[#1B4332] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold">
                  Request Mentorship from {selectedMentorForQuestion.name}
                </h3>
                <p className="text-xs text-[#E8DFD5]/90 mt-0.5">
                  {selectedMentorForQuestion.title} · {selectedMentorForQuestion.currentCompanyOrInstitution}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMentorForQuestion(null)}
                className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {questionSent ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#1B4332] dark:text-[#4EBA87] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#1A1815] dark:text-[#FAF7F2]">Mentorship Request Submitted!</h4>
                <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80">
                  Your inquiry has been placed into {selectedMentorForQuestion.name}'s mentor dashboard. Once accepted, you will be able to converse and schedule an advisory session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendQuestion} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Guidance Topic *
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., KNUST Computer Science Cut-Off Strategy"
                    className="w-full px-3 py-2 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Your Question / Background *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder={`Hello ${selectedMentorForQuestion.name}, I am preparing my university applications and need guidance on electives, cut-off aggregate, and scholarship opportunities...`}
                    className="w-full px-3 py-2 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 pt-2 border-t border-[#E8DFD5] dark:border-[#332A22]">
                  <span>AfriVersity mentorship is free of charge.</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMentorForQuestion(null)}
                      className="px-3 py-1.5 text-xs text-[#4A3E35] dark:text-[#E8DFD5] hover:underline cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Request</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
