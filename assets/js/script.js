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