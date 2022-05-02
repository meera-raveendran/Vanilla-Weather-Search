let apiKey="a2e0cfbfe5d276ae777464db6e6424f7"
let unit="metric";
let city="New York";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(showTemperature);
function showTemperature(response){
   console.log( response.data);
   let temperature=document.querySelector("#tempElement")
   let date=document.querySelector(".weatherDate");
   let description=document.querySelector(".weatherDesc");
   let percipitation=document.querySelector(".percipitation");
   let humidity=document.querySelector(".humidity");
   let windspeed=document.querySelector(".windspeed");
   let h1 = document.querySelector(".weatherCity");
  h1.innerHTML = response.data.name;
    date.innerHTML=formatDate(response.data.dt*1000);   
   temperature.innerHTML=Math.round(response.data.main.temp);
   description.innerHTML=response.data.weather[0].description;
   let currentPercip=response.data.wind.deg;
   percipitation.innerHTML=`percipitation:${currentPercip}%`;
   let currentHumid=response.data.main.humidity;
   humidity.innerHTML=`Humidity:${currentHumid}`;
   let currentWind=response.data.wind.speed;
   windspeed.innerHTML=`Windspeed:${currentWind}`;
};
function formatDate(timeStamp){
   
        let now = new Date(timeStamp);
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
        let li = document.querySelector(".weatherDate");
        li.innerHTML = `${currentDay} ${currenthour}:${currentmnt}`;
}