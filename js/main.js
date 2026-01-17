function getAQI() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    document.getElementById("aqiResult").innerText =
        "Fetching real-time AQI for " + city + "...";

    fetch(`https://api.waqi.info/feed/${city}/?token=d5bf0ab0a5163f50c07762966acdfc6542654ae0`)
        .then(res => res.json())
        .then(data => {
    if (data.status === "ok") {
        const station = data.data.city.name;
        const time = data.data.time.s;

        document.getElementById("aqiResult").innerText =
            `AQI: ${data.data.aqi}
             Station: ${station}
             Updated at: ${time}`;
    }
})

        .catch(error => {
            document.getElementById("aqiResult").innerText =
                "Error fetching AQI data.";
        });
}
