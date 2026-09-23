import { University } from '../types';

export const UNIVERSITIES: University[] = [
  {
    id: 'ug-legon',
    name: 'University of Ghana',
    shortName: 'UG Legon',
    country: 'Ghana',
    city: 'Legon, Greater Accra',
    flag: '🇬🇭',
    // Authentic University of Ghana Balme Library and campus grounds
    campusImageUrl: '/images/campuses/ug_balme_library.jpg',
    fallbackCampusImageUrl: '/images/campuses/ug_great_hall.jpg',
    campusImageCaption: 'Balme Library and central colonial-revival quadrangles at Legon campus, Accra',
    type: 'Public',
    establishedYear: 1948,
    description: "Ghana's premier university and oldest higher-education institution, renowned for academic excellence in health sciences (Korle-Bu), basic and applied sciences, law, humanities, and business administration.",
    highlightBadges: ['Premier University in Ghana', 'College of Health Sciences', 'Legon Law School', 'UGBS Business School'],
    studentCountApprox: '38,000+',
    faculties: [
      'College of Basic and Applied Sciences',
      'College of Health Sciences (Korle Bu)',
      'College of Humanities',
      'College of Education',
      'University of Ghana Business School (UGBS)',
      'School of Law'
    ],
    officialWebsite: 'https://www.ug.edu.gh',
    officialAdmissionsUrl: 'https://admission.ug.edu.gh',
    contactEmail: 'pad@ug.edu.gh',
    contactPhone: '+233 302 500381',
    featured: true,
    campusTourHighlights: [
      'Iconic Balme Library central fountain & research cloisters',
      'Great Hall atop Legon Hill overlooking the Accra plains',
      'Historic Legon Bell Tower built to commemorate 1957 independence',
      'Legon Hall heritage quadrangles and scholarly closes'
    ],
    campusTourStops: [
      {
        id: 'ug-stop-1',
        name: 'The Balme Library & Central Quadrangle',
        category: 'Library',
        imageUrl: '/images/campuses/ug_balme_library.jpg',
        fallbackImageUrl: '/images/campuses/ug_great_hall.jpg',
        description: 'Named after the first Principal David Balme, this monumental library complex anchors the university’s academic core with over 500,000 volumes, Africana collections, digital archives, and tranquil colonnaded courtyards.',
        keyFeatures: [
          'Africana Rare Manuscript Reading Room',
          '24-Hour E-Resource Commons & High-Speed Optical Fiber',
          'Open-air study loggias with tropical bougainvillea garden views'
        ],
        historicalFact: 'Constructed in the late 1940s with classic Mediterranean-revival white stucco walls and red-tile roofing inspired by Roman academy layouts.'
      },
      {
        id: 'ug-stop-2',
        name: 'The Great Hall & Convocation Grounds',
        category: 'Landmark',
        imageUrl: '/images/campuses/ug_great_hall.jpg',
        fallbackImageUrl: '/images/campuses/ug_legon_tower.jpg',
        description: 'Positioned at the highest elevation of Legon Hill, the Great Hall hosts matriculations, honorary doctorates, national presidential debates, and annual graduations, commanding vistas of the capital city Accra.',
        keyFeatures: [
          'Acoustically tuned 1,500-seat ceremonial auditorium',
          'Carved mahogany Chancellor podium and historical insignia',
          'Summit panoramic terrace overlooking the Accra plains'
        ],
        historicalFact: 'Every Ghanaian head of state since independence has addressed convocations at this ceremonial summit atop Legon Hill.'
      },
      {
        id: 'ug-stop-3',
        name: 'Legon Tower & Independence Vista Grounds',
        category: 'Landmark',
        imageUrl: '/images/campuses/ug_legon_tower.jpg',
        fallbackImageUrl: '/images/campuses/ug_balme_library.jpg',
        description: 'A soaring architectural landmark rising over Legon Hill, donated by the Government of Ghana in 1957 to mark national independence and academic self-determination.',
        keyFeatures: [
          'Historic 1957 Independence Commemorative Campanile',
          '360-degree observation deck of Greater Accra',
          'Surrounding landscaped terraced gardens'
        ],
        historicalFact: 'The tower bells chime across campus to signal academic processions and national celebrations.'
      },
      {
        id: 'ug-stop-4',
        name: 'Legon Hall Quadrangle & Traditional Closes',
        category: 'Residential',
        imageUrl: '/images/campuses/ug_legon_hall.jpg',
        fallbackImageUrl: '/images/campuses/ug_great_hall.jpg',
        description: 'The premier hall of residence at the University of Ghana, known as the "Premier Hall". Its cloistered courtyards have housed generations of West African leaders, scientists, and writers.',
        keyFeatures: [
          'Traditional collegiate quadrangle design with shaded loggias',
          'Junior Common Room (JCR) and Senior Common Room (SCR)',
          'Rich inter-hall debate traditions and alumni networks'
        ],
        historicalFact: 'Founded in 1952, its motto "Cui Multum Datum" emphasizes leadership and civic responsibility.'
      }
    ]
  },
  {
    id: 'knust-kumasi',
    name: 'Kwame Nkrumah University of Science and Technology',
    shortName: 'KNUST',
    country: 'Ghana',
    city: 'Kumasi, Ashanti Region',
    flag: '🇬🇭',
    // Authentic KNUST Great Hall and campus grounds in Kumasi
    campusImageUrl: '/images/campuses/knust_great_hall.jpg',
    fallbackCampusImageUrl: '/images/campuses/knust_great_hall_ext.jpg',
    campusImageCaption: 'KNUST Great Hall and the Royal Parade Grounds in Kumasi, Ashanti Region',
    type: 'Public',
    establishedYear: 1951,
    description: "West Africa’s leading centre of excellence in engineering, robotics, pharmacy, architecture, and applied science, founded by Osagyefo Dr. Kwame Nkrumah to power Africa’s industrial transformation.",
    highlightBadges: ['Top Engineering Hub in West Africa', 'College of Engineering', 'Pharmacy & Health Sciences', 'Architecture & Planning'],
    studentCountApprox: '85,000+',
    faculties: [
      'College of Engineering',
      'College of Science',
      'College of Health Sciences',
      'College of Art and Built Environment',
      'College of Agriculture and Natural Resources',
      'College of Humanities and Social Sciences'
    ],
    officialWebsite: 'https://www.knust.edu.gh',
    officialAdmissionsUrl: 'https://admissions.knust.edu.gh',
    contactEmail: 'admissions@knust.edu.gh',
    contactPhone: '+233 322 060013',
    featured: true,
    campusTourHighlights: [
      'Iconic KNUST Great Hall with Ashanti bronze architectural crests',
      'Prempeh II Main Library & Information Commons',
      'College of Architecture, Planning and Engineering complexes',
      'KNUST Main Entrance & Kwame Nkrumah Memorial Park'
    ],
    campusTourStops: [
      {
        id: 'knust-stop-1',
        name: 'The Great Hall & Royal Parade Grounds',
        category: 'Landmark',
        imageUrl: '/images/campuses/knust_great_hall.jpg',
        fallbackImageUrl: '/images/campuses/knust_great_hall_ext.jpg',
        description: 'The monumental heart of KNUST where Chancellor Asantehene Otumfuo Osei Tutu II presides over congregations. Surrounding gardens feature tropical palms, reflecting pools, and ceremonial boulevards.',
        keyFeatures: [
          '3,500-seat amphitheatre with acoustic ceiling baffles',
          'Otumfuo Osei Tutu II ceremonial terrace',
          'Extensive parade grounds for academic processions'
        ],
        historicalFact: 'Commissioned under Kwame Nkrumah in 1951 as the premier technological institute for newly decolonized Africa.'
      },
      {
        id: 'knust-stop-2',
        name: 'Prempeh II Main Library & Knowledge Hub',
        category: 'Library',
        imageUrl: '/images/campuses/knust_library.jpg',
        fallbackImageUrl: '/images/campuses/knust_great_hall.jpg',
        description: 'Named in honor of Otumfuo Sir Osei Agyeman Prempeh II, the central research library anchors KNUST with vast engineering collections, STEM journals, and collaborative study lounges.',
        keyFeatures: [
          'Digital Scientific Journals & Research Archives',
          'High-speed Wi-Fi collaborative study bays',
          'Quiet research cloisters and patent reference library'
        ],
        historicalFact: 'Houses the comprehensive scientific and engineering intellectual repository for Ghanaian innovations.'
      },
      {
        id: 'knust-stop-3',
        name: 'College of Architecture & Built Environment',
        category: 'Academic',
        imageUrl: '/images/campuses/knust_architecture.jpg',
        fallbackImageUrl: '/images/campuses/knust_entrance.jpg',
        description: 'Renowned across Africa for modern tropical architecture, urban design, structural engineering, and sustainable materials testing.',
        keyFeatures: [
          'Architectural Drafting & 3D Modeling Studios',
          'Building Technology & Concrete Stress Testing Labs',
          'Urban Planning GIS & Environmental Simulation Suites'
        ],
        historicalFact: 'Alumni have designed landmark governmental complexes, bridges, and infrastructure across Africa.'
      },
      {
        id: 'knust-stop-4',
        name: 'KNUST Main Entrance & Kwame Nkrumah Memorial Park',
        category: 'Landmark',
        imageUrl: '/images/campuses/knust_entrance.jpg',
        fallbackImageUrl: '/images/campuses/knust_great_hall.jpg',
        description: 'The grand dual-carriageway gateway to the Kumasi campus, lined with ceremonial royal palms, welcoming students and international dignitaries.',
        keyFeatures: [
          'Statue of founder Osagyefo Dr. Kwame Nkrumah',
          'Landscaped memorial floral park and roundabouts',
          'Direct transit connection to Kumasi Metropolis'
        ],
        historicalFact: 'Unveiled as a symbol of scientific and technological liberation for the African continent.'
      }
    ]
  },
  {
    id: 'ucc-capecoast',
    name: 'University of Cape Coast',
    shortName: 'UCC',
    country: 'Ghana',
    city: 'Cape Coast, Central Region',
    flag: '🇬🇭',
    // Authentic UCC campus grounds near the Cape Coast shoreline
    campusImageUrl: '/images/campuses/ucc_library.jpg',
    fallbackCampusImageUrl: '/images/campuses/ucc_library_2.jpg',
    campusImageCaption: 'University of Cape Coast Sam Jonah Library complex overlooking the Atlantic shoreline',
    type: 'Public',
    establishedYear: 1962,
    description: 'Ranked among the top research universities in West Africa and recognized globally for educational leadership, clinical medicine, marine ecology, and rigorous business and accounting programs.',
    highlightBadges: ['Top Ranked in Research Impact', 'Premier Teacher Education', 'School of Medical Sciences', 'School of Business'],
    studentCountApprox: '70,000+',
    faculties: [
      'College of Education Studies',
      'College of Health and Allied Sciences',
      'College of Agriculture and Natural Sciences',
      'College of Humanities and Legal Studies',
      'School of Medical Sciences'
    ],
    officialWebsite: 'https://ucc.edu.gh',
    officialAdmissionsUrl: 'https://apply.ucc.edu.gh',
    contactEmail: 'registrar@ucc.edu.gh',
    contactPhone: '+233 332 132440',
    featured: true,
    campusTourHighlights: [
      'Sam Jonah Central Library complex with ocean vistas',
      'Oceanfront academic hills with refreshing Atlantic sea breezes',
      'New Examination & Science Quadrangle Complex',
      'Department of Fisheries & Marine Sciences Coastal Research Station'
    ],
    campusTourStops: [
      {
        id: 'ucc-stop-1',
        name: 'Sam Jonah Central Library Complex',
        category: 'Library',
        imageUrl: '/images/campuses/ucc_library.jpg',
        fallbackImageUrl: '/images/campuses/ucc_library_2.jpg',
        description: 'The monumental library complex at UCC, named in honour of Chancellor Sir Sam Jonah, housing millions of research volumes, e-learning suites, and expansive study halls.',
        keyFeatures: [
          'Ultra-capacity multi-storey research galleries',
          'Africana and Educational Archives section',
          '24/7 Digital research commons'
        ],
        historicalFact: 'One of the largest university library complexes in West Africa, catering to thousands of residential and distance students.'
      },
      {
        id: 'ucc-stop-2',
        name: 'UCC Coastal Quadrangle & Science Terraces',
        category: 'Academic',
        imageUrl: '/images/campuses/ucc_library_2.jpg',
        fallbackImageUrl: '/images/campuses/ucc_library.jpg',
        description: 'Perched along the Atlantic coastline, this campus provides open academic terraces where sea breezes cool lecture halls and laboratories.',
        keyFeatures: [
          'Oceanfront science laboratories and lecture halls',
          'Marine ecology & fisheries observational stations',
          'Panoramic views of the Gulf of Guinea'
        ],
        historicalFact: 'Established in 1962 primarily to train graduate teachers for independent Ghana’s booming secondary schools.'
      }
    ]
  },
  {
    id: 'ashesi-berekuso',
    name: 'Ashesi University',
    shortName: 'Ashesi',
    country: 'Ghana',
    city: 'Berekuso, Eastern Region',
    flag: '🇬🇭',
    // Authentic Ashesi University modern eco-campus in Berekuso
    campusImageUrl: '/images/campuses/ashesi_courtyard.jpg',
    fallbackCampusImageUrl: '/images/campuses/ashesi_students.jpg',
    campusImageCaption: 'Ashesi University traditional courtyard and eco-friendly hilltop campus at Berekuso',
    type: 'Private',
    establishedYear: 2002,
    description: 'A pioneering liberal arts, engineering, and computer science university founded by Patrick Awuah, globally celebrated for ethical leadership, critical thinking, entrepreneurship, and its student-run Honor Code.',
    highlightBadges: ['100% Ethical Honor Code', 'Computer Science & Engineering', 'Mastercard Foundation Partner', 'High Career Placement'],
    studentCountApprox: '1,400+',
    faculties: [
      'Department of Computer Science',
      'Department of Engineering (Mechatronic, Electrical, Mechanical)',
      'Business Administration Department',
      'Humanities and Social Sciences'
    ],
    officialWebsite: 'https://www.ashesi.edu.gh',
    officialAdmissionsUrl: 'https://www.ashesi.edu.gh/admissions',
    contactEmail: 'admissions@ashesi.edu.gh',
    contactPhone: '+233 302 610330',
    featured: true,
    campusTourHighlights: [
      'Hillside eco-campus with 100% solar arrays and waste-water recycling',
      'Archer Cornfield Courtyard designed with traditional Ghanaian earthen architecture',
      'Radicle Robotics & Computer Vision Fabrication Lab',
      'Student Hive collaborative study lounges with 360 valley panoramas'
    ],
    campusTourStops: [
      {
        id: 'ashesi-stop-1',
        name: 'The Archer Cornfield Courtyard & Norton-Motulsky Cloisters',
        category: 'Landmark',
        imageUrl: '/images/campuses/ashesi_courtyard.jpg',
        fallbackImageUrl: '/images/campuses/ashesi_students.jpg',
        description: 'The architectural signature of Ashesi, constructed using locally sourced laterite stones, shaded verandas, and high vaulted timber roofs that reduce heat naturally without artificial air conditioning.',
        keyFeatures: [
          'Eco-friendly passive cooling architectural design',
          'Open courtyard hosting university town halls and guest lectures',
          'Solar canopies powering over 40% of daytime campus load'
        ],
        historicalFact: 'Founded with a personal vision by former Microsoft program manager Patrick Awuah, who received a MacArthur Fellowship for transforming African education.'
      },
      {
        id: 'ashesi-stop-2',
        name: 'Collaborative Learning Labs & Student Commons',
        category: 'Innovation Hub',
        imageUrl: '/images/campuses/ashesi_students.jpg',
        fallbackImageUrl: '/images/campuses/ashesi_courtyard.jpg',
        description: 'Vibrant student learning spaces fostering collaborative peer-to-peer programming, entrepreneurship pitches, and team problem-solving under the student Honor Code.',
        keyFeatures: [
          'Open collaborative software team pods',
          'Student enterprise and venture incubators',
          'High-speed fiber connectivity with international university links'
        ],
        historicalFact: 'Over 90% of Ashesi graduates receive competitive employment or launch startups within 6 months of graduation.'
      }
    ]
  },
  {
    id: 'uds-tamale',
    name: 'University for Development Studies',
    shortName: 'UDS',
    country: 'Ghana',
    city: 'Tamale, Northern Region',
    flag: '🇬🇭',
    campusImageUrl: '/images/campuses/uds_admin.jpg',
    fallbackCampusImageUrl: '/images/campuses/uds_medical.jpg',
    campusImageCaption: 'Authentic UDS Tamale central administration complex',
    type: 'Public',
    establishedYear: 1992,
    description: 'Pioneered the third-trimester field practical training program (TTFPP), immersing students into rural communities to build impactful agricultural, public health, and economic development interventions.',
    highlightBadges: ['Rural Community Immersion (TTFPP)', 'Agricultural Technology Leader', 'School of Medicine & Health Sciences', 'Renewable Resources'],
    studentCountApprox: '32,000+',
    faculties: [
      'School of Medicine and Health Sciences',
      'Faculty of Agriculture, Food and Consumer Sciences',
      'Faculty of Natural Resources and Environment',
      'School of Allied Health Sciences',
      'School of Engineering'
    ],
    officialWebsite: 'https://www.uds.edu.gh',
    officialAdmissionsUrl: 'https://admissions.uds.edu.gh',
    contactEmail: 'info@uds.edu.gh',
    contactPhone: '+233 372 093382',
    featured: false,
    campusTourHighlights: [
      'Central Administration Block & Dungu Campus Grounds',
      'Tamale Teaching Hospital Clinical Training Wing',
      'Savanna Agro-ecological Innovation Center'
    ],
    campusTourStops: [
      {
        id: 'uds-stop-1',
        name: 'UDS Central Administration Block & Quadrangle',
        category: 'Landmark',
        imageUrl: '/images/campuses/uds_admin.jpg',
        fallbackImageUrl: '/images/campuses/uds_medical.jpg',
        description: 'The iconic central administrative headquarters at the Dungu campus in Tamale, orchestrating developmental research across Northern Ghana.',
        keyFeatures: [
          'Dungu campus central ceremonial plaza',
          'Directorate of Academic Planning & Research',
          'Savanna solar array power installation'
        ],
        historicalFact: 'UDS was created to bring high-level practical university training to the northern savannah ecological zone of Ghana.'
      },
      {
        id: 'uds-stop-2',
        name: 'School of Medicine & Health Sciences',
        category: 'Academic',
        imageUrl: '/images/campuses/uds_medical.jpg',
        fallbackImageUrl: '/images/campuses/uds_admin.jpg',
        description: 'Leading provider of medical doctors and clinical specialists serving Northern Ghana and the Sahel region, closely partnered with Tamale Teaching Hospital.',
        keyFeatures: [
          'Problem-based clinical medicine learning studios',
          'Tropical Disease & Malaria Vector Research Wing',
          'Community epidemiology field research base'
        ],
        historicalFact: 'Graduates commit to serving underserved communities in northern and rural Ghana.'
      }
    ]
  },
  {
    id: 'umat-tarkwa',
    name: 'University of Mines and Technology',
    shortName: 'UMaT',
    country: 'Ghana',
    city: 'Tarkwa, Western Region',
    flag: '🇬🇭',
    campusImageUrl: '/images/campuses/umat_campus.jpg',
    fallbackCampusImageUrl: '/images/campuses/umat_campus.jpg',
    campusImageCaption: 'Authentic George Grant UMaT administrative entrance and campus in Tarkwa',
    type: 'Public',
    establishedYear: 2001,
    description: 'Africa’s premier specialized institution for mining, geomatic engineering, petroleum extraction, minerals processing, and environmental safety.',
    highlightBadges: ['Premier Mining Engineering Hub', 'Petroleum & Natural Gas', 'Geomatic & GIS Technology', 'Green Minerals Processing'],
    studentCountApprox: '8,500+',
    faculties: [
      'Faculty of Mining and Minerals Technology',
      'Faculty of Geomatic and Environmental Engineering',
      'Faculty of Engineering (Mechanical & Electrical)',
      'School of Petroleum Studies'
    ],
    officialWebsite: 'https://www.umat.edu.gh',
    officialAdmissionsUrl: 'https://portal.umat.edu.gh/admissions',
    contactEmail: 'registrar@umat.edu.gh',
    contactPhone: '+233 312 320324',
    featured: false,
    campusTourHighlights: [
      'George Grant Main Administration Quadrangle',
      'Surface and Underground Mine Training Simulators',
      'Geochemical Assay & Mineral Flotation Laboratories'
    ],
    campusTourStops: [
      {
        id: 'umat-stop-1',
        name: 'George Grant UMaT Administration & Faculty Quad',
        category: 'Academic',
        imageUrl: '/images/campuses/umat_campus.jpg',
        fallbackImageUrl: '/images/campuses/umat_campus.jpg',
        description: 'World-class training ground for mineral geologists, rock mechanics engineers, and extractive metallurgists powering gold, lithium, and bauxite industries across Africa.',
        keyFeatures: [
          'Mineral Beneficiation & Pyrometallurgy furnaces',
          '3D Geostatistical Deposit Modeling software cluster',
          'Mine Safety & Ventilation Training Field'
        ],
        historicalFact: 'Named in honour of Paa Grant, pioneering nationalist and gold coast merchant.'
      }
    ]
  },
  {
    id: 'uct-capetown',
    name: 'University of Cape Town',
    shortName: 'UCT',
    country: 'South Africa',
    city: 'Cape Town, Western Cape',
    flag: '🇿🇦',
    campusImageUrl: '/images/campuses/uct_upper_campus.jpg',
    fallbackCampusImageUrl: '/images/campuses/uct_jameson_hall.jpg',
    campusImageCaption: 'UCT Upper Campus framed by Devil’s Peak and the Memorial Hall in Cape Town',
    type: 'Public',
    establishedYear: 1829,
    description: "Africa's highest-ranked research university according to global league tables, celebrated for world-class scholarship in medicine, artificial intelligence, oceanography, economics, and constitutional law.",
    highlightBadges: ['#1 Ranked University in Africa', 'Groote Schuur Hospital (First Heart Transplant)', 'Nelson Mandela School of Governance'],
    studentCountApprox: '29,000+',
    faculties: [
      'Faculty of Health Sciences',
      'Faculty of Science',
      'Faculty of Commerce',
      'Faculty of Engineering & the Built Environment',
      'Faculty of Law',
      'Faculty of Humanities'
    ],
    officialWebsite: 'https://www.uct.ac.za',
    officialAdmissionsUrl: 'https://applyonline.uct.ac.za',
    contactEmail: 'admissions@uct.ac.za',
    contactPhone: '+27 21 650 2128',
    featured: true,
    campusTourHighlights: [
      'Sarah Baartman Hall atop the grand Upper Campus terraces',
      'Upper and Middle Campus amphitheatre overlooking Devil’s Peak',
      'Groote Schuur Hospital Heart of Cape Town Museum'
    ],
    campusTourStops: [
      {
        id: 'uct-stop-1',
        name: 'Sarah Baartman Hall (Jameson Hall) & Upper Terraces',
        category: 'Landmark',
        imageUrl: '/images/campuses/uct_jameson_hall.jpg',
        fallbackImageUrl: '/images/campuses/uct_upper_campus.jpg',
        description: 'Perched on the eastern slopes of Table Mountain’s Devil’s Peak, this neoclassical assembly hall serves as the iconic focal point of Upper Campus academic life.',
        keyFeatures: [
          'Spectacular mountain vistas across the Cape Flats',
          'Grand ceremonial hall for convocations and international summits',
          'Monumental stone staircases connecting University Avenue'
        ],
        historicalFact: 'Renamed Sarah Baartman Hall in 2018 in honor of the Khoi woman and African dignity.'
      }
    ]
  },
  {
    id: 'mak-kampala',
    name: 'Makerere University',
    shortName: 'Makerere',
    country: 'Uganda',
    city: 'Kampala',
    flag: '🇺🇬',
    campusImageUrl: '/images/campuses/mak_ivory_tower.jpg',
    fallbackCampusImageUrl: '/images/campuses/mak_main_building.jpg',
    campusImageCaption: 'Makerere University historic Main Administration Building on Makerere Hill, Kampala',
    type: 'Public',
    establishedYear: 1922,
    description: 'One of Africa’s oldest and most prestigious universities, widely known as the intellectual cradle of East African literature, public health, and Pan-African political philosophy.',
    highlightBadges: ['Intellectual Hub of East Africa', 'Infectious Disease Institute', 'College of Computing & IS'],
    studentCountApprox: '36,000+',
    faculties: [
      'College of Health Sciences',
      'College of Computing and Information Sciences',
      'College of Agricultural and Environmental Sciences',
      'College of Engineering, Design, Art and Technology',
      'School of Law'
    ],
    officialWebsite: 'https://www.mak.ac.ug',
    officialAdmissionsUrl: 'https://admissions.mak.ac.ug',
    contactEmail: 'pro@mak.ac.ug',
    contactPhone: '+256 414 532634',
    featured: true,
    campusTourHighlights: [
      'Restored Main Administration Building with heritage British clock tower',
      'Infectious Diseases Institute Clinical Research Complex',
      'Makerere College of Computing AI & Robotics Lab'
    ],
    campusTourStops: [
      {
        id: 'mak-stop-1',
        name: 'The Main Administration Building & Historic Ivory Tower',
        category: 'Landmark',
        imageUrl: '/images/campuses/mak_ivory_tower.jpg',
        fallbackImageUrl: '/images/campuses/mak_main_building.jpg',
        description: 'Rising gracefully over Makerere Hill, the majestic Ivory Tower has stood as a beacon of African scholarship and liberation thought since 1941.',
        keyFeatures: [
          'Historic 1940s Bell Clock Tower fully restored',
          'Senate meeting chambers and African historical archives',
          'Surrounding botanical lawns and ceremonial arches'
        ],
        historicalFact: 'Educated literary giants such as Ngũgĩ wa Thiong’o and African heads of state including Julius Nyerere and Milton Obote.'
      }
    ]
  }
];

