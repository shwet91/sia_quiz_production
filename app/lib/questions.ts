export const questions = [
  {
    id: 0,
    question: "What is your Gender?",
    type: "singleSelection",
    renderingConditionType: "simple",
    renderingCondition: [],
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
    question: "What brings you here today?",
    type: "multiSelection",
    renderingConditionType: "simple",
    renderingCondition: [],
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
    renderingConditionType: "simple",
    renderingCondition: [],
    options: [
      {
        answer: "PCOS/PCOD",
        next: 4,
        priority: 0,
      },
      {
        answer: "Hypothyroidism",
        next: 4,
        priority: 0,
      },
      {
        answer: "Insulin resistance",
        next: 4,
        priority: 0,
      },
      {
        answer: "Hashimoto's",
        next: 4,
        priority: 0,
      },
      {
        answer: "Endometriosis",
        next: 4,
        priority: 0,
      },
      {
        answer: "Premature menopause",
        next: 4,
        priority: 0,
      },
      {
        answer: "Other",
        next: 4,
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
        next: 4,
        priority: 0,
      },
      {
        answer: "Thyroid disorders (Hypothyroid, Hashimoto's)",
        next: 4,
        priority: 0,
      },
      {
        answer: "Menstrual irregularities",
        next: 4,
        priority: 0,
      },
      {
        answer: "Weight fluctuations",
        next: 4,
        priority: 0,
      },
      {
        answer: "Endometriosis",
        next: 4,
        priority: 0,
      },
      {
        answer: "Harmonal Acne",
        next: 4,
        priority: 0,
      },
      {
        answer: "Menopause (post/peri)",
        next: 4,
        priority: 0,
      },
      {
        answer: "Insulin resistance",
        next: 4,
        priority: 0,
      },
      {
        answer: "None / Not sure",
        next: 4,
        priority: 0,
      },
    ],
  },

  {
    id: 4,
    question: "Do any of these apply to you?",
    type: "singleSelection",
    options: [
      {
        answer: "Diagnosed via ultrasound (cysts seen)",
        next: 5,
        priority: 0,
      },
      {
        answer: "High AMH",
        next: 5,
        priority: 0,
      },
      {
        answer: "High androgens (acne/hair)",
        next: 5,
        priority: 0,
      },
      {
        answer: "Diagnosed insulin resistance",
        next: 5,
        priority: 0,
      },
      {
        answer: "Not sure",
        next: 5,
        priority: 0,
      },
    ],
  },

  {
    id: 5,
    question:
      "Have you ever been recommended a hormone test, thyroid test, or ultrasound?",
    type: "singleSelection",
    options: [
      {
        answer: "Yes, and did the tests",
        next: 6,
        priority: 0,
      },
      {
        answer: "Yes, but didn`t do it",
        next: 6,
        priority: 0,
      },
      {
        answer: "No, never",
        next: 6,
        priority: 0,
      },
    ],
  },

  {
    id: 6,
    question: "Do you experience any of these menstrual health symptoms?",
    type: "singleSelection",
    options: [
      {
        answer: "Irregular cycles (<21 or >35 days)",
        next: 7,
        priority: 0,
      },
      {
        answer: "Very painful periods",
        next: 7,
        priority: 0,
      },
      {
        answer: "Heavy bleeding or clotting",
        next: 7,
        priority: 0,
      },
      {
        answer: "Missed periods",
        next: 7,
        priority: 0,
      },
      {
        answer: "Decreased frequency of menses",
        next: 7,
        priority: 0,
      },
      {
        answer: "None of the above",
        next: 7,
        priority: 0,
      },
    ],
  },

  {
    id: 7,
    question: "Do you experience any of these skin & hair symptoms?",
    type: "singleSelection",
    options: [
      {
        answer: "Hormonal Acne",
        next: 8,
        priority: 0,
      },
      {
        answer: "Hair thinning or hair fall",
        next: 8,
        priority: 0,
      },
      {
        answer: "Excess facial or body hair",
        next: 8,
        priority: 0,
      },
    ],
  },

  {
    id: 8,
    question: "Do you experience any of these energy & mood symptoms?",
    type: "singleSelection",
    options: [
      {
        answer: "Constant fatigue / low energy",
        next: 9,
        priority: 0,
      },
      {
        answer: "Brain fog",
        next: 9,
        priority: 0,
      },
      {
        answer: "Mood swings or irritability",
        next: 9,
        priority: 0,
      },
    ],
  },

  {
    id: 9,
    question: "Do you experience any of these weight & metabolism symptoms?",
    type: "singleSelection",
    options: [
      {
        answer: "Sudden or stubborn weight gain",
        next: 10,
        priority: 0,
      },
      {
        answer: "Difficulty losing weight",
        next: 10,
        priority: 0,
      },
      {
        answer: "Sugar cravings / feel hangry",
        next: 10,
        priority: 0,
      },
      {
        answer: "Frequent bowel movements",
        next: 10,
        priority: 0,
      },
    ],
  },

  {
    id: 10,
    question: "Do you experience any of these sleep & body symptoms?",
    type: "singleSelection",
    options: [
      {
        answer: "Trouble falling asleep",
        next: 11,
        priority: 0,
      },
      {
        answer: "Waking up tired",
        next: 11,
        priority: 0,
      },
      {
        answer: "Hot flashes or night sweats",
        next: 11,
        priority: 0,
      },
      {
        answer: "Joint pain or body aches",
        next: 11,
        priority: 0,
      },
      {
        answer: "Low libido",
        next: 11,
        priority: 0,
      },
      {
        answer: "Frequent urination",
        next: 11,
        priority: 0,
      },
    ],
  },

  {
    id: 7,
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
