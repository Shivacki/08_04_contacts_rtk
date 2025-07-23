import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { selectContactsData, selectContactsError, selectContactsIsLoading } from 'src/store/contacts'
import { selectGroupsData } from 'src/store/groups'
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';


export const ContactListPage = () => {
  
  // console.log('render ContactListPage');
  
  const contactsDataStore: ContactDto[] = useSelector(selectContactsData);
  // console.log('ContactListPage contactsDataStore: ', contactsDataStore);

  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);

  const groupsDataStore: GroupContactsDto[] = useSelector(selectGroupsData);
  

  const [contacts, setContacts] = useState<ContactDto[]>(contactsDataStore);
  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = contactsDataStore;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({name}) => (
        name.toLowerCase().indexOf(fvName) > -1
      ))
    }

    if (fv.groupId) {
      const groupContacts = groupsDataStore.find(({id}) => id === fv.groupId);

      if (groupContacts) {
        findContacts = findContacts.filter(({id}) => (
          groupContacts.contactIds.includes(id)
        ))
      }
    }

    setContacts(findContacts)
  }


  useEffect(() => {
    // Обновляем лок. сост-е при изм-ии данных хранилища (например, после fetchContactsThunk)
    if (!!contactsDataStore)
      setContacts(contactsDataStore);
  }, [contactsDataStore])


  if (isLoading)
    return <>Загрузка контактов...</>
  if (!!error)
    return <>Ошибка при загрузке контактов</>

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groupsDataStore} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {contacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
