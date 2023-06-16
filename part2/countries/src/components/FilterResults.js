const FilterResults = ({ results, showDetailHandler }) => (
    <ul>{
        results.map(country =>
            <li key={country.name.official}>
                {country.name.common}
                <button onClick={showDetailHandler(country)}>show</button>
            </li>
        )
    }</ul>
)

export default FilterResults