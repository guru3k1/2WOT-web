import { all, call, put, takeLatest } from 'redux-saga/effects'
import apiUtils from './api';

import { FETCH_USER, GET_USER, GET_TASKS, START_TASK, SAVE_TASK, STOP_TASK, UPDATE_TASK, CLOSE_OPEN_TASK, GET_TIME_LOG_BY_TASK, GET_TASK_TIME } from './type';

const domain = "https://to-work-on-time.rj.r.appspot.com/api/v1"
//const domain = "http://localhost:8080/api/v1"

function* fetchUser() {

  const url = `${domain}/timeuser/getUser/`
  try {
    const response = yield call(apiUtils.get,url+1);
    if(response.data){
      yield put({type: GET_USER, user: response.data});
      yield put({type: GET_TASKS, tasks: response.data.userTasks})
    }else{
      throw new Error("User response is undefined")
    }
  } catch (e) {
    //console.log("Error getting user %d",e);
  }
}

function* startTask(action) {
  const url = `${domain}/task/startTaskTime`;
  try {
    const response = yield call(apiUtils.post,url,action.task)
    if(true){
      yield call(fetchUser)
    }
  }catch(e) {
    console.log("Error getting task started ",action.task)
  }
}

function* stopTask(action) {
  const url = `${domain}/task/stopTaskTime`;
  try {
    const response = yield call(apiUtils.post,url,action.task)
    if(true){
      yield call(fetchUser)
    }
  }catch(e) {
    console.log("Error getting task started ",action.task)
  }
}

function* saveTask(action) {
  const url = `${domain}/task/addTask`;
  try {
    const response = yield call(apiUtils.post,url,action.task)
    if(true){
      yield call(fetchUser)
    }
  }catch(e) {
    console.log("Error getting task started ",action.task)
  }
}

function* updateTask(action) {
  const url = `${domain}/task/updateTask`;
  try {
    const response = yield call(apiUtils.post,url,action.task)
    if(response && response.data.statusOk){
      yield call(fetchUser)
    }
    else{
      console.log("Error updating task response:",response.data.message)
    }
  }catch(e) {
    console.log("Error updating task ",action.task)
  }
}

function* closeTask(action){
  const url = `${domain}/task/closeTask`;
  try {
    const response = yield call(apiUtils.post,url,action.task)
    if(response && response.data.statusOk){
      yield call(fetchUser)
    }
    else{
      console.log("Error closing task response:",response.data.message)
    }
  }catch(e) {
    console.log("Error closing task ",action.task)
  }
}

function* getTaskTime(action){
  const url = `${domain}/task/getTaskTime`;
  try {
    const response = yield call(apiUtils.post,url,action.task)
    if(response && response.data.statusOk){
      yield put({type: GET_TASK_TIME, taskTime: response.data});
    }
    else{
      console.log("Error closing task response:",response.data.message)
    }
  }catch(e) {
    console.log("Error closing task ",action.task)
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