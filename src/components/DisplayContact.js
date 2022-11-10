const DisplayContact = ({persons}) => {
    return (
      <div>
        <ul>
            {persons.map(person => <li key={person.id}>{person.name} : {person.number}</li>)}   
        </ul>       
      </div>
    )
}

export default DisplayContact;