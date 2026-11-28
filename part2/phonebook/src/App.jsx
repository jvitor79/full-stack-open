import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
  }, [])


  const handleAddPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      alert('Please fill in both name and number')
      setNewName('')
      setNewNumber('')
      return
    }

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService.update(existingPerson.id, { name: newName, number: newNumber })
            .then(data => {
              setPersons(persons.map(p => p.id === existingPerson.id ? data : p))
              setNotificationMessage(`Updated ${newName}'s number`)
              setIsError(false)
              setTimeout(() => setNotificationMessage(null), 8000)
            }).catch(error => {
              console.error(error)
              if (error.response && error.response.status === 404) {
                setNotificationMessage(`Information of ${newName} has already been removed from server`)
              } else {
                setNotificationMessage(`Failed to update ${newName}'s number`)
              }
              setIsError(true)
              setTimeout(() => setNotificationMessage(null), 8000)
              setPersons(persons.filter(p => p.id !== existingPerson.id))
            })
        }
      } else {
        setNotificationMessage(`${newName} is already added to phonebook`)
        setIsError(true)
        setTimeout(() => setNotificationMessage(null), 8000)
      }

      setNewName('')
      setNewNumber('')
      return
    }

    personService.create({ name: newName, number: newNumber })
      .then(data => {
        setPersons(persons.concat(data))
        setNotificationMessage(`Added ${newName}`)
        setIsError(false)
        setTimeout(() => setNotificationMessage(null), 8000)
      })

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} isError={isError} />

      <h3>Filter shown with</h3>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddPerson={handleAddPerson}
      />

      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App