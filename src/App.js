import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([{name: "John Doe"}]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const newContactObject = {
      name : newName
    }

    setPersons(persons.concat(newContactObject));
    setNewName("");
    console.log(persons)
  }

  const nameEntered = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name : <input value={newName} onChange={nameEntered}/>  
        </div>
        
        <div>
          <button type="Submit" >Save Name</button>
        </div>
        <div>
          debug : {newName}
        </div>

        <h2>Contacts :</h2>
        <ul>
          {persons.map(person => <li key={person.name}>{person.name}</li>)}
        </ul>
      </form> 
    </div>
  )
}

export default App;