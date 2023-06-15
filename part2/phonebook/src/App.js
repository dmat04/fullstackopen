import { useEffect, useState } from 'react'
import axios from 'axios'
import NameFilter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook!`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
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
      <PersonList persons={displayPersons} />
    </div>
  )
}

export default App