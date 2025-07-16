import { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'src/redux/store'


import {Layout} from 'src/components/Layout';
import {ContactListPage, GroupPage, ContactPage, FavoritListPage, GroupListPage} from 'src/pages';

import { ContactsDispatch, useContactsDispatch, fetchContactsThunk, fetchContactsAsyncThunk } from 'src/redux/contacts/contactsActions'
import { useGroupsDispatch, fetchGroupsThunk } from 'src/redux/groups/groupsActions'


export const App = () => {

  const dispatch = useAppDispatch();
  // const dispatch = useDispatch<ContactsDispatch>();
  const dispatchContacts = useContactsDispatch();
  const dispatchGroups = useGroupsDispatch();
  
  useEffect(() => {
    // console.log('App useEffect []');
    
    // Асинхронная инициализация хранилища данными
    // ... Контакты
    dispatch(fetchContactsAsyncThunk); // nothing
    // dispatchContacts(fetchContactsAsyncThunk)
    // dispatchContacts(fetchContactsThunk)
    // ... Группы контактов
    dispatchGroups(fetchGroupsThunk)
  }, [dispatchContacts, dispatchGroups, dispatch])


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
