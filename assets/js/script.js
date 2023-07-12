// Array to store the search history
let searchHistory = [];

// Dashboard display
function dashboard(event) {
    event.preventDefault();
    const inputCityEl = document.querySelector("#input-city"); // Input field for city
    const cityName = inputCityEl.value;
    getWeather(cityName);
}
// Handles displaying the time and date
function displayTime() {
    const timeDisplayEl = document.querySelector("#time-display"); // Element for displaying time
    const rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.textContent = rightNow;
    // Fetches current weather data and 5-day forecast data from OpenWeatherMap API
async function getWeather(cityName) {
    const todaysWeather = document.querySelector("#present-day-weather"); // Element for displaying today's weather
    const fiveDayForecast = document.querySelector("#five-day-forecast"); // Element for displaying the 5-day forecast
    
    try {
        // Fetch current weather data 
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9dd332c2cdf5ad3eee158912aa75b747&units=imperial`);
        const currentData = await weatherResponse.json();
        console.log(currentData);
        // Fetch 5-day forecast data
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=9dd332c2cdf5ad3eee158912aa75b747&units=imperial`);
        const fiveWeather = await forecastResponse.json();
        // Store city name in search history if not already present 
        if (!searchHistory.includes(currentData.name)) {
            searchHistory.push(currentData.name);
            localStorage.setItem("city", JSON.stringify(searchHistory));
        }
        //display the search history
        displayCity();
        console.log(fiveWeather);
        // Updates the with the current weather data
        todaysWeather.innerHTML = `<ul>
            <li class="title">${currentData.name} /<span> ${dayjs.unix(currentData.dt, "X").format(" MM/DD/YYYY")} </span></li>
            <li><img src ="http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" /></li>
            <li>Temp: ${currentData.main.temp}</li>
            <li>Wind: ${currentData.wind.speed}</li>
            <li>Humidity: ${currentData.main.humidity}</li>
        </ul>`;
        // Prepares the 5-day forecast
        let cards = "";
        for (let i = 1; i < 6; i++) {
            cards += `<ul class="col-12 col-xl-2 day">
                <li>${dayjs.unix(fiveWeather.daily[i].dt, "X").format(" MM/DD/YYYY")}</li>
                <li><img src ="http://openweathermap.org/img/wn/${fiveWeather.daily[i].weather[0].icon}@2x.png" /></li>
                <li>Temp: ${fiveWeather.daily[i].temp.day}</li>
                <li>Wind: ${fiveWeather.daily[i].wind_speed}</li>
                <li>Humidity: ${fiveWeather.daily[i].humidity}</li>
            </ul>`;
        }

        fiveDayForecast.innerHTML = cards;
    } catch (error) {
        console.error(error);
    }
}
// Retrieves previously searched cities from localStorage
function displayCity() {
    const pastCitiesEl = document.querySelector("#search-history"); // Element for displaying past searched cities
    searchHistory = JSON.parse(localStorage.getItem("city")) || [];
    const cityList = searchHistory.map((city) => `<button class="btn btn-secondary my-2" type="submit">${city}</button>`);
    pastCitiesEl.innerHTML = cityList;
    const myDashTwo = document.querySelectorAll(".my-2");
    myDashTwo.forEach((button) => {
        button.addEventListener("click", () => getWeather(button.textContent));
    });
}
// Initial display
displayCity();
displayTime();
setInterval(displayTime, 1000);

// Event listeners
const searchForm = document.querySelector("#search-form"); // Button for searching weather
searchForm.addEventListener("submit", dashboard);

const clearHistory = document.querySelector("#clear-history-button"); // Button for clearing search history 
clearHistory.addEventListener("click", clearSearchHistory);

// CLears search history
function clearSearchHistory() {
    localStorage.removeItem("city");
    const pastCitiesEl = document.querySelector("#search-history");
    pastCitiesEl.innerHTML = "";
    searchHistory = [];
    displayCity(); // Update the displayed city list
}