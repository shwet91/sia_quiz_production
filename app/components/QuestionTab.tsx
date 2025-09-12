import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  updateCurrentQuestionIndex,
  updateAnswer,
  removeAnswer,
  updateQuestionFlow,
  removeQuestionFlow,
} from "../store/quizSlice";

type Answer = {
  answer: string;
  next: number;
  priority: number;
};

export type Question = {
  id: number;
  question: string;
  type?: "multiSelection" | "singleSelection" | null;
  renderingConditionType: "simple" | "complex";
  renderingCondition: string[];
  options: Answer[];
  conditionalTrueNext: number;
  conditionalFalseNext: number;
};

function QuestionTab({
  question = {
    id: 10,
    question: "What1 do you want support with?",
    type: "multiSelection",
    renderingConditionType: "simple",
    renderingCondition: [],
    conditionalTrueNext: 12,
    conditionalFalseNext: 13,
    options: [
      {
        answer: "Yes, book a free call",
        next: 0,
        priority: 0,
      },
      {
        answer: "Yes, WhatsApp me",
        next: 0,
        priority: 0,
      },
      {
        answer: "Maybe later",
        next: 0,
        priority: 0,
      },
      {
        answer: "No thanks",
        next: 0,
        priority: 0,
      },
    ],
  },
}: {
  question: Question;
}) {
  const [currentSelectedAnswers, setCurrentSelecetedAnswers] = useState<
    Answer[]
  >([]);

  const [next, setNext] = useState<number>(0);
  const dispatch = useDispatch();

  const savedAnswers = useSelector((store: RootState) => store.quiz.answers);
  const quesstionFlow = useSelector(
    (store: RootState) => store.quiz.questionFlow
  );

  useEffect(() => {
    // question.options.forEach((e) => {
    //   if (savedAnswers.includes(e.answer)) {
    //     dispatch(removeAnswer(e.answer));
    //   }
    // });

    question.options.forEach((e) => {
      if (savedAnswers.includes(e.answer)) {
        setCurrentSelecetedAnswers((prev) => [...prev, e]);
        dispatch(removeAnswer(e.answer));
      }
    });
  }, [savedAnswers, question.options]);

  const nextBtnHandler = () => {
    dispatch(updateQuestionFlow(question.id));
    dispatch(updateCurrentQuestionIndex(next));
    if (currentSelectedAnswers.length > 0) {
      currentSelectedAnswers.forEach((e) => {
        dispatch(updateAnswer(e.answer));
      });
    }

    setCurrentSelecetedAnswers([]);
  };

  const backBtnHandler = () => {
    if (question.id === 0) return;

    setCurrentSelecetedAnswers([]);
    dispatch(removeQuestionFlow());
    const backQuestionIndex = quesstionFlow.length - 1;
    dispatch(updateCurrentQuestionIndex(quesstionFlow[backQuestionIndex]));
  };

  const answerSelector = (ans: Answer) => {
    // set the answer
    if (question.type === "multiSelection") {
      setCurrentSelecetedAnswers((prev) => {
        if (prev.includes(ans)) {
          return prev.filter((e) => e !== ans);
        } else {
          return [...prev, ans];
        }
      });
    } else {
      setCurrentSelecetedAnswers([ans]);
    }
  };

  useEffect(() => {
    // set the next question
    if (question.renderingConditionType === "simple") {
      const priorities = currentSelectedAnswers.map((e) => e.priority);
      const maxPriority = Math.max(...priorities);
      currentSelectedAnswers.forEach((e) => {
        if (e.priority === maxPriority) setNext(e.next);
      });
    } else {
      let isConditionTrue = false;
      question.renderingCondition.forEach((e) => {
        if (savedAnswers.includes(e)) {
          isConditionTrue = true;
        }
      });

      if (isConditionTrue) {
        setNext(question.conditionalTrueNext);
      } else {
        setNext(question.conditionalFalseNext);
      }
    }
  }, [
    currentSelectedAnswers,
    question.renderingConditionType,
    question.conditionalFalseNext,
    question.conditionalTrueNext,
    savedAnswers,
    question.renderingCondition,
  ]);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Calculate form completion percentage
  const getCompletionPercentage = () => {
    const requiredFields = ["name", "email", "age", "gender"];
    const filledFields = 1;
    return (filledFields / requiredFields.length) * 100;
  };
  return (
    <div className=" w-full max-w-4xl 1mx-auto h-auto 1max-h-[70vh] flex flex-col justify-between p-1 1sm:p-8 1bg-gradient-to-br relative 1overflow-hidden">
      <div className="  relative z-10 flex flex-col justify-between h-full min-h-[400px]">
        {/* Enhanced Progress Bar with completion percentage */}
        <motion.div variants={itemVariants}>
          <div className=" border1 w-full bg-orange-100 rounded-full h-3 mb-1 overflow-hidden shadow-inner">
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
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
          <p className="text-center text-sm text-orange-600 font-medium mb-1">
            {Math.round(getCompletionPercentage())}% Complete
          </p>
        </motion.div>

        {/* Question Header Section */}
        <div className=" border1 mb-6 sm:mb-0">
          {/* Main question text */}
          <h1 className=" text-xl sm:text-2xl lg:text-3xl font-bold text-center 1leading-tight text-gray-800 max-w-3xl mx-auto px-2">
            {question.question}
          </h1>

          {/* Helpful instruction text */}
          {/* <p className="text-center text-gray-500 text-sm mt-3">
            {question.type === "multiSelection"
              ? "You can select multiple options"
              : "Please select one option"}
          </p> */}
        </div>

        {/* Options Section */}
        <div className="  flex-1 mb-6 sm:mb-0">
          {question.options.length > 0 ? (
            <div className="  flex flex-col gap-1 max-w-4xl mx-auto">
              {question.options.map((ans, index) => (
                <div key={index} className=" group cursor-pointer">
                  {/* Option card with checkbox */}
                  <div
                    className=" sm:w-1/2 flex items-center space-x-4 p-4 sm:p-1 relative overflow-hidden"
                    onClick={() => answerSelector(ans)}
                  >
                    {/* Custom styled checkbox */}
                    <div className=" relative z-10">
                      <div className=" w-5 h-5 border-2 border-orange-300 rounded-md bg-white flex items-center justify-center transition-all duration-200 group-hover:border-orange-500">
                        {/* Checkbox inner circle - you'll control this visibility with your logic */}
                        <div
                          className={` w-3 h-3 bg-orange-500 rounded-sm ${
                            currentSelectedAnswers.includes(ans)
                              ? ""
                              : "opacity-0"
                          } `}
                        />
                      </div>
                    </div>

                    {/* Option text */}
                    <div className="relative z-10 flex-1">
                      <p className="text-gray-700 text-base sm:text-md font-medium group-hover:text-gray-800 transition-colors duration-200">
                        {ans.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Navigation Buttons Section */}
        <div className=" 1bg-amber-400 xl:absolute bottom-0 right-0 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center ">
          {/* Back Button */}
          <button
            onClick={backBtnHandler}
            className="group w-full sm:w-auto px-8 py-3 sm:py-4 rounded-xl font-semibold text-base bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-md min-w-32 relative overflow-hidden"
          >
            <span className="flex items-center justify-center space-x-2 relative z-10">
              <span className="group-hover:-translate-x-1 transition-transform duration-200">
                ←
              </span>
              <span>Back</span>
            </span>

            {/* Button hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-gray-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextBtnHandler}
            className="group w-full sm:w-auto px-10 py-3 sm:py-4 rounded-xl font-bold text-base bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg min-w-32 relative overflow-hidden"
          >
            <span className="flex items-center justify-center space-x-2 relative z-10">
              <span>Next</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </span>

            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
          </button>
        </div>
      </div>

      <button
        className=""
        onClick={() => {
          console.log("answers :", savedAnswers);
          // console.log("current :", currentSelectedAnswers);
          console.log("flow :", quesstionFlow);
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default QuestionTab;
