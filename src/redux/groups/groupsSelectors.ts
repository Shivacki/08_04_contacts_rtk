import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { RootState } from 'src/redux/store'


export const selectGroupsData = (state: RootState): GroupContactsDto[] => state.groups.data;
export const selectGroupsIsLoading = (state: RootState) => state.groups.isLoading;
export const selectGroupsError = (state: RootState) => state.groups.error;
