import { GET_USER, GET_TASKS, SET_MODAL_STATE, SET_LOG_VIEW_STATE, GET_TASK_TIME } from "./type";


const initialState = Object.freeze({
    user:{},
    tasks: [],
    modalState: false,
    logViewState: false,
    durationMap: {},
    dailyTimeMap: {},
});


export default function reducer (state = initialState, action){
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.user
                }
            };
        case GET_TASKS:
            return {
                ...state,
                tasks: action.tasks.sort((a, b) => a.taskId - b.taskId)
            }
        case SET_MODAL_STATE:
            return {
                ...state,
                modalState: action.state
            }
        case SET_LOG_VIEW_STATE:
            return {
                ...state,
                logViewState: action.state
            }
        case GET_TASK_TIME:
            return {
                ...state,
                durationMap: action.taskTime.durationMap,
                dailyTimeMap: action.taskTime.dailyTimeMap,
            }
        default:
            return state;
    }
}