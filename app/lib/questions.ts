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
        next: 11,
        priority: 0,
      },
      {
        answer: "I have skin or hair concerns",
        next: 11,
        priority: 0,
      },
      {
        answer: "I am struggling with weight gain",
        next: 11,
        priority: 0,
      },
      {
        answer: "I am planning for pregnancy",
        next: 11,
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
    renderingConditionType: "simple",
    renderingCondition: [],
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
    renderingConditionType: "simple",
    renderingCondition: [],
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
    renderingConditionType: "simple",
    renderingCondition: [],
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
    renderingConditionType: "simple",
    renderingCondition: [],
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
    renderingConditionType: "simple",
    renderingCondition: [],
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
    renderingConditionType: "simple",
    renderingCondition: [],
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
    renderingConditionType: "simple",
    renderingCondition: [],
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
    renderingConditionType: "simple",
    renderingCondition: [],
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
    id: 11,
    question: "How long have you been experiencing these symptoms?",
    type: "singleSelection",
    renderingConditionType: "complex",
    renderingCondition: [
      "I am planning for pregnancy",
      "I am currently pregnant and want to support my body",
    ],
    conditionalTrueNext: 12,
    conditionalFalseNext: 13,
    options: [
      {
        answer: "Less than 3 months",
        next: 12,
        priority: 0,
      },
      {
        answer: "3-12 months",
        next: 12,
        priority: 0,
      },
      {
        answer: "1-3 years",
        next: 12,
        priority: 0,
      },
      {
        answer: "More than 3 years",
        next: 12,
        priority: 0,
      },
      {
        answer: "Can`t remember",
        next: 12,
        priority: 0,
      },
      {
        answer: "Not Applicabl",
        next: 12,
        priority: 0,
      },
    ],
  },

  {
    id: 12,
    question: "What do you want support with during pregnancy?",
    type: "singleSelection",
    renderingConditionType: "simple",
    renderingCondition: [],
    options: [
      {
        answer: "Nutrition in pregnancy",
        next: 13,
        priority: 0,
      },
      {
        answer: "PCOS / thyroid management in pregnancy",
        next: 13,
        priority: 0,
      },
      {
        answer: "Healthy weight gain",
        next: 13,
        priority: 0,
      },
      {
        answer: "Gut or digestion issues",
        next: 13,
        priority: 0,
      },
      {
        answer: "Not sure",
        next: 13,
        priority: 0,
      },
    ],
  },

  {
    id: 13,
    question:
      "Would you like a personalized summary or expert guidance based on your responses?",
    type: "singleSelection",
    renderingConditionType: "simple",
    renderingCondition: [],
    options: [
      {
        answer: "Yes, book a free call",
        next: 13,
        priority: 0,
      },
      {
        answer: "Yes, WhatsApp me",
        next: 13,
        priority: 0,
      },
      {
        answer: "Maybe later",
        next: 13,
        priority: 0,
      },
      {
        answer: "No thanks",
        next: 13,
        priority: 0,
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
