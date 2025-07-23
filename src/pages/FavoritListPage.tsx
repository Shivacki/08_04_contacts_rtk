import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import { selectContactsData, selectFavorites } from 'src/store/contacts'
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {ContactDto} from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';


export const FavoritListPage = () => {
  const [contacts, setContacts] = useState<ContactDto[]>([])
  const contactsDataStore: ContactDto[] = useSelector(selectContactsData);
  const favoritesDataStore: FavoriteContactsDto = useSelector(selectFavorites);

  
  useEffect(() => {
    setContacts(() => contactsDataStore.filter(({id}) => favoritesDataStore.includes(id)));
  }, [contactsDataStore, favoritesDataStore])
  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
}
