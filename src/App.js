import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },               // array of Objects to store contacts
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);  
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
      number : newNumber,
      id : persons.length+1                                 
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
          <button type="Submit" >add</button>
        </div>

        <h2>Contacts :</h2>
        <ul>
          {persons.map(person => <li key={person.id}>{person.name} : {person.number}</li>)}
        </ul>
      </form> 
    </div>
  )
}

export default App;