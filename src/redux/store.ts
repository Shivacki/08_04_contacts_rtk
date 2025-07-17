import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, Action } from 'redux'
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
// import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit';

import { contactsSlice } from './contacts'
import { groupsSlice } from './groups'


const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  groups: groupsSlice.reducer,
  // groups: groupsReducer,
});

// Определение RootState на основе корневого редьюсера
export type RootState = ReturnType<typeof rootReducer>;

// Создаем redux-store
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  // Формируем список middleware
  // ... thunk из redux-thunk (для выполнения асинхр. запросов в экосистеме redux) уже есть в списке default-middleware
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


// Создаем хук для доступа к dispatch с правильной типизацией
export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, Action>>  // или UnknownAction из @reduxjs/toolkit

// Альтернативы:
// export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, Action>>  // ThunkDispatch из redux-thunk

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;

// Определяем тип для AppDispatch, включая thunk-функции
// export type AppDispatch = typeof store.dispatch & {
//   <R, T>(thunk: ThunkAction<R, RootState, any, any>): R;  // ThunkAction из @reduxjs/toolkit
// }
// export const useAppDispatch = () => useDispatch<AppDispatch>();

