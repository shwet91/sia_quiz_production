import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  userDetails: userDetails;
  answers: string[];
  currentQuestionIndex: number;
  personalisedResponse: string;
}

const initialState: initialState = {
  userDetails: {
    name: "",
    email: "",
    phone: null,
    gender: null,
    age: null,
  },
  answers: [],
  currentQuestionIndex: 0,
  personalisedResponse: "",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
});

export default quizSlice.reducer;
