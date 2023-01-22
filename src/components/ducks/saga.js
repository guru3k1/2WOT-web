import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import apiUtils from './api';
import { FETCH_USER, GET_USER, GET_TASKS, START_TASK, SAVE_TASK, STOP_TASK,
  UPDATE_TASK, CLOSE_OPEN_TASK, GET_TIME_LOG_BY_TASK, GET_TASK_TIME, SET_LOADING_STATE } from './type';
import { getUserSelector } from '../ducks/action';
const domain = "https://to-work-on-time.rj.r.appspot.com/api/v1"
//const domain = "http://localhost:8080/api/v1"

function* fetchUser() {
  const url = `${domain}/timeuser/getUser/`
  try {
    yield put({type: SET_LOADING_STATE, isLoading: true})
    const user = yield select(getUserSelector)
    if(user){
      const response = yield call(apiUtils.get,url+user.id);
      if(response.data){
        yield put({type: GET_USER, user: response.data});
        yield put({type: GET_TASKS, tasks: response.data.userTasks})
      }else{
        throw new Error("User response is undefined")
      }
      
    }else{
      console.error("Error getting user")
    }

  } catch (e) {
    console.error("Error getting user %d",e);
  }finally{
    yield put({type: SET_LOADING_STATE, isLoading: false})
  }
}

function* startTask(action) {
  const url = `${domain}/task/startTaskTime`;
  try {
    yield put({type: SET_LOADING_STATE, isLoading: true})
    const response = yield call(apiUtils.post,url,action.task)
    if(true){
      yield call(fetchUser)
    }
  }catch(e) {
    console.error("Error getting task started ",action.task)
  }finally{
    yield put({type: SET_LOADING_STATE, isLoading: false})
  }
}

function* stopTask(action) {
  const url = `${domain}/task/stopTaskTime`;
  try {
    yield put({type: SET_LOADING_STATE, isLoading: true})
    const response = yield call(apiUtils.post,url,action.task)
    if(true){
      yield call(fetchUser)
    }
  }catch(e) {
    console.error("Error stopping task ",action.task)
  }finally{
    yield put({type: SET_LOADING_STATE, isLoading: false})
  }
}

function* saveTask(action) {
  const url = `${domain}/task/addTask`;
  try {
    yield put({type: SET_LOADING_STATE, isLoading: true})
    const response = yield call(apiUtils.post,url,action.task)
    if(true){
      yield call(fetchUser)
    }
  }catch(e) {
    console.error("Error getting task started ",action.task)
  }finally{
    yield put({type: SET_LOADING_STATE, isLoading: false})
  }
}

function* updateTask(action) {
  const url = `${domain}/task/updateTask`;
  try {
    yield put({type: SET_LOADING_STATE, isLoading: true})
    const response = yield call(apiUtils.post,url,action.task)
    if(response && response.data.statusOk){
      yield call(fetchUser)
    }
    else{
      console.error("Error updating task response:",response.data.message)
    }
  }catch(e) {
    console.error("Error updating task ",action.task)
  }finally{
    yield put({type: SET_LOADING_STATE, isLoading: false})
  }
}

function* closeTask(action){
  const url = `${domain}/task/closeTask`;
  try {
    yield put({type: SET_LOADING_STATE, isLoading: true})
    const response = yield call(apiUtils.post,url,action.task)
    if(response && response.data.statusOk){
      yield call(fetchUser)
    }
    else{
      console.error("Error closing task response:",response.data.message)
    }
  }catch(e) {
    console.error("Error closing task ",action.task)
  }finally{
    yield put({type: SET_LOADING_STATE, isLoading: false})
  }
}

function* getTaskTime(action){
  const url = `${domain}/task/getTaskTime`;
  try {
    yield put({type: SET_LOADING_STATE, isLoading: true})
    const response = yield call(apiUtils.post,url,action.task)
    if(response && response.data.statusOk){
      yield put({type: GET_TASK_TIME, taskTime: response.data});
    }
    else{
      console.error("Error getting task time response:",response.data.message)
    }
  }catch(e) {
    console.error("Error getting task time ",action.task)
  }finally{
    yield put({type: SET_LOADING_STATE, isLoading: false})
  }
}

const createAppSaga = () => 
  function* watchAll() {
    yield all([
      takeLatest(FETCH_USER, fetchUser),
      takeLatest(START_TASK, startTask),
      takeLatest(STOP_TASK, stopTask),
      takeLatest(SAVE_TASK, saveTask),
      takeLatest(UPDATE_TASK, updateTask),
      takeLatest(CLOSE_OPEN_TASK, closeTask),
      takeLatest(GET_TIME_LOG_BY_TASK, getTaskTime),
    ]);
};




export default createAppSaga;