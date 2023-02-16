import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { appSaga } from '../redux/AppSaga';
import appReducer from '../redux/AppSlice';

const sagaMiddleware = createSagaMiddleware({ context: { life: `bowl of cherries` } });
const combinedReducers = combineReducers({
  appState: appReducer,
});
const rootReducer = (state: any, action: any) => {
  return combinedReducers(state, action);
};
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(appSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
