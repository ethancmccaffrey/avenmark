/* ==========================================================
   AVENMARK WEBSITE — CLEAN SCRIPT.JS
========================================================== */

const weatherElement = document.getElementById("weather");

/* Load Columbia, SC weather */
async function loadWeather() {
    try {
        const latitude = 34.0007;
        const longitude = -81.0348;

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
        );

        const data = await response.json();

        const temperature = Math.round(data.current.temperature_2m);
        const weatherCode = data.current.weather_code;
        const condition = getWeatherCondition(weatherCode);

        weatherElement.textContent = `Columbia, SC • ${temperature}°F • ${condition}`;

    } catch (error) {
        weatherElement.textContent = "Columbia, SC weather unavailable";
        console.error("Weather error:", error);
    }
}

/* Weather code → readable text */
function getWeatherCondition(code) {
    const conditions = {
        0: "Clear Sky",
        1: "Mostly Clear",
        2: "Partly Cloudy",
        3: "Cloudy",
        45: "Fog",
        48: "Fog",
        51: "Light Drizzle",
        53: "Drizzle",
        55: "Heavy Drizzle",
        61: "Light Rain",
        63: "Rain",
        65: "Heavy Rain",
        71: "Light Snow",
        73: "Snow",
        75: "Heavy Snow",
        80: "Rain Showers",
        81: "Rain Showers",
        82: "Heavy Showers",
        95: "Thunderstorms",
        96: "Thunderstorms",
        99: "Thunderstorms"
    };

    return conditions[code] || "Unknown";
}

loadWeather();
