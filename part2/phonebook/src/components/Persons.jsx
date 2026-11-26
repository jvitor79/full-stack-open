const Persons = ({ filteredPersons }) => {
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
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default Persons