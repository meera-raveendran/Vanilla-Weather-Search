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
function formatDay(timeStamp){
  let date= new Date(timeStamp*1000);
  let day=date.getDay();
  let days = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
  ];
  return days[day];
}
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
   let currentDate=formatDate(response.data.dt *1000);  
   date.innerHTML=`Last Updated:${currentDate}`;    
   temperature.innerHTML=Math.round(response.data.main.temp);
   celsiusvalue = response.data.main.temp
   description.innerHTML=response.data.weather[0].description;
   let currentPercip=response.data.wind.deg;
   percipitation.innerHTML=`${currentPercip}`;
   let currentHumid=response.data.main.humidity;
   humidity.innerHTML=`${currentHumid}`;
   let currentWind=Math.round(response.data.wind.speed);
   windspeed.innerHTML=`${currentWind}`;  
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
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    axios.get(url).then(showweekTemperature);
  }

  
  function showweekTemperature(response) {
    
    let forecast=response.data.daily;
    let forecastElement=document.querySelector("#forecast");
    
    let forecastHTML=`<div class="row">`;
    
    forecast.forEach(function(forecastDay,index){
      if(index<5){
    forecastHTML=forecastHTML+
    `<div class="col-2" style="border:2px solid #2FF2E8;margin-left:17px;padding:0;border-radius:25px 0;background-color:#ffffff;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="45"/>
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
             <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
            
        </div>
       </div>   
`;
      }
    });
forecastHTML=forecastHTML+`</div>`;
forecastElement.innerHTML=forecastHTML;
    
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