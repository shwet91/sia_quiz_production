"use client"

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Heart, Calendar, Droplets, Moon, Scale, Thermometer, CheckCircle, Mail, User, Phone, Loader2 } from 'lucide-react';

interface Answers {
  reasons: string[];
  diagnosed: boolean;
  diagnosedWith: string[];
  conditions: string[];
  testsRecommended: string;
  menstrualSymptoms: string[];
  skinHairSymptoms: string[];
  energyMoodSymptoms: string[];
  weightMetabolismSymptoms: string[];
  sleepBodySymptoms: string[];
  symptomDuration: string;
  pcosDetails: string[];
  menopauseDetails: string[];
  pregnancySupport: string[];
  readinessForSupport: string;
  submissionId?: string;
  serverPersonalizedMessage?: string;
  serverOutcomeType?: string;
  serverPcosRisk?: boolean;
}

interface ContactInfo {
  email: string;
  phone: string;
  name: string;
}

type ConditionalPathway = 'pcos' | 'menopause' | 'pregnancy';

interface ConditionalStep {
  pathway: ConditionalPathway;
  completed: boolean;
}

const HormonalHealthQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({
    reasons: [],
    diagnosed: false,
    diagnosedWith: [],
    conditions: [],
    testsRecommended: '',
    menstrualSymptoms: [],
    skinHairSymptoms: [],
    energyMoodSymptoms: [],
    weightMetabolismSymptoms: [],
    sleepBodySymptoms: [],
    symptomDuration: '',
    pcosDetails: [],
    menopauseDetails: [],
    pregnancySupport: [],
    readinessForSupport: ''
  });

  // Form submission states
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string>('');
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  // Conditional steps tracking
  const [conditionalSteps, setConditionalSteps] = useState<ConditionalStep[]>([]);
  const [currentConditionalIndex, setCurrentConditionalIndex] = useState<number>(0);

  const handleMultiSelect = (category: keyof Answers, value: string): void => {
    setAnswers(prev => {
      const currentArray = prev[category] as string[];
      return {
        ...prev,
        [category]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const handleContactInfoChange = (field: keyof ContactInfo, value: string): void => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitQuiz = async (): Promise<void> => {
    setIsSubmitting(true);
    setSubmissionError('');

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: contactInfo.email,
          phone: contactInfo.phone,
          name: contactInfo.name,
          answers
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmissionSuccess(true);
        setAnswers(prev => ({
          ...prev,
          submissionId: result.submissionId,
          serverPersonalizedMessage: result.personalizedMessage,
          serverOutcomeType: result.outcomeType,
          serverPcosRisk: result.pcosRisk
        }));
      } else {
        setSubmissionError(result.message || 'Failed to submit quiz');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSingleSelect = (category: keyof Answers, value: string): void => {
    setAnswers(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Get all required conditional pathways based on answers
  const getRequiredConditionalPathways = (): ConditionalPathway[] => {
    const pathways: ConditionalPathway[] = [];
    
    // PCOS pathway
    if (answers.conditions.includes('PCOS/ PCOD') || 
        (answers.menstrualSymptoms.some(s => s.includes('Irregular') || s.includes('Missed')) &&
         answers.skinHairSymptoms.includes('Acne (jawline or chin)') &&
         answers.energyMoodSymptoms.includes('Constant fatigue / low energy'))) {
      pathways.push('pcos');
    }
    
    // Menopause pathway
    if (answers.reasons.includes("I think I may be in perimenopause or menopause") ||
        answers.conditions.includes('Menopause (Post/Peri)') ||
        answers.sleepBodySymptoms.includes('Hot flashes or night sweats')) {
      pathways.push('menopause');
    }
    
    // Pregnancy pathway
    if (answers.reasons.includes("I'm planning for pregnancy") ||
        answers.reasons.includes("I'm currently pregnant and want to support my body")) {
      pathways.push('pregnancy');
    }
    
    return pathways;
  };

  // Initialize conditional steps when needed
  const initializeConditionalSteps = (): void => {
    const pathways = getRequiredConditionalPathways();
    if (pathways.length > 0) {
      setConditionalSteps(pathways.map(pathway => ({
        pathway,
        completed: false
      })));
      setCurrentConditionalIndex(0);
    }
  };

  const nextStep = (): void => {
    // Initialize conditional steps if we're about to enter that phase
    if (isAboutToEnterConditionalSteps()) {
      initializeConditionalSteps();
    }

    // Handle conditional steps navigation
    if (isInConditionalSteps()) {
      const currentConditionalStep = conditionalSteps[currentConditionalIndex];
      
      // Mark current conditional step as completed
      setConditionalSteps(prev => 
        prev.map((step, index) => 
          index === currentConditionalIndex 
            ? { ...step, completed: true }
            : step
        )
      );

      // Move to next conditional step if available
      if (currentConditionalIndex < conditionalSteps.length - 1) {
        setCurrentConditionalIndex(prev => prev + 1);
        return;
      }
    }

    // Check if we need to show contact form before final results
    if (currentStep === getTotalSteps() - 1 && 
        (answers.readinessForSupport === 'Yes, book a free call' || 
         answers.readinessForSupport === 'Yes, WhatsApp me') &&
        !showContactForm) {
      setShowContactForm(true);
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = (): void => {
    // Handle going back in conditional steps
    if (isInConditionalSteps() && currentConditionalIndex > 0) {
      setCurrentConditionalIndex(prev => prev - 1);
      return;
    }
    
    // If at first conditional step, go back to regular flow
    if (isInConditionalSteps() && currentConditionalIndex === 0) {
      setConditionalSteps([]);
      setCurrentConditionalIndex(0);
    }
    
    setCurrentStep(prev => prev - 1);
  };

  // Helper functions for conditional step logic
  const isAboutToEnterConditionalSteps = (): boolean => {
    const conditionalStepPosition = answers.conditions.includes('None / Not sure') ? 6 : 5;
    return currentStep === conditionalStepPosition - 1 && getRequiredConditionalPathways().length > 0;
  };

  const isInConditionalSteps = (): boolean => {
    return conditionalSteps.length > 0 && !conditionalSteps.every(step => step.completed);
  };

  const getCurrentConditionalPathway = (): ConditionalPathway | null => {
    if (!isInConditionalSteps()) return null;
    return conditionalSteps[currentConditionalIndex]?.pathway || null;
  };

  const getOutcomeType = (): string => {
    const symptomCount = [
      ...answers.menstrualSymptoms,
      ...answers.skinHairSymptoms,
      ...answers.energyMoodSymptoms,
      ...answers.weightMetabolismSymptoms,
      ...answers.sleepBodySymptoms
    ].length;

    if (answers.diagnosed) {
      return 'diagnosed';
    } else if (symptomCount >= 3) {
      return 'redFlags';
    } else if (answers.reasons.includes("I'm planning for pregnancy") || 
               answers.reasons.includes("I'm currently pregnant and want to support my body")) {
      return 'pregnancy';
    } else {
      return 'mild';
    }
  };

  const getPersonalizedMessage = (): string => {
    const outcomeType = getOutcomeType();
    
    switch (outcomeType) {
      case 'redFlags':
        return "You may be dealing with a hormonal imbalance. Let's help you decode what's going on.";
      case 'diagnosed':
        return `We help women with ${answers.diagnosedWith.join(', ')} manage symptoms and feel better. Want a plan?`;
      case 'pregnancy':
        return "We can support you through pregnancy safely and holistically.";
      default:
        return "No urgent signs now, but your body is always signaling. Work with us to improve your health.";
    }
  };

  const checkPCOSCriteria = (): boolean => {
    const irregularPeriods = answers.menstrualSymptoms.some(s => 
      s.includes('Irregular') || s.includes('Missed') || s.includes('Decreased frequency')
    );
    const hyperandrogenism = answers.skinHairSymptoms.includes('Acne (jawline or chin)') ||
                            answers.skinHairSymptoms.includes('Excess facial or body hair');
    const ultrasoundConfirmed = answers.pcosDetails.includes('Diagnosed via ultrasound (cysts seen)');
    
    const criteriaCount = [irregularPeriods, hyperandrogenism, ultrasoundConfirmed].filter(Boolean).length;
    
    return criteriaCount >= 2;
  };

  const renderStep1 = (): React.ReactElement => (
    <div className="space-y-6">
      <div className="text-center">
        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">What brings you here today?</h2>
        <p className="text-gray-600">Select all that apply</p>
      </div>
      
      <div className="space-y-3">
        {[
          "I want to check if I have a hormonal imbalance",
          "I'm struggling with weight gain",
          "I have skin or hair concerns",
          "I'm planning for pregnancy",
          "I'm currently pregnant and want to support my body",
          "I think I may be in perimenopause or menopause",
          "I feel tired or not like myself",
          "I've been diagnosed before and need support",
          "Just curious"
        ].map((reason) => (
          <label key={reason} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={answers.reasons.includes(reason)}
              onChange={() => handleMultiSelect('reasons', reason)}
              className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
            />
            <span className="ml-3 text-gray-700">{reason}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep2 = (): React.ReactElement => {
    const isDiagnosed = answers.reasons.includes("I've been diagnosed before and need support");
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isDiagnosed ? "What have you been diagnosed with?" : "Do you experience any hormonal health issues?"}
          </h2>
          <p className="text-gray-600">Check all that apply</p>
        </div>
        
        <div className="space-y-3">
          {[
            "PCOS/ PCOD",
            "Thyroid Disorders (e.g, Hypothyroidism, Hashimoto's)",
            "Menstrual Irregularities",
            "Weight fluctuations",
            "Endometriosis",
            "Menopause (Post/Peri)",
            "Insulin Resistance",
            ...(isDiagnosed ? [] : ["None / Not sure"])
          ].map((condition) => (
            <label key={condition} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={answers.conditions.includes(condition)}
                onChange={() => {
                  if (isDiagnosed) {
                    handleMultiSelect('diagnosedWith', condition);
                    setAnswers(prev => ({ ...prev, diagnosed: true }));
                  }
                  handleMultiSelect('conditions', condition);
                }}
                className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
              />
              <span className="ml-3 text-gray-700">{condition}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderTestRecommendationStep = (): React.ReactElement => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Have you ever been recommended a hormone test, thyroid test, or ultrasound?</h2>
      </div>
      
      <div className="space-y-3">
        {[
          "Yes, and did the tests",
          "Yes, but didn't do it",
          "No, never"
        ].map((option) => (
          <label key={option} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="testsRecommended"
              value={option}
              checked={answers.testsRecommended === option}
              onChange={(e) => handleSingleSelect('testsRecommended', e.target.value)}
              className="w-5 h-5 text-pink-500 focus:ring-pink-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderSymptomStep = (): React.ReactElement => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell us about your symptoms</h2>
        <p className="text-gray-600">Select all that you experience</p>
      </div>

      {/* Menstrual Health */}
      <div className="bg-red-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Droplets className="w-6 h-6 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Menstrual Health</h3>
        </div>
        <div className="space-y-2">
          {[
            "Irregular cycles (<21 or >35 days)",
            "Very painful periods",
            "Heavy bleeding or clotting",
            "Missed periods",
            "Decreased frequency of menses"
          ].map((symptom) => (
            <label key={symptom} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={answers.menstrualSymptoms.includes(symptom)}
                onChange={() => handleMultiSelect('menstrualSymptoms', symptom)}
                className="w-4 h-4 text-red-500 rounded focus:ring-red-500"
              />
              <span className="ml-3 text-gray-700">{symptom}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin & Hair */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Moon className="w-6 h-6 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Skin & Hair</h3>
        </div>
        <div className="space-y-2">
          {[
            "Acne (jawline or chin)",
            "Hair thinning or hair fall",
            "Excess facial or body hair"
          ].map((symptom) => (
            <label key={symptom} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={answers.skinHairSymptoms.includes(symptom)}
                onChange={() => handleMultiSelect('skinHairSymptoms', symptom)}
                className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
              />
              <span className="ml-3 text-gray-700">{symptom}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Energy & Mood */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Calendar className="w-6 h-6 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Energy & Mood</h3>
        </div>
        <div className="space-y-2">
          {[
            "Constant fatigue / low energy",
            "Brain fog",
            "Mood swings or irritability"
          ].map((symptom) => (
            <label key={symptom} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={answers.energyMoodSymptoms.includes(symptom)}
                onChange={() => handleMultiSelect('energyMoodSymptoms', symptom)}
                className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-600"
              />
              <span className="ml-3 text-gray-700">{symptom}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Weight & Metabolism */}
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Scale className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Weight & Metabolism</h3>
        </div>
        <div className="space-y-2">
          {[
            "Sudden or stubborn weight gain",
            "Difficulty losing weight",
            "Sugar cravings / feel hangry",
            "Frequent bowel movements"
          ].map((symptom) => (
            <label key={symptom} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={answers.weightMetabolismSymptoms.includes(symptom)}
                onChange={() => handleMultiSelect('weightMetabolismSymptoms', symptom)}
                className="w-4 h-4 text-green-600 rounded focus:ring-green-600"
              />
              <span className="ml-3 text-gray-700">{symptom}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sleep & Body */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Thermometer className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Sleep & Body</h3>
        </div>
        <div className="space-y-2">
          {[
            "Trouble falling asleep",
            "Waking up tired",
            "Hot flashes or night sweats",
            "Joint pain or body aches",
            "Low Libido",
            "Frequent urination"
          ].map((symptom) => (
            <label key={symptom} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={answers.sleepBodySymptoms.includes(symptom)}
                onChange={() => handleMultiSelect('sleepBodySymptoms', symptom)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
              />
              <span className="ml-3 text-gray-700">{symptom}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDurationStep = (): React.ReactElement => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">How long have you been experiencing these symptoms?</h2>
      </div>
      
      <div className="space-y-3">
        {[
          "Less than 3 months",
          "3–12 months",
          "1–3 years",
          "More than 3 years",
          "Can't remember"
        ].map((duration) => (
          <label key={duration} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="symptomDuration"
              value={duration}
              checked={answers.symptomDuration === duration}
              onChange={(e) => handleSingleSelect('symptomDuration', e.target.value)}
              className="w-5 h-5 text-pink-500 focus:ring-pink-500"
            />
            <span className="ml-3 text-gray-700">{duration}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderConditionalStep = (): React.ReactElement | null => {
    const pathway = getCurrentConditionalPathway();
    
    if (pathway === 'pcos') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">PCOS Assessment</h2>
            <p className="text-gray-600">Do any of these apply to you?</p>
            {conditionalSteps.length > 1 && (
              <p className="text-sm text-blue-600 mt-2">
                Step {currentConditionalIndex + 1} of {conditionalSteps.length} specialized assessments
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            {[
              "Diagnosed via ultrasound (cysts seen)",
              "High AMH",
              "High androgens (acne/hair)",
              "Diagnosed insulin resistance",
              "Not sure"
            ].map((detail) => (
              <label key={detail} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={answers.pcosDetails.includes(detail)}
                  onChange={() => handleMultiSelect('pcosDetails', detail)}
                  className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                />
                <span className="ml-3 text-gray-700">{detail}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    
    if (pathway === 'menopause') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Menopause Assessment</h2>
            <p className="text-gray-600">Do any of these apply to you?</p>
            {conditionalSteps.length > 1 && (
              <p className="text-sm text-blue-600 mt-2">
                Step {currentConditionalIndex + 1} of {conditionalSteps.length} specialized assessments
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            {[
              "Periods reducing in frequency",
              "Hot flashes",
              "Vaginal dryness / discomfort",
              "Disturbed sleep",
              "Periods stopped before age 40",
              "Not sure"
            ].map((detail) => (
              <label key={detail} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={answers.menopauseDetails.includes(detail)}
                  onChange={() => handleMultiSelect('menopauseDetails', detail)}
                  className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                />
                <span className="ml-3 text-gray-700">{detail}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    
    if (pathway === 'pregnancy') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pregnancy Support</h2>
            <p className="text-gray-600">What do you want support with?</p>
            {conditionalSteps.length > 1 && (
              <p className="text-sm text-blue-600 mt-2">
                Step {currentConditionalIndex + 1} of {conditionalSteps.length} specialized assessments
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            {[
              "Nutrition in pregnancy",
              "PCOS/thyroid management in pregnancy",
              "Healthy weight gain",
              "Gut or digestion issues",
              "Not sure"
            ].map((support) => (
              <label key={support} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={answers.pregnancySupport.includes(support)}
                  onChange={() => handleMultiSelect('pregnancySupport', support)}
                  className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                />
                <span className="ml-3 text-gray-700">{support}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };

  const renderSupportStep = (): React.ReactElement => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Would you like personalized guidance?</h2>
        <p className="text-gray-600">Based on your responses, we can provide expert support</p>
      </div>
      
      <div className="space-y-3">
        {[
          "Yes, book a free call",
          "Yes, WhatsApp me",
          "Maybe later",
          "No thanks"
        ].map((option) => (
          <label key={option} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="readinessForSupport"
              value={option}
              checked={answers.readinessForSupport === option}
              onChange={(e) => handleSingleSelect('readinessForSupport', e.target.value)}
              className="w-5 h-5 text-pink-500 focus:ring-pink-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderContactForm = (): React.ReactElement => (
    <div className="space-y-6">
      <div className="text-center">
        <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Let&aposs get your personalized results!</h2>
        <p className="text-gray-600">Enter your details to receive your assessment and next steps</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => handleContactInfoChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => handleContactInfoChange('phone', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✓ Instant access to your personalized assessment</li>
            <li>✓ Detailed recommendations via email</li>
            <li>✓ {answers.readinessForSupport === 'Yes, book a free call' 
                ? 'Link to book your free consultation call' 
                : 'WhatsApp support from our team'}</li>
          </ul>
        </div>

        {submissionError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {submissionError}
          </div>
        )}
      </div>
    </div>
  );

  const renderResults = (): React.ReactElement => {
    const pcosMatch = checkPCOSCriteria();
    
    // Show loading state while submitting
    if (isSubmitting) {
      return (
        <div className="space-y-8 text-center">
          <Loader2 className="w-16 h-16 text-pink-500 mx-auto animate-spin" />
          <h2 className="text-2xl font-bold text-gray-800">Processing your assessment...</h2>
          <p className="text-gray-600">We&aposre analyzing your responses and preparing your personalized results.</p>
        </div>
      );
    }

    // Show error state
    if (submissionError && !submissionSuccess) {
      return (
        <div className="space-y-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Submission Failed</h2>
            <p className="text-red-700 mb-4">{submissionError}</p>
            <button
              onClick={() => {
                setSubmissionError('');
                setShowContactForm(true);
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Personalized Assessment</h2>
          {submissionSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              ✓ Assessment submitted successfully! Check your email for detailed results.
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-xl border border-pink-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Recommendation:</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            {answers.serverPersonalizedMessage || getPersonalizedMessage()}
          </p>
        </div>
        
        {(pcosMatch || answers.serverPcosRisk) && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">PCOS Assessment Note:</h4>
            <p className="text-blue-700">Your symptoms meet at least 2 of the 3 signs commonly used to assess PCOS. Let&aposs help you get a proper workup and plan.</p>
          </div>
        )}
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-4">Summary of Your Responses:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Main Concerns:</p>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                {answers.reasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700">Symptom Duration:</p>
              <p className="text-gray-600 mt-1">{answers.symptomDuration || 'Not specified'}</p>
            </div>
          </div>
        </div>
        
        {answers.readinessForSupport && answers.readinessForSupport.startsWith('Yes') && (
          <div className="text-center">
            <div className="bg-pink-500 text-white p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-2">Next Steps</h4>
              <p className="mb-4">
                {answers.readinessForSupport === 'Yes, book a free call' 
                  ? "We'll be in touch soon to schedule your free consultation call."
                  : "We'll send you personalized guidance via WhatsApp."}
              </p>
              {contactInfo.email && (
                <p className="text-sm opacity-90">
                  A detailed assessment has been sent to: {contactInfo.email}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getTotalSteps = (): number => {
    let steps = 6; // Base steps: 1-4, duration, support
    
    if (answers.conditions.includes('None / Not sure')) {
      steps += 1; // Test recommendation step
    }
    
    const conditionalPathways = getRequiredConditionalPathways();
    steps += conditionalPathways.length; // Add conditional steps
    
    return steps;
  };

  const getCurrentStepContent = (): React.ReactElement => {
    // Show contact form if needed
    if (showContactForm) {
      return renderContactForm();
    }

    // Handle conditional steps
    if (isInConditionalSteps()) {
      return renderConditionalStep() || <div>Loading...</div>;
    }

    let adjustedStep = currentStep;
    
    // Adjust for test recommendation step
    if (currentStep === 3 && answers.conditions.includes('None / Not sure')) {
      return renderTestRecommendationStep();
    } else if (currentStep > 3 && answers.conditions.includes('None / Not sure')) {
      adjustedStep = currentStep - 1;
    }
    
    switch (adjustedStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderSymptomStep();
      case 4: return renderDurationStep();
      case 5: return renderSupportStep();
      case 6: return renderResults();
      default: return renderStep1();
    }
  };

  const canProceed = (): boolean => {
    if (showContactForm) {
      return contactInfo.name.trim() !== '' && contactInfo.email.trim() !== '';
    }
    
    switch (currentStep) {
      case 1: return answers.reasons.length > 0;
      case 2: return answers.conditions.length > 0;
      case 3: 
        if (answers.conditions.includes('None / Not sure')) {
          return answers.testsRecommended !== '';
        }
        return true; // Symptoms step is optional
      default: return true;
    }
  };

  const isLastStep = currentStep === getTotalSteps();

  const getStepIndicator = (): string => {
    if (isInConditionalSteps()) {
      return `Specialized Assessment ${currentConditionalIndex + 1} of ${conditionalSteps.length}`;
    }
    return `Step ${currentStep} of ${getTotalSteps()}`;
  };

  const getProgressPercentage = (): number => {
    if (isInConditionalSteps()) {
      // Calculate progress considering conditional steps
      const baseSteps = answers.conditions.includes('None / Not sure') ? 5 : 4;
      const conditionalProgress = (currentConditionalIndex + 1) / conditionalSteps.length;
      const totalProgress = (baseSteps + conditionalProgress + 1) / getTotalSteps();
      return totalProgress * 100;
    }
    return (currentStep / getTotalSteps()) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Hormonal Health Assessment</h1>
          <div className="text-sm text-gray-500">
            {getStepIndicator()}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        {getCurrentStepContent()}
      </div>

      <div className="flex justify-between">
        {(currentStep > 1 || (isInConditionalSteps() && currentConditionalIndex > 0)) && (
          <button
            onClick={prevStep}
            className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
        )}
        
        <div className="ml-auto">
          {!isLastStep ? (
            <button
              onClick={showContactForm ? submitQuiz : nextStep}
              disabled={!canProceed() || isSubmitting}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : showContactForm ? (
                <>
                  Get My Results
                  <CheckCircle className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  {isInConditionalSteps() && currentConditionalIndex < conditionalSteps.length - 1 ? 'Next Assessment' : 'Next'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentStep(1);
                setAnswers({
                  reasons: [],
                  diagnosed: false,
                  diagnosedWith: [],
                  conditions: [],
                  testsRecommended: '',
                  menstrualSymptoms: [],
                  skinHairSymptoms: [],
                  energyMoodSymptoms: [],
                  weightMetabolismSymptoms: [],
                  sleepBodySymptoms: [],
                  symptomDuration: '',
                  pcosDetails: [],
                  menopauseDetails: [],
                  pregnancySupport: [],
                  readinessForSupport: ''
                });
                setContactInfo({ email: '', phone: '', name: '' });
                setSubmissionSuccess(false);
                setSubmissionError('');
                setShowContactForm(false);
                setConditionalSteps([]);
                setCurrentConditionalIndex(0);
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all"
            >
              Start New Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HormonalHealthQuiz;