export const questions = [
  {
    id: 0,
    question: "What is your Gender?",
    type: "singleSelection",
    options: [
      {
        answer: "Male",
        next: 1,
        priority: 0,
      },
      {
        answer: "Femail",
        next: 1,
        priority: 0,
      },
      {
        answer: "Other",
        next: 1,
        priority: 0,
      },
      {
        answer: "Prefer not to say",
        next: 1,
        priority: 0,
      },
    ],
  },

  {
    id: 1,
    question: "1What brings you here today?",
    type: "multiSelection",
    // renderingConditionType : "simple",
    // renderingCondition : [],
    options: [
      {
        answer: "I want to check if I have a hormonal imbalance",
        next: 3,
        priority: 0,
      },
      {
        answer: "I have skin or hair concerns",
        next: 3,
        priority: 0,
      },
      {
        answer: "I am struggling with weight gain",
        next: 3,
        priority: 0,
      },
      {
        answer: "I am planning for pregnancy",
        next: 3,
        priority: 0,
      },
      {
        answer: "I am currently pregnant and want to support my body",
        next: 3,
        priority: 0,
      },
      {
        answer: "I think I may be in perimenopause or menopause",
        next: 3,
        priority: 0,
      },
      {
        answer: "I feel tired or not like myself",
        next: 3,
        priority: 0,
      },
      {
        answer: "I have been diagnosed before and need support",
        next: 2,
        priority: 1,
      },
      {
        answer: "Just curious",
        next: 3,
        priority: 0,
      },
    ],
  },

  {
    id: 2,
    question: "What have you been diagnosed with?",
    type: "singleSelection",
    options: [
      {
        answer: "PCOS",
        next: "q5",
        priority: 0,
      },
      {
        answer: "Hypothyroidism",
        next: "q5",
        priority: 0,
      },
      {
        answer: "Insulin resistance",
        next: "q5",
        priority: 0,
      },
      {
        answer: "Hashimoto's",
        next: "q5",
        priority: 0,
      },
      {
        answer: "Endometriosis",
        next: "q5",
        priority: 0,
      },
      {
        answer: "Premature menopause",
        next: "q5",
        priority: 0,
      },
      {
        answer: "Other",
        next: "q5",
        priority: 0,
      },
    ],
  },

  {
    id: 3,
    question: "Do you experience any of the following hormonal health issues?",
    type: "multiSelection",
    options: [
      {
        answer: "PCOS / PCOD",
        next: "q5",
      },
      {
        answer: "Thyroid disorders (Hypothyroid, Hashimoto's)",
        next: "q5",
      },
      {
        answer: "Menstrual irregularities",
        next: "q5",
      },
      {
        answer: "Weight fluctuations",
        next: "q5",
      },
      {
        answer: "Endometriosis",
        next: "q5",
      },
      {
        answer: "Menopause (post/peri)",
        next: "q5",
      },
      {
        answer: "Insulin resistance",
        next: "q5",
      },
      {
        answer: "None / Not sure",
        next: "q4",
      },
    ],
  },

  {
    id: 4,
    question:
      "Have you ever been recommended a hormone test, thyroid test, or ultrasound?",
    type: "singleSelection",
    options: [
      {
        answer: "Yes, and did the tests",
        next: "q5",
      },
      {
        answer: "Yes, but didn't do it",
        next: "q5",
      },
      {
        answer: "No, never",
        next: "q5",
      },
    ],
  },

  {
    id: "q6",
    question: "Symptom Duration",
    type: "singleSelection",
    options: [
      {
        answer: "Less than 3 months",
        next: "q7",
      },
      {
        answer: "3 - 12 months",
        next: "q7",
      },
      {
        answer: "1 - 3 years",
        next: "q7",
      },
      {
        answer: "More than 3 years",
        next: "q7",
      },
      {
        answer: "Can't remember",
        next: "q7",
      },
    ],
  },

  {
    id: "q7",
    question: "Do any of these apply?",
    type: "singleSelection",
    options: [
      {
        answer: "Diagnosed via ultrasound (cysts seen)",
        next: "",
      },
      {
        answer: "High AMH",
        next: "",
      },
      {
        answer: "High androgens (acne/hair)",
        next: "",
      },
      {
        answer: "Diagnosed insulin resistance",
        next: "",
      },
      {
        answer: "Not sure",
        next: "",
      },
    ],
  },

  {
    id: "q8",
    question: "Do any of these apply?",
    type: "singleSelection",
    options: [
      {
        answer: "Periods reducing in frequency",
        next: "",
      },
      {
        answer: "Hot flashes",
        next: "",
      },
      {
        answer: "Vaginal dryness/discomfort",
        next: "",
      },
      {
        answer: "Disturbed sleep",
        next: "",
      },
      {
        answer: "Periods stopped before age 40",
        next: "",
      },
      {
        answer: "Not sure",
        next: "",
      },
    ],
  },

  {
    id: "q9",
    question: "What do you want support with?",
    type: "singleSelection",
    options: [
      {
        answer: "Nutrition in pregnancy",
        next: "",
      },
      {
        answer: "PCOS/thyroid management in pregnancy",
        next: "",
      },
      {
        answer: "Healthy weight gain",
        next: "",
      },
      {
        answer: "Gut or digestion issues",
        next: "",
      },
      {
        answer: "Not sure",
        next: "",
      },
    ],
  },

  {
    id: "q10",
    question: "What do you want support with?",
    type: "singleSelection",
    options: [
      {
        answer: "Yes, book a free call",
        next: "",
      },
      {
        answer: "Yes, WhatsApp me",
        next: "",
      },
      {
        answer: "Maybe later",
        next: "",
      },
      {
        answer: "No thanks",
        next: "",
      },
    ],
  },
];

export const symptoms = [
  {
    id: "unique_id",
    title: "title of symptoms",
    next: "q6",
    options: [
      {
        symptom: "symptom 1",
        type: "mild",
      },
      {
        symptom: "symptom 2",
        type: "red",
      },
      {
        symptom: "symptom 3",
        type: "red",
      },
      {
        symptom: "symptom 4",
        type: "mild",
      },
    ],
  },
];
