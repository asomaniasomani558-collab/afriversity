import { CommunityPost } from '../types';

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'What are the real cut-off requirements for Computer Science at KNUST this year?',
    content: 'Hi everyone! I just received my WASSCE results with an aggregate of 09 (A1 in Core Maths, A1 in Integrated Science, B2 in English, B2 in Elective Maths, A1 in Physics, B3 in Chemistry). Will aggregate 09 guarantee admission into BSc Computer Science at KNUST, or should I also consider BSc Computer Engineering or GCTU as a back-up choice? Any advice from current students or mentors?',
    authorName: 'Kofi Mensah-Bonsu',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    authorInstitution: 'Prempeh College Alumnus / Prospective KNUST Applicant',
    category: 'Questions',
    tags: ['KNUST', 'Computer Science', 'WASSCE', 'Cut-off Aggregates'],
    createdAt: '2 hours ago',
    upvotes: 28,
    isQuestion: true,
    isResolved: true,
    comments: [
      {
        id: 'c1-1',
        authorName: 'Abena Agyepong',
        authorRole: 'mentor',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        authorInstitution: 'AfriVersity Verified Mentor · Alumna',
        content: 'Congratulations on an impressive aggregate 09, Kofi! Historically, the official cut-off point for BSc Computer Science at KNUST ranges between aggregate 09 and 10 for science applicants with strong Elective Mathematics. Your B2 in Elective Maths and A1 in Physics are solid. Definitely select BSc Computer Science as your first choice, and put Computer Engineering or Information Technology as your second choice for insurance.',
        createdAt: '1 hour ago',
        upvotes: 19,
        isOfficialAnswer: true
      },
      {
        id: 'c1-2',
        authorName: 'Kwame Osei',
        authorRole: 'student',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        authorInstitution: 'KNUST 2nd Year CS Student',
        content: 'I got in with aggregate 09 two years ago. Make sure your online application details match your WAEC scratch card details perfectly. See you on campus in Kumasi!',
        createdAt: '45 mins ago',
        upvotes: 8
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Mastercard Foundation Scholars Program (2026/2027 cycle) now accepting applications at KNUST & Ashesi',
    content: 'Official Announcement: The Mastercard Foundation Scholars Program has published the 2026/2027 application guidelines for both KNUST and Ashesi University. Key things to note: 1) You must have your certified WASSCE certificate or verified results slip ready. 2) Family income declaration and community references are scrutinized rigorously. 3) Applications are completely free of charge—never pay any agent.',
    authorName: 'Mastercard Foundation Scholars Secretariat',
    authorRole: 'institution',
    authorAvatar: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=150&q=80',
    authorInstitution: 'Mastercard Foundation Scholars Program Liaison',
    category: 'Scholarships',
    tags: ['Mastercard Foundation', 'Full Scholarship', 'Ashesi', 'KNUST', 'Official Notice'],
    createdAt: '5 hours ago',
    upvotes: 54,
    isQuestion: false,
    isResolved: false,
    comments: [
      {
        id: 'c2-1',
        authorName: 'Dr. Kwame Mensah',
        authorRole: 'mentor',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        authorInstitution: 'Ashesi Faculty & Mentor',
        content: 'For those writing their essays, make sure to emphasize your practical vision for giving back to your community or country. The selection committee looks closely at demonstrated ethical character and resilience, not just high test scores.',
        createdAt: '3 hours ago',
        upvotes: 21,
        isOfficialAnswer: true
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Has anyone received interview calls for University of Ghana Medical School (Korle-Bu) yet?',
    content: 'I applied for MB ChB Medicine with aggregate 07 (Straight A1s in Core and Electives except B2 in English). Does anyone know the typical interview schedule this month, and what ethical/scientific questions they usually focus on during the oral panel?',
    authorName: 'Esi Nyarko',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80',
    authorInstitution: 'Prospective Medical Student',
    category: 'Questions',
    tags: ['UG Legon', 'Medicine', 'MB ChB', 'Admissions Interview'],
    createdAt: '1 day ago',
    upvotes: 31,
    isQuestion: true,
    isResolved: true,
    comments: [
      {
        id: 'c3-1',
        authorName: 'Dr. Emmanuel Boateng, MB ChB',
        authorRole: 'mentor',
        authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
        authorInstitution: 'UG Medical School Resident Physician',
        content: 'Greetings Esi. UG Medical School typically sends SMS and email interview notifications in batches starting late October. The oral interview tests your motivation for medicine, empathy, ethical dilemma reasoning (e.g. patient autonomy, triage ethics), and knowledge of pressing healthcare challenges in Ghana like maternal health or NHIS access. Stay calm, be yourself, and dress formally.',
        createdAt: '18 hours ago',
        upvotes: 25,
        isOfficialAnswer: true
      }
    ]
  },
  {
    id: 'post-4',
    title: 'Top 5 Tech Skills Most Demanded by African FinTech Startups in 2026',
    content: 'Having interviewed over 40 junior software developers across Nigeria, Ghana, and Kenya over the past two years, here is what hiring engineering managers actually care about when reviewing graduates from African universities:\n\n1. TypeScript & Modern Backend (Node/Go/Python)\n2. SQL Database optimization & transactional integrity\n3. Mobile money API integration (MTN MoMo, Paystack, Flutterwave APIs)\n4. Cloud deployments (AWS, Docker, CI/CD)\n5. Clear technical communication and problem-solving humility.\n\nDon’t wait for your final year university project to build production apps!',
    authorName: 'Abena Agyepong',
    authorRole: 'mentor',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    authorInstitution: 'Lead Software Engineer · Paystack',
    category: 'Careers',
    tags: ['Tech Careers', 'FinTech', 'Software Engineering', 'Internships', 'Advice'],
    createdAt: '2 days ago',
    upvotes: 67,
    isQuestion: false,
    comments: []
  },
  {
    id: 'post-5',
    title: 'Advice on choosing between BSc Mining Engineering at UMaT vs KNUST Civil Engineering',
    content: 'I have offers from both UMaT Tarkwa for Mining Engineering and KNUST for Civil Engineering. I am passionate about infrastructure, but I hear UMaT has almost 95% immediate employment with multinational mining firms in the Western Region. Can alumni or professionals share their experiences on career mobility?',
    authorName: 'Yaw Boateng-Frimpong',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    authorInstitution: 'Opoku Ware Alumnus',
    category: 'University Applications',
    tags: ['UMaT', 'KNUST', 'Mining Engineering', 'Civil Engineering'],
    createdAt: '3 days ago',
    upvotes: 22,
    isQuestion: true,
    isResolved: false,
    comments: [
      {
        id: 'c5-1',
        authorName: 'Selorm Dzikunu',
        authorRole: 'mentor',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        authorInstitution: 'Senior Mineral Processing Engineer · Gold Fields',
        content: 'Both are stellar. If you love direct heavy industry, mining geotechnical work, and immediate high graduate packages in the mining belt (Tarkwa, Obuasi, Chirano, and international mining sites in Mali, DRC, Australia), UMaT’s specialized reputation is unbeatable. If you prefer broad structural engineering, transportation, and working across urban construction in Accra or Kumasi, KNUST Civil is exceptionally well regarded.',
        createdAt: '2 days ago',
        upvotes: 14
      }
    ]
  }
];
