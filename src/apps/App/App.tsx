import { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {Layout} from 'src/components/Layout';
import {ContactListPage, GroupPage, ContactPage, FavoritListPage, GroupListPage} from 'src/pages';

import { useContactsDispatch, fetchContactsThunk } from 'src/redux/contacts/contactsActions'
import { useGroupsDispatch, fetchGroupsThunk } from 'src/redux/groups/groupsActions'


export const App = () => {

  const dispatchContacts = useContactsDispatch();
  const dispatchGroups = useGroupsDispatch();
  
  useEffect(() => {
    // console.log('App useEffect []');
    
    // Асинхронная инициализация хранилища данными
    // ... Контакты
    dispatchContacts(fetchContactsThunk)
    // ... Группы контактов
    dispatchGroups(fetchGroupsThunk)
  }, [dispatchContacts, dispatchGroups])


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
