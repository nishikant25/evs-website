function getData() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    // AQI (WAQI demo token)
    fetch(`https://api.waqi.info/feed/${city}/?token=demo`)
    .then(response => response.json())
    .then(data => {
        if (data.status === "ok") {
            document.getElementById("aqi").innerText =
                "AQI: " + data.data.aqi;
        } else {
            document.getElementById("aqi").innerText =
                "AQI data not found";
        }
    });

    // Weather (Open-Meteo via city search workaround)
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then(res => res.json())
    .then(location => {
        const lat = location.results[0].latitude;
        const lon = location.results[0].longitude;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("temp").innerText =
                data.current.temperature_2m + " °C";
            document.getElementById("humidity").innerText =
                data.current.relative_humidity_2m + " %";
        });
    });
}
