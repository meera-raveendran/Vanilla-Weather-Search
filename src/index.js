let celsiusvalue = null

function formatDate(timeStamp){
   
    let now = new Date(timeStamp);
    console.log(now)
    let currenthour = now.getHours();
    if (currenthour < 10) {
      currenthour = `0${currenthour}`;
    }
    let currentmnt = now.getMinutes();
    if (currentmnt < 10) {
      currentmnt = `0${currentmnt}`;
    }
    let days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY"
    ];
    let currentDay = days[now.getDay()];

    return `${currentDay} ${currenthour}:${currentmnt}`

};
function showTemperature(response){
   
   let temperature=document.querySelector("#tempElement")
   let date=document.querySelector(".weatherDate");
   let description=document.querySelector(".weatherDesc");
   let percipitation=document.querySelector("#percipitation");
   let humidity=document.querySelector("#humidity");
   let windspeed=document.querySelector("#windspeed");
   let h1 = document.querySelector(".weatherCity");
   let iconElement=document.querySelector("#icon");

   h1.innerHTML = response.data.name;
   date.innerHTML=formatDate(response.data.dt *1000);   
   temperature.innerHTML=Math.round(response.data.main.temp);
   celsiusvalue = response.data.main.temp
   description.innerHTML=response.data.weather[0].description;
   let currentPercip=response.data.wind.deg;
   percipitation.innerHTML=`${currentPercip}`;
   let currentHumid=response.data.main.humidity;
   humidity.innerHTML=`${currentHumid}`;
   let currentWind=Math.round(response.data.wind.speed);
   windspeed.innerHTML=`${currentWind}`;
   console.log('appan response ', response)
   iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt",response.data.weather[0].description);
   weekTemperature(response.data.coord.lon, response.data.coord.lat);
};
function getCurrentLocation(position) {
    let apiKey = "a2e0cfbfe5d276ae777464db6e6424f7";
    let unit = "metric";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${unit}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }
  function currentButtonFunction(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  }
  
  
function weekTemperature(lon, lat) {
    let apiKey = "a2e0cfbfe5d276ae777464db6e6424f7";
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showweekTemperature);
  }

  function updateIcons(response) {
    document.querySelector("#forecasticonMon").
        setAttribute('src', `http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`) 
    document.querySelector("#forecasticonTue").
        setAttribute('src', `http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`) 
        document.querySelector("#forecasticonWed").
        setAttribute('src', `http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`) 
        document.querySelector("#forecasticonThurs").
        setAttribute('src', `http://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`) 
        document.querySelector("#forecasticonFri").
        setAttribute('src', `http://openweathermap.org/img/wn/${response.data.daily[5].weather[0].icon}@2x.png`) 
        document.querySelector("#forecasticonSat").
        setAttribute('src', `http://openweathermap.org/img/wn/${response.data.daily[6].weather[0].icon}@2x.png`) 
        document.querySelector("#forecasticonSun").
        setAttribute('src', `http://openweathermap.org/img/wn/${response.data.daily[7].weather[0].icon}@2x.png`) 
  }

  function showweekTemperature(response) {
    console.log('response... ', response)
    const weeklyWeather = response.data.daily;
    document.querySelector(".monTemp").innerHTML = `${Math.round(
      weeklyWeather[0].temp.day
    )}°C`;
    document.querySelector(".tueTemp").innerHTML = `${Math.round(
      weeklyWeather[1].temp.day
    )}°C`;
    document.querySelector(".wedTemp").innerHTML = `${Math.round(
      weeklyWeather[2].temp.day
    )}°C`;
    document.querySelector(".thuTemp").innerHTML = `${Math.round(
      weeklyWeather[3].temp.day
    )}°C`;
    document.querySelector(".friTemp").innerHTML = `${Math.round(
      weeklyWeather[4].temp.day
    )}°C`;
    document.querySelector(".satTemp").innerHTML = `${Math.round(
      weeklyWeather[5].temp.day
    )}°C`;
    document.querySelector(".sunTemp").innerHTML = `${Math.round(
      weeklyWeather[6].temp.day
    )}°C`;


    updateIcons(response)
  }

function search(city){
    let apiKey="a2e0cfbfe5d276ae777464db6e6424f7"
    let unit="metric";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemperature);
}
function handlesubmit(event){
    event.preventDefault();
    let inputCity=document.querySelector(".input-city");
    search(inputCity.value);
}
function showfahrenhitTemp(event){
    event.preventDefault();    
    let temperatureElement=document.querySelector("#tempElement");
    let fahrenhitValue=(temperatureElement.innerHTML*9)/5+32;
    temperatureElement.innerHTML=Math.round(fahrenhitValue);
    document.querySelector('.celsius-link').classList.remove('active')
    document.querySelector('.fahrenhit-link').classList.add('active')
}
function showcelsiusTemp(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#tempElement");
    temperatureElement.innerHTML=Math.round(celsiusvalue);
    document.querySelector('.celsius-link').classList.add('active')
    document.querySelector('.fahrenhit-link').classList.remove('active')
}

let celsiusTemperature=null;
let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",handlesubmit);

let fahrenhitTemperature=document.querySelector(".fahrenhit-link");
fahrenhitTemperature.addEventListener("click",showfahrenhitTemp);

celsiusTemperature=document.querySelector(".celsius-link");
celsiusTemperature.addEventListener("click",showcelsiusTemp);
const currentbutton = document.querySelector("#currentButton");
currentbutton.addEventListener("click", currentButtonFunction);

search("Paris");