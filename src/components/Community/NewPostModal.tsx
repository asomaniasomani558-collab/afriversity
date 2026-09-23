import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityCategory } from '../../types';
import { X, MessageSquare, Send, Tag, HelpCircle, FileText } from 'lucide-react';

interface NewPostModalProps {
  onClose: () => void;
  defaultCategory?: CommunityCategory;
  defaultIsQuestion?: boolean;
}

const CATEGORIES: CommunityCategory[] = [
  'Questions',
  'University Applications',
  'Scholarships',
  'Careers',
  'Technology',
  'Study Tips',
  'Campus Life',
  'Announcements'
];

export const NewPostModal: React.FC<NewPostModalProps> = ({
  onClose,
  defaultCategory = 'Questions',
  defaultIsQuestion = true
}) => {
  const { user, createPost } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CommunityCategory>(defaultCategory);
  const [isQuestion, setIsQuestion] = useState<boolean>(defaultIsQuestion);
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !user) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    createPost({
      title: title.trim(),
      content: content.trim(),
      category,
      isQuestion,
      tags: tags.length > 0 ? tags : [category],
      authorName: user.fullName,
      authorRole: user.role,
      authorAvatar: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      authorInstitution: user.institutionAffiliation || (user.role === 'student' ? 'AfriVersity Student' : user.role === 'mentor' ? 'Verified Mentor' : 'Admissions Officer')
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1815]/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] text-[#1A1815] w-full max-w-2xl rounded-xl shadow-2xl border border-[#E8DFD5] overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-[#1B4332] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#D49B37]" />
            <h2 className="font-serif text-xl font-bold">
              {isQuestion ? 'Ask a Question to Students & Mentors' : 'Share a Community Post'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Post Type Toggle */}
          <div className="flex items-center gap-2 p-1 bg-[#F4EFEB] rounded border border-[#E8DFD5] text-xs">
            <button
              type="button"
              onClick={() => setIsQuestion(true)}
              className={`flex-1 py-1.5 rounded font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
                isQuestion
                  ? 'bg-white text-[#C85A32] shadow-xs'
                  : 'text-[#4A3E35] hover:text-[#1A1815]'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ask Question (e.g. Cut-offs, Admissions, Requirements)</span>
            </button>
            <button
              type="button"
              onClick={() => setIsQuestion(false)}
              className={`flex-1 py-1.5 rounded font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
                !isQuestion
                  ? 'bg-white text-[#1B4332] shadow-xs'
                  : 'text-[#4A3E35] hover:text-[#1A1815]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Share Experience / Resource / Notice</span>
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E35] mb-1">
              {isQuestion ? 'What is your question?' : 'Post Headline'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                isQuestion
                  ? 'e.g., What are the requirements for Computer Science at KNUST?'
                  : 'e.g., Tips for preparing for the Ashesi scholarship interview'
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#D8C7B5] rounded text-sm text-[#1A1815] focus:outline-none focus:border-[#C85A32]"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E35] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CommunityCategory)}
                className="w-full px-3 py-2 bg-white border border-[#D8C7B5] rounded text-xs text-[#1A1815] focus:outline-none focus:border-[#C85A32]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E35] mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g., KNUST, WASSCE, Computer Science"
                className="w-full px-3 py-2 bg-white border border-[#D8C7B5] rounded text-xs text-[#1A1815] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E35] mb-1">
              Details & Context
            </label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide clear details, your WASSCE grades/aggregates, specific degree program, or the exact challenge you are facing so students and mentors can give accurate guidance."
              className="w-full px-3.5 py-2.5 bg-white border border-[#D8C7B5] rounded text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#C85A32]"
            />
          </div>

          {/* Author Badge indicator */}
          <div className="p-3 bg-[#FAF7F2] rounded border border-[#E8DFD5] flex items-center justify-between text-xs text-[#4A3E35]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1A1815]">Posting as:</span>
              <span>{user?.fullName}</span>
              <span className="text-[#C85A32] font-bold uppercase text-[10px]">({user?.role})</span>
            </div>
            <span className="text-[11px] text-[#4A3E35]/70">Constructive educational discussion rules apply</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8DFD5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#4A3E35] hover:text-[#1A1815] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isQuestion ? 'Post Question' : 'Publish Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
