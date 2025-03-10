import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormsData } from '../../interfaces/interface';

interface FormsState {
  submissions: FormsData[];
}

const initialState: FormsState = {
  submissions: [],
};

const formsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSubmission: (state, action: PayloadAction<FormsData>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { setSubmission } = formsSlice.actions;
export const formsReducer = formsSlice.reducer;
