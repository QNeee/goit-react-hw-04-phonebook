
import { Form } from "./Form/Form";
import { nanoid } from 'nanoid'
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Container, Title } from "./App.styled";
import { useEffect, useState } from "react";

const stateMachine = {
  DELETING: "deleting",
  ADD: "add"
}
export const App = () => {
  const KEY = 'local-key';
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(KEY)) || [];
    if (localData.length > 0) {
      setContacts(localData);
    }
  }, [])
  useEffect(() => {
    if (status === stateMachine.ADD || status === stateMachine.DELETING) {
      return localStorage.setItem(KEY, JSON.stringify(contacts));
    }
  }, [status, contacts])
  const onChangeFilter = (value) => {
    setFilter(value);
  }
  const getFilteredContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))

  }
  const formSubmitHander = (data) => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number
    }
    const findContact = contacts.find(item => item.name.toLowerCase() === data.name.toLowerCase())
    if (!findContact) {
      setContacts([...contacts, newContact]);
      return setStatus(stateMachine.ADD)
    }
    return alert(`${data.name} is already in list`);
  }
  const onDelete = (id) => {
    setContacts(contacts => contacts.filter(item => item.id !== id));
    setStatus(stateMachine.DELETING);
  }
  return (<Container>
    <Title>Phonebook</Title>
    <Form onSubmit={formSubmitHander} />
    <Title>Contacts</Title>
    <Filter value={filter} onChange={onChangeFilter} />
    <ContactList contacts={getFilteredContacts()} deleteContact={onDelete} />
  </Container >)
}