// selectng the form tag 
let weatherCity = document.querySelector("#weatherCity")
// creating the p tags to be placed within the aritcle tag with the cityinfo id   
let areap  = document.createElement("p")
let regionp  = document.createElement("p")
let countryp  = document.createElement("p")
let currentlyp  = document.createElement("p")
// selecting the li tags within the article tags that is inside the aside tag with the id temps
let days = document.querySelectorAll(".days")
let avgs = document.querySelectorAll(".avg")
let maxes = document.querySelectorAll(".max")
let mines = document.querySelectorAll(".min")
//  selecting the boxes 
let cityName = document.querySelector("#cityName")
let cityInfo = document.querySelector("#cityInfo")
// Creating the Date for the weather 
let dates = new Date()
let test1 = new Date()
// selecting the aside tag with the id temps
let temps = document.querySelector("#temps");
// creating an array to store the cities that have been searched
let cityArr = []
// the event listener submit that is found within the form tag which also calls the API
weatherCity.addEventListener('submit', (event) => {
    event.preventDefault()
    // take the value form the input tag within the form tag and places the input within the api link as a string literal
    let city = event.target.city.value
    if (city === "") {
        cityInfo.innerHTML = "<h1>Please enter a City</h1>";
    } else {
        // uses the input value for the API
        let weatherData = `https://wttr.in/${city}?format=j1`
        fetch(weatherData)
        .then((response) => response.json())
        .then((json) => {
            // the function which uses the API data
            test(json,city,cityArr)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    event.target.city.value = ""
})

const test = (json,city, cityArr) => {
        // the first h1 tag becomes the input value
        cityName.textContent = city
        //Creating the first box of Weather Info
        // creating varaibls for ease of use 
        let areaDate = json.nearest_area[0]
        let currentTempData = json.current_condition[0]
        let area = areaDate.areaName[0].value
        cityInfo.innerHTML = ""; // Clear previous content
        areap.innerHTML = `<strong>Area:</strong> ${area}`
        cityInfo.append(areap)
        let region = areaDate.region[0].value
        regionp.innerHTML = `<strong>Region:</strong> ${region}`
        cityInfo.append(regionp)
        let country = areaDate.country[0].value
        countryp.innerHTML = `<strong>Country:</strong> ${country}`
        cityInfo.append(countryp)
        let currently = currentTempData.FeelsLikeF + '°F'
        currentlyp.innerHTML = `<strong>Currently:</strong> Feels like ${currently}`
        cityInfo.append(currentlyp)
        if(!cityArr.includes(city)){
            previousSearches(city,currently)
            cityArr.push(city)
        }


        // Adding temps for the today, next day, and next day
        let threeDays = ["Today","Tomorrow","Day After Tomorrow"]

        for (let index = 0; index < threeDays.length; index++) {
            // Creating the date for the info
            dates.setDate(test1.getDate() + index)
            let time = dates.toLocaleDateString("en-US")
            // created the html for each li and inputed the weather data
            days[index].innerHTML = `<strong class ="underline">${threeDays[index]}:</strong> ${time}`
            let avg = json.weather[index].avgtempF
            avgs[index].innerHTML = `<strong class ="underline">Average Temperature:</strong> ${avg} °F`
            let max = json.weather[index].maxtempF
            maxes[index].innerHTML = `<strong class ="underline">Max Temperature:</strong> ${max} °F`
            let min = json.weather[index].mintempF
            mines[index].innerHTML = `<strong class ="underline">Min Temperature:</strong> ${min} °F`
            }
            // Needed to call Api again so that the onclick can work
            let previousCitySearches = document.querySelectorAll("#previousCity")
            for (let index = 0; index < cityArr.length; index++) {
                const element = previousCitySearches[index];
                element.onclick = function(event){
                    let city2 =event.target.textContent
                    let weatherData2 = `https://wttr.in/${city2}?format=j1`
                    fetch(weatherData2)
                    .then((response) => response.json())
                    .then((json2) => {
                        // the function which uses the API data
                    test2(json2,city2)
                        
                    })
                    .catch((error) => {
                    //   console.log(error);
                
                    });
                    return false 
                }
            }
        
}

const previousSearches = (city, currently) => {
    // selecting the aside tag which has all the li tags within in it 
    excuted = true
    document.querySelector("#removed").className = "hidden"
    document.querySelector("#temps").className = "tempBoxes"
    let searchList = document.querySelector("#list")
    let previousSearches = document.createElement("li")
    previousSearches.innerHTML = `<a class = "previousCity" href="#">${city}</a> - ${currently}`
    previousSearches.className = "searchList"
    searchList.append(previousSearches)
    
}
const test2 = (json,city) => {
    // the first h1 tag becomes the input value
    cityName.textContent = city
    //Creating the first box of Weather Info
    // creating varaibls for ease of use 
    let areaDate = json.nearest_area[0]
    let currentTempData = json.current_condition[0]
    let area = areaDate.areaName[0].value
    let testing = document.querySelector(".areaOfCountry")
    // console.log(testing)
    areap.innerHTML = `<strong>Area:</strong> ${area}`
    let region = areaDate.region[0].value
    regionp.innerHTML = `<strong>Region:</strong> ${region}`
    cityInfo.append(regionp)
    let country = areaDate.country[0].value
    countryp.innerHTML = `<strong>Country:</strong> ${country}`
    cityInfo.append(countryp)
    let currently = currentTempData.FeelsLikeF + '°F'
    currentlyp.innerHTML = `<strong>Currently:</strong> Feels like ${currently}`
    cityInfo.append(currentlyp)
    // adding pevious serches to a list
    // previousSearches(city,currently)

    // Adding temps for the today, next day, and next day
    let threeDays = ["Today","Tomorrow","Day After Tomorrow"]

    for (let index = 0; index < threeDays.length; index++) {
        // Creating the date for the info
        dates.setDate(test1.getDate() + index)
        let time = dates.toLocaleDateString("en-US")
        // created the html for each li and inputed the weather data
        days[index].innerHTML = `<strong class ="underline">${threeDays[index]}:</strong> ${time}`
        let avg = json.weather[index].avgtempF
        avgs[index].innerHTML = `<strong class ="underline">Average Temperature:</strong> ${avg} °F`
        let max = json.weather[index].maxtempF
        maxes[index].innerHTML = `<strong class ="underline">Max Temperature:</strong> ${max} °F`
        let min = json.weather[index].mintempF
        mines[index].innerHTML = `<strong class ="underline">Min Temperature:</strong> ${min} °F`
        }
}