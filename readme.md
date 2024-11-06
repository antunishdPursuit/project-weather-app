# A City's Weather

**A City's Weather** is a comprehensive and interactive weather web application built with **JavaScript, HTML, and CSS**. This project demonstrates proficiency in web development, API integration, and dynamic DOM manipulation.

## Features

1. **Real-Time Weather Search**:
   - Simply type a city name into the search bar and press "Get Weather" to view the city's current temperature, weather conditions, and a 3-day forecast.
   - The app dynamically updates based on user input, keeping a **search history** for easy access to previous locations.

2. **Toggle Temperature Units**:
   - Users can switch between Fahrenheit and Celsius by clicking the temperature toggle button next to the current weather display.

3. **Dynamic Weather Display**:
   - **Custom Weather Icons**: The app utilizes the [wttr.in API](https://github.com/chubin/wttr.in) and enhances it by mapping weather codes to custom icons. These icons are stored in an external `icons.json` file for efficient handling and are displayed based on real-time weather data.
   - **Background and Themes**: Dynamically changes the background and adjusts icon styling based on weather codes, creating an immersive experience that visually represents current conditions.

4. **Interactive and Animated Design**:
   - Includes **CSS animations** such as animated clouds and gradient-based weather themes for a lively, responsive design.
   - A **user interaction counter** tracks interactions, adding a layer of user engagement tracking.

## Project Structure and Data Handling

- **Asynchronous API Handling**: JavaScript functions and event listeners handle asynchronous requests to the `wttr.in` API, ensuring smooth data retrieval and updates.
- **Conditional Rendering and DOM Updates**: Uses JavaScript to dynamically render weather data, icons, and backgrounds based on API responses and user interactions.
- **Responsive and User-Centric Design**: Implemented with CSS animations and JavaScript, the app provides an interactive experience that adapts to different weather conditions.

## Technologies Used

- **JavaScript**: For API handling, dynamic data updates, and DOM manipulation.
- **HTML & CSS**: For responsive structure, styling, and animation.
- **API Integration**: Using the [wttr.in API](https://github.com/chubin/wttr.in) for real-time weather data.
- **JSON Data**: External `icons.json` file used to map weather codes to icons, enhancing icon handling efficiency.

## How to Use

1. **Enter a City**: Type a city name in the search bar and click "Get Weather" to retrieve weather data.
2. **View Search History**: Click on any previous city name in the search history to instantly view its weather information.
3. **Toggle Temperature Units**: Switch between Fahrenheit and Celsius by clicking the temperature toggle button.
4. **Experience Dynamic Updates**: The background, icons, and animations adjust based on the current weather for an immersive experience.

## Compatibility

- **Supported Browser**: Works on Chrome. Currently not supported on other browsers.

## Live Demo

Try the app here: [A City's Weather](https://antunishdpursuit.github.io/project-weather-app/)

