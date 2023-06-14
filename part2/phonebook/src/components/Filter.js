const NameFilter = (props) => (
    <div>
        filter names: <input value={props.filter} onChange={props.filterChangeHandler} />
    </div>
)

export default NameFilter