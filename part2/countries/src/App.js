import { useEffect, useState } from 'react'
import countryService from './services/countryService'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])

  const countryNameChangeHandler = (event) => {
    setCountryName(event.target.value)
  }

  useEffect(() => {
    countryService.getAll()
      .then(response => setCountries(response))
      .catch(error => { console.log(error) })
  }, [])

  const filterKeyword = countryName.toUpperCase()
  const filterResult = countries.filter(
    country => country.name.common.toUpperCase().includes(filterKeyword)
  )

  let resultDisplay = null
  if (!countryName) {
    resultDisplay = null
  } else if (filterResult.length === 1) {
    resultDisplay = <CountryDetails country={filterResult[0]} />
  } else if (filterResult.length <= 10) {
    resultDisplay =
      <ul>{
        filterResult.map(country => <li key={country.name.official}>{country.name.common}</li>)
      }</ul>
  } else {
    resultDisplay = <div>Too many matches, please be more specific</div>
  }

  return (
    <div>
      <div>
        Find countries <input value={countryName} onChange={countryNameChangeHandler} />
      </div>
      <div>
        {resultDisplay}
      </div>
    </div>
  )


}

export default App
