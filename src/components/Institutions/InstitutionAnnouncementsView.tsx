import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstitutionAnnouncement } from '../../types';
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Calendar, 
  Check, 
  ExternalLink,
  Search
} from 'lucide-react';

export const InstitutionAnnouncementsView: React.FC = () => {
  const { 
    user, 
    institutionAnnouncements, 
    addInstitutionAnnouncement, 
    deleteInstitutionAnnouncement 
  } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<InstitutionAnnouncement['category']>('Admissions');
  const [link, setLink] = useState(user?.institutionData?.admissionsPortalUrl || 'https://admissions.ug.edu.gh');

  const institutionName = user?.institutionData?.institutionName || user?.fullName || 'University of Ghana, Legon';

  const myAnnouncements = institutionAnnouncements.filter(
    a => a.institutionId === user?.id || a.institutionName === institutionName
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addInstitutionAnnouncement({
      institutionId: user?.id || 'inst-current',
      institutionName,
      title: title.trim(),
      content: content.trim(),
      category,
      link: link.trim() || undefined
    });

    setTitle('');
    setContent('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Institution Portal · Official Bulletins</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            Admissions Announcements
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Broadcast official notices regarding application portal openings, entrance exams, WASSCE cut-off point releases, and scholarship deadlines.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Notice</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-3.5">
        {myAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-5 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4 text-xs"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EB] dark:bg-[#2E241A] text-[#C85A32] dark:text-[#E6A820] uppercase">
                  {ann.category}
                </span>
                <span className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {ann.date}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#1B4332] dark:text-[#4EBA87]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Official Verified Dispatch</span>
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                {ann.title}
              </h3>

              <p className="text-[#4A3E35] dark:text-[#E8DFD5]/90 leading-relaxed text-xs">
                {ann.content}
              </p>

              {ann.link && (
                <div className="pt-1">
                  <a
                    href={ann.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C85A32] hover:underline"
                  >
                    <span>Read official document / portal link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => deleteInstitutionAnnouncement(ann.id)}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-950/50 text-neutral-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer self-end md:self-start"
              title="Delete announcement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Publish Notice Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181410] rounded-2xl p-6 max-w-lg w-full border border-[#E8DFD5] dark:border-[#332A22] shadow-2xl space-y-4 text-xs text-[#1A1815] dark:text-[#FAF7F2]">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#C85A32]">
                <Megaphone className="w-4 h-4" />
                <span>Publish Admissions Announcement</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#4A3E35] dark:text-[#E8DFD5] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Release of 2026/2027 Cut-Off Points for Undergraduate Admissions"
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                >
                  <option value="Admissions">Admissions & Vouchers</option>
                  <option value="Deadlines">Application Deadlines</option>
                  <option value="Cut-Off Points">WASSCE Cut-Off Points</option>
                  <option value="Examinations">Entrance Exams & Interviews</option>
                  <option value="General">General Institutional Notice</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Announcement Content *</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Details for prospective students and parents..."
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Document Link / Portal URL (Optional)</label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
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
                  className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white font-semibold rounded-lg shadow-sm cursor-pointer"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
