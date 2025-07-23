import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import { selectContactsData } from 'src/store/contacts'
import { selectGroupsData } from 'src/store/groups'
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';


export const GroupPage = () => {
  const {groupId} = useParams<{ groupId: string }>();
  const [contacts, setContacts] = useState<ContactDto[]>([]);
  const [groupContacts, setGroupContacts] = useState<GroupContactsDto>();

  const contactsDataStore: ContactDto[] = useSelector(selectContactsData);
  const groupsDataStore: GroupContactsDto[] = useSelector(selectGroupsData);


  useEffect(() => {
    const findGroup = groupsDataStore.find(({id}) => id === groupId);
    setGroupContacts(findGroup);
    setContacts(() => {
      if (findGroup) {
        return contactsDataStore.filter(({id}) => findGroup.contactIds.includes(id))
      }
      return [];
    });
  }, [groupId, contactsDataStore, groupsDataStore]);

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
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
        </>
      ) : <Empty />}
    </Row>
  );
}
// );
