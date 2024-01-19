const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "18d7e29acfmsh50fadf7d631fbf4p1ae5c6jsnb51155cfaa6b",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

async function getWeather(city, flag) {
  cityName.innerHTML = city;

  if (!flag) {
    fetch(
      "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        cloud_pct.innerHTML = response.cloud_pct;
        temp.innerHTML = response.temp;
        temp2.innerHTML = response.temp;
        humidity.innerHTML = response.humidity;
        humidity2.innerHTML = response.humidity;
        min_temp.innerHTML = response.min_temp;
        max_temp.innerHTML = response.max_temp;
        wind_speed.innerHTML = response.wind_speed;
        wind_speed2.innerHTML = response.wind_speed;
        wind_degrees.innerHTML = response.wind_degrees;
        sunrise.innerHTML = new Date(
          response.sunrise * 1000
        ).toLocaleTimeString();
        sunset.innerHTML = response.sunset;
        sunset.innerHTML = new Date(
          response.sunset * 1000
        ).toLocaleTimeString();

        console.log(response);
      })
      .catch((err) => console.error(err));
  } else {
    try {
      const response = await fetch(
        "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
        options
      );
      const data = await response.json();
      const temperature = data.temp;

      return temperature;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value, 0);
});

// to add image to city cards :

const cityImg = document.querySelectorAll(".city-card-img");
const cityNames = document.querySelectorAll(".city-card-name");

for (let i = 0; i < 9; i++) {
  cityImg[i].src = "weather/" + cityNames[i].textContent + ".jpg";
  cityImg[i].alt = cityNames[i].textContent;
  cityImg[i].style.height = "200px";
}

// adding city temperatures in cards :

const cityTemp = document.querySelectorAll(".city-card-temp");
for (let i = 0; i < 9; i++) {
  getWeather(cityNames[i].textContent.toString(), 1).then((temp) => {
    cityTemp[i].innerHTML = temp + "<span>&#8451;</span>";
  });
}

getWeather("Surat", 0);

// image smooth animation :

const image_container = document.querySelectorAll(".img-container");
const images = document.querySelectorAll(".city-card-img");
let flag = 1;
for (let i = 0; i < image_container.length; i++) {
  image_container[i].addEventListener("mouseout", () => {
    if (flag) {
      images[i].style.transform = "scale(1)";
      images[i].style.transition = "ease 0.5s";
    }
  });
  image_container[i].addEventListener("mouseover", () => {
    images[i].style.transform = "scale(1.2)";
    images[i].style.transition = "ease 0.5s";
  });
}

// on clicking the button :

const city_card = document.querySelectorAll(".get-details-btn");
const city_card_name = document.querySelectorAll(".city-card-name");
// searching weather of city on clicking button of city card and taking to home section :
for (let i = 0; i < city_card.length; i++) {
  city_card[i].addEventListener("click", () => {
    getWeather(city_card_name[i].textContent, 0);
    window.scrollTo(0, 0);
  });
}
