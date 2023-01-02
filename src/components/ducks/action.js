import { GET_USER, FETCH_USER, START_TASK, STOP_TASK, SAVE_TASK, SET_MODAL_STATE,
  UPDATE_TASK, GET_TIME_LOG_BY_TASK, CLOSE_OPEN_TASK, SET_LOG_VIEW_STATE, GET_TASK_TIME } from "./type";

export function getUser(user) {
    return { type: GET_USER, user }
  }

export function fetchUser() {
  return { type: FETCH_USER }
}

export function startTask(task) {
  return { type: START_TASK, task }
}

export function stopTask(task) {
  return { type: STOP_TASK, task }
}

export function saveTask(task) {
  return { type: SAVE_TASK, task }
}

export function updateTask(task) {
  return { type: UPDATE_TASK, task }
}

export function setModalState(state) {
  return { type: SET_MODAL_STATE, state}
}

export function setLogViewState(state) {
  return { type: SET_LOG_VIEW_STATE, state}
}

export function getTimeLogByTask(task) {
  return { type: GET_TIME_LOG_BY_TASK, task}
}

export function getTaskTime(taskTime) {
  return { type: GET_TASK_TIME, taskTime}
}

export function closeOpenTask(task) {
  return { type: CLOSE_OPEN_TASK, task}
}