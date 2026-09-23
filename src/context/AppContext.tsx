import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserRole, 
  VerificationStatus,
  StudentOnboardingData, 
  MentorOnboardingData,
  MentorProfileData,
  InstitutionProfileData,
  CommunityPost, 
  CommunityComment,
  MentorshipRequest,
  MentorshipSession,
  DirectMessage,
  MentorResource,
  InstitutionProgram,
  InstitutionOpportunity,
  InstitutionAnnouncement,
  Opportunity
} from '../types';
import { INITIAL_POSTS } from '../data/community';
import { OPPORTUNITIES } from '../data/opportunitiesData';
import { 
  INITIAL_MENTORSHIP_REQUESTS, 
  INITIAL_MENTORSHIP_SESSIONS, 
  INITIAL_DIRECT_MESSAGES, 
  INITIAL_MENTOR_RESOURCES, 
  INITIAL_INSTITUTION_PROGRAMS, 
  INITIAL_INSTITUTION_OPPORTUNITIES, 
  INITIAL_INSTITUTION_ANNOUNCEMENTS 
} from '../data/portalData';

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole, name?: string, additionalData?: { mentorData?: Partial<MentorProfileData>; institutionData?: Partial<InstitutionProfileData>; city?: string; phone?: string; country?: string }) => void;
  logout: () => void;
  updateRole: (role: UserRole) => void;
  completeOnboarding: (data: StudentOnboardingData) => void;
  completeMentorOnboarding: (data: MentorOnboardingData) => void;
  completeInstitutionOnboarding: (data: Partial<InstitutionProfileData>) => void;
  updateUserVerificationStatus: (status: VerificationStatus) => void;
  updateMentorProfile: (data: Partial<MentorProfileData>) => void;
  updateInstitutionProfile: (data: Partial<InstitutionProfileData>) => void;
  savedUniversities: string[];
  savedCourses: string[];
  savedScholarships: string[];
  savedMicrocourses: string[];
  savedOpportunities: string[];
  completedLessons: string[];
  toggleSaveUniversity: (id: string) => void;
  toggleSaveCourse: (id: string) => void;
  toggleSaveScholarship: (id: string) => void;
  toggleSaveMicrocourse: (id: string) => void;
  toggleSaveOpportunity: (id: string) => void;
  markLessonCompleted: (lessonId: string) => void;
  // Opportunities
  opportunities: Opportunity[];
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'publishedAt' | 'fetchedAt'>) => void;
  posts: CommunityPost[];
  createPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'upvotes' | 'comments'>) => void;
  upvotePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedUniversityId: string | null;
  setSelectedUniversityId: (id: string | null) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedMicrocourseId: string | null;
  setSelectedMicrocourseId: (id: string | null) => void;
  tourUniversityId: string | null;
  setTourUniversityId: (id: string | null) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  // Mentorship ecosystem
  requests: MentorshipRequest[];
  submitMentorshipRequest: (req: Omit<MentorshipRequest, 'id' | 'date' | 'status'>) => void;
  respondToMentorshipRequest: (requestId: string, status: 'accepted' | 'declined' | 'completed', note?: string) => void;
  sessions: MentorshipSession[];
  scheduleMentorshipSession: (sess: Omit<MentorshipSession, 'id' | 'status'>) => void;
  updateSessionStatus: (sessionId: string, status: 'scheduled' | 'rescheduled' | 'completed' | 'cancelled', notes?: string) => void;
  messages: DirectMessage[];
  sendDirectMessage: (recipientId: string, recipientName: string, content: string, resourceLink?: { title: string; url: string }) => void;
  mentorResources: MentorResource[];
  addMentorResource: (res: Omit<MentorResource, 'id' | 'date'>) => void;
  // Institution ecosystem
  institutionPrograms: InstitutionProgram[];
  addInstitutionProgram: (program: Omit<InstitutionProgram, 'id' | 'verified'>) => void;
  updateInstitutionProgram: (id: string, updates: Partial<InstitutionProgram>) => void;
  deleteInstitutionProgram: (id: string) => void;
  institutionOpportunities: InstitutionOpportunity[];
  addInstitutionOpportunity: (opp: Omit<InstitutionOpportunity, 'id' | 'createdAt'>) => void;
  toggleOpportunityStatus: (id: string) => void;
  institutionAnnouncements: InstitutionAnnouncement[];
  addInstitutionAnnouncement: (ann: Omit<InstitutionAnnouncement, 'id' | 'date'>) => void;
  deleteInstitutionAnnouncement: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('afriversity_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedMicrocourseId, setSelectedMicrocourseId] = useState<string | null>(null);
  const [tourUniversityId, setTourUniversityId] = useState<string | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('afriversity_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('afriversity_dark_mode', darkMode ? 'true' : 'false');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Posts
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('afriversity_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_POSTS;
      }
    }
    return INITIAL_POSTS;
  });

  // Microcourses
  const [savedMicrocourses, setSavedMicrocourses] = useState<string[]>(() => {
    const saved = localStorage.getItem('afriversity_saved_microcourses');
    return saved ? JSON.parse(saved) : ['python-african-data', 'wassce-math-mastery'];
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('afriversity_completed_lessons');
    return saved ? JSON.parse(saved) : ['py-lesson-1'];
  });

  // Mentorship Requests
  const [requests, setRequests] = useState<MentorshipRequest[]>(() => {
    const saved = localStorage.getItem('afriversity_requests');
    return saved ? JSON.parse(saved) : INITIAL_MENTORSHIP_REQUESTS;
  });

  // Mentorship Sessions
  const [sessions, setSessions] = useState<MentorshipSession[]>(() => {
    const saved = localStorage.getItem('afriversity_sessions');
    return saved ? JSON.parse(saved) : INITIAL_MENTORSHIP_SESSIONS;
  });

  // Direct Messages
  const [messages, setMessages] = useState<DirectMessage[]>(() => {
    const saved = localStorage.getItem('afriversity_messages');
    return saved ? JSON.parse(saved) : INITIAL_DIRECT_MESSAGES;
  });

  // Mentor Resources
  const [mentorResources, setMentorResources] = useState<MentorResource[]>(() => {
    const saved = localStorage.getItem('afriversity_mentor_resources');
    return saved ? JSON.parse(saved) : INITIAL_MENTOR_RESOURCES;
  });

  // Institution Programmes
  const [institutionPrograms, setInstitutionPrograms] = useState<InstitutionProgram[]>(() => {
    const saved = localStorage.getItem('afriversity_institution_programs');
    return saved ? JSON.parse(saved) : INITIAL_INSTITUTION_PROGRAMS;
  });

  // Institution Opportunities
  const [institutionOpportunities, setInstitutionOpportunities] = useState<InstitutionOpportunity[]>(() => {
    const saved = localStorage.getItem('afriversity_institution_opportunities');
    return saved ? JSON.parse(saved) : INITIAL_INSTITUTION_OPPORTUNITIES;
  });

  // Institution Announcements
  const [institutionAnnouncements, setInstitutionAnnouncements] = useState<InstitutionAnnouncement[]>(() => {
    const saved = localStorage.getItem('afriversity_institution_announcements');
    return saved ? JSON.parse(saved) : INITIAL_INSTITUTION_ANNOUNCEMENTS;
  });

  // Opportunities State (Real verified African & global internships/jobs)
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem('afriversity_opportunities');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return OPPORTUNITIES;
      }
    }
    return OPPORTUNITIES;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('afriversity_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);
  useEffect(() => {
    localStorage.setItem('afriversity_saved_microcourses', JSON.stringify(savedMicrocourses));
  }, [savedMicrocourses]);

  useEffect(() => {
    localStorage.setItem('afriversity_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('afriversity_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('afriversity_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('afriversity_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('afriversity_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('afriversity_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('afriversity_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('afriversity_mentor_resources', JSON.stringify(mentorResources));
  }, [mentorResources]);

  useEffect(() => {
    localStorage.setItem('afriversity_institution_programs', JSON.stringify(institutionPrograms));
  }, [institutionPrograms]);

  useEffect(() => {
    localStorage.setItem('afriversity_institution_opportunities', JSON.stringify(institutionOpportunities));
  }, [institutionOpportunities]);

  useEffect(() => {
    localStorage.setItem('afriversity_institution_announcements', JSON.stringify(institutionAnnouncements));
  }, [institutionAnnouncements]);

  const login = (
    email: string, 
    role: UserRole, 
    name?: string, 
    additionalData?: { 
      mentorData?: Partial<MentorProfileData>; 
      institutionData?: Partial<InstitutionProfileData>; 
      city?: string; 
      phone?: string; 
      country?: string; 
    }
  ) => {
    const defaultName = role === 'student' 
      ? 'Kwesi Appiah' 
      : role === 'mentor' 
        ? 'Victoria Mensah' 
        : 'University of Ghana Admissions Office';

    const defaultMentorData: MentorProfileData = {
      occupation: 'Senior Research Fellow & Academic Advisor',
      organization: 'Ashesi University / AI Africa Lab',
      educationLevel: 'PhD',
      universityAttended: 'KNUST / Cambridge University',
      degree: 'BSc Computer Engineering · PhD',
      fieldOfExpertise: 'Computer Science & STEM Admissions',
      yearsExperience: 8,
      expertiseAreas: ['University applications', 'Computer Science', 'Scholarships', 'Career development'],
      aboutMe: 'Passionate about mentoring young African scholars into world-class STEM programmes and guiding their university applications.',
      whyMentor: 'I want to ensure capable students from all high schools in Ghana and across Africa get the guidance they need to succeed.',
      verificationStatus: 'pending',
      countriesToAdvise: ['Ghana', 'Nigeria', 'Kenya', 'Rwanda'],
      targetEducationLevels: ['High School / WASSCE', 'Undergraduate'],
      languages: ['English', 'Twi'],
      mentorshipStyle: '1-on-1 Guidance & Application Feedback',
      weeklyAvailabilityHours: '2-4 hours / week',
      ...(additionalData?.mentorData || {})
    };

    const defaultInstitutionData: InstitutionProfileData = {
      institutionName: name || 'University of Ghana, Legon',
      institutionType: 'University',
      country: additionalData?.country || 'Ghana',
      city: additionalData?.city || 'Accra',
      officialWebsite: 'https://ug.edu.gh',
      officialEmail: email || 'admissions@ug.edu.gh',
      phone: additionalData?.phone || '+233 30 221 3820',
      logoUrl: '',
      campusPhotoUrls: ['/images/campuses/ug_balme_library.jpg', '/images/campuses/ug_great_hall.jpg'],
      description: 'The premier university in Ghana, founded in 1948, dedicated to achieving global impact through teaching, research, and community engagement.',
      verificationStatus: 'pending',
      admissionsPortalUrl: 'https://admissions.ug.edu.gh',
      faculties: ['College of Basic & Applied Sciences', 'College of Health Sciences', 'College of Humanities', 'College of Education'],
      ...(additionalData?.institutionData || {})
    };

    const newUser: UserProfile = {
      id: role === 'mentor' ? 'mentor-' + Date.now() : role === 'institution' ? 'inst-' + Date.now() : 'usr-' + Date.now(),
      email,
      fullName: name || defaultName,
      role,
      country: additionalData?.country || 'Ghana',
      city: additionalData?.city || (role === 'mentor' ? 'Accra' : role === 'institution' ? 'Legon, Accra' : 'Kumasi'),
      phone: additionalData?.phone || '',
      verificationStatus: role === 'student' ? 'verified' : 'pending',
      onboardingComplete: false, // Triggers role-specific onboarding if fresh
      mentorData: role === 'mentor' ? defaultMentorData : undefined,
      institutionData: role === 'institution' ? defaultInstitutionData : undefined,
      savedUniversityIds: ['ug-legon', 'knust-kumasi', 'ashesi-berekuso'],
      savedCourseIds: ['knust-cs', 'ug-cs'],
      savedScholarshipIds: ['mastercard-scholars', 'mtn-bright-scholarship']
    };

    setUser(newUser);
    setActiveTab('dashboard');
  };

  const logout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const updateRole = (role: UserRole) => {
    if (!user) return;
    setUser({
      ...user,
      role
    });
  };

  const completeOnboarding = (data: StudentOnboardingData) => {
    if (!user) return;
    setUser({
      ...user,
      fullName: data.fullName || user.fullName,
      country: data.country,
      onboardingComplete: true,
      studentData: data
    });
  };

  const completeMentorOnboarding = (data: MentorOnboardingData) => {
    if (!user || !user.mentorData) return;
    const updatedMentor: MentorProfileData = {
      ...user.mentorData,
      expertiseAreas: data.expertiseAreas.length > 0 ? data.expertiseAreas : user.mentorData.expertiseAreas,
      countriesToAdvise: data.countriesToAdvise,
      targetEducationLevels: data.targetEducationLevels,
      languages: data.languages,
      mentorshipStyle: data.mentorshipStyle,
      weeklyAvailabilityHours: data.weeklyAvailabilityHours
    };
    setUser({
      ...user,
      onboardingComplete: true,
      mentorData: updatedMentor
    });
  };

  const completeInstitutionOnboarding = (data: Partial<InstitutionProfileData>) => {
    if (!user || !user.institutionData) return;
    const updatedInstitution: InstitutionProfileData = {
      ...user.institutionData,
      ...data
    };
    setUser({
      ...user,
      onboardingComplete: true,
      institutionData: updatedInstitution
    });
  };

  const updateUserVerificationStatus = (status: VerificationStatus) => {
    if (!user) return;
    const updated = { ...user, verificationStatus: status };
    if (updated.mentorData) {
      updated.mentorData.verificationStatus = status;
    }
    if (updated.institutionData) {
      updated.institutionData.verificationStatus = status;
    }
    setUser(updated);
  };

  const updateMentorProfile = (data: Partial<MentorProfileData>) => {
    if (!user || !user.mentorData) return;
    setUser({
      ...user,
      mentorData: {
        ...user.mentorData,
        ...data
      }
    });
  };

  const updateInstitutionProfile = (data: Partial<InstitutionProfileData>) => {
    if (!user || !user.institutionData) return;
    setUser({
      ...user,
      institutionData: {
        ...user.institutionData,
        ...data
      }
    });
  };

  const savedUniversities = user?.savedUniversityIds || [];
  const savedCourses = user?.savedCourseIds || [];
  const savedScholarships = user?.savedScholarshipIds || [];
  const savedOpportunities = user?.savedOpportunityIds || [];

  const toggleSaveUniversity = (id: string) => {
    if (!user) return;
    const current = user.savedUniversityIds || [];
    const updated = current.includes(id) ? current.filter(uId => uId !== id) : [...current, id];
    setUser({ ...user, savedUniversityIds: updated });
  };

  const toggleSaveCourse = (id: string) => {
    if (!user) return;
    const current = user.savedCourseIds || [];
    const updated = current.includes(id) ? current.filter(cId => cId !== id) : [...current, id];
    setUser({ ...user, savedCourseIds: updated });
  };

  const toggleSaveScholarship = (id: string) => {
    if (!user) return;
    const current = user.savedScholarshipIds || [];
    const updated = current.includes(id) ? current.filter(sId => sId !== id) : [...current, id];
    setUser({ ...user, savedScholarshipIds: updated });
  };

  const toggleSaveOpportunity = (id: string) => {
    if (!user) return;
    const current = user.savedOpportunityIds || [];
    const updated = current.includes(id) ? current.filter(oId => oId !== id) : [...current, id];
    setUser({ ...user, savedOpportunityIds: updated });
  };

  const addOpportunity = (opp: Omit<Opportunity, 'id' | 'publishedAt' | 'fetchedAt'>) => {
    const newOpp: Opportunity = {
      ...opp,
      id: `opp-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0],
      fetchedAt: new Date().toISOString().split('T')[0]
    };
    setOpportunities(prev => [newOpp, ...prev]);
  };

  const toggleSaveMicrocourse = (id: string) => {
    setSavedMicrocourses(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const markLessonCompleted = (lessonId: string) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) ? prev : [...prev, lessonId]
    );
  };

  const createPost = (newPostData: Omit<CommunityPost, 'id' | 'createdAt' | 'upvotes' | 'comments'>) => {
    const post: CommunityPost = {
      ...newPostData,
      id: 'post-' + Date.now(),
      createdAt: 'Just now',
      upvotes: 0,
      comments: []
    };
    setPosts([post, ...posts]);
  };

  const upvotePost = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    }));
  };

  const addComment = (postId: string, content: string) => {
    if (!user) return;
    const newComment: CommunityComment = {
      id: 'comm-' + Date.now(),
      authorName: user.fullName,
      authorRole: user.role,
      content,
      createdAt: 'Just now',
      upvotes: 0,
      isOfficialAnswer: user.role === 'mentor' || user.role === 'institution'
    };

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));
  };

  // Mentorship ecosystem methods
  const submitMentorshipRequest = (req: Omit<MentorshipRequest, 'id' | 'date' | 'status'>) => {
    const newReq: MentorshipRequest = {
      ...req,
      id: 'req-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setRequests(prev => [newReq, ...prev]);
  };

  const respondToMentorshipRequest = (requestId: string, status: 'accepted' | 'declined' | 'completed', note?: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return { ...r, status, responseNote: note || r.responseNote };
      }
      return r;
    }));

    // If accepted, also auto-create an initial conversation thread between student and mentor if one doesn't exist
    if (status === 'accepted') {
      const targetReq = requests.find(r => r.id === requestId);
      if (targetReq) {
        const welcomeMessage: DirectMessage = {
          id: 'msg-' + Date.now(),
          conversationId: `conv-${targetReq.studentId}-${targetReq.mentorId}`,
          senderId: targetReq.mentorId,
          senderName: targetReq.mentorName,
          senderRole: 'mentor',
          recipientId: targetReq.studentId,
          recipientName: targetReq.studentName,
          content: note ? `Hello ${targetReq.studentName}, I accepted your request: "${note}"` : `Hello ${targetReq.studentName}, I have accepted your mentorship request on "${targetReq.topic}". Feel free to share more details here!`,
          timestamp: new Date().toISOString(),
          read: false
        };
        setMessages(prev => [...prev, welcomeMessage]);
      }
    }
  };

  const scheduleMentorshipSession = (sess: Omit<MentorshipSession, 'id' | 'status'>) => {
    const newSess: MentorshipSession = {
      ...sess,
      id: 'sess-' + Date.now(),
      status: 'scheduled'
    };
    setSessions(prev => [newSess, ...prev]);
  };

  const updateSessionStatus = (sessionId: string, status: 'scheduled' | 'rescheduled' | 'completed' | 'cancelled', notes?: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, status, notes: notes || s.notes };
      }
      return s;
    }));
  };

  const sendDirectMessage = (recipientId: string, recipientName: string, content: string, resourceLink?: { title: string; url: string }) => {
    if (!user) return;
    const conversationId = [user.id, recipientId].sort().join('-');
    const newMsg: DirectMessage = {
      id: 'msg-' + Date.now(),
      conversationId,
      senderId: user.id,
      senderName: user.fullName,
      senderRole: user.role,
      recipientId,
      recipientName,
      content,
      timestamp: new Date().toISOString(),
      read: true,
      resourceLink
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const addMentorResource = (res: Omit<MentorResource, 'id' | 'date'>) => {
    const newResource: MentorResource = {
      ...res,
      id: 'res-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      upvotes: 0
    };
    setMentorResources(prev => [newResource, ...prev]);
  };

  // Institution methods
  const addInstitutionProgram = (program: Omit<InstitutionProgram, 'id' | 'verified'>) => {
    const newProg: InstitutionProgram = {
      ...program,
      id: 'prog-' + Date.now(),
      verified: true
    };
    setInstitutionPrograms(prev => [newProg, ...prev]);
  };

  const updateInstitutionProgram = (id: string, updates: Partial<InstitutionProgram>) => {
    setInstitutionPrograms(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, ...updates };
      }
      return p;
    }));
  };

  const deleteInstitutionProgram = (id: string) => {
    setInstitutionPrograms(prev => prev.filter(p => p.id !== id));
  };

  const addInstitutionOpportunity = (opp: Omit<InstitutionOpportunity, 'id' | 'createdAt'>) => {
    const newOpp: InstitutionOpportunity = {
      ...opp,
      id: 'opp-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setInstitutionOpportunities(prev => [newOpp, ...prev]);
  };

  const toggleOpportunityStatus = (id: string) => {
    setInstitutionOpportunities(prev => prev.map(o => {
      if (o.id === id) {
        const nextStatus = o.status === 'Active' ? 'Closed' : 'Active';
        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  const addInstitutionAnnouncement = (ann: Omit<InstitutionAnnouncement, 'id' | 'date'>) => {
    const newAnn: InstitutionAnnouncement = {
      ...ann,
      id: 'ann-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setInstitutionAnnouncements(prev => [newAnn, ...prev]);
  };

  const deleteInstitutionAnnouncement = (id: string) => {
    setInstitutionAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateRole,
        completeOnboarding,
        completeMentorOnboarding,
        completeInstitutionOnboarding,
        updateUserVerificationStatus,
        updateMentorProfile,
        updateInstitutionProfile,
        savedUniversities,
        savedCourses,
        savedScholarships,
        savedMicrocourses,
        savedOpportunities,
        completedLessons,
        toggleSaveUniversity,
        toggleSaveCourse,
        toggleSaveScholarship,
        toggleSaveMicrocourse,
        toggleSaveOpportunity,
        markLessonCompleted,
        // Opportunities Corner
        opportunities,
        addOpportunity,
        posts,
        createPost,
        upvotePost,
        addComment,
        activeTab,
        setActiveTab,
        selectedUniversityId,
        setSelectedUniversityId,
        selectedCourseId,
        setSelectedCourseId,
        selectedMicrocourseId,
        setSelectedMicrocourseId,
        tourUniversityId,
        setTourUniversityId,
        globalSearchQuery,
        setGlobalSearchQuery,
        darkMode,
        toggleDarkMode,
        // Mentorship
        requests,
        submitMentorshipRequest,
        respondToMentorshipRequest,
        sessions,
        scheduleMentorshipSession,
        updateSessionStatus,
        messages,
        sendDirectMessage,
        mentorResources,
        addMentorResource,
        // Institution
        institutionPrograms,
        addInstitutionProgram,
        updateInstitutionProgram,
        deleteInstitutionProgram,
        institutionOpportunities,
        addInstitutionOpportunity,
        toggleOpportunityStatus,
        institutionAnnouncements,
        addInstitutionAnnouncement,
        deleteInstitutionAnnouncement
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
