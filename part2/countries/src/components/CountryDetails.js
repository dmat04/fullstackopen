import { useEffect, useState } from 'react'
import weatherService from '../services/WeatherService'
import WeatherDetails from './WeatherDetails'

const CountryDetails = ({ country }) => {
    const [weatherReport, setWeatherReport] = useState(null)
    const langs = Object.values(country.languages)
    const [lat, lon] = country.capitalInfo.latlng
    const capital = country.capital[0]

    useEffect(() => {
        weatherService.getCurrentWeather(lat, lon)
            .then(response => setWeatherReport(response))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {capital}</p>
            <p>Area: {country.area}</p>
            <strong>Languages:</strong>
            <ul>
                {langs.map(it => <li key={it}>{it}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            {weatherReport
                ?  <WeatherDetails location={capital} weatherReport={weatherReport} />
                : null
            }
        </>
    )
}

export default CountryDetails