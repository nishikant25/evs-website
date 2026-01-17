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
                document.getElementById("aqiResult").innerText =
                    `AQI of ${city}: ${data.data.aqi}`;
            } else {
                document.getElementById("aqiResult").innerText =
                    "AQI data not available for this city.";
            }
        })
        .catch(error => {
            document.getElementById("aqiResult").innerText =
                "Error fetching AQI data.";
        });
}
