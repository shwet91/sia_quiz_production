import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  reducers: {
    updateCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
      console.log("recived in payload :" , action.payload);
    },
  },
});

export const { updateCurrentQuestionIndex } = quizSlice.actions;

export default quizSlice.reducer;
