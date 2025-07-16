import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/redux/store'
import { createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import { FETCH_PATHS } from 'src/constants/fetchPaths'
import { loadJSON } from 'src/lib/jsonUtilities'
import { sleepAsync } from 'src/lib/commonUtilities'

import { ContactDto } from 'src/types/dto/ContactDto';



// export interface ContactsAction {
//   type: string;
//   payload?: any;
// }

export interface ContactsAction extends Action {
  // type: string;  // see Action: import { Action } from 'redux';
  payload?: any;
}

export enum ContactsActionTypes {
  // Actions: pending, fulfilled и rejected
  GET_CONTACTS_PENDING = 'GET_CONTACTS_PENDING',
  GET_CONTACTS_FULFILLED = 'GET_CONTACTS_FULFILLED',
  GET_CONTACTS_REJECTED = 'GET_CONTACTS_REJECTED',
}


// Типизированный useDispatch для исп-я вовне
export type ContactsDispatch = ThunkDispatch<RootState, any, ContactsAction>;
export const useContactsDispatch = () => useDispatch<ContactsDispatch>();

// Типизированная ф-я запроса данных с сервера в рамках redux thunk, к-ую можно передать в dispatch
export const fetchContactsThunk: ThunkAction<void, RootState, any, ContactsAction> = async (dispatch, getState) => {
  // ... логика thunk ...
  // const state = getState();
  // console.log("Current store state:", state);

  dispatch({ type: ContactsActionTypes.GET_CONTACTS_PENDING });
  try {
    const data = await loadJSON(FETCH_PATHS.contacts);
    
    // Имитация динамической загрузки локального json-файла
    // const { DATA_CONTACT } = await import('src/__data__');  // like static import in original MainApp.tsx, see src/__data__/index.ts
    // const data = DATA_CONTACT;
    // await sleepAsync(1000);  // имитация доп. задержки при загрузке

    dispatch({ type: ContactsActionTypes.GET_CONTACTS_FULFILLED, payload: data });
  } catch(err) {
    dispatch({ type: ContactsActionTypes.GET_CONTACTS_REJECTED, payload: (err as Error).message  });
  }
};


export const fetchContactsAsyncThunk = createAsyncThunk/*<
  ContactDto[], 
  void, 
  { 
    // dispatch: ContactsDispatch;
    state: RootState;     // Тип состояния, доступный в thunk через getState().
    rejectValue: string;  // Тип значения, которое будет возвращено при отклонении thunk
  }
>*/(
  'fetchContactsAsyncThunk',
  
  // /*
  async () => {
    console.log('fetchContactsAsyncThunk start ');
    // return []
    await sleepAsync(1000);  // имитация доп. задержки при загрузке
    return await loadJSON(FETCH_PATHS.contacts) as ContactDto[]; 
  }
  // */

  /*
  async (arg: any, thunkApi) => {
    console.log('fetchContactsAsyncThunk start ');
    try {
      await sleepAsync(1000);  // имитация доп. задержки при загрузке
      const data = await loadJSON(FETCH_PATHS.contacts); 
      console.log('fetchContactsAsyncThunk data: ', data);
      return data as ContactDto[];
      // return thunkAPI.fulfillWithValue(data as unknown);
      // return await loadJSON(FETCH_PATHS.contacts);
    } catch(err) {
      // Обработка ошибок
      return thunkApi.rejectWithValue((err as Error).message);
      // return (err as Error).message;
      // Без try-catch в редьюсер отправится err ???
    }
  }
  */
);

