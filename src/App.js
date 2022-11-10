import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([{name: "John Doe"}]);  // array of Objects to store contacts
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();

    if(personExists(newName)){
      alert("Person already in the phonebook");
      return;
    }

    console.log(personExists(newName));
    const newContactObject = {                                  // object to hold form input
      name : newName                                  
    } 
    setPersons(persons.concat(newContactObject));               // concat returns a new array,
    setNewName("");                                             // to clear the input field on submitting
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