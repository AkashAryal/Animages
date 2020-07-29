import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import booruSlice from './Booru/BooruSlice';
import authSlice from '../components/auth/authSlice';

export const store = configureStore({
  reducer: {
    booru: booruSlice,
    auth: authSlice
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
