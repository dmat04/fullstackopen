import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'
import NameFilter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook!`)
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
        })
    }
  }

  const personDeleteHandlerFactory = (person) => {
    return () => {
      if (window.confirm(`Delete '${person.name}' ?`)) {
        phonebookService
        .deleteRecord(person.id)
        .then(setPersons(persons.filter(p => p.id !== person.id)))
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

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