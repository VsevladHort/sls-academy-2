import axios from 'axios';

export async function getWeather(lat, lon, everySixHours) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
    const relevantData = response.data.list.map(x => {
        return {
            time: new Date(x.dt * 1000),
            temp: x.main.temp,
            feels_like: x.main.feels_like,
            description: x.weather[0].description
        }
    });
    const formattedStrings = [];
    let prevDate = null;
    relevantData.forEach((x, i) => {
        if (!(everySixHours && i % 2 === 1)) {
            if (prevDate === null || prevDate.getDate() !== x.time.getDate()) {
                if (prevDate !== null)
                    formattedStrings.push("\n")
                prevDate = x.time;
                formattedStrings.push(formatDate(prevDate).concat(":\n"));
            }
            formattedStrings.push(`${formatTime(x.time)}, ${x.temp}°C, feels like ${x.feels_like}, ${x.description}\n`);
        }
    });
    return formattedStrings.join("");
}

function formatDate(date) {
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return hour + ':' + minute;
}