import {
	configureStore,
	createSlice,
	PayloadAction,
	createAsyncThunk,
	current,
} from '@reduxjs/toolkit'
import { users, questions, _getQuestions, _getUsers } from '../data/__DATA__'
import { questionI, UserI } from '../interface/interface'
const user = Object.entries(users)

const questionArr = Object.entries(questions)

// slice for au†h
const auth = {
	isLogin: false,
	userInfo: {
		id: '',
		name: '',
		avatarURL: '',
		answers: [],
		questions: [],
	},
}

const authSlice = createSlice({
	name: 'Auth',
	initialState: auth,
	reducers: {
		loggedIn: (state: any, action: PayloadAction<any>) => {
			return {
				...auth,
				isLogin: true,
				userInfo: action.payload,
			}
		},
		loggedOut: () => {
			return {
				...auth,
			}
		},
		addCurrentUser: (state: any, action: PayloadAction<any>) => {
			return {
				...auth,
				userInfo: action.payload,
				isLogin: false,
			}
		},
		addUserAnsweredQuestion: (state: any, action: PayloadAction<any>) => {
			return {
				...state,
				isLogin: true,
				userInfo: {
					...state.userInfo,
					answers: {
						...state.userInfo.answers,
						[Object.entries(action.payload)[0][0]]: Object.entries(
							action.payload,
						)[0][1],
					},
				},
			}
		},
		formatQuestion: (state: any, action: PayloadAction<any>) => {
			return {
				...auth,
				userInfo: {
					...auth.userInfo,
					questions: action.payload,
				},
				isLogin: true,
			}
		},
	},
})
export const {
	loggedIn,
	loggedOut,
	addCurrentUser,
	formatQuestion,
	addUserAnsweredQuestion,
} = authSlice.actions
// slice for getAllUser
const allUser: UserI[] = []
export const getAllUser = createAsyncThunk('getAllUser', async () => {
	return await _getUsers().then((data) => data)
})
const userSlice = createSlice({
	name: 'User',
	initialState: allUser,
	reducers: {
		modifyUser: (state: UserI[], action: PayloadAction<UserI[]>) => {
			return action.payload
		},
		modifyQuestion: (state: UserI[], action: PayloadAction<UserI[]>) => {
			return action.payload
		},
	},
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
				}
			})
		})
	},
})
export const { modifyUser, modifyQuestion } = userSlice.actions
const notFoundList = []
const NotFoundSlice = createSlice({
	name: '404NotFound',
	initialState: notFoundList,
	reducers: {
		addToNotFoundList: (state, action: PayloadAction<any>) => {
			return state.concat(action.payload)
		},
	},
})
export const { addToNotFoundList } = NotFoundSlice.actions

// slice for all question

export const getAllQuestion = createAsyncThunk('getAllQuestion', async () => {
	return await _getQuestions().then((data) => data)
})
const allQuestion: questionI[] = []
const questionSlice = createSlice({
	name: 'Question',
	initialState: allQuestion,
	reducers: {
		addNewQuestion: (state: questionI[], action: PayloadAction<questionI>) => {
			return state.concat(action.payload)
		},
	},
	extraReducers(builder) {
		builder.addCase(getAllQuestion.fulfilled, (state, action) => {
			return Object.entries(action.payload).map((item: any, index: number) => {
				return { ...item[1], username: item[0] }
			})
		})
	},
})
export const { addNewQuestion } = questionSlice.actions
const unAnsweredQuestionArr: questionI[] = []
const unAnsweredQuestion = createSlice({
	name: 'UnAnsweredQuestion',
	initialState: unAnsweredQuestionArr,
	reducers: {
		addUnAnsweredQuestion: (
			state: questionI[],
			action: PayloadAction<questionI>,
		) => {
			return state.concat(action.payload)
		},
		initialunAnsweredQuestion: (
			state: questionI[],
			action: PayloadAction<questionI[]>,
		) => {
			return action.payload
		},
	},
})
export const { addUnAnsweredQuestion, initialunAnsweredQuestion } =
	unAnsweredQuestion.actions

const answeredQuestionArr: questionI[] = []
const answeredQuestion = createSlice({
	name: 'answeredQuestion',
	initialState: answeredQuestionArr,
	reducers: {
		addAnsweredQuestion: (
			state: questionI[],
			action: PayloadAction<questionI>,
		) => {
			return state.concat(action.payload)
		},
		initialAnsweredQuestion: (
			state: questionI[],
			action: PayloadAction<questionI[]>,
		) => {
			return action.payload
		},
	},
})
export const { addAnsweredQuestion, initialAnsweredQuestion } =
	answeredQuestion.actions
export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		question: questionSlice.reducer,
		auth: authSlice.reducer,
		notFoundList: NotFoundSlice.reducer,
		unAnsweredQuestion: unAnsweredQuestion.reducer,
		answeredQuestion: answeredQuestion.reducer,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
