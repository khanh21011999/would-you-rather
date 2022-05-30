import { configureStore, createSlice } from "@reduxjs/toolkit";
import { users, questions } from "../data/__DATA__";
import { UserI } from "../interface/interface";
const user = Object.entries(users);
const formattedUser = user.map((item, index) => {
  return { ...item[1], username: item[0] };
});
const questionArr = Object.entries(questions);
const formattedQuestion = questionArr.map((item, index) => {
  return { ...item[1] };
});
const auth = {
  isLogin: false,
  userInfo: "",
};
const userSlice = createSlice({
  name: "User",
  initialState: formattedUser,
  reducers: {},
});
const authSlice = createSlice({
  name: "Auth",
  initialState: auth,
  reducers: {},
});
const questionSlice = createSlice({
  name: "Question",
  initialState: formattedQuestion,
  reducers: {},
});
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    question: questionSlice.reducer,
    auth: authSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
