import { createSlice } from '@reduxjs/toolkit';
import { ContactsAction, ContactsActionTypes, fetchContactsAsyncThunk } from './contactsActions'
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

const contactsReducer = (state: ContactsStoreState = initialStateContacts, action: ContactsAction): ContactsStoreState => {
  switch (action.type) {

    case ContactsActionTypes.GET_CONTACTS_PENDING:
      // console.log(ContactsActionTypes.GET_CONTACTS_PENDING);
      return {
        ...state,
        isLoading: true,
        error: null,
      } 
    case ContactsActionTypes.GET_CONTACTS_FULFILLED: 
      // console.log(ContactsActionTypes.GET_CONTACTS_FULFILLED, 'payload:', action.payload);
      const newData = action.payload as ContactDto[];
      return {
        ...state,
        isLoading: false,
        data: newData,
        favorites: [newData[0].id, newData[1].id, newData[2].id, newData[3].id],  // список Избранных контактов всегда фиксированный
        error: null,
      };
    case ContactsActionTypes.GET_CONTACTS_REJECTED: 
      // console.log(ContactsActionTypes.GET_CONTACTS_REJECTED, 'payload:', action.payload);
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };
    
    default:
      return state;
  }
}

export default contactsReducer

export const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState: initialStateContacts,
  //  Редуктор/редьюсер для синхронных действий
  reducers: {

  },
  //  Редуктор/редьюсер для асинхронных действий
  extraReducers(builder) {
    
    builder.addMatcher(
      fetchContactsAsyncThunk.pending.match,
      (state, action) => {
        // console.log('fetchContactsAsyncThunk.pending');
        // Формируем новый state (immer внутури rtk решит заменит мутирование на полностью новый state)
        state.isLoading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      fetchContactsAsyncThunk.fulfilled.match,
      (state, action) => {
        const newData = action.payload as ContactDto[];
        // Формируем новый state (immer внутури rtk решит заменит мутирование на полностью новый state)
        state.isLoading = false;
        // Временно отключаем соотв. правило eslint, т.к. он "не знает", что здесь исп-ется immer
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        state.data = newData,
        state.favorites = [newData[0].id, newData[1].id, newData[2].id, newData[3].id],  // список Избранных контактов всегда фиксированный
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

    builder.addMatcher(
      fetchContactsAsyncThunk.rejected.match,
      (state, action) => (
        {
          isLoading: false,
          error: action.payload as string,
        } as ContactsStoreState
      )
    );

  },
})