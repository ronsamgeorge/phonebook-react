import { useState, useEffect } from "react";
import axios from "axios"
import serverService from "./services/contacts"
import Header from "./components/Header"
import DisplayContact from "./components/DisplayContact";
import FormTextInput from "./components/FormTextInput";
import { type } from "@testing-library/user-event/dist/type";



const Notificaton = ({message}) => {

  if (message === ""){
    return null
  }

  return(
    <div className="message">
      {message}
    </div>
  )

}

const App = () => {

  const [persons, setPersons] = useState([]);  
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterParamenter, setFIlterParamater] = useState("");
  const [message, setMessage] = useState("");


  // use EFfect hooks to retrieve the initial saved contacts from DB
  useEffect(() => {
    serverService
    .getAll()
    .then(initialContacts => {
      console.log(initialContacts)
      setPersons(initialContacts)
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
      // id : persons.length+1                                 
    } 

    serverService
      .addContact(newContactObject)
      .then(newContact => {
        setPersons(persons.concat(newContact));                  // concat returns a new array,
        setNewName("");                                             // to clear the input field on submitting
        setNewNumber("");
        setMessage("Person added")
        setTimeout(() => setMessage(""), 5000);  
      })
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

const deleteContact = (event) => {
  const deleteId = event.target.value;

  serverService
    .deleteContact(deleteId)
    .then(response => {
      const newContacts = persons.filter(person => person.id.toString() !== deleteId); // persons.id is number while id is string  
      console.log(newContacts)
      setPersons(newContacts);
    })
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
        <Notificaton message={message} />
        <FormTextInput text={"name"} value={newName} onChange={nameEntered} />
        <FormTextInput text={"number"} value={newNumber} onChange={numberEntered} />
        <div>
          <button type="Submit" >add</button>
        </div>
      </form> 

      <Header text={"Contact"}/>
      <FormTextInput text={"Filter Contact on Name"} value={filterParamenter} onChange={updateFilterParameter}/>
      <DisplayContact persons={contactsToShow} onClick={deleteContact}/>
    </div>
  )
}

export default App;