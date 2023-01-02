import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects'
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import createAppSaga from './saga';

const mainSaga = createAppSaga();

const sagaMiddleWare = createSagaMiddleware();
const store = configureStore({
  reducer: combineReducers({ user: reducer }),
  middleware: [sagaMiddleWare],
});

function* rootSaga(){
  yield all([mainSaga()])
}

sagaMiddleWare.run(rootSaga);

export default store;