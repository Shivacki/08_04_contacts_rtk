import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_PATHS } from 'src/constants/fetchPaths'
import { loadJSON } from 'src/lib/jsonUtilities'
// import { sleepAsync } from 'src/lib/commonUtilities'


export interface GroupsAction {
  type: string;
  payload?: any;
}


// Типизированная ф-я запроса данных с сервера в рамках redux toolkit async thunk, ее рез-т нужно передать в dispatch
export const fetchGroupsAsyncThunk = createAsyncThunk(
  'fetchGroupsAsyncThunk',
  
  /**
   * Асинхр. ф-ия thunk'а. 
   * @param arg - м.б. исп-н чтобы передать сюда какие-либо пар-ры по месту вызова fetchContactsAsyncThunk (например, id для запроса). 
   *              В этом случае пар-р здесь д.б. типизирован
   * @param thunkApi - сервисный объект thunkApi (передачу его сюда обеспечивает сам redux)
   */
  async (arg, thunkApi) => {
    try {
      // await sleepAsync(1000);  // имитация доп. задержки при загрузке
      const data = await loadJSON(FETCH_PATHS.groups);
      return data;
    } catch(err) {
      // Обработка ошибок
      return thunkApi.rejectWithValue((err as Error).message);
    }
  }
);

