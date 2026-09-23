import { Scholarship } from '../types';

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'mastercard-scholars',
    title: 'Mastercard Foundation Scholars Program',
    provider: 'Mastercard Foundation (KNUST, Ashesi, UCT, Makerere)',
    countryRegion: 'Pan-Africa (Ghana, South Africa, Uganda, Kenya)',
    levelOfStudy: ['Undergraduate', 'Postgraduate'],
    coverageType: 'Fully Funded',
    fundingSummary: 'Full tuition, comprehensive accommodation, monthly living stipend, academic textbooks, brand new laptop, and return travel.',
    description: 'A transformative pan-African scholarship supporting academically talented young Africans whose socio-economic circumstances make it difficult to pursue higher education, equipping them for ethical leadership and continental transformation.',
    eligibilityCriteria: [
      'Citizen and resident of an African country',
      'Demonstrated high academic achievement in secondary school (e.g. WASSCE aggregate 06 - 15)',
      'Documented financial disadvantage or economic barrier',
      'Demonstrated commitment to give back to the African continent',
      'Admitted or applying to a partner institution (e.g. KNUST, Ashesi University, UCT, or Makerere)'
    ],
    deadline: '2026-11-30',
    deadlineStatus: 'Active',
    officialApplicationUrl: 'https://mastercardfdn.org/all/scholars/',
    verifiedSource: 'Mastercard Foundation Official Scholars Portal & KNUST MCF Secretariat',
    featured: true
  },
  {
    id: 'mtn-bright-scholarship',
    title: 'MTN Ghana Foundation Bright Scholarship',
    provider: 'MTN Ghana Foundation',
    countryRegion: 'Ghana',
    levelOfStudy: ['Undergraduate'],
    coverageType: 'Fully Funded',
    fundingSummary: 'Full tuition fees coverage, campus residential accommodation, semester book allowances, and an MTN smart laptop.',
    description: 'Supports brilliant but needy students enrolled in public tertiary institutions in Ghana, prioritizing STEM subjects, vocational & technical studies, and students with special disabilities.',
    eligibilityCriteria: [
      'Must be a Ghanaian citizen',
      'Enrolled or admitted into an accredited Ghanaian public tertiary institution (UG, KNUST, UCC, UDS, UMaT, etc.)',
      'High WASSCE aggregate scores (Aggregates 06 to 14)',
      'Verified need for financial support',
      'Proven track record of good character and community involvement'
    ],
    deadline: '2026-10-15',
    deadlineStatus: 'Active',
    officialApplicationUrl: 'https://scholarship.mtn.com.gh',
    verifiedSource: 'MTN Ghana Foundation CSR & Scholarship Portal',
    featured: true
  },
  {
    id: 'gnpc-foundation-scholarship',
    title: 'GNPC Foundation Tertiary Local Scholarship',
    provider: 'Ghana National Petroleum Corporation Foundation',
    countryRegion: 'Ghana',
    levelOfStudy: ['Undergraduate', 'Postgraduate'],
    coverageType: 'Tuition Coverage',
    fundingSummary: 'Covers full tuition and academic user facility fees directly to the accredited public tertiary institution.',
    description: 'The social investment arm of GNPC providing annual educational grants to students pursuing STEM, Petroleum/Mining Engineering, Environmental Science, Agricultural Tech, and Law in Ghanaian public universities.',
    eligibilityCriteria: [
      'Ghanaian citizen with proof of admission to a public tertiary institution',
      'Maintains minimum GPA of 3.0 / Second Class Upper for continuing students',
      'Undergraduate freshers must have strong WASSCE passes',
      'Priority given to STEM, Special Education, and applicants from oil-producing host communities'
    ],
    deadline: '2026-12-15',
    deadlineStatus: 'Upcoming',
    officialApplicationUrl: 'https://gnpcfoundation.org/apply/',
    verifiedSource: 'GNPC Foundation Official Application Portal',
    featured: true
  },
  {
    id: 'ghana-gov-scholarship-secretariat',
    title: 'Ghana Government District Level Scholarship',
    provider: 'Scholarship Secretariat of the Republic of Ghana',
    countryRegion: 'Ghana (All 261 Districts)',
    levelOfStudy: ['Undergraduate', 'Postgraduate'],
    coverageType: 'Tuition Coverage',
    fundingSummary: 'Full or partial payment of accredited academic fees and tuition through the decentralised district scholarship committees.',
    description: 'A nationwide decentralized scholarship initiative enabling Ghanaian students across all metropolitan, municipal, and district assemblies to access state-funded tertiary education scholarships.',
    eligibilityCriteria: [
      'Ghanaian citizen resident in the applying municipal/district district',
      'Admission letter from an accredited tertiary institution in Ghana',
      'Pass an in-person or virtual interview conducted by the District Scholarship Committee',
      'Valid Ghana Card'
    ],
    deadline: '2026-10-31',
    deadlineStatus: 'Active',
    officialApplicationUrl: 'https://www.scholarshipgh.com',
    verifiedSource: 'Scholarship Secretariat of Ghana Official Portal',
    featured: false
  },
  {
    id: 'tullow-stem-scholarship',
    title: 'Tullow Tertiary STEM Scholarship Scheme',
    provider: 'Tullow Ghana Limited',
    countryRegion: 'Ghana (Western & Central Regions Priority)',
    levelOfStudy: ['Undergraduate'],
    coverageType: 'Fully Funded',
    fundingSummary: 'Full tuition fees, campus accommodation, laptop, monthly meal stipend, and guaranteed industrial internship at Tullow facilities.',
    description: 'Designed to build domestic technical and engineering capacity in the petroleum, mining, and maritime sectors through competitive awards at UMaT, KNUST, and University of Ghana.',
    eligibilityCriteria: [
      'Enrolled in accredited Engineering, Geosciences, Computer Science, or Marine Engineering programmes',
      'WASSCE aggregate of 12 or better in science electives',
      'Priority for qualified candidates originating from coastal host districts in the Western Region'
    ],
    deadline: '2026-11-15',
    deadlineStatus: 'Upcoming',
    officialApplicationUrl: 'https://www.tullowoil.com/sustainability/shared-prosperity/education-and-skills/',
    verifiedSource: 'Tullow Oil CSR Educational Secretariat',
    featured: false
  },
  {
    id: 'daad-in-country-in-region',
    title: 'DAAD In-Country / In-Region Postgraduate Scholarships',
    provider: 'German Academic Exchange Service (DAAD)',
    countryRegion: 'Sub-Saharan Africa',
    levelOfStudy: ['Postgraduate', 'Doctoral'],
    coverageType: 'Fully Funded',
    fundingSummary: '100% University tuition, monthly living stipend (€400 - €700 depending on country), study/research allowance, travel subsidy, and health insurance.',
    description: 'Offers high-potential African graduates the opportunity to pursue research-focused Master’s or PhD degrees at selected top-tier African universities within their home country or neighbouring region.',
    eligibilityCriteria: [
      'National of a Sub-Saharan African country',
      'First degree (Bachelor’s) completed within the last 6 years with at least Second Class Upper division',
      'Applying for an officially DAAD-endorsed master’s or doctoral programme in Africa',
      'Clear research proposal aligned with sustainable development goals'
    ],
    deadline: '2026-12-05',
    deadlineStatus: 'Active',
    officialApplicationUrl: 'https://www.daad.de/en/information-services-for-higher-education-institutions/programmes-for-heis/in-country-in-region-scholarship-programmes/',
    verifiedSource: 'DAAD Regional Office for Africa Official Directory',
    featured: false
  },
  {
    id: 'au-nyerere-scholarship',
    title: 'Mwalimu Nyerere Pan-African Scholarship Scheme',
    provider: 'African Union Commission (AUC)',
    countryRegion: 'Pan-Africa (All 55 AU Member States)',
    levelOfStudy: ['Postgraduate', 'Doctoral'],
    coverageType: 'Fully Funded',
    fundingSummary: 'Tuition fees, monthly stipend of $500 - $750, annual book allowance of $500, and round-trip economy airfare.',
    description: 'Named in honour of Tanzania’s first president Mwalimu Julius Nyerere to encourage pan-African mobility and cultivate African researchers in STEM, Agriscience, and Renewable Energy across continental institutions.',
    eligibilityCriteria: [
      'Citizen of an African Union member state',
      'Under 35 years old for Master’s candidates; under 40 years old for PhD candidates',
      'Bachelor’s or Master’s degree with Distinction or First Class / Second Class Upper',
      'Commitment to work in Africa for at least three years upon graduation'
    ],
    deadline: '2027-02-28',
    deadlineStatus: 'Upcoming',
    officialApplicationUrl: 'https://au.int/en/scholarships',
    verifiedSource: 'African Union Commission Human Resources, Science and Technology Directorate',
    featured: false
  }
];
