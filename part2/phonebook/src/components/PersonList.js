const PersonListItem = ({ person, deleteHandler }) => (
    <li>
        {person.name}
        {'\u00A0'}
        {person.number}
        {'\u00A0'}
        <button onClick={deleteHandler}>Delete</button>
    </li>
)

const PersonList = ({ persons, deleteHandlerFactory }) => (
    <ul style={{ listStyle: "none" }}>
        {persons.map(it => 
            <PersonListItem 
                key={it.id} 
                person={it} 
                deleteHandler={deleteHandlerFactory(it)}
            />)}
    </ul>
)

export default PersonList