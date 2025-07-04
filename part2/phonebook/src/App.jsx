import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(setPersons)
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewPerson({ ...newPerson, [name]: value })
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook. Replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newPerson.number }

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
            setNewPerson({ name: '', number: '' })
          })
          .catch((error) => {
            alert(`Failed to update ${existingPerson.name}. It may have been removed.`)
            setPersons(persons.filter((p) => p.id !== existingPerson.id))
          })
      }

      return
    }

    personService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewPerson({ name: '', number: '' })
    })
}


  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      }).catch(() => {
        alert(`The person '${name}' was already deleted from the server.`)
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        person={newPerson}
        onChange={handleInputChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App
