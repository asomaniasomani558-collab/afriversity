import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { DirectMessage } from '../../types';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  ExternalLink, 
  ShieldAlert, 
  User, 
  Clock, 
  Search,
  CheckCheck,
  AlertTriangle
} from 'lucide-react';

export const MentorMessagesView: React.FC = () => {
  const { user, messages, sendDirectMessage } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [newMessageText, setNewMessageText] = useState('');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [attachOpen, setAttachOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reportedStudent, setReportedStudent] = useState<string | null>(null);

  // Derive conversation list involving the current mentor
  const myConversations = useMemo(() => {
    const list: Array<{ studentId: string; studentName: string; lastMessage: DirectMessage }> = [];
    const seen = new Set<string>();

    // Sort newest first
    const sorted = [...messages].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    for (const msg of sorted) {
      const isRecipient = msg.recipientRole === 'mentor' || msg.recipientId === user?.id;
      const isSender = msg.senderRole === 'mentor' || msg.senderId === user?.id;

      if (isRecipient || isSender) {
        const studentId = isRecipient ? msg.senderId : msg.recipientId;
        const studentName = isRecipient ? msg.senderName : msg.recipientName;

        if (!seen.has(studentId)) {
          seen.add(studentId);
          list.push({ studentId, studentName, lastMessage: msg });
        }
      }
    }

    return list;
  }, [messages, user]);

  // Set default selected student if none selected
  const activeStudentId = selectedStudentId || (myConversations.length > 0 ? myConversations[0].studentId : '');

  // Filter messages for active student
  const currentThread = useMemo(() => {
    if (!activeStudentId) return [];
    return messages
      .filter((m) => {
        const isWithStudent = 
          (m.senderId === activeStudentId || m.recipientId === activeStudentId) &&
          (m.senderRole === 'mentor' || m.recipientRole === 'mentor' || m.senderId === user?.id || m.recipientId === user?.id);
        return isWithStudent;
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [messages, activeStudentId, user]);

  const activeStudentInfo = myConversations.find(c => c.studentId === activeStudentId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeStudentId) return;

    const resourceLink = (resourceTitle.trim() && resourceUrl.trim()) 
      ? { title: resourceTitle.trim(), url: resourceUrl.trim() } 
      : undefined;

    sendDirectMessage(
      activeStudentId,
      activeStudentInfo?.studentName || 'Student',
      newMessageText.trim(),
      resourceLink
    );

    setNewMessageText('');
    setResourceTitle('');
    setResourceUrl('');
    setAttachOpen(false);
  };

  const handleReport = () => {
    setReportedStudent(activeStudentInfo?.studentName || 'Student');
    setTimeout(() => {
      setReportedStudent(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Advisory Portal · Direct Messaging</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            Student Advising Messages
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Communicate directly with students you have accepted for guidance. Share advice, recommended links, and document feedback.
          </p>
        </div>
      </div>

      {reportedStudent && (
        <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Report submitted for <strong>{reportedStudent}</strong>. The AfriVersity Trust & Safety team will review this interaction.</span>
          </div>
          <button
            type="button"
            onClick={() => setReportedStudent(null)}
            className="font-bold text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Dual-Pane Messaging Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] bg-white dark:bg-[#181410] shadow-xs overflow-hidden min-h-[560px]">
        {/* Left Pane: Conversation List */}
        <div className="md:col-span-4 border-r border-[#E8DFD5] dark:border-[#332A22] flex flex-col bg-[#FAF7F2]/50 dark:bg-[#141210]/50">
          <div className="p-3.5 border-b border-[#E8DFD5] dark:border-[#332A22]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#4A3E35]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students..."
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#E8DFD5]/60 dark:divide-[#332A22]/60">
            {myConversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#4A3E35]/70 dark:text-[#E8DFD5]/60 space-y-1">
                <MessageSquare className="w-6 h-6 text-[#D49B37] mx-auto opacity-70" />
                <div className="font-semibold">No active conversations</div>
                <p className="text-[11px]">When you accept a mentorship request, the student conversation thread will appear here.</p>
              </div>
            ) : (
              myConversations
                .filter(c => c.studentName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((conv) => {
                  const isSelected = conv.studentId === activeStudentId;
                  return (
                    <button
                      key={conv.studentId}
                      type="button"
                      onClick={() => setSelectedStudentId(conv.studentId)}
                      className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#EBF4EE] dark:bg-[#1F2C24] border-l-4 border-l-[#1B4332]'
                          : 'hover:bg-white dark:hover:bg-[#1F1915]'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {conv.studentName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-xs mb-0.5">
                          <span className="font-bold text-[#1A1815] dark:text-[#FAF7F2] truncate">
                            {conv.studentName}
                          </span>
                          <span className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50">
                            {new Date(conv.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 truncate">
                          {conv.lastMessage.content}
                        </p>
                      </div>
                    </button>
                  );
                })
            )}
          </div>
        </div>

        {/* Right Pane: Message Thread */}
        <div className="md:col-span-8 flex flex-col justify-between h-full bg-white dark:bg-[#181410]">
          {activeStudentInfo ? (
            <>
              {/* Top Thread Bar */}
              <div className="p-4 border-b border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between bg-[#FAF7F2] dark:bg-[#181410]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C85A32] text-white flex items-center justify-center font-bold text-xs">
                    {activeStudentInfo.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#1A1815] dark:text-[#FAF7F2]">
                      {activeStudentInfo.studentName}
                    </div>
                    <div className="text-[10px] text-[#4A3E35]/70 dark:text-[#E8DFD5]/60 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Student Mentee · Active Thread</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReport}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title="Report interaction to AfriVersity Trust & Safety"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">Report / Block</span>
                  </button>
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3.5 max-h-[420px] bg-[#FAF7F2]/40 dark:bg-[#141210]/30">
                {currentThread.map((msg) => {
                  const isMentorSender = msg.senderRole === 'mentor' || msg.senderId === user?.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMentorSender ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs shadow-xs space-y-1.5 ${
                          isMentorSender
                            ? 'bg-[#1B4332] text-white rounded-tr-xs'
                            : 'bg-white dark:bg-[#25201B] text-[#1A1815] dark:text-[#FAF7F2] border border-[#E8DFD5] dark:border-[#332A22] rounded-tl-xs'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                        {/* Optional Attached Educational Resource */}
                        {msg.resourceLink && (
                          <a
                            href={msg.resourceLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 p-2 rounded-lg text-[11px] font-semibold transition-colors mt-2 ${
                              isMentorSender
                                ? 'bg-[#122B20] text-[#D49B37] hover:bg-black/30'
                                : 'bg-[#FAF4EB] dark:bg-[#1F1915] text-[#C85A32] dark:text-[#E6A820]'
                            }`}
                          >
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{msg.resourceLink.title}</span>
                          </a>
                        )}

                        <div
                          className={`text-[10px] flex items-center justify-end gap-1 ${
                            isMentorSender ? 'text-[#E8DFD5]/70' : 'text-[#4A3E35]/60 dark:text-[#E8DFD5]/50'
                          }`}
                        >
                          <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {isMentorSender && <CheckCheck className="w-3 h-3 text-[#D49B37]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Bar */}
              <div className="p-3.5 border-t border-[#E8DFD5] dark:border-[#332A22] bg-white dark:bg-[#181410] space-y-2">
                {attachOpen && (
                  <div className="p-3 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between font-semibold text-[#C85A32]">
                      <span>Attach Educational Resource or Link</span>
                      <button type="button" onClick={() => setAttachOpen(false)} className="text-neutral-400">✕</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={resourceTitle}
                        onChange={(e) => setResourceTitle(e.target.value)}
                        placeholder="Resource Title (e.g. WASSCE Math Formula Sheet)"
                        className="px-2.5 py-1.5 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                      />
                      <input
                        type="url"
                        value={resourceUrl}
                        onChange={(e) => setResourceUrl(e.target.value)}
                        placeholder="URL (https://...)"
                        className="px-2.5 py-1.5 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                      />
                    </div>
                  </div>
                )}

                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAttachOpen(!attachOpen)}
                    className="p-2.5 text-[#4A3E35] dark:text-[#E8DFD5]/80 hover:bg-[#FAF4EB] dark:hover:bg-[#25201B] rounded-lg transition-colors cursor-pointer"
                    title="Attach Educational Resource Link"
                  >
                    <Paperclip className="w-4 h-4 text-[#D49B37]" />
                  </button>

                  <input
                    type="text"
                    required
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    placeholder="Type advisory guidance to the student..."
                    className="flex-1 px-3.5 py-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs text-[#1A1815] dark:text-[#FAF7F2] focus:outline-none focus:border-[#1B4332]"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#D49B37]" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="p-12 text-center my-auto space-y-2 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
              <MessageSquare className="w-8 h-8 text-[#D49B37] mx-auto opacity-70" />
              <div className="font-semibold text-sm text-[#1A1815] dark:text-[#FAF7F2]">
                Select a student conversation
              </div>
              <p className="max-w-xs mx-auto text-[11px]">
                Direct messages let you exchange questions, essay feedback, and application tips with prospective African students.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
