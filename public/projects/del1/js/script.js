const apiKey = "7Np3170UdD5GW1glfQPiAOeKKR7KyACd";

const getWeather = async (id) => {
  if (!id) {
    throw new Error("Invalid city ID");
  }

  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${apiKey}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log(data);
  return data[0];
};

const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${apiKey}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log(data);
  return data[0];
};

const getForecast = async (id) => {
  if (!id) {
    throw new Error("Invalid city ID");
  }

  const base = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = `${id}?apikey=${apiKey}&metric=true`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log(data);
  return data.DailyForecasts;
};

// try {
//   getCity("manchester")
//     .then((data) => {
//       return getWeather(data.Key);
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => console.log(err));
// } catch (error) {
//   console.log(error);
// }
