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
  const [notificationMessage, setNotificationMessage] = useState(null)

  const hook = () => {
    phonebookService
      .getAll()
      .then(data => setPersons(data))
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
            setNotificationMessage(
              `Successfully updated number of ${updatedRecord.name}`
            )
            setTimeout(() => { setNotificationMessage(null) }, 5000)
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
          setNotificationMessage(`Added ${savedPerson.name}`)
          setTimeout(() => { setNotificationMessage(null) }, 5000)
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
            setNotificationMessage(`Deleted ${person.name}`)
            setTimeout(() => { setNotificationMessage(null) }, 5000)
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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