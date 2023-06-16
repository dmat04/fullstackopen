const iconUrl = (type) => `https://openweathermap.org/img/wn/${type}@4x.png`

const WeatherDetails = ({ location, weatherReport }) => (
    <>
        <h1>Weather in {location}</h1>
        <p>Temperature: {weatherReport.main.temp}C</p>
        <p>Wind: {weatherReport.wind.speed} m/s</p>
        <img
            src={iconUrl(weatherReport.weather[0].icon)}
            alt={weatherReport.weather[0].description}
        />
    </>
)

export default WeatherDetails