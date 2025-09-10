import React from "react";
import "../../styles/design.css";
import Image from "next/image";
// import QuestionTab from "@/app/components/QuestionTab";
import UserDetails from "@/app/components/UserDetails";

function QuizPage() {
  return (
    <div className="light-orange w-screen h-screen flex items-center justify-center">
      <div className="  w-[80%] h-[80%] bg-white rounded-2xl">
        {/* navbar */}
        <div className="border w-full h-15 flex justify-between items-center pl-5 p-2">
          {/* logo */}
          <div className="border w-40 h-full relative">
            <Image src="/logo.jpeg" alt="logo" fill={true}></Image>
          </div>
          {/* nav options */}
          <div className="border w-120 h-full flex items-center justify-center">
            <ul className="flex justify-center items-center gap-2">
              <li>Home</li>
              <li>About</li>
            </ul>
          </div>
        </div>

        <div className="border w-1/2 h-25 p-1">
          <h1 className="text-6xl mb-3">Take a Health Quiz</h1>
          <p>Answer a few questions to check your health status</p>
        </div>
        <div className="border w-full h-100 flex justify-between">
          {/* questions and user details component will render in this div */}
          <div className="border">
            {/* <UserDetails></UserDetails> */}
          </div>
          {/* image */}
          <div className="border w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
