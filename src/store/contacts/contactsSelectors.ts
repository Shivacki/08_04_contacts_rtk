import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';
import { RootState } from 'src/store'


export const selectContactsData = (state: RootState): ContactDto[] => state.contacts.data;
export const selectContactsIsLoading = (state: RootState) => state.contacts.isLoading;
export const selectContactsError = (state: RootState) => state.contacts.error;
export const selectFavorites = (state: RootState): FavoriteContactsDto => state.contacts.favorites;
