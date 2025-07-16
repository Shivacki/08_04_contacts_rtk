import { GroupsAction, GroupsActionTypes } from './groupsActions'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';


interface GroupsStoreState {
  data: GroupContactsDto[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: GroupsStoreState = {
  data: [],
  isLoading: false,
  error: null,
}

const groupsReducer = (state: GroupsStoreState = initialState, action: GroupsAction): GroupsStoreState => {
  switch (action.type) {

    case GroupsActionTypes.GET_GROUPS_PENDING:
      // console.log(GroupsActionTypes.GET_GROUPS_PENDING);
      return {
        ...state,
        isLoading: true,
        error: null,
      } 
    case GroupsActionTypes.GET_GROUPS_FULFILLED: 
      // console.log(GroupsActionTypes.GET_GROUPS_FULFILLED, 'payload:', action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload as GroupContactsDto[],
        error: null,
      };
    case GroupsActionTypes.GET_GROUPS_REJECTED: 
      // console.log(GroupsActionTypes.GET_GROUPS_REJECTED, 'payload:', action.payload);
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };
    
    default:
      return state;
  }
}

export default groupsReducer
