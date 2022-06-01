import {
  configureStore,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  current,
} from "@reduxjs/toolkit";
import { users, questions, _getQuestions, _getUsers } from "../data/__DATA__";
import { questionI, UserI } from "../interface/interface";
const user = Object.entries(users);

const questionArr = Object.entries(questions);

// slice for au†h
const auth = {
  isLogin: false,
  userInfo: {
    id: "",
    name: "",
    avatarURL: "",
    answers: [],
    questions: [],
  },
};

const authSlice = createSlice({
  name: "Auth",
  initialState: auth,
  reducers: {
    loggedIn: (state: any, action: PayloadAction<any>) => {
      return {
        ...auth,
        isLogin: true,
        userInfo: action.payload,
      };
    },
    loggedOut: () => {
      return {
        ...auth,
      };
    },
    addCurrentUser: (state: any, action: PayloadAction<any>) => {
      return {
        ...auth,
        userInfo: action.payload,
        isLogin: false,
      };
    },
  },
});
export const { loggedIn, loggedOut, addCurrentUser } = authSlice.actions;
// slice for getAllUser
const allUser: UserI[] = [];
export const getAllUser = createAsyncThunk("getAllUser", async () => {
  return await _getUsers().then((data) => data);
});
const userSlice = createSlice({
  name: "User",
  initialState: allUser,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      // const user = Object.entries(action.payload).map((item: any, index) => {
      //   return {
      //     ...item[1],
      //     answers: Object.entries(item.answers).map((itemAnswers) => {
      //       return {
      //         ...itemAnswers,
      //         id: itemAnswers[0],
      //       };
      //     }),
      //   };
      // });

      return Object.entries(action.payload).map((item: any, index: any) => {
        return {
          ...item[1],
        };
      });
    });
  },
});

// slice for all question

export const getAllQuestion = createAsyncThunk("getAllQuestion", async () => {
  return await _getQuestions().then((data) => data);
});
const allQuestion: questionI[] = [];
const questionSlice = createSlice({
  name: "Question",
  initialState: allQuestion,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllQuestion.fulfilled, (state, action) => {
      return Object.entries(action.payload).map((item: any, index: number) => {
        return { ...item[1], username: item[0] };
      });
    });
  },
});
const unAnsweredQuestionArr: questionI[] = [];
const unAnsweredQuestion = createSlice({
  name: "UnAnsweredQuestion",
  initialState: unAnsweredQuestionArr,
  reducers: {
    addUnAnsweredQuestion: (
      state: questionI[],
      action: PayloadAction<questionI>
    ) => {
      return state.concat(action.payload);
    },
  },
});
export const { addUnAnsweredQuestion } = unAnsweredQuestion.actions;

const answeredQuestionArr: questionI[] = [];
const answeredQuestion = createSlice({
  name: "answeredQuestion",
  initialState: answeredQuestionArr,
  reducers: {
    addAnsweredQuestion: (
      state: questionI[],
      action: PayloadAction<questionI>
    ) => {
      return state.concat(action.payload);
    },
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    question: questionSlice.reducer,
    auth: authSlice.reducer,

    unAnsweredQuestion: unAnsweredQuestion.reducer,
    answeredQuestion: answeredQuestion.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { addAnsweredQuestion } = answeredQuestion.actions;
