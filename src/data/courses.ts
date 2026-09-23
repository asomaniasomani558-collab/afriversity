import { CourseProgram } from '../types';

export const COURSES: CourseProgram[] = [
  {
    id: 'knust-cs',
    universityId: 'knust-kumasi',
    universityName: 'Kwame Nkrumah University of Science and Technology',
    universityShortName: 'KNUST',
    name: 'BSc Computer Science',
    degreeType: 'BSc',
    faculty: 'College of Science / Department of Computer Science',
    durationYears: 4,
    description: 'A rigorous curriculum covering software engineering, algorithms, artificial intelligence, distributed systems, and computer architecture preparing graduates for modern technology industries across Africa and globally.',
    wassceCutoffAggregate: '09 (Competitive)',
    coreRequirements: [
      'Credit passes (A1 - C6) in Core Mathematics',
      'Credit passes (A1 - C6) in English Language',
      'Credit passes (A1 - C6) in Integrated Science'
    ],
    electiveRequirements: [
      'Elective Mathematics (A1 - C6) is strictly mandatory',
      'Physics (A1 - C6)',
      'Chemistry or Applied Electricity or Electronics or Computer Studies (A1 - C6)'
    ],
    additionalCriteria: 'Candidates with aggregate 06 to 09 have highest probability of admission. Science background is required.',
    careerProspects: [
      'Software Engineer',
      'Cloud Solutions Architect',
      'Machine Learning Engineer',
      'Systems Analyst',
      'Cybersecurity Specialist'
    ],
    officialProgramUrl: 'https://admissions.knust.edu.gh/programmes/bsc-computer-science',
    verifiedSource: 'KNUST Undergraduate Admissions Guide & Cut-off Points (College of Science)',
    featured: true
  },
  {
    id: 'knust-ce',
    universityId: 'knust-kumasi',
    universityName: 'Kwame Nkrumah University of Science and Technology',
    universityShortName: 'KNUST',
    name: 'BSc Computer Engineering',
    degreeType: 'BEng',
    faculty: 'College of Engineering',
    durationYears: 4,
    description: 'Bridges hardware and software engineering. Focuses on embedded systems, IoT architecture, robotics, microprocessor systems, VLSI design, and telecommunication networks.',
    wassceCutoffAggregate: '08 - 09',
    coreRequirements: [
      'Credit passes (A1 - C6) in Core Mathematics',
      'Credit passes (A1 - C6) in English Language',
      'Credit passes (A1 - C6) in Integrated Science'
    ],
    electiveRequirements: [
      'Elective Mathematics (A1 - C6)',
      'Physics (A1 - C6)',
      'Chemistry or Applied Electricity or Electronics (A1 - C6)'
    ],
    additionalCriteria: 'Must be from Pure Science or General Science with Physics & Elective Maths. Total aggregate must not exceed 09.',
    careerProspects: [
      'Embedded Systems Engineer',
      'Hardware Design Engineer',
      'Robotics Engineer',
      'Network Systems Engineer',
      'IoT Solutions Architect'
    ],
    officialProgramUrl: 'https://admissions.knust.edu.gh/programmes/bsc-computer-engineering',
    verifiedSource: 'KNUST College of Engineering Official Admission Brochure',
    featured: true
  },
  {
    id: 'ug-cs',
    universityId: 'ug-legon',
    universityName: 'University of Ghana',
    universityShortName: 'UG Legon',
    name: 'BSc Computer Science',
    degreeType: 'BSc',
    faculty: 'College of Basic and Applied Sciences / Department of Computer Science',
    durationYears: 4,
    description: 'Equips students with solid foundations in algorithmic problem-solving, web and mobile technologies, databases, networking, data structures, and computer theory in Accra’s tech hub.',
    wassceCutoffAggregate: '10 - 11',
    coreRequirements: [
      'Credit passes (A1 - C6) in English Language',
      'Credit passes (A1 - C6) in Core Mathematics',
      'Credit passes (A1 - C6) in Integrated Science'
    ],
    electiveRequirements: [
      'Mandatory: Elective Mathematics (Grade B3 or better strongly recommended)',
      'Physics',
      'One other elective from: Chemistry, Biology, Economics, or Geography'
    ],
    additionalCriteria: 'General Science or General Arts with Elective Mathematics. Minimum grade of C6 in all 6 subjects.',
    careerProspects: [
      'Full-Stack Developer',
      'Data Engineer',
      'Database Administrator',
      'Fintech Product Developer',
      'IT Consultant'
    ],
    officialProgramUrl: 'https://admission.ug.edu.gh/undergraduate-programmes/bsc-computer-science',
    verifiedSource: 'University of Ghana Legon Official Admissions Requirements & Cut-off Aggregates',
    featured: true
  },
  {
    id: 'ug-medicine',
    universityId: 'ug-legon',
    universityName: 'University of Ghana',
    universityShortName: 'UG Legon',
    name: 'Bachelor of Medicine and Bachelor of Surgery (MB ChB)',
    degreeType: 'MB ChB',
    faculty: 'College of Health Sciences / University of Ghana Medical School (Korle-Bu)',
    durationYears: 6,
    description: 'The premier medical training programme in Ghana based at Korle-Bu Teaching Hospital. Rigorous preclinical and clinical rotations preparing medical doctors of international distinction.',
    wassceCutoffAggregate: '07 - 08 (Strict Cut-off)',
    coreRequirements: [
      'Credit passes (A1) in Core Mathematics',
      'Credit passes (A1 - B2) in English Language',
      'Credit passes (A1) in Integrated Science',
      'Credit pass in Social Studies'
    ],
    electiveRequirements: [
      'Biology (A1 - B2)',
      'Chemistry (A1 - B2)',
      'Physics or Elective Mathematics (A1 - B2)'
    ],
    additionalCriteria: 'Extremely competitive. Shortlisted applicants must pass an oral admissions interview and medical fitness screening.',
    careerProspects: [
      'Medical Doctor / Physician',
      'Surgeon',
      'Clinical Researcher',
      'Public Health Specialist',
      'Healthcare Administrator'
    ],
    officialProgramUrl: 'https://admission.ug.edu.gh/undergraduate-programmes/mb-chb-medicine',
    verifiedSource: 'University of Ghana Medical School & College of Health Sciences Official Admissions Policy',
    featured: true
  },
  {
    id: 'ashesi-cs',
    universityId: 'ashesi-berekuso',
    universityName: 'Ashesi University',
    universityShortName: 'Ashesi',
    name: 'BSc Computer Science',
    degreeType: 'BSc',
    faculty: 'Department of Computer Science',
    durationYears: 4,
    description: 'An elite, project-driven computer science education combining liberal arts ethics, software design patterns, cloud computing, and human-computer interaction with high internship placement.',
    wassceCutoffAggregate: 'Holistic Review (Target Agg. 06 - 14)',
    coreRequirements: [
      'Credit passes (A1 - C6) in English Language',
      'Credit passes (A1 - C6) in Core Mathematics',
      'Credit passes in Integrated Science and Social Studies'
    ],
    electiveRequirements: [
      'Strong pass in Elective Mathematics is strictly required',
      'Two other electives from Science, General Arts, or Business'
    ],
    additionalCriteria: 'Holistic review: WASSCE grades, written essays, demonstrated leadership, extracurriculars, and admissions interview.',
    careerProspects: [
      'Software Engineer (FAANG / African Tech)',
      'Product Manager',
      'AI Research Fellow',
      'Tech Startup Founder'
    ],
    officialProgramUrl: 'https://www.ashesi.edu.gh/admissions/how-to-apply.html',
    verifiedSource: 'Ashesi University Admissions Office Requirements & Holistic Evaluation Policy',
    featured: true
  },
  {
    id: 'ug-admin',
    universityId: 'ug-legon',
    universityName: 'University of Ghana',
    universityShortName: 'UG Legon',
    name: 'BSc Administration (Accounting, Finance, Marketing, HR)',
    degreeType: 'BSc',
    faculty: 'University of Ghana Business School (UGBS)',
    durationYears: 4,
    description: 'Ghana’s premier business school programme offering specialized majors in Accounting, Banking & Finance, Marketing, Health Services Management, Public Administration, and Human Resources.',
    wassceCutoffAggregate: '09 - 11',
    coreRequirements: [
      'Credit passes (A1 - C6) in Core Mathematics',
      'Credit passes (A1 - C6) in English Language',
      'Credit passes (A1 - C6) in Integrated Science and Social Studies'
    ],
    electiveRequirements: [
      'For Business Applicants: Financial Accounting, Cost Accounting, Business Management, Economics',
      'For General Arts/Science: Elective Mathematics, Economics, Geography, or Elective Science subjects'
    ],
    additionalCriteria: 'Must have at least C6 in Core Mathematics and English. Strong mathematics or accounting grades preferred.',
    careerProspects: [
      'Chartered Accountant (ICAG/ACCA)',
      'Investment Banker',
      'Financial Analyst',
      'Brand & Marketing Manager',
      'Corporate Strategist'
    ],
    officialProgramUrl: 'https://admission.ug.edu.gh/undergraduate-programmes/bsc-administration',
    verifiedSource: 'UGBS Official Academic & Admissions Brochure',
    featured: false
  },
  {
    id: 'knust-pharmacy',
    universityId: 'knust-kumasi',
    universityName: 'Kwame Nkrumah University of Science and Technology',
    universityShortName: 'KNUST',
    name: 'Doctor of Pharmacy (PharmD)',
    degreeType: 'PharmD',
    faculty: 'Faculty of Pharmacy and Pharmaceutical Sciences',
    durationYears: 6,
    description: 'Comprehensive clinical and pharmaceutical doctorate training students in pharmacology, drug discovery, toxicology, clinical pharmacokinetics, and hospital pharmacy practice.',
    wassceCutoffAggregate: '08',
    coreRequirements: [
      'Credit passes (A1) in Core Mathematics and Integrated Science',
      'Credit passes (A1 - B2) in English Language'
    ],
    electiveRequirements: [
      'Chemistry (A1 - B2)',
      'Biology (A1 - B2)',
      'Physics or Elective Mathematics (A1 - B2)'
    ],
    additionalCriteria: 'Must come from Pure Science. Strict interview and competitive rank ordering.',
    careerProspects: [
      'Clinical Pharmacist',
      'Industrial Formulation Scientist',
      'Regulatory Affairs Specialist (FDA)',
      'Community Pharmacy Director'
    ],
    officialProgramUrl: 'https://admissions.knust.edu.gh/programmes/doctor-of-pharmacy',
    verifiedSource: 'KNUST Faculty of Pharmacy and Pharmaceutical Sciences Entry Regulations',
    featured: false
  },
  {
    id: 'ucc-med-lab',
    universityId: 'ucc-capecoast',
    universityName: 'University of Cape Coast',
    universityShortName: 'UCC',
    name: 'BSc Medical Laboratory Science',
    degreeType: 'BSc',
    faculty: 'College of Health and Allied Sciences / School of Allied Health Sciences',
    durationYears: 4,
    description: 'Prepares diagnostic scientists in clinical chemistry, medical microbiology, haematology, histopathology, immunology, and molecular diagnostics in hospital laboratories.',
    wassceCutoffAggregate: '12 - 14',
    coreRequirements: [
      'Credit passes (A1 - C6) in English Language, Core Mathematics, and Integrated Science'
    ],
    electiveRequirements: [
      'Biology',
      'Chemistry',
      'Physics or Elective Mathematics'
    ],
    additionalCriteria: 'Must hold accredited science electives. Mandatory professional internship year follows graduation.',
    careerProspects: [
      'Medical Laboratory Scientist',
      'Diagnostic Molecular Biologist',
      'Epidemiological Research Officer',
      'Pathology Laboratory Manager'
    ],
    officialProgramUrl: 'https://apply.ucc.edu.gh/programmes/medical-laboratory-technology',
    verifiedSource: 'UCC School of Allied Health Sciences Admissions Register',
    featured: false
  },
  {
    id: 'umat-mining',
    universityId: 'umat-tarkwa',
    universityName: 'University of Mines and Technology',
    universityShortName: 'UMaT',
    name: 'BSc Mining Engineering',
    degreeType: 'BEng',
    faculty: 'Faculty of Mineral Resources Technology',
    durationYears: 4,
    description: 'Flagship mining engineering program focused on open-pit and underground mine design, drilling and blasting, mineral extraction, rock mechanics, and mine health & environmental management.',
    wassceCutoffAggregate: '13 - 15',
    coreRequirements: [
      'Credit passes (A1 - C6) in English Language, Core Mathematics, and Integrated Science'
    ],
    electiveRequirements: [
      'Elective Mathematics (mandatory)',
      'Physics (mandatory)',
      'Chemistry or Technical Drawing or Applied Electricity'
    ],
    additionalCriteria: 'High demand in Ghana’s gold, bauxite, and lithium mining corporations. Industrial internship included.',
    careerProspects: [
      'Mining Engineer',
      'Mine Planning Specialist',
      'Drilling & Blasting Consultant',
      'Mine Safety Superintendent'
    ],
    officialProgramUrl: 'https://portal.umat.edu.gh/apply/programmes/bsc-mining-engineering',
    verifiedSource: 'UMaT Tarkwa Official Programme Prospectus & Cut-offs',
    featured: false
  },
  {
    id: 'acity-ai-robotics',
    universityId: 'academic-city-accra',
    universityName: 'Academic City University College',
    universityShortName: 'Academic City',
    name: 'BSc Artificial Intelligence & Robotics',
    degreeType: 'BSc',
    faculty: 'Faculty of Engineering & Information Technology',
    durationYears: 4,
    description: 'West Africa’s first specialized degree combining neural networks, computer vision, natural language processing, autonomous robotics, and microcontroller design in modern fabrication labs.',
    wassceCutoffAggregate: '14 - 18 (Holistic Interview)',
    coreRequirements: [
      'Credit passes (A1 - C6) in English Language and Core Mathematics',
      'Credit pass in Integrated Science'
    ],
    electiveRequirements: [
      'Elective Mathematics',
      'Physics',
      'Chemistry or Applied Electricity or Electronics'
    ],
    additionalCriteria: 'Interview and problem-solving assessment. Early scholarship available for high-achieving STEM applicants.',
    careerProspects: [
      'AI & Machine Learning Engineer',
      'Robotics Systems Developer',
      'Computer Vision Engineer',
      'Automation Specialist'
    ],
    officialProgramUrl: 'https://acity.edu.gh/programmes/bsc-artificial-intelligence',
    verifiedSource: 'Academic City Faculty of Information Technology Official Curriculum',
    featured: false
  },
  {
    id: 'uct-data-science',
    universityId: 'uct-capetown',
    universityName: 'University of Cape Town',
    universityShortName: 'UCT',
    name: 'BSc Computer Science and Data Science',
    degreeType: 'BSc',
    faculty: 'Faculty of Science / Department of Statistical Sciences & Computer Science',
    durationYears: 3,
    description: 'World-renowned South African programme covering statistical learning, mathematical modelling, big data systems, computational intelligence, and algorithmic game theory.',
    wassceCutoffAggregate: 'WASSCE Equivalent: Minimum 4 A1s including Elective Maths',
    coreRequirements: [
      'Core Mathematics (A1 equivalent)',
      'English Language (First language or B3+)'
    ],
    electiveRequirements: [
      'Elective / Pure Mathematics (A1 equivalent strictly required)',
      'Physical Sciences (Physics/Chemistry)'
    ],
    additionalCriteria: 'Requires South African Matriculation Exemption (USAF). International applicants benchmarked against UCT Faculty Points Score (FPS).',
    careerProspects: [
      'Data Scientist',
      'Quantitative Analyst',
      'Algorithm Developer',
      'Big Data Engineer'
    ],
    officialProgramUrl: 'https://applyonline.uct.ac.za/undergraduate-degrees/data-science',
    verifiedSource: 'University of Cape Town Science Faculty Handbook & International Admissions',
    featured: false
  }
];
