const CountryDetails = ({ country }) => {
    const langs = Object.values(country.languages)
    
    return (<>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <strong>Languages:</strong>
        <ul>
           {langs.map(it => <li key={it}>{it}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}/>
    </>)
}

export default CountryDetails