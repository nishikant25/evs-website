function getAQIData() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const resultBox = document.getElementById("aqiResult");
    resultBox.innerText = "Fetching AQI data...";

    fetch(`https://api.waqi.info/feed/${city}/?token=d5bf0ab0a5163f50c07762966acdfc6542654ae0`)
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok") {
                const aqi = data.data.aqi;
                const station = data.data.city.name;
                const apiTime = data.data.time.s;
                const fetchTime = new Date().toLocaleString();

                resultBox.innerHTML = `
                    <strong>City:</strong> ${city}<br>
                    <strong>AQI:</strong> ${aqi}<br>
                    <strong>Station:</strong> ${station}<br>
                    <strong>Fetched at:</strong> ${fetchTime}<br>
                    <small>Station last updated: ${apiTime}</small>
                `;
            } else {
                resultBox.innerText = "AQI data not available.";
            }
        })
        .catch(() => {
            resultBox.innerText = "Error fetching AQI data.";
        });
}
