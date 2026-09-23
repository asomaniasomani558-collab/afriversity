import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MentorshipSession } from '../../types';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Users, 
  FileText, 
  Video, 
  ExternalLink,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export const MentorSessionsView: React.FC = () => {
  const { 
    user, 
    sessions, 
    requests, 
    scheduleMentorshipSession, 
    updateSessionStatus 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  // New Session Form State
  const [studentName, setStudentName] = useState('Kwesi Appiah');
  const [date, setDate] = useState('2026-10-02');
  const [time, setTime] = useState('15:00 GMT');
  const [duration, setDuration] = useState<number>(45);
  const [topic, setTopic] = useState('University Admissions Cut-Off & Curriculum Review');
  const [format, setFormat] = useState<MentorshipSession['meetingFormat']>('Text Advisory');
  const [notes, setNotes] = useState('Review high school electives and scholarship essay outline.');

  const mySessions = sessions.filter(s => s.mentorId === user?.id || s.mentorName === user?.fullName);
  const filteredSessions = mySessions.filter(s => filter === 'all' || s.status === filter);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !topic) return;

    scheduleMentorshipSession({
      studentId: 'std-' + Date.now(),
      studentName,
      mentorId: user?.id || 'mentor-current',
      mentorName: user?.fullName || 'Academic Mentor',
      date,
      time,
      durationMinutes: Number(duration) || 45,
      topic,
      meetingFormat: format,
      notes
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Advisory Portal · Mentorship Calendar</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            Mentorship Sessions
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Organize, reschedule, and complete 1-on-1 advisory sessions with aspiring African undergraduates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#D49B37]" />
          <span>Schedule New Session</span>
        </button>
      </div>

      {/* Integration Clarity Notice (Section 11 Requirement) */}
      <div className="p-3.5 bg-[#FAF4EB] dark:bg-[#1F1915] rounded-xl border border-[#D8C7B5] dark:border-[#3E332A] flex items-start gap-3 text-xs text-[#4A3E35] dark:text-[#E8DFD5]">
        <AlertCircle className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#1A1815] dark:text-[#FAF7F2] block">Meeting Architecture Ready</strong>
          Sessions can be scheduled via <em>Text Advisory</em>, <em>Document / Portfolio Review</em>, or with custom calendar invite links. Video conferencing hooks are configured for external calendar coordination.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-white dark:bg-[#181410] p-1.5 rounded-xl border border-[#E8DFD5] dark:border-[#332A22] w-fit shadow-xs text-xs">
        {(['all', 'scheduled', 'completed', 'cancelled'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-colors cursor-pointer ${
              filter === f
                ? 'bg-[#1B4332] text-white'
                : 'text-[#4A3E35] dark:text-[#E8DFD5]/70 hover:bg-[#FAF4EB] dark:hover:bg-[#25201B]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sessions List */}
      {filteredSessions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#181410] rounded-2xl border border-dashed border-[#D8C7B5] dark:border-[#3E332A] space-y-3">
          <Calendar className="w-10 h-10 text-[#D49B37] mx-auto opacity-70" />
          <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            No sessions found
          </h3>
          <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 max-w-sm mx-auto">
            Schedule a mentorship session or accept a student inquiry from your Requests dashboard.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Schedule Session Now
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredSessions.map((sess) => {
            const isScheduled = sess.status === 'scheduled';
            const isCompleted = sess.status === 'completed';

            return (
              <div
                key={sess.id}
                className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1A1815] dark:text-[#FAF7F2]">
                      {sess.topic}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isScheduled
                          ? 'bg-[#EBF4EE] dark:bg-[#18281E] text-[#1B4332] dark:text-[#4EBA87] border border-[#2D6A4F]/30'
                          : isCompleted
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'
                      }`}
                    >
                      {sess.status}
                    </span>
                  </div>

                  <div className="text-[#4A3E35] dark:text-[#E8DFD5]/80 flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-[#1B4332] dark:text-[#4EBA87]">
                      Student: {sess.studentName}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D49B37]" />
                      {sess.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D49B37]" />
                      {sess.time} ({sess.durationMinutes} min)
                    </span>
                    <span>·</span>
                    <span className="px-2 py-0.5 bg-[#FAF7F2] dark:bg-[#25201B] rounded border border-[#E8DFD5] dark:border-[#332A22] text-[11px]">
                      {sess.meetingFormat}
                    </span>
                  </div>

                  {sess.notes && (
                    <p className="text-[11px] text-[#4A3E35]/80 dark:text-[#E8DFD5]/70 italic pt-0.5">
                      Notes: {sess.notes}
                    </p>
                  )}
                </div>

                {/* Session Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {isScheduled && (
                    <>
                      <button
                        type="button"
                        onClick={() => updateSessionStatus(sess.id, 'completed', 'Completed advisory session successfully.')}
                        className="px-3 py-1.5 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Completed</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateSessionStatus(sess.id, 'cancelled')}
                        className="px-2.5 py-1.5 text-neutral-500 hover:text-red-600 dark:text-neutral-400 font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {isCompleted && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Schedule Session Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181410] rounded-2xl p-6 max-w-lg w-full border border-[#E8DFD5] dark:border-[#332A22] shadow-2xl space-y-4 text-xs text-[#1A1815] dark:text-[#FAF7F2]">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B4332] dark:text-[#4EBA87]">
                <Calendar className="w-4 h-4" />
                <span>Schedule Advisory Session</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#4A3E35] dark:text-[#E8DFD5] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-3.5">
              <div>
                <label className="block font-semibold mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g., Kwesi Appiah"
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Session Topic *</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., KNUST Engineering Cut-Off Strategy & Portfolio Prep"
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Time (with timezone) *</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g., 16:00 GMT"
                    className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Duration (Minutes)</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                  >
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Meeting Format</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                  >
                    <option value="Text Advisory">Text Advisory & Q&A</option>
                    <option value="Document Review">Document & Essay Review</option>
                    <option value="Live Session Link">Live Video Calendar Link</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Preparation Notes for Student</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify documents to bring, questions to write down in advance..."
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DFD5] dark:border-[#332A22]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-[#4A3E35] dark:text-[#E8DFD5] font-semibold hover:underline cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg shadow-sm cursor-pointer"
                >
                  Save & Confirm Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
