import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header"
import DisplayContact from "./components/DisplayContact";
import FormTextInput from "./components/FormTextInput";


const App = () => {

  const [persons, setPersons] = useState([]);  
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterParamenter, setFIlterParamater] = useState("");


  // use EFfect hooks to retrieve data from local json db at port 3001  
  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
  },[])

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

    const newContactObject = {                                  // new temp object to hold form input
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

//  Dynamic Filtering of Contacts
const contactsToShow = persons.filter(person => person.name.includes(filterParamenter));
const updateFilterParameter = (event) => {
  setFIlterParamater(event.target.value)
}


  return(
    <div>
      <Header text={"Phonebook"} />
      <form onSubmit={addName}>
        <FormTextInput text={"name"} value={newName} onChange={nameEntered} />
        <FormTextInput text={"number"} value={newNumber} onChange={numberEntered} />
        <div>
          <button type="Submit" >add</button>
        </div>
      </form> 

      <Header text={"Contact"}/>
      <FormTextInput text={"Filter Contact on Name"} value={filterParamenter} onChange={updateFilterParameter}/>
      <DisplayContact persons={contactsToShow} />
    </div>
  )
}

export default App;