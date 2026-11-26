const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleAddPerson }) => {
  return (
    <form onSubmit={handleAddPerson}>
      <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td><input value={newName} onChange={handleNameChange} /></td>
          </tr>
          <tr>
            <td>number:</td>
            <td><input value={newNumber} onChange={handleNumberChange} /></td>
          </tr>
        </tbody>
      </table>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm