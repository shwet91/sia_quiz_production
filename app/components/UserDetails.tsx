"use client";

import React, { useDebugValue, useState } from "react";
import "../styles/design.css";
import { updateCurrentQuestionIndex } from "../store/quizSlice";
import { useDispatch, UseDispatch } from "react-redux";

interface UserDetails {
  name: string;
  email: string;
  phoneNo: string;
  age: string;
  gender: string;
}

import { motion, Variants } from "framer-motion";
import "../styles/design.css";

function PersonalDetails() {
  const [details, setDetails] = useState<UserDetails>({
    name: "",
    email: "",
    phoneNo: "",
    age: "",
    gender: "",
  });

  const dispatch = useDispatch();

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced field configurations with icons and validation
  const fieldConfig = {
    name: {
      placeholder: "Enter your full name",
      type: "text",
      label: "Full Name",
      icon: "👤",
      required: true,
      helpText: "We'll use this to personalize your experience",
    },
    email: {
      placeholder: "Enter your email address",
      type: "email",
      label: "Email Address",
      icon: "📧",
      required: true,
      helpText: "We'll send your quiz results here",
    },
    phoneNo: {
      placeholder: "Enter your phone number",
      type: "tel",
      label: "Phone Number",
      icon: "📱",
      required: false,
      helpText: "Optional - for important health notifications",
    },
    age: {
      placeholder: "Enter your age",
      type: "number",
      label: "Age",
      icon: "🎂",
      required: true,
      helpText: "This helps us provide age-appropriate recommendations",
    },
    gender: {
      placeholder: "",
      type: "select",
      label: "Gender",
      icon: "⚧",
      required: true,
      helpText: "This helps personalize your health insights",
    },
  };

  // Form submission handler
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Add your server submission logic here
      console.log("Submitting user details:", details);

      // Example API call (uncomment when ready):
      // const response = await fetch('/api/user-details', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(details)
      // });
      // const result = await response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch(updateCurrentQuestionIndex(69));

      // Handle success - redirect to next step or show success message
      console.log("Details submitted successfully!");
    } catch (error) {
      console.error("Error submitting details:", error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input change handler
  const inputHandler = (key: keyof UserDetails, value: string) => {
    setDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Form validation - check if all required fields are filled
  const isFormValid = () => {
    return (
      details.name.trim() !== "" &&
      details.email.trim() !== "" &&
      details.age.trim() !== "" &&
      details.gender !== ""
    );
  };

  // Calculate form completion percentage
  const getCompletionPercentage = () => {
    const requiredFields = ["name", "email", "age", "gender"];
    const filledFields = requiredFields.filter(
      (field) => details[field as keyof UserDetails].trim() !== ""
    ).length;
    return (filledFields / requiredFields.length) * 100;
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(234, 88, 12, 0.2)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  // Floating animation for decorative elements
  const floatingVariants: Variants = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className=" w-full 1max-w-4xl mx-auto h-auto p-4 sm:p-6 lg:p-1 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Enhanced Progress Bar with completion percentage */}
      <motion.div variants={itemVariants}>
        <div className=" hidden w-full bg-orange-100 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-lg relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${getCompletionPercentage()}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Animated shine effect on progress bar */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
        <p className=" hidden text-center text-sm text-orange-600 font-medium mb-8">
          {Math.round(getCompletionPercentage())}% Complete
        </p>
      </motion.div>

      {/* Main Title and Description */}
      <motion.div
        className=" hidden border text-center mb-8"
        variants={itemVariants}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
          Let`s get to know you better
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Please fill out all the information below. This helps us personalize
          your health quiz experience and provide accurate recommendations.
        </p>
      </motion.div>

      {/* Main Form Container */}
      <motion.div
        className=" px-2 md:bg-white  bg-gradient-to-br from-white to-orange-50 md:to-white rounded-2xl sm:rounded-3xl md:rounded-none shadow-xl md:shadow-none md:border-none border border-orange-100 relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Subtle background pattern */}
        <div className=" md:hidden absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-orange-600/5 pointer-events-none" />

        <div className="  md:flex justify-center gap-3 relative z-10">
          {/* Form Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-2 mb-0">
            {/* Name Field */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{fieldConfig.name.icon}</span>
                <label className="text-sm sm:text-base font-semibold text-gray-700">
                  {fieldConfig.name.label}{" "}
                  <span className="text-orange-500">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder={fieldConfig.name.placeholder}
                  className="  w-full text-gray-800 text-base sm:text-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 p-4 rounded-xl transition-all duration-300 outline-none bg-white shadow-sm hover:border-orange-300 focus:shadow-lg placeholder-gray-400"
                  value={details.name}
                  onChange={(e) => inputHandler("name", e.target.value)}
                />
              </div>
              {/* <p className="text-xs text-gray-500">
                {fieldConfig.name.helpText}
              </p> */}
            </motion.div>

            {/* Email Field */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{fieldConfig.email.icon}</span>
                <label className="text-sm sm:text-base font-semibold text-gray-700">
                  {fieldConfig.email.label}{" "}
                  <span className="text-orange-500">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder={fieldConfig.email.placeholder}
                  className=" w-full text-gray-800 text-base sm:text-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 p-4 rounded-xl transition-all duration-300 outline-none bg-white shadow-sm hover:border-orange-300 focus:shadow-lg placeholder-gray-400"
                  value={details.email}
                  onChange={(e) => inputHandler("email", e.target.value)}
                />
              </div>
              {/* <p className="text-xs text-gray-500">
                {fieldConfig.email.helpText}
              </p> */}
            </motion.div>

            {/* Phone Field */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{fieldConfig.phoneNo.icon}</span>
                <label className="text-sm sm:text-base font-semibold text-gray-700">
                  {fieldConfig.phoneNo.label}
                </label>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  placeholder={fieldConfig.phoneNo.placeholder}
                  className="w-full text-gray-800 text-base sm:text-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 p-4 rounded-xl transition-all duration-300 outline-none bg-white shadow-sm hover:border-orange-300 focus:shadow-lg placeholder-gray-400"
                  value={details.phoneNo}
                  onChange={(e) => inputHandler("phoneNo", e.target.value)}
                />
                {details.phoneNo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Age Field */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{fieldConfig.age.icon}</span>
                <label className="text-sm sm:text-base font-semibold text-gray-700">
                  {fieldConfig.age.label}{" "}
                  <span className="text-orange-500">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder={fieldConfig.age.placeholder}
                  className="w-full text-gray-800 text-base sm:text-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 p-4 rounded-xl transition-all duration-300 outline-none bg-white shadow-sm hover:border-orange-300 focus:shadow-lg placeholder-gray-400"
                  value={details.age}
                  onChange={(e) => inputHandler("age", e.target.value)}
                  min="1"
                  max="150"
                />
                {details.age && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Gender Selection - Full Width */}
            <motion.div className="  space-y-1 mb-2" variants={itemVariants}>
              <div className="  flex items-center justify-center space-x-2 1mb-4">
                <span className="text-2xl">{fieldConfig.gender.icon}</span>
                <label className="text-sm sm:text-base font-semibold text-gray-700">
                  {fieldConfig.gender.label}{" "}
                  <span className="text-orange-500">*</span>
                </label>
              </div>

              <div className=" flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <motion.button
                  className={`group w-full sm:w-48 px-6 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg relative overflow-hidden ${
                    details.gender === "male"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white ring-4 ring-orange-200 shadow-orange-200"
                      : "bg-white text-orange-600 border-2 border-orange-300 hover:bg-orange-50 hover:border-orange-400"
                  }`}
                  type="button"
                  onClick={() => inputHandler("gender", "male")}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">👨</span>
                    <span>Male</span>
                  </div>
                  {details.gender === "male" && (
                    <motion.div
                      className="absolute inset-0 bg-white opacity-20 rounded-xl"
                      initial={{ scale: 0, opacity: 0.3 }}
                      animate={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </motion.button>

                <motion.button
                  className={`group w-full sm:w-48 px-6 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg relative overflow-hidden ${
                    details.gender === "female"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white ring-4 ring-orange-200 shadow-orange-200"
                      : "bg-white text-orange-600 border-2 border-orange-300 hover:bg-orange-50 hover:border-orange-400"
                  }`}
                  type="button"
                  onClick={() => inputHandler("gender", "female")}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">👩</span>
                    <span>Female</span>
                  </div>
                  {details.gender === "female" && (
                    <motion.div
                      className="absolute inset-0 bg-white opacity-20 rounded-xl"
                      initial={{ scale: 0, opacity: 0.3 }}
                      animate={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className=" mt-6 sm:mb-0 mb-4 flex justify-center"
              variants={itemVariants}
            >
              <motion.button
                type="button"
                className={`  w-60 h-20  1px-12 1py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg relative overflow-hidden 1min-w-48 ${
                  isFormValid() && !isSubmitting
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                variants={buttonVariants}
                whileHover={
                  isFormValid() && !isSubmitting ? "hover" : undefined
                }
                whileTap={isFormValid() && !isSubmitting ? "tap" : undefined}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span className="  flex items-center justify-center 1space-x-2">
                    <span>Start Health Quiz</span>
                    <span>🚀</span>
                  </span>
                )}

                {/* Button shine effect */}
                {isFormValid() && !isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Security and Privacy Message */}
      <motion.div className="  text-center mt-5" variants={itemVariants}>
        <div className="inline-flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
          <svg
            className="w-4 h-4 text-orange-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-orange-600 text-sm font-medium">
            Your information is secure and encrypted
          </p>
        </div>
        <p className="text-gray-500 text-xs mt-2">
          We use this data only to personalize your health recommendations
        </p>
      </motion.div>
    </motion.div>
  );
}

export default PersonalDetails;
