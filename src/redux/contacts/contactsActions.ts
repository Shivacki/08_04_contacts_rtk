import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/redux/store'
import { FETCH_PATHS } from 'src/constants/fetchPaths'
import { loadJSON } from 'src/lib/jsonUtilities'
// import { sleepAsync } from 'src/lib/commonUtilities'


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

export enum ContactsActionTypes {
  // Actions: pending, fulfilled и rejected
  GET_CONTACTS_PENDING = 'GET_CONTACTS_PENDING',
  GET_CONTACTS_FULFILLED = 'GET_CONTACTS_FULFILLED',
  GET_CONTACTS_REJECTED = 'GET_CONTACTS_REJECTED',
}


// Типизированный useDispatch для исп-я вовне
export type ContactsDispatch = ThunkDispatch<RootState, null, ContactsAction>;
export const useContactsDispatch = () => useDispatch<ContactsDispatch>();

// Типизированная ф-я запроса данных с сервера в рамках redux thunk, к-ую можно передать в dispatch
export const fetchContactsThunk: ThunkAction<void, RootState, null, ContactsAction> = async (dispatch, getState) => {
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


/*
// Альтернатива fetchContactsThunk
type ContactsThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  ContactsAction //Action
>;

// Типизированная ф-я запроса данных с сервера в рамках redux thunk, к-ую можно передать в dispatch
export const fetchContactsThunk_2 = (): ContactsThunk<Promise<void>> => async (dispatch, getState) => {
  // ... повторить здесь код fetchContactsThunk
};

// Пример использования:
// import { useDispatch } from 'react-redux';
// import { ContactsDispatch, fetchContactsThunk_2 } from 'src/redux/contacts/contactsActions'
// const dispatch = useDispatch<ContactsDispatch>();
// dispatch(fetchContactsThunk_2);
*/

