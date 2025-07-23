import React from 'react';
import { useSelector } from 'react-redux'
import { selectGroupsData, selectGroupsError, selectGroupsIsLoading } from 'src/store/groups'
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';


export const GroupListPage = () => {
  
  const groupsDataStore: GroupContactsDto[] = useSelector(selectGroupsData);
  const isLoading = useSelector(selectGroupsIsLoading);
  const error = useSelector(selectGroupsError);


  if (isLoading)
    return <>Загрузка групп...</>
  if (!!error)
    return <>Ошибка при загрузке групп</>

  return (
    <Row xxl={4}>
      {groupsDataStore.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
}
