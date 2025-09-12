"use client";

import React, { useEffect } from "react";
import "../../styles/design.css";
import Image from "next/image";
import { motion } from "framer-motion";
// import QuestionTab from "@/app/components/QuestionTab";
import UserDetails from "@/app/components/UserDetails";
import QuestionTab, { Question } from "@/app/components/QuestionTab";
import { questions } from "@/app/lib/questions";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

function QuizPage() {
  const currentComponent = useSelector(
    (store: RootState) => store.quiz.currentComponent
  );
  const currentIndex = useSelector(
    (store: RootState) => store.quiz.currentQuestionIndex
  );
  useEffect(() => {
    // console.log("this is logged in main page :", currentIndex);
  }, [currentIndex]);

  return (
    <div className="light-orange min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
      {/* Main container with improved responsive sizing and enhanced shadow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="  w-full max-w-7xl h-auto 1min-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100"
      >
        {/* Enhanced navbar with better spacing and hover effects */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className=" overflow-hidden w-full h-16 md:h-20 flex justify-between items-center px-4 md:px-6 py-3 border-b border-orange-50 bg-gradient-to-r from-white to-orange-50"
        >
          {/* Logo section with hover animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="w-32 md:w-32 h-12 md:h-32 relative rounded-lg overflow-hidden shadow-sm"
          >
            <Image
              src="/logo2.jpeg"
              alt="logo"
              fill={true}
              className="object-cover"
            />
          </motion.div>

          {/* Navigation options with enhanced styling and animations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden sm:flex h-full items-center justify-center"
          >
            <ul className="flex justify-center items-center gap-6 md:gap-8">
              {/* Enhanced nav items with hover effects */}
              <motion.li
                whileHover={{ scale: 1.1, color: "#ea580c" }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 font-medium cursor-pointer px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-orange-50"
              >
                Home
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.1, color: "#ea580c" }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 font-medium cursor-pointer px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-orange-50"
              >
                About
              </motion.li>
            </ul>
          </motion.div>

          {/* Mobile menu button for responsive design */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="sm:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <div className="w-6 h-0.5 bg-gray-600"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </motion.button>
        </motion.div>

        {/* Enhanced header section with better typography and animations */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="  w-full lg:w-3/5 xl:w-1/2 h-auto p-4 md:p-6 lg:px-8 lg:py-1"
        >
          {/* Main heading with staggered text animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className=" text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 1leading-tight bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent"
          >
            Take a Health Quiz
          </motion.h1>

          {/* Subtitle with fade-in animation */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed font-medium"
          >
            Answer a few questions to check your health status and get
            personalized insights
          </motion.p>

          {/* Added progress indicator for better UX */}
          {/* <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6 md:mt-8"
          >
            <div className="w-full bg-orange-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full w-0 transition-all duration-500"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Step 1 of 3: Getting Started
            </p>
          </motion.div> */}
        </motion.div>

        {/* Enhanced main content area with better responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="   w-full flex-1 flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 md:p-6 lg:p-2 gap-6 lg:gap-8"
        >
          {/* Component container with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="  w-full 1lg:w-2/3 1min-h-[300px] bg-gradient-to-br  to-white rounded-2xl p-1 1shadow-lg "
          >
            {/* UserDetails component will be uncommented and rendered here */}
            {currentComponent === "Details" ? (
              <QuestionTab
                question={questions[currentIndex] as Question}
              ></QuestionTab>
            ) : (
              <UserDetails></UserDetails>
            )}
            {/* <UserDetails></UserDetails> */}
            {/* <QuestionTab question={questions[0] as Question}></QuestionTab> */}
          </motion.div>

          {/* Enhanced image/illustration section , image will go here */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className={` ${
              currentComponent === "Questions" ? "" : "hidden"
            }  w-full sm:w-1/2 m-auto lg:w-1/3 h-48 md:h-64 lg:h-80 bg-gradient-to-br from-orange-100 via-orange-50 to-white rounded-2xl shadow-lg border border-orange-100 flex items-center justify-center relative overflow-hidden`}
          >
            {/* Decorative background pattern */}
            <Image
              src="/image.jpg"
              alt="logo"
              fill={true}
              className=" object-top object-cover"
            />
            <div className="  1border-3 border-red-500  absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-orange-600/10"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default QuizPage;
