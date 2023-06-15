import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'
import NameFilter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const hook = () => {
    phonebookService
      .getAll()
      .then(data => setPersons(data))
      .catch(error => {
        setNotification({
          message: `Couldn't fetch data from server`,
          className: 'error'
        })
      })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase())
  }

  const displayPersons = persons.filter(p => p.name.toLowerCase().includes(nameFilter))

  const addName = (event) => {
    event.preventDefault()

    const existingRecord = persons.find(p => p.name === newName)
    if (existingRecord) {
      const confirmMessage = `${newName} is already added to phonebook, replace the old number with a new one?`

      if (window.confirm(confirmMessage)) {
        const updatedRecord = { ...existingRecord, number: newNumber }
        phonebookService
          .update(updatedRecord.id, updatedRecord)
          .then(response => {
            setPersons(persons.map(p => p.id !== updatedRecord.id ? p : response))
            setNewName('')
            setNewNumber('')
            setNotification({
              message: `Successfully updated number of ${updatedRecord.name}`,
              className: 'notification'
            })
            setTimeout(() => { setNotification(null) }, 5000)
          })
          .catch(error => {
            setNotification({
              message: `Couldn't update ${updatedRecord.name}, the record doesn't seem to exist anymore.`,
              className: 'error'
            })
            setTimeout(() => { setNotification(null) }, 5000)
            setPersons(persons.filter(p => p.id !== updatedRecord.id))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      phonebookService
        .create(newPerson)
        .then(savedPerson => {
          setPersons(persons.concat(savedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({
            message: `Added ${savedPerson.name}`,
            className: 'notification'
          })
          setTimeout(() => { setNotification(null) }, 5000)
        })
        .catch(error => {
          setNotification({
            message: `Couldn't save new entry on the server.`,
            className: 'error'
          })
          setTimeout(() => { setNotification(null) }, 5000)
        })
    }
  }

  const personDeleteHandlerFactory = (person) => {
    return () => {
      if (window.confirm(`Delete '${person.name}' ?`)) {
        phonebookService
          .deleteRecord(person.id)
          .then(response => {
            setPersons(persons.filter(p => p.id !== person.id))
            setNotification({
              message: `Deleted ${person.name}`,
              className: 'notification'
            })
            setTimeout(() => { setNotification(null) }, 5000)
          })
          .catch(error => {
            setNotification({
              message: `Couldn't delete ${person.name}, the record doesn't seem to exist anymore.`,
              className: 'error'
            })
            setTimeout(() => { setNotification(null) }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageObject={notification} />
      <NameFilter filter={nameFilter} filterChangeHandler={handleNameFilterChange} />

      <h2>Add a new number</h2>
      <PersonForm
        submitHanlder={addName}
        name={newName}
        nameChangeHandler={handleNameChange}
        number={newNumber}
        numberChangeHandler={handleNumberChange} />

      <h2>Numbers</h2>
      <PersonList
        persons={displayPersons}
        deleteHandlerFactory={personDeleteHandlerFactory}
      />
    </div>
  )
}

export default App