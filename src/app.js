// Show date and time 
function formatDate(date) {
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
 let dayIndex = date.getDay();

 return `${days[dayIndex]}, ${hours}:${minutes}`;
 }

 function displayForecast() {
   let forecastElement = document.querySelector("#forecast");

   let forecastHTML = `<div class="row">`;
   let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
   days.forEach(function (day) {
     forecastHTML = 
   forecastHTML + `
        <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img src="https://www.pngkey.com/png/full/458-4589113_transparent-cloud-outline-line-art.png"alt=""width="42"/>
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-max">18</span>
                <span class="weather-forecast-temperatures-min">12</span>
            </div>
        </div>
        `;
   });
        forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;
 }

let h2 = document.querySelector("h2");
let nowDate = new Date();
h2.innerHTML = formatDate(nowDate);


//show temperature when using searchfield.

function showWeatherTemp(response) {
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temp-today").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#wind-today").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

celsiusTemperature = response.data.main.temp;

}

function searchCity(city) {
let apiKey = "3b934571c44c2dc67989d927e97cc0f8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//show location and temperature when clicking location button.
function searchLocation(position) {
   let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3b934571c44c2dc67989d927e97cc0f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeatherTemp);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Convert between celsius and fahrenheit (not working)
function showCelsiusTemp(event) {
  event.preventDefault();
  let tempToday = document.querySelector("#temp-today");
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  tempToday.innerHTML = Math.round(celsiusTemperature);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempToday = document.querySelector("#temp-today");
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32; 
  tempToday.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let geoLocationButton = document.querySelector("#location-button");
geoLocationButton.addEventListener("click", getCurrentLocation);

let celsiusUnit = document.querySelector("#celsius-link");
celsiusUnit.addEventListener("click", showCelsiusTemp);

let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", showFahrenheitTemp);

searchCity("London");
displayForecast();