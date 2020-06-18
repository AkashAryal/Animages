import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import logger from 'redux-logger';
import booruSlice from '../features/Booru/BooruSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    booru: booruSlice
  },
  middleware: [...getDefaultMiddleware(), logger]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
