/* eslint-disable react/prop-types */
const PersonForm = (props) => (
  <form onSubmit={props.submitHanlder}>
    <div>
        name: <input value={props.name} onChange={props.nameChangeHandler} />
    </div>
    <div>
        number: <input value={props.number} onChange={props.numberChangeHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm