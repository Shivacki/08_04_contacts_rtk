import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/redux/store'
import { FETCH_PATHS } from 'src/constants/fetchPaths'
import { loadJSON } from 'src/lib/jsonUtilities'
// import { sleepAsync } from 'src/lib/commonUtilities'


export interface GroupsAction {
  type: string;
  payload?: any;
}

export enum GroupsActionTypes {
  // Actions: pending, fulfilled и rejected
  GET_GROUPS_PENDING = 'GET_GROUPS_PENDING',
  GET_GROUPS_FULFILLED = 'GET_GROUPS_FULFILLED',
  GET_GROUPS_REJECTED = 'GET_GROUPS_REJECTED',
}


// Типизированный useDispatch для исп-я вовне
export type GroupsDispatch = ThunkDispatch<RootState, null, GroupsAction>;
export const useGroupsDispatch = () => useDispatch<GroupsDispatch>();

// Типизированная ф-я запроса данных с сервера в рамках redux thunk, к-ую можно передать в dispatch
export const fetchGroupsThunk: ThunkAction<void, RootState, null, GroupsAction> = async (dispatch, getState) => {
  // ... логика thunk ...
  // const state = getState();
  // console.log("Current store state:", state);

  dispatch({ type: GroupsActionTypes.GET_GROUPS_PENDING });
  try {
    const data = await loadJSON(FETCH_PATHS.groups);
    
    // await sleepAsync(1000);  // имитация доп. задержки при загрузке

    dispatch({ type: GroupsActionTypes.GET_GROUPS_FULFILLED, payload: data });
  } catch(err) {
    dispatch({ type: GroupsActionTypes.GET_GROUPS_REJECTED, payload: (err as Error).message  });
  }
};

