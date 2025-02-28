async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    const apiKey = "b412534b2fb5cbac5cc87b4193d90d5c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
}

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const apiKey = "b412534b2fb5cbac5cc87b4193d90d5c";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.cod !== 200) {
                    alert("Location not found");
                    return;
                }
                document.getElementById("city").value = data.name;
                fetchWeather(url);
            } catch (error) {
                alert("Error fetching location weather data");
            }
        }, () => {
            alert("Geolocation access denied");
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) {
            alert("City not found");
            return;
        }
        document.getElementById("temperature").innerText = `${data.main.temp}°C`;
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind-speed").innerText = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById("weather-card").style.display = "grid";
    } catch (error) {
        alert("Error fetching weather data");
    }
}