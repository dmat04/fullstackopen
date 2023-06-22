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

  const errorHandler = (error => {
    let errorMessage = `An error occured: ${error.message}`
    const status = error.response.status

    if (error.response.data.error) {
      if (status === 400) {
        errorMessage = error.response.data.error
      } else {
        errorMessage = `An error occured: ${error.response.data.error}`
      }
    }

    setNotification({
      message: errorMessage,
      className: 'error'
    })
    setTimeout(() => { setNotification(null) }, 5000)
  })

  const hook = () => {
    phonebookService
      .getAll()
      .then(data => setPersons(data))
      .catch(errorHandler)
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
          .catch(errorHandler)
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
        .catch(errorHandler)
    }
  }

  const personDeleteHandlerFactory = (person) => {
    return () => {
      if (window.confirm(`Delete '${person.name}' ?`)) {
        phonebookService
          .deleteRecord(person.id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== person.id))
            setNotification({
              message: `Deleted ${person.name}`,
              className: 'notification'
            })
            setTimeout(() => { setNotification(null) }, 5000)
          })
          .catch(errorHandler)
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