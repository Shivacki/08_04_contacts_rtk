import { ContactsAction, ContactsActionTypes } from './contactsActions'
import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';


interface ContactsStoreState {
  data: ContactDto[];
  isLoading: boolean;
  error: string | null;
  favorites: FavoriteContactsDto,  // Избранные контакты
}

export const initialState: ContactsStoreState = {
  data: [],
  isLoading: false,
  error: null,
  favorites: [],
}

const contactsReducer = (state: ContactsStoreState = initialState, action: ContactsAction): ContactsStoreState => {
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
