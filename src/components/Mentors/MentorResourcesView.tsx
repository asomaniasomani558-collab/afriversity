import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MentorResource } from '../../types';
import { 
  BookOpen, 
  Plus, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Share2, 
  ThumbsUp, 
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

export const MentorResourcesView: React.FC = () => {
  const { user, mentorResources, addMentorResource } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // New Resource Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Admissions' | 'Scholarships' | 'STEM' | 'Career' | 'Study Skills'>('Admissions');
  const [externalUrl, setExternalUrl] = useState('');

  const filteredResources = mentorResources.filter(r => {
    if (selectedCategory !== 'All' && r.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesTitle = r.title.toLowerCase().includes(q);
      const matchesDesc = r.description.toLowerCase().includes(q);
      const matchesAuthor = r.authorName.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesAuthor) return false;
    }
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addMentorResource({
      title: title.trim(),
      description: description.trim(),
      category,
      url: externalUrl.trim() || 'https://afriversity.org',
      mentorId: user?.id || 'mentor-current',
      authorName: user?.fullName || 'Academic Mentor',
      authorRole: user?.mentorData?.occupation || 'Senior Academic Advisor'
    });

    setTitle('');
    setDescription('');
    setExternalUrl('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Advisory Portal · Educational Resources</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            Mentor Guides & Resources
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Publish verified guides, scholarship application templates, and study roadmaps to support African students across the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#D49B37]" />
          <span>Share New Resource</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#4A3E35]/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, templates, or mentor author..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-[#FAF7F2] dark:bg-[#1F1915] rounded-lg border border-[#E8DFD5] dark:border-[#332A22]">
          {['All', 'Admissions', 'Scholarships', 'STEM', 'Career', 'Study Skills'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#1B4332] text-white'
                  : 'text-[#4A3E35] dark:text-[#E8DFD5]/80 hover:bg-[#FAF4EB] dark:hover:bg-[#25201B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D49B37]/60 transition-all text-xs"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EB] dark:bg-[#2E241A] text-[#C85A32] dark:text-[#E6A820] uppercase">
                  {res.category}
                </span>
                <span className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50">
                  {res.date}
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                {res.title}
              </h3>

              <p className="text-[#4A3E35] dark:text-[#E8DFD5]/80 leading-relaxed text-xs">
                {res.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between">
              <div>
                <div className="font-bold text-[#1B4332] dark:text-[#4EBA87] flex items-center gap-1 text-[11px]">
                  <span>{res.authorName}</span>
                  <ShieldCheck className="w-3 h-3 text-[#2D6A4F]" />
                </div>
                <div className="text-[10px] text-[#4A3E35]/60 dark:text-[#E8DFD5]/50 truncate max-w-[150px]">
                  {res.authorRole}
                </div>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#FAF4EB] dark:bg-[#2E241A] hover:bg-[#1B4332] hover:text-white border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs font-semibold text-[#1A1815] dark:text-[#FAF7F2] transition-colors flex items-center gap-1.5"
              >
                <span>View Resource</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Share Resource Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181410] rounded-2xl p-6 max-w-lg w-full border border-[#E8DFD5] dark:border-[#332A22] shadow-2xl space-y-4 text-xs text-[#1A1815] dark:text-[#FAF7F2]">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B4332] dark:text-[#4EBA87]">
                <BookOpen className="w-4 h-4" />
                <span>Share Educational Resource or Guide</span>
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
                <label className="block font-semibold mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Guide to Mastercard Foundation Scholarship Essays"
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
                  <option value="Admissions">Admissions & Applications</option>
                  <option value="Scholarships">Scholarships & Grants</option>
                  <option value="STEM">STEM & Programming Roadmaps</option>
                  <option value="Career">Career & Industry Preparation</option>
                  <option value="Study Skills">Study Skills & WASSCE Preparation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Resource Description / Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize what students will learn from this resource..."
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Direct URL / Document Link (Optional)</label>
                <input
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
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
                  className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold rounded-lg shadow-sm cursor-pointer"
                >
                  Publish Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
