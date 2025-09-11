import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetails } from "../components/UserDetails";

interface initialState {
  userDetails: UserDetails;
  answers: string[];
  currentQuestionIndex: number;
  personalisedResponse: string;
  currentComponent: "Details" | "Questions"
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
  currentComponent: "Questions"
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    updateCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
      console.log("recived in payload :", action.payload);
    },
    updateUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload
    },
  },
});

export const { updateCurrentQuestionIndex , updateUserDetails } = quizSlice.actions;

export default quizSlice.reducer;
