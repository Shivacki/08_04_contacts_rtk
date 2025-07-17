// import { Action } from 'redux'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_PATHS } from 'src/constants/fetchPaths'
import { loadJSON } from 'src/lib/jsonUtilities'
// import { sleepAsync } from 'src/lib/commonUtilities'
// import { ContactDto } from 'src/types/dto/ContactDto';


export interface ContactsAction {
  type: string;
  payload?: any;
}

/*
export interface ContactsAction extends Action {
  // type: string;  // see Action: import { Action } from 'redux';
  payload?: any;
}
*/

// Типизированная ф-я запроса данных с сервера в рамках redux toolkit async thunk, ее рез-т нужно передать в dispatch
export const fetchContactsAsyncThunk = createAsyncThunk/*<
  // При необх-ти можно типизировать работу ф-ии с пом. generic'а
  ContactDto[], 
  void, 
  { 
    state: RootState;     // Тип состояния, доступный в thunk через getState().
    rejectValue: string;  // Тип значения, которое будет возвращено при отклонении thunk
  }
>*/(
  'fetchContactsAsyncThunk',
  
  /**
   * Асинхр. ф-ия thunk'а. 
   * @param arg - м.б. исп-н чтобы передать сюда какие-либо пар-ры по месту вызова fetchContactsAsyncThunk (например, id для запроса). 
   *              В этом случае пар-р здесь д.б. типизирован
   * @param thunkApi - сервисный объект thunkApi (передачу его сюда обеспечивает сам redux)
   */
  async (arg, thunkApi) => {
    // console.log('fetchContactsAsyncThunk start');
    try {
      // await sleepAsync(1000);  // имитация доп. задержки при загрузке
      const data = await loadJSON(FETCH_PATHS.contacts);
      
      // Имитация динамической загрузки локального json-файла
      // const { DATA_CONTACT } = await import('src/__data__');  // like static import in original MainApp.tsx, see src/__data__/index.ts
      // const data = DATA_CONTACT;
      // console.log('fetchContactsAsyncThunk data: ', data);

      return data;  // as ContactDto[] - типизация здесь не обязательна
    } catch(err) {
      // console.log('fetchContactsAsyncThunk rejected');
      // Обработка ошибок
      return thunkApi.rejectWithValue((err as Error).message);
    }
  }
);

