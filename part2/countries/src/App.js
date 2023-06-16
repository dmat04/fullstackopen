import { useEffect, useState } from 'react'
import countryService from './services/countryService'
import CountryDetails from './components/CountryDetails'
import FilterResults from './components/FilterResults'

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])

  const countryNameChangeHandler = (event) => {
    setCountryName(event.target.value)
  }

  const detailHandlerFactory = (country) => {
    return () => {
      setCountryName(country.name.common)
    }
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
    resultDisplay = <FilterResults results={filterResult} showDetailHandler={detailHandlerFactory}/>
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
