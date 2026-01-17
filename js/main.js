function getAQI() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.waqi.info/feed/${city}/?token=demo`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok") {
                document.getElementById("aqiResult").innerText =
                    "AQI of " + city + " is: " + data.data.aqi;
            } else {
                document.getElementById("aqiResult").innerText =
                    "AQI data not available";
            }
        });
}
