import { createSlice } from '@reduxjs/toolkit';
import { fetchGroupsAsyncThunk } from './groupsActions'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';


interface GroupsStoreState {
  data: GroupContactsDto[];
  isLoading: boolean;
  error: string | null;
}

export const initialStateGroups: GroupsStoreState = {
  data: [],
  isLoading: false,
  error: null,
}

export const groupsSlice = createSlice({
  name: 'groupsSlice',
  initialState: initialStateGroups,
  
  //  Редуктор/редьюсер для синхронных действий
  reducers: {

  },
  
  //  Редуктор/редьюсер для асинхронных действий
  extraReducers(builder) {
    
    // Запрос на получение контактов в пр-ссе выполнения
    builder.addMatcher(
      fetchGroupsAsyncThunk.pending.match,
      (state, action) => {
        // Формируем новый state (immer внутури rtk заменит мутирование на новый state)
        state.isLoading = true;
        state.error = null;
      }
    );

    // Запрос на получение контактов выполнен успешно
    builder.addMatcher(
      fetchGroupsAsyncThunk.fulfilled.match,
      (state, action) => {
        // Формируем новый state (immer внутури rtk заменит мутирование на новый state)
        state.isLoading = false;
        state.data = action.payload as GroupContactsDto[];
        state.error = null;
      }
    );

    // Запрос на получение контактов завершен с ошибкой
    builder.addMatcher(
      fetchGroupsAsyncThunk.rejected.match,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      }
    );

  },
})