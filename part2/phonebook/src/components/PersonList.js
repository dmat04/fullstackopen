const PersonListItem = ({ person }) => (<li>{person.name} {person.number}</li>)

const PersonList = ({ persons }) => (
    <ul style={{ listStyle: "none" }}>
        {persons.map(it => <PersonListItem key={it.id} person={it} />)}
    </ul>
)

export default PersonList