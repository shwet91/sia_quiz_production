import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetails } from "../components/UserDetails";

interface initialState {
  userDetails: UserDetails;
  answers: string[];
  currentQuestionIndex: number;
  personalisedResponse: string;
  currentComponent: "Details" | "Questions";
  questionFlow: number[];
}

const initialState: initialState = {
  userDetails: {
    name: "",
    email: "",
    phoneNo: "",
    gender: "",
    age: "",
    countryCode: "",
  },
  answers: [],
  currentQuestionIndex: 0,
  personalisedResponse: "",
  currentComponent: "Details",
  questionFlow: []
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    updateCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
    updateUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
    updateAnswer: (state, action: PayloadAction<string>) => {
      state.answers.push(action.payload);
    },
    removeAnswer: (state, action: PayloadAction<string>) => {
      if (state.answers.includes(action.payload)) {
        const newAnswers = state.answers.filter((e) => e !== action.payload);
        state.answers = newAnswers;
      }
    },
    updateQuestionFlow: (state, action: PayloadAction<number>) => {
      state.questionFlow.push(action.payload);
    },
    removeQuestionFlow: (state) => {
      state.questionFlow.pop();
    },
    updateCurrentComponent: (
      state,
      action: PayloadAction<"Details" | "Questions">
    ) => {
      state.currentComponent = action.payload;
    },
  },
});

export const {
  updateCurrentQuestionIndex,
  updateUserDetails,
  updateAnswer,
  removeAnswer,
  updateQuestionFlow,
  removeQuestionFlow,
  updateCurrentComponent,
} = quizSlice.actions;

export default quizSlice.reducer;
