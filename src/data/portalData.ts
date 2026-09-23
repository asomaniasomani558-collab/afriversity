import { 
  MentorshipRequest, 
  MentorshipSession, 
  DirectMessage, 
  MentorResource, 
  InstitutionProgram, 
  InstitutionOpportunity, 
  InstitutionAnnouncement 
} from '../types';

export const INITIAL_MENTORSHIP_REQUESTS: MentorshipRequest[] = [
  {
    id: 'req-1',
    studentId: 'std-kwesi-1',
    studentName: 'Kwesi Appiah',
    studentCountry: 'Ghana',
    studentEducationLevel: 'High School / WASSCE Graduate',
    mentorId: 'dr-kwame-mensah',
    mentorName: 'Dr. Kwame Mensah',
    topic: 'KNUST vs UG Legon Computer Science Decision',
    description: 'I completed WASSCE at Presec Legon with aggregate 8 (A1 in Elective Math, Physics, Chemistry). I am torn between Computer Engineering at KNUST and Computer Science at Legon. Could you advise on curriculum and internship opportunities?',
    requestedArea: 'Computer Science Admissions',
    date: '2026-09-18',
    status: 'pending'
  },
  {
    id: 'req-2',
    studentId: 'std-amina-2',
    studentName: 'Amina Bello',
    studentCountry: 'Nigeria',
    studentEducationLevel: 'Undergraduate (Year 2)',
    mentorId: 'abena-agyepong',
    mentorName: 'Abena Agyepong',
    topic: 'Mastercard Foundation Scholars Application',
    description: 'Applying for the Mastercard Foundation post-graduate fellowship at University of Cape Town. Need feedback on my personal statement and how to frame my community leadership project.',
    requestedArea: 'Scholarships',
    date: '2026-09-15',
    status: 'accepted',
    responseNote: 'Delighted to review. Let us set up a 30-min review session this week.'
  },
  {
    id: 'req-3',
    studentId: 'std-kojo-3',
    studentName: 'Kojo Antwi',
    studentCountry: 'Ghana',
    studentEducationLevel: 'High School / WASSCE',
    mentorId: 'dr-emmanuel-boateng',
    mentorName: 'Dr. Emmanuel Boateng, MB ChB',
    topic: 'MB ChB Medical Cut-Offs and Preclinical Transition',
    description: 'I have aggregate 7 from Opoku Ware School. How competitive is the interview at UG Medical School vs KNUST SMS? What should I review before the panel?',
    requestedArea: 'Medicine',
    date: '2026-09-10',
    status: 'completed',
    responseNote: 'Session completed on Sept 14. Student provided panel prep guidelines.'
  },
  {
    id: 'req-4',
    studentId: 'std-chidi-4',
    studentName: 'Chidi Okafor',
    studentCountry: 'Nigeria',
    studentEducationLevel: 'Undergraduate (Final Year)',
    mentorId: 'farai-chigumba',
    mentorName: 'Farai Chigumba',
    topic: 'Renewable Mini-Grid Engineering Careers in West Africa',
    description: 'Graduating with a degree in Electrical Engineering. Would love guidance on entering solar microgrid project management with AfDB or African clean-tech startups.',
    requestedArea: 'Engineering',
    date: '2026-09-20',
    status: 'pending'
  }
];

export const INITIAL_MENTORSHIP_SESSIONS: MentorshipSession[] = [
  {
    id: 'sess-1',
    requestId: 'req-2',
    studentId: 'std-amina-2',
    studentName: 'Amina Bello',
    mentorId: 'abena-agyepong',
    mentorName: 'Abena Agyepong',
    date: '2026-09-25',
    time: '16:00 GMT',
    durationMinutes: 45,
    topic: 'Mastercard Foundation Essay Review & Interview Strategy',
    status: 'scheduled',
    meetingFormat: 'Document Review',
    notes: 'Draft essay sent in advance. Focus on community leadership evidence and career impact in West Africa.',
    meetingUrl: 'https://meet.afriversity.org/room/abena-amina-scholarship'
  },
  {
    id: 'sess-2',
    requestId: 'req-3',
    studentId: 'std-kojo-3',
    studentName: 'Kojo Antwi',
    mentorId: 'dr-emmanuel-boateng',
    mentorName: 'Dr. Emmanuel Boateng, MB ChB',
    date: '2026-09-14',
    time: '18:00 GMT',
    durationMinutes: 30,
    topic: 'UG Medical School Admissions Interview Prep',
    status: 'completed',
    meetingFormat: 'Text Advisory',
    notes: 'Reviewed ethical case scenarios and bio-science current events.'
  }
];

export const INITIAL_DIRECT_MESSAGES: DirectMessage[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-amina-abena',
    senderId: 'std-amina-2',
    senderName: 'Amina Bello',
    senderRole: 'student',
    recipientId: 'abena-agyepong',
    recipientName: 'Abena Agyepong',
    content: 'Good evening Sister Abena, thank you for accepting my mentorship request! I have uploaded my statement of purpose draft.',
    timestamp: '2026-09-16T14:30:00Z',
    read: true
  },
  {
    id: 'msg-2',
    conversationId: 'conv-amina-abena',
    senderId: 'abena-agyepong',
    senderName: 'Abena Agyepong',
    senderRole: 'mentor',
    recipientId: 'std-amina-2',
    recipientName: 'Amina Bello',
    content: 'Hello Amina! I have reviewed your first two pages. Your community work is inspiring. Let us hone the specific goals on paragraph 3 during our session on Friday.',
    timestamp: '2026-09-16T18:15:00Z',
    read: true,
    resourceLink: {
      title: 'Mastercard Foundation Scholars Application Playbook',
      url: 'https://afriversity.org/resources/mcf-guide'
    }
  }
];

export const INITIAL_MENTOR_RESOURCES: MentorResource[] = [
  {
    id: 'res-1',
    mentorId: 'dr-kwame-mensah',
    authorName: 'Dr. Kwame Mensah',
    title: 'De-mystifying WASSCE Cut-Off Aggregates for Ghanaian STEM Degrees',
    description: 'A comprehensive advisory breakdown explaining how KNUST and University of Ghana compute cut-off aggregates across Core vs Elective subjects, and how tie-breaking works for high-demand programmes.',
    category: 'University Applications',
    url: 'https://admissions.ug.edu.gh/brochure/guidelines.pdf',
    date: '2026-08-12',
    upvotes: 84
  },
  {
    id: 'res-2',
    mentorId: 'abena-agyepong',
    authorName: 'Abena Agyepong',
    title: 'Mastercard Foundation Scholars Application Playbook (West Africa)',
    description: 'Step-by-step guidance on writing impactful personal statements, obtaining credible academic references, and demonstrating ethical leadership for undergraduate & graduate funding.',
    category: 'Scholarships',
    url: 'https://mastercardfdn.org/all/scholars/becoming-a-scholar/apply-to-the-scholars-program/',
    date: '2026-08-28',
    upvotes: 142
  },
  {
    id: 'res-3',
    mentorId: 'dr-emmanuel-boateng',
    authorName: 'Dr. Emmanuel Boateng, MB ChB',
    title: 'Clinical Medical School Admissions: Preparation & Interview Survival Guide',
    description: 'Insight into clinical medicine admissions at Korle-Bu and SMS Kumasi, typical ethical dilemma questions in panels, and WASSCE science preparation tips.',
    category: 'Study Materials',
    url: 'https://chs.ug.edu.gh/academics/undergraduate-programmes',
    date: '2026-09-02',
    upvotes: 67
  },
  {
    id: 'res-4',
    mentorId: 'farai-chigumba',
    authorName: 'Farai Chigumba',
    title: 'Renewable Energy Engineering Pathways & Graduate Fellowships across Africa',
    description: 'Curated list of international climate fellowships, African Development Bank youth training grants, and open-access electrical engineering courses.',
    category: 'Career Guides',
    url: 'https://www.afdb.org/en/topics-and-sectors/sectors/energy',
    date: '2026-09-11',
    upvotes: 53
  }
];

export const INITIAL_INSTITUTION_PROGRAMS: InstitutionProgram[] = [
  {
    id: 'prog-ug-cs',
    institutionId: 'ug-legon',
    institutionName: 'University of Ghana, Legon',
    name: 'BSc Computer Science',
    degreeType: 'BSc (Bachelor of Science)',
    faculty: 'School of Physical and Mathematical Sciences',
    duration: '4 Years',
    description: 'Rigorous 4-year undergraduate programme combining theoretical computer science, systems architecture, distributed programming, algorithms, and artificial intelligence.',
    wassceCutoff: 9,
    requiredCoreSubjects: ['Core Mathematics (Grade A1 - C6)', 'English Language (Grade A1 - C6)', 'Integrated Science (Grade A1 - C6)'],
    requiredElectiveSubjects: ['Elective Mathematics (A1 - B3 required)', 'Physics', 'Chemistry or Applied Electricity'],
    applicationUrl: 'https://admissions.ug.edu.gh/undergraduate-apply',
    qualificationRequirements: {
      wassce: 'Aggregate 9 or better in 3 core and 3 best electives. Elective Math is mandatory.',
      aLevel: 'Three passes in Mathematics, Physics, and any other science subject with minimum grade B in Math.',
      ib: 'Minimum score of 32 points with Higher Level Mathematics.'
    },
    verified: true
  },
  {
    id: 'prog-ug-bba',
    institutionId: 'ug-legon',
    institutionName: 'University of Ghana, Legon',
    name: 'BSc Administration (Accounting & Finance)',
    degreeType: 'BSc (Bachelor of Science)',
    faculty: 'University of Ghana Business School (UGBS)',
    duration: '4 Years',
    description: 'West Africa premier business school programme preparing chartered accountants, financial analysts, investment bankers, and corporate governance specialists.',
    wassceCutoff: 8,
    requiredCoreSubjects: ['Core Mathematics (A1 - B3)', 'English Language (A1 - B3)', 'Social Studies / Integrated Science'],
    requiredElectiveSubjects: ['Financial Accounting / Cost Accounting', 'Business Management', 'Economics or Elective Math'],
    applicationUrl: 'https://admissions.ug.edu.gh/undergraduate-apply',
    qualificationRequirements: {
      wassce: 'Aggregate 8 or better. High grades in Mathematics and English mandatory.',
      aLevel: 'Passes in Business Management, Accounting, and Economics with at least Grade B in two subjects.'
    },
    verified: true
  },
  {
    id: 'prog-knust-ce',
    institutionId: 'knust-kumasi',
    institutionName: 'Kwame Nkrumah University of Science and Technology',
    name: 'BSc Computer Engineering',
    degreeType: 'BSc (Bachelor of Science)',
    faculty: 'College of Engineering',
    duration: '4 Years',
    description: 'Premier engineering programme accredited by Ghana Institution of Engineering. Focuses on hardware design, embedded robotics, digital signal processing, and telecommunications.',
    wassceCutoff: 8,
    requiredCoreSubjects: ['Core Mathematics (A1 - B2)', 'English Language (A1 - C6)', 'Integrated Science (A1 - B3)'],
    requiredElectiveSubjects: ['Elective Mathematics (A1 - B2)', 'Physics (A1 - B3)', 'Chemistry / Applied Electricity'],
    applicationUrl: 'https://apps.knust.edu.gh/admissions/apply',
    qualificationRequirements: {
      wassce: 'Aggregate 8 or better with strong scores in Elective Mathematics and Physics.',
      aLevel: 'Grades A/B in Mathematics and Physics.'
    },
    verified: true
  },
  {
    id: 'prog-ashesi-cs',
    institutionId: 'ashesi-berekuso',
    institutionName: 'Ashesi University',
    name: 'BSc Computer Science & Software Engineering',
    degreeType: 'BSc (Bachelor of Science)',
    faculty: 'Department of Computer Science',
    duration: '4 Years',
    description: 'Pioneering liberal arts and tech curriculum emphasizing ethical leadership, entrepreneurship, data structures, cloud platforms, and cooperative internships.',
    wassceCutoff: 14,
    requiredCoreSubjects: ['Core Mathematics (A1 - C6)', 'English Language (A1 - C6)', 'Integrated Science (A1 - C6)'],
    requiredElectiveSubjects: ['Any 3 academic electives including Elective Mathematics'],
    applicationUrl: 'https://admissions.ashesi.edu.gh/',
    qualificationRequirements: {
      wassce: 'Aggregate 14 or better. Holistic admissions review considering high school transcripts, essays, and leadership.',
      aLevel: 'Minimum 3 Cambridge A-Level passes with C or better.'
    },
    verified: true
  }
];

export const INITIAL_INSTITUTION_OPPORTUNITIES: InstitutionOpportunity[] = [
  {
    id: 'opp-1',
    institutionId: 'ug-legon',
    institutionName: 'University of Ghana, Legon',
    title: 'University of Ghana Needy Students Support Fund (SDF)',
    category: 'Scholarship',
    description: 'Financial grants providing 50% to 100% tuition and residential bursaries for academically talented Ghanaian undergraduates facing severe financial hardship.',
    eligibility: 'Level 100 to 400 full-time regular students with CGPA 3.0 or better and documented financial need.',
    deadline: '2026-11-30',
    location: 'Legon Campus, Accra',
    applicationUrl: 'https://finaid.ug.edu.gh/apply',
    status: 'Active',
    createdAt: '2026-08-01'
  },
  {
    id: 'opp-2',
    institutionId: 'knust-kumasi',
    institutionName: 'Kwame Nkrumah University of Science and Technology',
    title: 'KNUST Student Entrepreneurship & Technology Incubation Lab',
    category: 'Research',
    description: 'Seed funding of up to GHS 50,000, dedicated prototyping lab access, and executive mentorship for student engineering teams building renewable energy or agritech solutions.',
    eligibility: 'Undergraduate and postgraduate students enrolled in Engineering, Sciences, or Built Environment.',
    deadline: '2026-10-15',
    location: 'College of Engineering Makerspace, Kumasi',
    applicationUrl: 'https://coe.knust.edu.gh/incubation',
    status: 'Active',
    createdAt: '2026-08-15'
  },
  {
    id: 'opp-3',
    institutionId: 'ashesi-berekuso',
    institutionName: 'Ashesi University',
    title: 'Ashesi Pan-African Leadership & Mastercard Foundation Fellowship',
    category: 'Scholarship',
    description: 'Comprehensive scholarship covering tuition, on-campus accommodation, laptop, monthly stipend, and international summer internship placement for gifted African youth.',
    eligibility: 'First-time undergraduate applicants demonstrating strong academic merit, ethical character, and demonstrated leadership.',
    deadline: '2026-12-15',
    location: 'Berekuso, Eastern Region',
    applicationUrl: 'https://www.ashesi.edu.gh/admissions/scholarships.html',
    status: 'Active',
    createdAt: '2026-07-20'
  }
];

export const INITIAL_INSTITUTION_ANNOUNCEMENTS: InstitutionAnnouncement[] = [
  {
    id: 'ann-1',
    institutionId: 'ug-legon',
    institutionName: 'University of Ghana, Legon',
    title: 'Official Opening of 2026/2027 Undergraduate E-Vouchers & Applications',
    content: 'The Academic Affairs Directorate announces that online admissions for the 2026/2027 Academic Year are officially active. Prospective candidates must purchase e-vouchers exclusively through designated banking partners (GCB, Ecobank, CBG) or the official UG Admissions portal. Do NOT patronize unauthorized third-party vendors.',
    category: 'Admissions',
    date: '2026-09-01',
    important: true
  },
  {
    id: 'ann-2',
    institutionId: 'knust-kumasi',
    institutionName: 'Kwame Nkrumah University of Science and Technology',
    title: 'Important Clarification on WASSCE Cut-Off Aggregates for Health Sciences',
    content: 'Candidates applying for BSc Nursing, Pharmacy (PharmD), and Medical Laboratory Technology are reminded that Elective Mathematics, Chemistry, and Biology are compulsory prerequisites with maximum cutoff aggregate 09.',
    category: 'Cut-Offs',
    date: '2026-09-08',
    important: true
  },
  {
    id: 'ann-3',
    institutionId: 'ashesi-berekuso',
    institutionName: 'Ashesi University',
    title: 'Virtual Campus Open Day & Admissions Advisory Webinar',
    content: 'Join Ashesi faculty, admissions officers, and current Mastercard Foundation scholars for a live virtual tour, Q&A on scholarship essays, and curriculum breakdown on Saturday, October 4th at 10:00 GMT.',
    category: 'Campus Life',
    date: '2026-09-14',
    important: false
  }
];
