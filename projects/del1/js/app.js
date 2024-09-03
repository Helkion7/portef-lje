const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const spanElement = document.querySelector("span");

const updateUI = (data) => {
  const { cityDets, weather, forecast } = data;

  const forecastContainer = document.querySelector(".forecastContainer");

  details.innerHTML = `
    <h1 id='city'>${cityDets.EnglishName}</h1>
    <div class='condition'>${weather.WeatherText}</div>
    <div class='condition'>
      <span class='temp'>${weather.Temperature.Metric.Value}</span>
      <span class='temp' id='temp'> &deg;C </span>
    </div>`;

  if (weather.IsDayTime) {
    document.body.style.backgroundColor = "#ffd4e0";
    document.body.style.color = "#333333";
    document.querySelector(".konteirer").style.backgroundColor = "#ffc2d1";
    document.querySelector("label").style.color = "#333333";
    document.querySelector("h1").style.color = "#333333";
    document.querySelector(".icon").style.backgroundColor = "#ff8fab";
    document.querySelector(".condition").style.color = "#333333";
    document.querySelector(".temp").style.color = "#333333";
    document.getElementById("city").style.color = "#333333";
    document.getElementById("temp").style.color = "#333333";
    document.getElementById("temp").style.color = "#333333";
    document.querySelector(".details").style.color = "#333333";
    document.querySelector(".forecastContainer").style.backgroundColor = "#ffc2d1";
    document.querySelector(".forecastContainer").style.color = "#333333";
  } else {
    document.body.style.backgroundColor = "#070F2B";
    document.body.style.color = "#9290C3";
    document.querySelector(".konteirer").style.backgroundColor = "#1B1A55";
    document.querySelector("label").style.color = "#9290C3";
    document.querySelector("h1").style.color = "#9290C3";
    document.querySelector(".icon").style.backgroundColor = "#5957a1";
    document.querySelector(".condition").style.color = "#9290C3";
    document.querySelector(".temp").style.color = "#9290C3";
    document.getElementById("city").style.color = "#9290C3 !important";
    document.getElementById("temp").style.color = "#9290C3";
    document.getElementById("temp").style.color = "#9290C3";
    document.querySelector(".forecastContainer").style.backgroundColor = "#1B1A55";
    document.querySelector(".forecastContainer").style.color = "#9290C3";
    const h1Elements = document.getElementsByTagName("h1");
    if (h1Elements) {
      for (let i = 0; i < h1Elements.length; i++) {
        h1Elements[i].style.color = "#9290C3";
      }
    }
  }

  forecast.forEach(day => {
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");
  
    const date = new Date(day.Date);
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
    const formattedDate = `${dayOfWeek}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  
    forecastItem.innerHTML = `
      <h2>${formattedDate}</h2>
      <div>${day.Temperature.Minimum.Value} - ${day.Temperature.Maximum.Value} &deg;C</div>
      <div>Rain: ${day.Day.HasPrecipitation ? "Yes" : "No"}</div>
      <div>${day.Day.IconPhrase}</div>`;
  
    forecastContainer.appendChild(forecastItem);
  });


  const iconSrc = `./img/img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "./img/img/day.svg" : "./img/img/night.svg";
  time.setAttribute("src", timeSrc);

  card.style.display = "flex";
  card.style.flexDirection = "column";
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);

  if (cityDets.Key) {
    const weather = await getWeather(cityDets.Key);
    const forecast = await getForecast(cityDets.Key);

    return { cityDets, weather, forecast };
  } else {
    throw new Error("Invalid city details");
  }
};

cityForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
