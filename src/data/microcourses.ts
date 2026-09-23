import { Microcourse } from '../types';

export const MICROCOURSES: Microcourse[] = [
  {
    id: 'python-african-data',
    title: 'Python for African Data & AI Development',
    slug: 'python-african-data',
    category: 'Tech & Programming',
    level: 'Beginner',
    durationHours: '4.5 hrs',
    lessonsCount: 6,
    badgeTitle: 'Certified African Python Practitioner',
    instructor: {
      name: 'Dr. Kwame Boateng',
      role: 'Head of Machine Learning Lab',
      institution: 'KNUST College of Engineering',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Master modern Python syntax, data structures, and practical data analysis on African mobile money datasets and agricultural weather patterns.',
    overview: 'This microcourse provides an intensive, hands-on path into computer programming and data science tailored to real African contexts. You will learn Python fundamentals, write algorithmic functions, clean datasets from telecommunication networks and meteorological stations, and build your first automated analytics script.',
    learningOutcomes: [
      'Write clean Python syntax, control flows, and reusable functions',
      'Parse and transform real tabular CSV datasets using lists, dictionaries, and list comprehensions',
      'Compute statistical metrics on African mobile money transaction volumes',
      'Earn a verifiable AfriVersity Certificate of Completion to boost university admissions'
    ],
    prerequisites: ['Basic computer literacy', 'Curiosity for problem solving'],
    modules: [
      {
        id: 'mod-py-1',
        title: 'Module 1: Python Fundamentals & Data Types',
        description: 'Understand core syntax, variables, arithmetic operations, and string formatting in Python 3.',
        lessons: [
          {
            id: 'py-lesson-1',
            title: '1.1 Variables, Numbers & African Currency Conversions',
            durationMinutes: 20,
            summary: 'Learn how to declare variables, perform arithmetic, and calculate currency exchange rates between GHS, NGN, KES, and USD.',
            keyTakeaways: [
              'Variables in Python are dynamically typed.',
              'Use descriptive snake_case names for clarity.',
              'Standard operators: +, -, *, /, // (floor division), % (modulus).'
            ],
            content: `
### Welcome to Python for African Tech!

Python is the world's most popular language for Data Science, Artificial Intelligence, and Backend Engineering. Across tech hubs from Accra to Nairobi and Cape Town, Python powers fintech APIs, agricultural drone telemetry, and predictive health models.

#### Declaring Variables and Numbers
In Python, variables store data values without requiring explicit type declarations:

\`\`\`python
# Student tuition and stipend calculation
student_name = "Ama Serwaa"
tuition_ghs = 6500.0
stipend_monthly = 800.0
months = 9

total_academic_cost = tuition_ghs + (stipend_monthly * months)
print(f"Total budget for {student_name}: GHS {total_academic_cost:,.2f}")
\`\`\`

#### Key Rules:
1. Variable names must begin with a letter or underscore.
2. Case-sensitive (\`student\` is different from \`Student\`).
3. Use formatted f-strings (\`f"Hello {name}"\`) for clean text output.
            `,
            codeExercise: {
              title: 'Try It Yourself: Compute Mobile Money Fees',
              instruction: 'Calculate the 1.0% e-levy fee and 0.75% network fee on a transfer of GHS 500. Then print the total deduction.',
              starterCode: `# Write your Python solution below:
amount = 500.0
network_rate = 0.0075
elevy_rate = 0.01

# Calculate network_fee and elevy_fee:
network_fee = amount * network_rate
elevy_fee = amount * elevy_rate
total_deduction = amount + network_fee + elevy_fee

print(f"Transfer: GHS {amount:.2f}")
print(f"Network Fee: GHS {network_fee:.2f}")
print(f"E-Levy: GHS {elevy_fee:.2f}")
print(f"Total Debited: GHS {total_deduction:.2f}")`,
              solution: `amount = 500.0
network_rate = 0.0075
elevy_rate = 0.01
network_fee = amount * network_rate
elevy_fee = amount * elevy_rate
total_deduction = amount + network_fee + elevy_fee
print(f"Total Debited: GHS {total_deduction:.2f}")`,
              language: 'python',
              expectedOutput: 'Total Debited: GHS 508.75',
              explanation: 'Multiplying 500 by 0.0075 yields 3.75; multiplying 500 by 0.01 yields 5.00. The sum of 500 + 3.75 + 5.00 equals 508.75.'
            },
            quiz: [
              {
                id: 'q-py-1',
                question: 'Which of the following is a valid Python f-string syntax?',
                options: [
                  'print("Welcome %s" % name)',
                  'print(f"Welcome {name}")',
                  'print("Welcome {name}".f())',
                  'echo f"Welcome $name"'
                ],
                correctIndex: 1,
                explanation: 'In modern Python 3.6+, prefixing the string with "f" and enclosing variable expressions inside curly brackets "{name}" is the standard f-string syntax.'
              },
              {
                id: 'q-py-2',
                question: 'What is the output of 17 // 3 in Python?',
                options: ['5.66', '5', '2', 'Error'],
                correctIndex: 1,
                explanation: 'The // operator performs integer floor division, discarding the decimal fraction. 17 // 3 evaluates to 5.'
              }
            ]
          },
          {
            id: 'py-lesson-2',
            title: '1.2 Lists, Dictionaries & African Regional Datasets',
            durationMinutes: 25,
            summary: 'Learn how to organize university admission data using lists and dictionaries, iterate over collections, and filter records.',
            keyTakeaways: [
              'Lists are ordered, mutable sequences indicated by [].',
              'Dictionaries store key-value mappings indicated by {}.',
              'List comprehensions offer concise data filtering.'
            ],
            content: `
### Working with Collections in Python

Real-world applications rarely deal with single numbers. You will handle lists of exam candidates, transaction ledgers, or sensor feeds from cocoa farms.

#### Lists and Dictionaries
\`\`\`python
# List of universities in Ghana
universities = ["UG Legon", "KNUST", "UCC", "Ashesi", "UMaT"]
print("Total institutions:", len(universities))

# Dictionary representing an applicant
applicant = {
    "name": "Kofi Mensah",
    "wassce_aggregate": 8,
    "first_choice": "BSc Computer Engineering",
    "scholarship_eligible": True
}

# Accessing dictionary fields
if applicant["wassce_aggregate"] <= 9:
    print(f"{applicant['name']} qualifies for Honors Engineering admissions!")
\`\`\`

#### Filtering with List Comprehensions:
\`\`\`python
aggregates = [7, 12, 8, 15, 6, 9, 14, 10]
competitive_aggregates = [agg for agg in aggregates if agg <= 10]
print("Competitive scores:", competitive_aggregates)
# Output: [7, 8, 6, 9, 10]
\`\`\`
            `,
            codeExercise: {
              title: 'Try It Yourself: Filter Qualified Applicants',
              instruction: 'Given a dictionary of university applicants and their WASSCE aggregates, extract and print all students with an aggregate of 10 or better (lower is better in WASSCE).',
              starterCode: `applicants = {
    "Kwesi": 7,
    "Abena": 14,
    "Fatima": 8,
    "Chinedu": 18,
    "Nafisa": 9
}

# Find all applicants with score <= 10:
qualified = [name for name, score in applicants.items() if score <= 10]
print("Admitted Scholars:", qualified)`,
              solution: `applicants = {"Kwesi": 7, "Abena": 14, "Fatima": 8, "Chinedu": 18, "Nafisa": 9}
qualified = [name for name, score in applicants.items() if score <= 10]
print("Admitted Scholars:", qualified)`,
              language: 'python',
              expectedOutput: "Admitted Scholars: ['Kwesi', 'Fatima', 'Nafisa']",
              explanation: 'Scores 7, 8, and 9 are less than or equal to 10. Kwesi, Fatima, and Nafisa meet the benchmark.'
            }
          }
        ]
      },
      {
        id: 'mod-py-2',
        title: 'Module 2: Real-World Data Analysis on African Agritech',
        description: 'Analyze real rainfall data from the Ashanti and Greater Accra regions to forecast crop yields.',
        lessons: [
          {
            id: 'py-lesson-3',
            title: '2.1 Processing Tabular Datasets & Aggregations',
            durationMinutes: 30,
            summary: 'Calculate rolling averages, locate rainfall anomalies, and format statistical reports.',
            keyTakeaways: [
              'Use functions to encapsulate repetitive calculations.',
              'Calculate mean, min, max, and percentage anomalies with precision.'
            ],
            content: `
### Analyzing Weather Patterns for African Smallholders

Agriculture accounts for over 20% of GDP in Sub-Saharan Africa. By writing clean Python algorithms, you can predict harvest windows and drought risks.

\`\`\`python
# Monthly rainfall in Kumasi (mm)
rainfall_data = {
    "Jan": 25, "Feb": 45, "Mar": 110, "Apr": 145, 
    "May": 180, "Jun": 210, "Jul": 120, "Aug": 85, 
    "Sep": 160, "Oct": 150, "Nov": 70, "Dec": 30
}

total_rainfall = sum(rainfall_data.values())
average_monthly = total_rainfall / len(rainfall_data)
peak_month = max(rainfall_data, key=rainfall_data.get)

print(f"Annual Rainfall: {total_rainfall} mm")
print(f"Monthly Average: {average_monthly:.1f} mm")
print(f"Peak Monsoon Month: {peak_month} ({rainfall_data[peak_month]} mm)")
\`\`\`
            `,
            quiz: [
              {
                id: 'q-py-3',
                question: 'Which built-in function returns the total number of items in a list or dictionary?',
                options: ['count()', 'size()', 'len()', 'items()'],
                correctIndex: 2,
                explanation: 'len() is the standard Python function used to determine sequence and collection lengths.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'wassce-math-mastery',
    title: 'WASSCE Elective Mathematics & Calculus Mastery',
    slug: 'wassce-math-mastery',
    category: 'WASSCE & STEM Prep',
    level: 'Intermediate',
    durationHours: '5.0 hrs',
    lessonsCount: 5,
    badgeTitle: 'WASSCE Mathematics Scholar',
    instructor: {
      name: 'Prof. Emmanuel Addo',
      role: 'Former WAEC Senior Chief Examiner',
      institution: 'University of Cape Coast Department of Mathematics',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Master the high-scoring WASSCE Elective Maths topics: Differentiation, Integration, Vectors, and Trigonometry with step-by-step WAEC marking scheme breakdowns.',
    overview: 'Achieving an A1 or B2 in Elective Mathematics is the gateway to high-demand competitive university programmes like Computer Science, Mechanical Engineering, Medicine, and Pharmacy at KNUST and UG Legon. This course breaks down the most heavily weighted examination questions with rigorous methods and exam-room shortcuts.',
    learningOutcomes: [
      'Solve first and second order derivatives with product and quotient rules',
      'Calculate definite and indefinite integrals for kinematic motion and area under curves',
      'Resolve 2D and 3D vectors into component directions and compute dot products',
      'Avoid common marking pitfalls that cost candidates vital marks in Paper 2'
    ],
    prerequisites: ['Core Mathematics fundamentals', 'Basic algebra and quadratic equations'],
    modules: [
      {
        id: 'mod-math-1',
        title: 'Module 1: Differential Calculus & Rates of Change',
        description: 'First principles, power rule, chain rule, product rule, and quotient rule applied to physics and engineering problems.',
        lessons: [
          {
            id: 'math-lesson-1',
            title: '1.1 The Power Rule & Differentiation from First Principles',
            durationMinutes: 25,
            summary: 'Derive derivatives algebraically using limits and master the rapid power rule d/dx(x^n) = n*x^(n-1).',
            keyTakeaways: [
              'Derivative f\'(x) represents the instantaneous rate of change and the gradient of the tangent line.',
              'First principles formula: f\'(x) = lim(h -> 0) [f(x + h) - f(x)] / h.',
              'Constant terms differentiate to 0.'
            ],
            content: `
### Understanding the Derivative in WASSCE

In WAEC Paper 2 Section B, differentiation questions consistently account for 12 to 15 marks. 

#### The Power Rule
If $f(x) = a x^n$, then:
$$\\frac{df}{dx} = a \\cdot n \\cdot x^{n - 1}$$

#### Example 1:
Differentiate $y = 4x^3 - 5x^2 + 7x - 9$ with respect to $x$:
- Term 1: $\\frac{d}{dx}(4x^3) = 4 \\times 3x^2 = 12x^2$
- Term 2: $\\frac{d}{dx}(-5x^2) = -5 \\times 2x = -10x$
- Term 3: $\\frac{d}{dx}(7x) = 7$
- Term 4: $\\frac{d}{dx}(-9) = 0$

**Result:** $\\frac{dy}{dx} = 12x^2 - 10x + 7$

#### Practical Engineering Application:
If the displacement $s(t)$ of a vehicle on the Accra-Kumasi highway is given by:
$$s(t) = 3t^2 + 8t + 2$$
The velocity is the derivative $v(t) = \\frac{ds}{dt} = 6t + 8$ m/s.
            `,
            quiz: [
              {
                id: 'q-math-1',
                question: 'What is the derivative of y = 5x^4 - 3x + 12?',
                options: [
                  '20x^3 - 3',
                  '20x^4 - 3x',
                  '5x^3 - 3',
                  '20x^3'
                ],
                correctIndex: 0,
                explanation: 'Using the power rule: d/dx(5x^4) = 20x^3, d/dx(-3x) = -3, and d/dx(12) = 0. Therefore, dy/dx = 20x^3 - 3.'
              },
              {
                id: 'q-math-2',
                question: 'At which x-coordinate does the curve y = x^2 - 6x + 5 have a horizontal tangent (stationary point)?',
                options: ['x = 1', 'x = 3', 'x = 5', 'x = 6'],
                correctIndex: 1,
                explanation: 'A horizontal tangent occurs where dy/dx = 0. dy/dx = 2x - 6 = 0, which solves to 2x = 6 => x = 3.'
              }
            ]
          },
          {
            id: 'math-lesson-2',
            title: '1.2 Tangents, Normals & Turning Points',
            durationMinutes: 30,
            summary: 'Calculate the equations of tangents and normals to curves at specified coordinates (x1, y1).',
            keyTakeaways: [
              'Gradient of tangent m = dy/dx evaluated at x1.',
              'Gradient of normal m_normal = -1 / m.',
              'Use the point-slope form: y - y1 = m(x - x1).'
            ],
            content: `
### Equations of Tangents and Normals

Candidates frequently lose marks when determining the perpendicular normal gradient. Remember that the product of perpendicular slopes equals -1 ($m_1 \\cdot m_2 = -1$).

#### Step-by-Step Procedure:
1. Find $\\frac{dy}{dx}$ by differentiating the curve equation.
2. Substitute the given $x$-coordinate to obtain the numeric gradient $m$.
3. Substitute $m$ and $(x_1, y_1)$ into $y - y_1 = m(x - x_1)$.
4. Simplify into standard form $Ax + By + C = 0$.
            `,
            quiz: [
              {
                id: 'q-math-3',
                question: 'If the slope of the tangent to a curve at (2, 3) is 4, what is the slope of the normal to the curve at the same point?',
                options: ['4', '-4', '1/4', '-1/4'],
                correctIndex: 3,
                explanation: 'The normal is perpendicular to the tangent. m_normal = -1 / m_tangent = -1 / 4.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'fintech-mobile-money',
    title: 'FinTech & Mobile Money Systems Engineering',
    slug: 'fintech-mobile-money',
    category: 'FinTech & African Markets',
    level: 'Intermediate',
    durationHours: '3.5 hrs',
    lessonsCount: 4,
    badgeTitle: 'Certified African FinTech Engineer',
    instructor: {
      name: 'Esi Quaye',
      role: 'Senior Staff Engineer & Ex-Paystack Architect',
      institution: 'AfriVersity FinTech Practice',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Understand how African mobile payments work under the hood: USSD protocols, Webhooks, Idempotency keys, and telecom gateway integrations.',
    overview: 'Mobile money transactions in Africa surpass $800 billion annually. This microcourse reveals the telecom architecture, encryption mechanisms, and API standards that enable instant wallet-to-bank settlements across Ghana, Nigeria, Kenya, and Ivory Coast.',
    learningOutcomes: [
      'Understand USSD menu session lifecycles and latency constraints',
      'Implement secure HMAC-SHA512 webhook signature verification',
      'Enforce database idempotency to prevent catastrophic double-debits',
      'Design reliable offline-first fallback payments for low-connectivity environments'
    ],
    prerequisites: ['Basic programming knowledge in JavaScript or Python'],
    modules: [
      {
        id: 'mod-ft-1',
        title: 'Module 1: The Anatomy of a Mobile Money Payment',
        description: 'From *170# or STK Push to network clearing and bank settlement.',
        lessons: [
          {
            id: 'ft-lesson-1',
            title: '1.1 USSD Protocols & STK Push Orchestration',
            durationMinutes: 20,
            summary: 'How cellular Base Transceiver Stations (BTS) trigger SIM Toolkit (STK) prompts on feature phones and smartphones.',
            keyTakeaways: [
              'USSD (Unstructured Supplementary Service Data) is a real-time session protocol with strict 20-30 second timeouts.',
              'STK (SIM Toolkit) Push delivers a secure encrypted prompt directly to the user\'s SIM card requesting PIN entry.',
              'Never store or log customer mobile money PINs on your server.'
            ],
            content: `
### How Mobile Money Operates in Africa

When a student pays their university application voucher via MTN MoMo or Telecel Cash, the system executes an orchestration across three distinct layers:

1. **Merchant / Gateway Layer:** Dispatches an API POST request with transaction reference and phone number.
2. **Telco Core Network:** Triggers an SS7/SIGTRAN signal delivering an STK Push popup to the subscriber's phone.
3. **Subscriber Authorization:** User verifies recipient name and enters their secret 4-digit PIN directly into the SIM chip.
4. **Webhook Notification:** Upon clearing, the telecom switch sends an asynchronous HTTP POST callback with cryptographic signature.
            `,
            codeExercise: {
              title: 'Try It Yourself: Validate Webhook Signature',
              instruction: 'Simulate checking whether an incoming payment webhook has a valid status and transaction reference.',
              starterCode: `def verify_payment_payload(payload):
    # Check if status is 'success' and amount matches
    if payload.get("status") == "success" and payload.get("amount") >= 250.0:
        return f"Payment Verified: {payload.get('reference')}"
    return "Invalid Transaction"

test_webhook = {
    "reference": "UG-VOUCH-98214",
    "amount": 250.0,
    "status": "success",
    "network": "MTN"
}

result = verify_payment_payload(test_webhook)
print(result)`,
              solution: `def verify_payment_payload(payload):
    if payload.get("status") == "success" and payload.get("amount") >= 250.0:
        return f"Payment Verified: {payload.get('reference')}"
    return "Invalid Transaction"

test_webhook = {"reference": "UG-VOUCH-98214", "amount": 250.0, "status": "success", "network": "MTN"}
print(verify_payment_payload(test_webhook))`,
              language: 'python',
              expectedOutput: 'Payment Verified: UG-VOUCH-98214',
              explanation: 'The payload contains status="success" and amount=250.0, which verifies the voucher payment.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'scholarship-statement-writing',
    title: 'Mastering African Scholarship Essays & Personal Statements',
    slug: 'scholarship-statement-writing',
    category: 'Career & Scholarships',
    level: 'Beginner',
    durationHours: '2.5 hrs',
    lessonsCount: 4,
    badgeTitle: 'Mastercard & Foundation Scholar Fellow',
    instructor: {
      name: 'Yaa Asantewaa Opoku',
      role: 'Mastercard Foundation Scholar & Oxford Alumna',
      institution: 'AfriVersity Scholarship Mentorship Network',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Draft winning personal statements for Mastercard Foundation, MTN Bright, GNPC, and Chevening scholarships with authentic African leadership narratives.',
    overview: 'High grades alone do not win fully funded tertiary scholarships. Committees evaluate transformative community leadership, ethical resilience in overcoming hardship, and a concrete vision to reinvest knowledge into Africa’s development. This microcourse guides you step-by-step from brainstorming to final proofreading.',
    learningOutcomes: [
      'Structure personal statements using the proven Hook-Story-Impact-Vision framework',
      'Articulate financial hardship with dignity and emotional authenticity',
      'Demonstrate leadership impact through quantifiable local initiatives',
      'Audit your essay against official Mastercard Foundation selection rubrics'
    ],
    prerequisites: ['Commitment to community service and academic advancement'],
    modules: [
      {
        id: 'mod-sch-1',
        title: 'Module 1: The Anatomy of a Winning Scholarship Essay',
        description: 'Hooking the committee and showcasing ethical leadership.',
        lessons: [
          {
            id: 'sch-lesson-1',
            title: '1.1 The STAR Framework for African Leadership Stories',
            durationMinutes: 20,
            summary: 'Learn how to describe leadership using Situation, Task, Action, and Result without sounding boastful or vague.',
            keyTakeaways: [
              'Avoid generic clichés like "I have always wanted to help people".',
              'Focus on a specific community challenge you actively addressed.',
              'Quantify outcomes: number of people mentored, funds raised, or systems built.'
            ],
            content: `
### How Scholarship Reviewers Read Your Essay

Scholarship panels read between 500 and 2,000 essays per cycle. To stand out, your opening paragraph must ground the reader in a vivid, authentic moment:

#### The STAR Methodology:
- **Situation:** Set the scene in your hometown, school, or community.
- **Task:** Identify the pressing issue you took responsibility to solve.
- **Action:** Detail the specific steps *you* took, obstacles you navigated, and collaborations you built.
- **Result:** Quantify the lasting change and how it informs your prospective university studies.

#### Sample Analysis:
*Weak:* "In high school I was a good leader who helped students learn math."
*Strong:* "Noticing that 65% of my junior peers failed Core Mathematics mock examinations, I mobilized three prefects to launch 'Saturday Clinic', coaching 42 candidates weekly and lifting our cohort pass rate to 91%."
            `,
            quiz: [
              {
                id: 'q-sch-1',
                question: 'What is the most effective way to communicate leadership in a scholarship essay?',
                options: [
                  'Listing all high school club titles you held without elaboration',
                  'Describing a specific problem you observed, your concrete initiative, and its measurable impact on others',
                  'Explaining that you are naturally gifted and deserve the scholarship',
                  'Writing quotes from famous international leaders'
                ],
                correctIndex: 1,
                explanation: 'Selection committees look for initiative, empathy, problem-solving, and measurable impact in real community contexts.'
              }
            ]
          }
        ]
      }
    ]
  }
];
