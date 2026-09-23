import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityCategory, CommunityPost } from '../../types';
import { NewPostModal } from './NewPostModal';
import { 
  MessageSquare, 
  ThumbsUp, 
  Search, 
  Plus, 
  HelpCircle, 
  CheckCircle2, 
  Tag, 
  Share2, 
  Send, 
  UserCheck,
  ShieldCheck,
  Building2,
  Filter
} from 'lucide-react';

export const CommunityHub: React.FC = () => {
  const { 
    posts, 
    upvotePost, 
    addComment, 
    user,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterOnlyQuestions, setFilterOnlyQuestions] = useState<boolean>(false);
  const [activeNewPostModal, setActiveNewPostModal] = useState<boolean>(false);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<{ [key: string]: string }>({});

  const categories = [
    'All',
    'Questions',
    'University Applications',
    'Scholarships',
    'Careers',
    'Technology',
    'Study Tips',
    'Campus Life',
    'Announcements'
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (filterOnlyQuestions && !p.isQuestion) {
        return false;
      }
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      const query = globalSearchQuery.toLowerCase().trim();
      if (query) {
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchContent = p.content.toLowerCase().includes(query);
        const matchTags = p.tags.some(t => t.toLowerCase().includes(query));
        const matchAuthor = p.authorName.toLowerCase().includes(query);
        if (!matchTitle && !matchContent && !matchTags && !matchAuthor) {
          return false;
        }
      }
      return true;
    });
  }, [posts, selectedCategory, filterOnlyQuestions, globalSearchQuery]);

  const handleSendComment = (postId: string) => {
    const text = newCommentText[postId]?.trim();
    if (!text) return;
    addComment(postId, text);
    setNewCommentText({ ...newCommentText, [postId]: '' });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'mentor':
        return 'bg-[#EBF2EE] text-[#1B4332] border-[#1B4332]/30';
      case 'institution':
        return 'bg-[#FAF4E5] text-[#8C6215] border-[#D49B37]/40';
      default:
        return 'bg-[#FAF2EB] text-[#C85A32] border-[#C85A32]/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1">
            Peer & Mentor Network · African Academic Community
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1815]">
            AfriVersity Educational Community
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] mt-1 max-w-2xl">
            Ask questions about cut-off aggregates, application procedures, scholarships, and campus life. Receive verified answers from mentors and fellow students.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveNewPostModal(true)}
            className="px-4 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ask Question / Post</span>
          </button>
        </div>
      </div>

      {/* Filter and Categories Bar */}
      <div className="space-y-3">
        {/* Search and Question Toggle */}
        <div className="p-3.5 bg-white rounded-lg border border-[#E8DFD5] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#4A3E35]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search community questions, cut-offs, or advice..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#FAF7F2] border border-[#D8C7B5] rounded focus:outline-none focus:border-[#C85A32] text-[#1A1815]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterOnlyQuestions(!filterOnlyQuestions)}
              className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                filterOnlyQuestions
                  ? 'bg-[#FAF2EB] border-[#C85A32] text-[#C85A32]'
                  : 'bg-white border-[#E8DFD5] text-[#4A3E35] hover:bg-[#FAF7F2]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Only Student Questions</span>
            </button>
          </div>
        </div>

        {/* Category Pills (Interactive segmented button tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-white text-[#4A3E35] border border-[#E8DFD5] hover:bg-[#FAF7F2]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Community Feed Stream */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isCommentsOpen = expandedCommentsPostId === post.id;

          return (
            <div
              key={post.id}
              className="bg-white rounded-lg border border-[#E8DFD5] p-5 sm:p-6 hover:border-[#D8C7B5] transition-all shadow-2xs"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-9 h-9 rounded-full object-cover border border-[#E8DFD5]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#1A1815]">{post.authorName}</span>
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded border ${getRoleBadge(post.authorRole)}`}>
                        {post.authorRole}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#4A3E35] flex items-center gap-1.5">
                      <span>{post.authorInstitution || 'Member'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {post.isQuestion && (
                    <span className="text-[11px] font-semibold text-[#C85A32] bg-[#FAF2EB] px-2 py-0.5 rounded border border-[#C85A32]/20 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      <span>Question</span>
                    </span>
                  )}
                  {post.isResolved && (
                    <span className="text-[11px] font-semibold text-[#1B4332] bg-[#EBF2EE] px-2 py-0.5 rounded border border-[#1B4332]/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Answered by Mentor</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-2 mb-4">
                <h3 className="font-serif text-lg font-bold text-[#1A1815] leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A3E35] leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Clean unboxed tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A3E35] mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4A3E35]/70">Tags:</span>
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="text-[#C85A32] font-medium text-[11px]">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Actions (Upvote, Comment count, Share) */}
              <div className="pt-3 border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#4A3E35]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => upvotePost(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F4EFEB] rounded border border-[#E8DFD5] text-[#1A1815] font-semibold transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>{post.upvotes}</span>
                  </button>

                  <button
                    onClick={() => setExpandedCommentsPostId(isCommentsOpen ? null : post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#FAF7F2] rounded text-[#4A3E35] font-medium transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.comments.length} Answers / Replies</span>
                  </button>
                </div>

                <div className="text-[11px] text-[#4A3E35]/70">
                  Category: <strong className="text-[#1A1815]">{post.category}</strong>
                </div>
              </div>

              {/* Collapsible Comments Section */}
              {isCommentsOpen && (
                <div className="mt-4 pt-4 border-t border-[#E8DFD5] space-y-3 bg-[#FAF7F2] -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-5 rounded-b-lg">
                  {post.comments.length > 0 ? (
                    <div className="space-y-2.5">
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className={`p-3.5 rounded-lg border text-xs ${
                            comment.isOfficialAnswer
                              ? 'bg-[#EBF2EE] border-[#1B4332]/30'
                              : 'bg-white border-[#E8DFD5]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#1A1815]">{comment.authorName}</span>
                              <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ${getRoleBadge(comment.authorRole)}`}>
                                {comment.authorRole}
                              </span>
                              {comment.isOfficialAnswer && (
                                <span className="text-[10px] text-[#1B4332] font-semibold flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>Verified Guidance</span>
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#4A3E35]/70">{comment.createdAt}</span>
                          </div>

                          <p className="text-[#4A3E35] leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#4A3E35] italic">
                      No responses yet. Be the first to share an answer or perspective!
                    </p>
                  )}

                  {/* Add reply form */}
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={newCommentText[post.id] || ''}
                      onChange={(e) => setNewCommentText({ ...newCommentText, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendComment(post.id);
                        }
                      }}
                      placeholder={`Reply as ${user?.fullName || 'Guest'}...`}
                      className="flex-1 px-3 py-2 bg-white border border-[#D8C7B5] rounded text-xs text-[#1A1815] focus:outline-none focus:border-[#C85A32]"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="px-3 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Post Modal */}
      {activeNewPostModal && (
        <NewPostModal
          onClose={() => setActiveNewPostModal(false)}
          defaultCategory={selectedCategory === 'All' ? 'Questions' : (selectedCategory as CommunityCategory)}
        />
      )}
    </div>
  );
};
