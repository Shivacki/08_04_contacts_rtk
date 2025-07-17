import { createSlice } from '@reduxjs/toolkit';
import { fetchContactsAsyncThunk } from './contactsActions'
import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';


interface ContactsStoreState {
  data: ContactDto[];
  isLoading: boolean;
  error: string | null;
  favorites: FavoriteContactsDto,  // Избранные контакты
}

export const initialStateContacts: ContactsStoreState = {
  data: [],
  isLoading: false,
  error: null,
  favorites: [],
}

export const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState: initialStateContacts,
  
  //  Редуктор/редьюсер для синхронных действий
  reducers: {

  },
  
  //  Редуктор/редьюсер для асинхронных действий
  extraReducers(builder) {
    
    // Запрос на получение контактов в пр-ссе выполнения
    builder.addMatcher(
      fetchContactsAsyncThunk.pending.match,
      (state, action) => {
        // console.log('fetchContactsAsyncThunk.pending');
        // Формируем новый state (immer внутури rtk заменит мутирование на новый state)
        state.isLoading = true;
        state.error = null;
      }
    );

    // Запрос на получение контактов выполнен успешно
    builder.addMatcher(
      fetchContactsAsyncThunk.fulfilled.match,
      (state, action) => {
        // console.log('fetchContactsAsyncThunk.fulfilled payload:', action.payload);
        const newData = action.payload as ContactDto[];
        // Формируем новый state (immer внутури rtk заменит мутирование на новый state)
        state.isLoading = false;
        // Временно отключаем соотв. правило eslint, т.к. он "не знает", что здесь неявно исп-ется immer
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        state.data = newData;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        state.favorites = [newData[0].id, newData[1].id, newData[2].id, newData[3].id];  // список Избранных контактов всегда фиксированный
        state.error = null;
        /*
        // При желании можно вернуть полностью новый state
        return {
          ...state,
          isLoading: false,
          data: newData,
          favorites: [newData[0].id, newData[1].id, newData[2].id, newData[3].id],  // список Избранных контактов всегда фиксированный
          error: null,
        } as ContactsStoreState
        */
      }
    );

    // Запрос на получение контактов завершен с ошибкой
    builder.addMatcher(
      fetchContactsAsyncThunk.rejected.match,
      (state, action) => {
        // console.log('fetchContactsAsyncThunk.rejected payload:', action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
      }
    );

  },
})