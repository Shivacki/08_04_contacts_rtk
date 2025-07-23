import { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useAppDispatch } from 'src/store'


import {Layout} from 'src/components/Layout';
import {ContactListPage, GroupPage, ContactPage, FavoritListPage, GroupListPage} from 'src/pages';

import { fetchContactsAsyncThunk } from 'src/store/contacts/contactsActions'
import { fetchGroupsAsyncThunk } from 'src/store/groups/groupsActions'


export const App = () => {

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // console.log('App useEffect []');
    
    // Асинхронная инициализация хранилища данными
    // ... Контакты
    dispatch(fetchContactsAsyncThunk());
    // ... Группы контактов
    dispatch(fetchGroupsAsyncThunk());
  }, [dispatch])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ContactListPage/>} />
          <Route path="contact">
            <Route index element={<ContactListPage/>} />
            <Route path=":contactId" element={<ContactPage/>} />
          </Route>
          <Route path="groups">
            <Route index element={<GroupListPage/>} />
            <Route path=":groupId" element={<GroupPage/>} />
          </Route>
          <Route path="favorit" element={<FavoritListPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
