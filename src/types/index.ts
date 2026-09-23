export type UserRole = 'student' | 'mentor' | 'institution';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'required';

export interface StudentOnboardingData {
  fullName: string;
  country: string;
  currentEducationLevel: 'High School / WASSCE' | 'Undergraduate' | 'Graduate' | 'Other';
  intendedFieldOfStudy: string[];
  careerInterests: string[];
  preferredCountries: string[];
  fundingNeed: 'Full Scholarship' | 'Partial Aid' | 'Self-Funded';
  wassceCompleted: boolean;
  approximateAggregate?: number;
}

export interface MentorOnboardingData {
  expertiseAreas: string[];
  countriesToAdvise: string[];
  targetEducationLevels: string[];
  languages: string[];
  mentorshipStyle: string;
  weeklyAvailabilityHours: string;
}

export interface MentorProfileData {
  occupation: string;
  organization: string;
  educationLevel: string;
  universityAttended: string;
  degree: string;
  fieldOfExpertise: string;
  yearsExperience: number;
  expertiseAreas: string[];
  aboutMe: string;
  whyMentor: string;
  verificationStatus: VerificationStatus;
  verificationDocs?: string;
  countriesToAdvise?: string[];
  targetEducationLevels?: string[];
  languages?: string[];
  mentorshipStyle?: string;
  weeklyAvailabilityHours?: string;
}

export interface InstitutionProfileData {
  institutionName: string;
  institutionType: 'University' | 'College' | 'Technical University' | 'Training Institution' | 'Professional Institution' | 'Scholarship Organization' | 'Educational Organization';
  country: string;
  city: string;
  officialWebsite: string;
  officialEmail: string;
  phone: string;
  logoUrl?: string;
  campusPhotoUrls: string[];
  description: string;
  verificationStatus: VerificationStatus;
  verificationDocs?: string;
  admissionsPortalUrl: string;
  faculties: string[];
}

export interface MentorshipRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentCountry: string;
  studentEducationLevel: string;
  mentorId: string;
  mentorName: string;
  topic: string;
  description: string;
  requestedArea: string;
  date: string;
  status: 'pending' | 'accepted' | 'declined' | 'active' | 'completed';
  responseNote?: string;
}

export interface MentorshipSession {
  id: string;
  requestId?: string;
  studentId: string;
  studentName: string;
  mentorId: string;
  mentorName: string;
  date: string;
  time: string;
  durationMinutes: number;
  topic: string;
  status: 'scheduled' | 'rescheduled' | 'completed' | 'cancelled';
  meetingFormat: 'Text Advisory' | 'Live Session Link' | 'Document Review';
  notes?: string;
  meetingUrl?: string;
}

export interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  recipientRole?: UserRole;
  content: string;
  timestamp: string;
  read: boolean;
  resourceLink?: {
    title: string;
    url: string;
  };
}

export interface MentorResource {
  id: string;
  mentorId: string;
  authorName: string;
  authorRole?: string;
  title: string;
  description: string;
  category: 'University Applications' | 'Career Guides' | 'Study Materials' | 'Scholarships' | 'Technology & Code' | 'General Advice' | 'Admissions' | 'STEM' | 'Career' | 'Study Skills';
  url: string;
  date: string;
  upvotes?: number;
}

export interface InstitutionOpportunity {
  id: string;
  institutionId: string;
  institutionName: string;
  title: string;
  type?: 'Full Scholarship' | 'Partial Scholarship' | 'Bursary' | 'Internship' | 'Research Grant' | string;
  category?: 'Scholarship' | 'Internship' | 'Open Day' | 'Workshop' | 'Competition' | 'Research' | 'Admissions Announcement' | 'Event' | 'Training';
  description?: string;
  eligibility: string;
  deadline: string;
  location?: string;
  applicationUrl: string;
  status: 'Active' | 'Upcoming' | 'Closed';
  createdAt: string;
}

export interface InstitutionAnnouncement {
  id: string;
  institutionId: string;
  institutionName: string;
  title: string;
  content: string;
  category: 'Admissions' | 'Cut-Offs' | 'Scholarship Deadline' | 'Campus Life' | 'General' | 'Deadlines' | 'Cut-Off Points' | 'Examinations';
  date: string;
  important?: boolean;
  link?: string;
}

export interface InstitutionProgram {
  id: string;
  institutionId: string;
  institutionName: string;
  name: string;
  degreeType?: string;
  level?: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Certificate' | string;
  faculty: string;
  duration: string;
  description?: string;
  tuitionNotes?: string;
  admissionRequirements?: string;
  wassceCutoff?: string | number;
  requiredCoreSubjects?: string[];
  requiredElectiveSubjects?: string[];
  applicationUrl: string;
  qualificationRequirements?: {
    wassce?: string;
    aLevel?: string;
    ib?: string;
    international?: string;
  };
  verified: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  title?: string;
  institutionAffiliation?: string;
  country: string;
  city?: string;
  phone?: string;
  bio?: string;
  onboardingComplete: boolean;
  studentData?: StudentOnboardingData;
  mentorData?: MentorProfileData;
  institutionData?: InstitutionProfileData;
  verificationStatus?: VerificationStatus;
  savedUniversityIds: string[];
  savedCourseIds: string[];
  savedScholarshipIds: string[];
  savedMicrocourseIds?: string[];
  savedOpportunityIds?: string[];
  completedLessonIds?: string[];
}

export type OpportunityType = 
  | 'Internship'
  | 'Job'
  | 'Fellowship'
  | 'Scholarship'
  | 'Volunteering'
  | 'Hackathon'
  | 'Competition'
  | 'Apprenticeship'
  | 'Graduate Programme'
  | 'Research'
  | 'Conference';

export type OpportunityField = 
  | 'Software Engineering'
  | 'Data Science & AI'
  | 'Cybersecurity'
  | 'UI/UX & Product Design'
  | 'Business & Strategy'
  | 'Finance & Economics'
  | 'Marketing & Communications'
  | 'Engineering (General & Electrical)'
  | 'Healthcare & Public Health'
  | 'Research & Sciences'
  | 'Other Fields';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  organizationLogo?: string;
  organizationType: 'Multinational Tech' | 'African Enterprise' | 'Pan-African Bank' | 'International Agency / UN' | 'Non-Profit / NGO' | 'Research Institution';
  type: OpportunityType;
  category: OpportunityField;
  location: string;
  country: string;
  remote: 'Remote' | 'On-site' | 'Hybrid';
  description: string;
  requirements: string[];
  eligibility: string[];
  skills: string[];
  stipend?: string;
  salary?: string;
  deadline: string;
  startDate?: string;
  duration?: string;
  source: string;
  sourceUrl: string;
  applicationUrl: string;
  publishedAt: string;
  fetchedAt: string;
  status: 'Active' | 'Closing Soon' | 'Upcoming';
  verified: boolean;
  featured?: boolean;
}

export interface CampusTourStop {
  id: string;
  name: string;
  category: 'Academic' | 'Library' | 'Landmark' | 'Residential' | 'Innovation Hub' | 'Recreation';
  imageUrl: string;
  fallbackImageUrl: string;
  description: string;
  keyFeatures: string[];
  historicalFact?: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  country: string;
  city: string;
  flag: string;
  campusImageUrl: string;
  fallbackCampusImageUrl?: string;
  campusImageCaption: string;
  type: 'Public' | 'Private';
  establishedYear: number;
  description: string;
  highlightBadges: string[];
  studentCountApprox: string;
  faculties: string[];
  officialWebsite: string;
  officialAdmissionsUrl: string;
  contactEmail: string;
  contactPhone: string;
  featured?: boolean;
  campusTourStops: CampusTourStop[];
  campusTourHighlights?: string[];
}

export interface Course {
  id: string;
  universityId: string;
  universityName: string;
  universityShortName: string;
  name: string;
  code?: string;
  faculty: string;
  degreeType: string;
  durationYears: number | string;
  wassceCutoffAggregate: number | string;
  coreRequirements: string[];
  electiveRequirements: string[];
  careerProspects: string[];
  description: string;
  officialProgramUrl: string;
  additionalCriteria?: string | string[];
  verifiedSource?: string;
  isPopular?: boolean;
  featured?: boolean;
}

export type CourseProgram = Course;

export type ScholarshipStatus = 'Active' | 'Upcoming' | 'Closed' | 'Rolling';

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  providerType?: string;
  countryScope?: string[];
  countryRegion: string;
  levelOfStudy: string[];
  targetUniversities?: string[];
  coverageType: string;
  coverageDetails?: string;
  fundingSummary?: string;
  eligibilitySummary?: string[];
  eligibilityCriteria: string[];
  deadline: string;
  deadlineStatus: ScholarshipStatus;
  officialApplicationUrl: string;
  description: string;
  verifiedSource?: string;
  featured?: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  industry: string;
  demandLevel?: 'Very High' | 'High' | 'Growing' | string;
  typicalEntrySalaryGHS?: string;
  averageEntrySalaryUSD?: string;
  description: string;
  recommendedDegrees?: string[];
  targetUniversities?: string[];
  keySkills: string[];
  africanIndustryEmployers?: string[];
  topAfricanEmployers: string[];
  highDemandInCountries: string[];
  recommendedPrograms: string[];
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  almaMater: string;
  almaMaterCountry?: string;
  currentCompanyOrInstitution: string;
  industry?: string;
  bio: string;
  avatarUrl: string;
  availableForAdmissionsAdvice?: boolean;
  yearsOfExperience: number;
  verified: boolean;
  country?: string;
  expertiseAreas: string[];
  sessionsCompleted?: number;
  contactEmail?: string;
  linkedinUrl?: string;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  authorInstitution?: string;
  content: string;
  createdAt: string;
  upvotes: number;
  isOfficialAnswer?: boolean;
}

export type CommunityCategory = 
  | 'University Applications' 
  | 'Scholarships' 
  | 'WASSCE & Cut-offs' 
  | 'Careers' 
  | 'Campus Life' 
  | 'General'
  | 'Questions'
  | 'Study Tips'
  | 'Announcements'
  | 'Technology';

export interface CommunityPost {
  id: string;
  authorId?: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  authorInstitution?: string;
  title: string;
  content: string;
  category: CommunityCategory;
  createdAt: string;
  upvotes: number;
  comments: CommunityComment[];
  isQuestion: boolean;
  isResolved?: boolean;
  tags: string[];
}

// Microcourse types (W3Schools + Coursera inspired)
export interface CourseQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveCodeExercise {
  title: string;
  instruction: string;
  starterCode: string;
  solution: string;
  language: 'python' | 'javascript' | 'html' | 'sql';
  expectedOutput?: string;
  explanation: string;
}

export interface MicrocourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  summary: string;
  content: string;
  codeExercise?: InteractiveCodeExercise;
  quiz?: CourseQuizQuestion[];
  keyTakeaways: string[];
}

export interface MicrocourseModule {
  id: string;
  title: string;
  description: string;
  lessons: MicrocourseLesson[];
}

export interface Microcourse {
  id: string;
  title: string;
  slug: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: string;
  lessonsCount: number;
  instructor: {
    name: string;
    role: string;
    institution: string;
    avatar: string;
  };
  thumbnail: string;
  shortDescription: string;
  overview: string;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: MicrocourseModule[];
  badgeTitle: string;
}
