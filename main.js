// selectng the form tag 
let weatherCity = document.querySelector("#weatherCity")

// creating the p and h2tags to be placed within the aritcle tag with the cityinfo id
let areap  = document.createElement("p")
let regionp  = document.createElement("p")
let countryp  = document.createElement("p")
let currentlyp  = document.createElement("p")

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

// Creating the Date for the weather 
let dates = new Date();
let formattedDate = dates.toLocaleDateString('en-US'); // Format: "dd/mm/yyyy"

// Used to reset all values when the input value is an empty string
const lists = document.querySelectorAll(".lists");

// creating an array to store the cities that have been searched
let cityArr = []

// the event listener submit that is found within the form tag which also calls the API
weatherCity.addEventListener('submit', (event) => {
    event.preventDefault()
    // Inputed value will be used to call the API
    let city = event.target.city.value.trim()
    // Capitalize every word in the String
    function capitalizeWords(str) {
        return str.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
    }
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
                cityInfo.innerHTML = "<h2 id='cityName'>City Invalid, Please Choose Another</h2>";
                lists.forEach(li => li.textContent = ""); 
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((json) => {
            // the function which uses the API data
            cityWeather(json,capitalizeCity,cityArr)
            
        })
        .catch((error) => {
            console.log("Error fetching City Weather Data: ", error)
        });
    }
    event.target.city.value = ""
})

const cityWeather = (json, city, cityArr) => {
    cityInfo.innerHTML = ""; // Clear previous content

    // variables for ease of use for the API data
    let areaDate = json.nearest_area[0]
    let currentTempData = json.current_condition[0]
    let area = areaDate.areaName[0].value
    let region = areaDate.region[0].value
    let country = areaDate.country[0].value
    let currently = currentTempData.FeelsLikeF + '°F'

    //Creating the box of Weather Info  
    cityName.innerHTML = `<strong>${city}</strong> `
    areap.innerHTML = `<strong>Area:</strong> ${area}`
    regionp.innerHTML = `<strong>Region:</strong> ${region}`
    countryp.innerHTML = `<strong>Country:</strong> ${country}`
    currentlyp.innerHTML = `<strong>Currently:</strong> Feels like ${currently}`

    // Adding the created HTML to the DOM
    cityInfo.append(cityName, areap, regionp, countryp, currentlyp);

    // dont add repeat searches to the list
    if(!cityArr.includes(city)){
        previousSearches(city,currently)
        cityArr.push(city)
    }

    // Adding the temperture for the today, next day, and next day
    temps.style.display = "flex"
    let threeDays = ["Today","Tomorrow","Day After Tomorrow"]
    for (let day = 0; day < threeDays.length; day++) {
        let avg = json.weather[day].avgtempF
        let max = json.weather[day].maxtempF
        let min = json.weather[day].mintempF
        // That week's data
        days[day].innerHTML = `<strong class ="underline">${threeDays[day]}:</strong> ${formattedDate}`
        avgs[day].innerHTML = `<strong class ="underline">Average Temperature:</strong> ${avg} °F`
        maxes[day].innerHTML = `<strong class ="underline">Max Temperature:</strong> ${max} °F`
        mines[day].innerHTML = `<strong class ="underline">Min Temperature:</strong> ${min} °F`
    }
}

// Needed to call Api again so that the onclick can work
let previousCitySearches = document.querySelector("#list")

if(!!previousCitySearches){
    previousCitySearches.addEventListener("click", function (event) {
        if (event.target.classList.contains("previousCity")) {
        let previousCity = event.target.innerHTML
        let weatherData = `https://wttr.in/${previousCity}?format=j1`

        fetch(weatherData)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((json) => {
            cityWeather(json, previousCity, cityArr);
        })
        .catch((error) => {
            console.log("Error fetching previous city data: ", error);
        });
        }
    });
}

// adds all the cities searched onto the web page
const previousSearches = (city, currently) => {
    // selecting the aside tag which has all the li tags within in it 
    document.querySelector("#removed").classList.add("hidden")
    let searchList = document.querySelector("#list")
    let previousSearch = document.createElement("li")
    previousSearch.innerHTML = `
    <a class="previousCity" href="#">${city}</a> - 
    <span class="current-temp">🌡️ ${currently}</span>
    `;
    previousSearch.className = "searchList"
    searchList.append(previousSearch)
}
