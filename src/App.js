import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([{name: "John Doe", number : "9999999999"}]);  // array of Objects to store contacts
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addName = (event) => {
    event.preventDefault();

    if(personExists(newName)){
      alert(`${newName} already present`);
      setNewName("");
      setNewNumber("");
      return;
    }

    if (numberExists(newNumber)){
      alert(`${newNumber} already present`);
      setNewName("");
      setNewNumber("");
      return;
    }

    const newContactObject = {                                  // object to hold form input
      name : newName,
      number : newNumber                                 
    } 
    setPersons(persons.concat(newContactObject));               // concat returns a new array,
    setNewName("");                                             // to clear the input field on submitting
    setNewNumber("");
  }

  const nameEntered = (event) => {
    setNewName(event.target.value);                             // capture the input as it is being typed 
  }

  const personExists = (searchName) => {
    var isPresent = false;
    persons.forEach(person => {
      if (person.name === searchName){
         isPresent= true;
      }
    })
    return isPresent;
  }


  const numberEntered = (event) => {
    setNewNumber(event.target.value);                             // capture the input as it is being typed 
  }

  const numberExists = (searchNumber) => {
    var isPresent = false;
    persons.forEach(person => {
      if (person.number === searchNumber){
         isPresent= true;
      }
    })
    return isPresent;
  }


  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name : <input value={newName} onChange={nameEntered} required/>  
        </div>
        <div>
          number : <input value={newNumber} onChange={numberEntered} required/>  
        </div>
        <div>
          <button type="Submit" >Save Name</button>
        </div>
        <div>
          debug : {newName}
        </div>

        <h2>Contacts :</h2>
        <ul>
          {persons.map(person => <li key={person.name}>{person.name} : {person.number}</li>)}
        </ul>
      </form> 
    </div>
  )
}

export default App;