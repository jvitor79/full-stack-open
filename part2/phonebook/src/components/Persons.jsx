import personService from '../services/persons'

const Persons = ({ filteredPersons }) => {

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          window.location.reload()
        }).catch(error => {
          console.error('Failed to delete person:', error)
          alert(`Failed to delete ${name}`)
          window.location.reload()
          filteredPersons = filteredPersons.filter(person => person.id !== id)
        })
    }
  }

  return (
    <table>
        <thead>
          <tr>
            <th>Name</th> 
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersons.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default Persons