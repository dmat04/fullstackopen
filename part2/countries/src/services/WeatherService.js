import axios from 'axios'

const weatherUrl = 'https://api.openweathermap.org/data/2.5'
const apiKey = process.env.REACT_APP_API_KEY

const getCurrentWeather = (lat, lon) => {
    const params = {
        lat: lat,
        lon: lon,
        units: 'metric',
        appid: apiKey
    }

    return axios
        .get(`${weatherUrl}/weather`, { params: params })
        .then(response => response.data)
}

export default { getCurrentWeather }