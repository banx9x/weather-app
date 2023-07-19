# Weather App with React and TypeScript

This is a simple weather application that allows users to view the current weather for a specific location. The weather data is fetched from the OpenWeatherMap API and displayed in a user-friendly interface.

## Live Demo

You can check out the live demo of the application [here](https://your-live-demo-url.com).

## Features

- Get the current weather information for a specific location.
- Display weather details such as temperature, humidity, wind speed, etc.
- Search for weather information by city name.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:

```shell
git clone https://github.com/banx9x/weather-app.git
cd weather-app
```

2. Install the dependencies:

```shell
npm install
```

3. Set up OpenWeatherMap API key:

   - Create a `.env.local` file in the root of the project.
   - Add the following line to the `.env.local` file:

     ```
     VITE_APPID=your-openweathermap-api-key
     ```

   - Replace `your-openweathermap-api-key` with your actual OpenWeatherMap API key. You can sign up for a free API key at https://openweathermap.org/appid.

4. Start the application:

```shell
npm run dev
```

5. Open your web browser and navigate to `http://localhost:5173`.

6. Allow access to current location

7. Use the search bar to enter a city name to view the weather infomation for that location.

## Built With

- React
- TypeScript
- [OpenWeatherMap API](https://openweathermap.org/api)

## Screenshots

[Add some screenshots of your application here]

## License

This project is licensed under the [MIT License](LICENSE).