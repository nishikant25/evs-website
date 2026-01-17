// Replace with your city
const city = "Delhi";

// Weather API (Open-Meteo - free, no key)
fetch(`https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.21&current=temperature_2m,relative_humidity_2m`)
.then(response => response.json())
.then(data => {
    document.getElementById("temp").innerText =
        data.current.temperature_2m + " °C";

    document.getElementById("humidity").innerText =
        data.current.relative_humidity_2m + " %";
});

// AQI API (World Air Quality Index - demo token)
fetch("https://api.waqi.info/feed/delhi/?token=demo")
.then(response => response.json())
.then(data => {
    document.getElementById("aqi").innerText =
        "AQI: " + data.data.aqi;
});
