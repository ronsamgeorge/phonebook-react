const DisplayContact = ({persons, onClick}) => {
    return (
      <div>
        <ul>
            {persons.map(person => 
              <div key={person.id}>
                  <li key={person.id}>{person.name} : {person.number}</li>
                  <button value={person.id} onClick={onClick}>Delete Contact</button>
              </div>
            )}       
        </ul>       
      </div>
    )
}

export default DisplayContact;