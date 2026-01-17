function getAQIData() {
    const city = document.getElementById("cityInput").value.trim();
    const resultBox = document.getElementById("aqiResult");

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    resultBox.innerText = "Fetching AQI data...";

    fetch(`https://api.waqi.info/feed/${city}/?token=YOUR_API_TOKEN`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok") {
                const aqi = data.data.aqi;
                const station = data.data.city.name;
                const apiTime = data.data.time.s;
                const fetchTime = new Date().toLocaleString();

                // AQI category & color
                let category = "";
                let color = "";

                if (aqi <= 50) {
                    category = "Good";
                    color = "#2ecc71";
                } else if (aqi <= 100) {
                    category = "Moderate";
                    color = "#f1c40f";
                } else if (aqi <= 200) {
                    category = "Poor";
                    color = "#e67e22";
                } else if (aqi <= 300) {
                    category = "Very Poor";
                    color = "#e74c3c";
                } else {
                    category = "Severe";
                    color = "#8e44ad";
                }

                resultBox.innerHTML = `
                    <strong>City:</strong> ${city}<br>
                    <strong>AQI:</strong>
                    <span style="color:${color}; font-weight:bold;">
                        ${aqi} (${category})
                    </span><br>
                    <strong>Station:</strong> ${station}<br>
                    <strong>Data fetched on:</strong> ${fetchTime}<br>
                    <small>Station last updated: ${apiTime}</small>
                `;
            } else {
                resultBox.innerText = "AQI data not available for this city.";
            }
        })
        .catch(error => {
            resultBox.innerText =
                "Error fetching AQI data. Please check your internet connection.";
        });
}
