import React, {FC, useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import { selectContactsData } from 'src/store/contacts'
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';


// export const ContactPage: FC<CommonPageProps> = ({ contactsState }) => {
export const ContactPage: FC = () => {
  const contactsStoreState: ContactDto[] = useSelector(selectContactsData);
  const contactsInitialState = contactsStoreState;  // contactsState[0]

  const {contactId} = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<ContactDto>();

  useEffect(() => {
    setContact(() => contactsInitialState.find(({id}) => id === contactId));
  }, [contactId, contactsInitialState]);

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
