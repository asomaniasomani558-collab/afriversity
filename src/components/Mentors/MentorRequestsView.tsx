import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MentorshipRequest } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Calendar, 
  Clock, 
  MapPin, 
  GraduationCap, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const MentorRequestsView: React.FC = () => {
  const { 
    user, 
    requests, 
    respondToMentorshipRequest, 
    setActiveTab, 
    sendDirectMessage 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'completed' | 'declined'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalRequest, setActiveModalRequest] = useState<MentorshipRequest | null>(null);
  const [responseNote, setResponseNote] = useState('');

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = r.studentName.toLowerCase().includes(q);
        const matchesTopic = r.topic.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        const matchesArea = r.requestedArea.toLowerCase().includes(q);
        if (!matchesName && !matchesTopic && !matchesDesc && !matchesArea) {
          return false;
        }
      }
      return true;
    });
  }, [requests, statusFilter, searchQuery]);

  const handleOpenResponse = (req: MentorshipRequest) => {
    setActiveModalRequest(req);
    setResponseNote(`Hello ${req.studentName}, I would be glad to help guide you on this path.`);
  };

  const handleConfirmAccept = () => {
    if (!activeModalRequest) return;
    respondToMentorshipRequest(activeModalRequest.id, 'accepted', responseNote);
    setActiveModalRequest(null);
    setResponseNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Advisory Portal · Mentorship Discovery</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            Student Mentorship Requests
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Review requests from African high school students and undergraduates seeking guidance on university applications, STEM programmes, and scholarship essays.
          </p>
        </div>

        <div className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 shrink-0">
          Showing <strong>{filteredRequests.length}</strong> student inquiries
        </div>
      </div>

      {/* Filters and Search */}
      <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search requests by student name, topic, or area..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg focus:outline-none focus:border-[#C85A32] text-[#1A1815] dark:text-[#FAF7F2]"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1 bg-[#FAF7F2] dark:bg-[#1F1915] p-1 rounded-lg border border-[#E8DFD5] dark:border-[#332A22] text-xs overflow-x-auto">
          {(['all', 'pending', 'accepted', 'completed', 'declined'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors cursor-pointer whitespace-nowrap text-xs ${
                statusFilter === status
                  ? 'bg-[#1B4332] text-white'
                  : 'text-[#4A3E35] dark:text-[#E8DFD5]/80 hover:bg-[#FAF4EB] dark:hover:bg-[#25201B]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Request Cards Grid */}
      {filteredRequests.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#181410] rounded-2xl border border-dashed border-[#D8C7B5] dark:border-[#3E332A] space-y-3">
          <Users className="w-10 h-10 text-[#D49B37] mx-auto opacity-70" />
          <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            No mentorship requests match your criteria
          </h3>
          <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 max-w-md mx-auto">
            Try adjusting your search query or status filter. Students browsing your mentor profile can submit inquiries anytime.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((req) => {
            const isPending = req.status === 'pending';
            const isAccepted = req.status === 'accepted' || req.status === 'active';
            const isCompleted = req.status === 'completed';

            return (
              <div
                key={req.id}
                className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all hover:border-[#D49B37]/60"
              >
                <div className="space-y-3">
                  {/* Top Bar: Student Identity & Status Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#1B4332] text-[#FAF7F2] font-bold text-xs flex items-center justify-center">
                        {req.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1A1815] dark:text-[#FAF7F2]">
                          {req.studentName}
                        </div>
                        <div className="text-[10px] text-[#4A3E35] dark:text-[#E8DFD5]/70 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#C85A32]" />
                          <span>{req.studentCountry}</span>
                          <span>·</span>
                          <GraduationCap className="w-3 h-3 text-[#D49B37]" />
                          <span>{req.studentEducationLevel}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isPending
                          ? 'bg-[#FAF4E5] dark:bg-[#2E241A] text-[#8C6215] dark:text-[#E6A820] border border-[#D49B37]/40'
                          : isAccepted
                            ? 'bg-[#EBF4EE] dark:bg-[#18281E] text-[#1B4332] dark:text-[#4EBA87] border border-[#2D6A4F]/40'
                            : isCompleted
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  {/* Topic & Focus Area */}
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded bg-[#FAF4EB] dark:bg-[#2E241A] text-[#C85A32] dark:text-[#E6A820] text-[10px] font-semibold mb-1">
                      {req.requestedArea}
                    </div>
                    <h3 className="font-serif text-sm font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                      {req.topic}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/90 leading-relaxed bg-[#FAF7F2] dark:bg-[#1F1915] p-3 rounded-xl border border-[#E8DFD5]/60 dark:border-[#332A22]">
                    "{req.description}"
                  </p>

                  {/* Response note if present */}
                  {req.responseNote && (
                    <div className="text-[11px] text-[#1B4332] dark:text-[#4EBA87] bg-[#EBF4EE] dark:bg-[#18281E] p-2.5 rounded-lg border border-[#2D6A4F]/30">
                      <strong>Your Note:</strong> {req.responseNote}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between gap-2 text-xs">
                  <span className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Submitted {req.date}
                  </span>

                  <div className="flex items-center gap-2">
                    {isPending && (
                      <>
                        <button
                          type="button"
                          onClick={() => respondToMentorshipRequest(req.id, 'declined')}
                          className="px-3 py-1.5 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 hover:text-red-600 dark:hover:text-red-400 font-medium cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenResponse(req)}
                          className="px-3.5 py-1.5 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept Request</span>
                        </button>
                      </>
                    )}

                    {isAccepted && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('messages');
                          }}
                          className="px-3 py-1.5 bg-[#FAF4EB] dark:bg-[#2E241A] hover:border-[#C85A32] border border-[#D8C7B5] dark:border-[#3E332A] text-[#C85A32] dark:text-[#E6A820] font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('sessions')}
                          className="px-3.5 py-1.5 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Schedule Session</span>
                        </button>
                      </>
                    )}

                    {isCompleted && (
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Accept Request Response Modal */}
      {activeModalRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181410] rounded-2xl p-6 max-w-md w-full border border-[#E8DFD5] dark:border-[#332A22] shadow-2xl space-y-4 text-xs text-[#1A1815] dark:text-[#FAF7F2]">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <h3 className="font-serif text-base font-bold">
                Accept Mentorship Inquiry
              </h3>
              <button
                type="button"
                onClick={() => setActiveModalRequest(null)}
                className="text-[#4A3E35] dark:text-[#E8DFD5] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-[#4A3E35] dark:text-[#E8DFD5]/80">
              You are accepting the inquiry from <strong>{activeModalRequest.studentName}</strong> regarding "<strong>{activeModalRequest.topic}</strong>".
            </p>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Welcome Message & Next Steps for the Student:
              </label>
              <textarea
                rows={3}
                value={responseNote}
                onChange={(e) => setResponseNote(e.target.value)}
                placeholder="Share when you are free to discuss, or ask them to share their essay..."
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalRequest(null)}
                className="px-3 py-2 text-[#4A3E35] dark:text-[#E8DFD5] font-semibold hover:underline cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAccept}
                className="px-4 py-2 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm & Send Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
