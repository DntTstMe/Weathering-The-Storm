// Array to store the search history
let searchHistory = [];

// Dashboard display
function dashboard(event) {
    event.preventDefault();
    const inputCityEl = document.querySelector("#input-city"); // Input field for city
    const cityName = inputCityEl.value;
    getWeather(cityName);
}