// selectng the form tag 
let weatherCity = document.querySelector("#weatherCity")

// creating the p and h2tags to be placed within the aritcle tag with the cityinfo id
let areap  = document.createElement("p")
let regionp  = document.createElement("p")
let countryp  = document.createElement("p")
let currentlyp  = document.createElement("p")
let degreeButton = document.createElement("button")

// selecting the li tags within the article tags that is inside the aside tag with the id "temps"
let days = document.querySelectorAll(".days")
let avgs = document.querySelectorAll(".avg")
let maxes = document.querySelectorAll(".max")
let mines = document.querySelectorAll(".min")

// selecting the aside tag with the id "temps"
let temps = document.querySelector("#temps");

//  selecting the Main Box filled with the city info
let cityName = document.querySelector("#cityName")
let cityInfo = document.querySelector("#cityInfo")

// Used to reset all values when the input value is an empty string
const lists = document.querySelectorAll(".lists");

// creating an array to store the cities that have been searched
let cityArr = []

// will change F to C and F to C
let fahrenheit = true

// Will hold the json of compeleted APi call
let cityWeatherObjects = {}

// Creating the Date for the weather 
let dates = new Date();
function formatDate(date){
    return date.toLocaleDateString('en-US')
}

// Capitalize every word in the String
function capitalizeWords(str) {
    return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
}

// the event listener submit that is found within the form tag which also calls the API
weatherCity.addEventListener('submit', (event) => {
    event.preventDefault()
    let city = event.target.city.value.trim()
    let capitalizeCity = capitalizeWords(city)
    // Change text if value is empty otherwise call the API
    if (city === "") {
        cityInfo.innerHTML = "<h2 id='cityName'>Please enter a City</h2>";
        lists.forEach(li => li.textContent = ""); 
        temps.style.display = "none"
    } else {
        let weatherData = `https://wttr.in/${capitalizeCity}?format=j1`
        fetch(weatherData)
        .then((response) =>{
            if (!response.ok) {
                cityInfo.innerHTML = "<h2 id='cityName'>City Invalidr</h2>";
                lists.forEach(li => li.textContent = ""); 
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((json) => {
            cityWeather(json,capitalizeCity)
            cityWeatherObjects[capitalizeCity] = json
            if(fahrenheit){
                previousSearches(capitalizeCity, json.current_condition[0].FeelsLikeF + " °F")
            } else {
                previousSearches(capitalizeCity, json.current_condition[0].FeelsLikeC + " °C")
            }
            
        })
        .catch((error) => {
            console.log("Error fetching City Weather Data: ", error)
        });
    }
    event.target.city.value = ""
})

const cityWeather = (json, city) => {
    cityInfo.innerHTML = ""; // Clear previous content
    let areaDate = json.nearest_area[0]
    let currentTempData = json.current_condition[0]
    let area = areaDate.areaName[0].value
    let region = areaDate.region[0].value
    let country = areaDate.country[0].value
    let currentTemp = `${currentTempData.FeelsLikeF} °F`

    //Creating the box of Weather Info  
    cityName.innerHTML = `<strong>${city}</strong> `
    areap.innerHTML = `<strong>Area:</strong> ${area}`
    regionp.innerHTML = `<strong>Region:</strong> ${region}`
    countryp.innerHTML = `${country}`
    currentlyp.innerHTML = `Feels like ${currentTemp}`
    degreeButton.classList.add("degreeCToF")
    degreeButton.innerHTML = `${fahrenheit ? "°C?" : "°F?"}`

    // Adding the created HTML to the DOM
    cityInfo.append(cityName, areap, regionp, countryp, currentlyp, degreeButton);

    // Adding the temperture for the today, next day, and next day
    temps.style.display = "flex"
    let threeDays = ["Today","Tomorrow","Day After Tomorrow"]
    for (let day = 0; day < threeDays.length; day++) {
        let avg = json.weather[day].avgtempF
        let max = json.weather[day].maxtempF
        let min = json.weather[day].mintempF
        dates.setDate(dates.getDate() + day);
        let formattedDate = formatDate(dates)
        // 3 days worth of  data
        days[day].innerHTML = `<strong>${threeDays[day]}:</strong> ${formattedDate}`
        avgs[day].innerHTML = `<strong>Avg Temp:</strong> ${avg} °F`
        maxes[day].innerHTML = `<strong>Max Temp:</strong> ${max} °F`
        mines[day].innerHTML = `<strong>Min Temp:</strong> ${min} °F`
    }
}

// adds all the cities searched onto the web page
const previousSearches = (city, currently) => {
    // selecting the aside tag which has all the li tags within in it 
    document.querySelector("#removed").classList.add("hidden")

    if(!cityArr.includes(city)){
        cityArr.push(city)
    }

    let searchList = document.querySelector("#list")
    let previousSearch = document.createElement("li")
    previousSearch.innerHTML = `
    <a class="previousCity" href="#">${city}</a> - 
    <span class="current-temp">🌡️ ${currently}</span>
    `;
    previousSearch.className = "searchList"
    searchList.append(previousSearch)
}

// Needed to call Api again so that the onclick can work
let previousCitySearches = document.querySelector("#list")

if(!!previousCitySearches){
    previousCitySearches.addEventListener("click", function (event) {
        if (event.target.classList.contains("previousCity")) {
            let previousCity = event.target.innerHTML
            cityWeatherObj(cityWeatherObjects[previousCity], previousCity)
        }
    });
}

// Add Changing C to F function
let changingDegree = document.querySelector("degreeCToF")
if(!changingDegree){
    degreeButton.addEventListener("click", function (event) {
        if(fahrenheit){
            fahrenheit = false 
        } else {
            fahrenheit = true 
        }
        updatePreviousSearches()
        cityWeatherObj(cityWeatherObjects[cityName.innerText], cityName.innerText)
    })
}

function updatePreviousSearches() {
    let searchListAll = document.querySelectorAll(".previousCity");
    let currentTemp = document.querySelectorAll(".current-temp");
    if (searchListAll.length !== currentTemp.length) return;

    // Loop through each element in searchListAll and update currentTemp
    searchListAll.forEach((ele, index) => {
        const city = ele.innerText;
        if (fahrenheit) {
            currentTemp[index].innerHTML = `
                🌡️ ${cityWeatherObjects[city].current_condition[0].FeelsLikeF} °F
            `;
        } else {
            currentTemp[index].innerHTML = `
                🌡️ ${cityWeatherObjects[city].current_condition[0].FeelsLikeC} °C
            `;
        }
    });
}

// same as cityweather but we are not using an API call
const cityWeatherObj = (json, city) => {
    cityInfo.innerHTML = ""; // Clear previous content
    let areaDate = json.nearest_area[0]
    let currentTempData = json.current_condition[0]
    let area = areaDate.areaName[0].value
    let region = areaDate.region[0].value
    let country = areaDate.country[0].value
    let currentTemp = fahrenheit ? `${currentTempData.FeelsLikeF} °F` : `${currentTempData.FeelsLikeC} °C`;
    //Creating the box of Weather Info  
    cityName.innerHTML = `<strong>${city}</strong> `
    areap.innerHTML = `<strong>Area:</strong> ${area}`
    regionp.innerHTML = `<strong>Region:</strong> ${region}`
    countryp.innerHTML = `${country}`
    currentlyp.innerHTML = `Feels like ${currentTemp}`
    degreeButton.classList.add("degreeCToF")
    degreeButton.innerHTML = `${fahrenheit ? "°C?" : "°F?"}`
    // Adding the created HTML to the DOM
    cityInfo.append(cityName, areap, regionp, countryp, currentlyp, degreeButton);

    // Adding the temperture for the today, next day, and next day
    temps.style.display = "flex"
    let threeDays = ["Today","Tomorrow","Day After Tomorrow"]
    for (let day = 0; day < threeDays.length; day++) {
        let avg = json.weather[day].avgtempF
        let max = json.weather[day].maxtempF
        let min = json.weather[day].mintempF
        if(fahrenheit){
            avg = json.weather[day].avgtempF + " °F"
            max = json.weather[day].maxtempF + " °F"
            min = json.weather[day].mintempF + " °F"
        } else {
            avg = json.weather[day].avgtempC + " °C"
            max = json.weather[day].maxtempC + " °C"
            min = json.weather[day].mintempC + " °C"
        }

        avgs[day].innerHTML = `<strong>Avg Temp:</strong> ${avg}`
        maxes[day].innerHTML = `<strong>Max Temp:</strong> ${max}`
        mines[day].innerHTML = `<strong>Min Temp:</strong> ${min}`
    }

}