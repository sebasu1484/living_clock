import Vue from 'vue'

var weather = new Vue({
  el: '#weather',
  data: {
    today_weather: '',
    today_weather_img: ''
  }
})

setInterval(getWeather, 12 * 60 * 60 * 1000)
getWeather()

function getWeather () {
  const URI = 'api.openweathermap.org/data/2.5/weather?q=Fukuoka,jp&APPID='
  const APIKEY = 'c9e54ab96b0f0ca6c19daa27c20460df'

  const request = new XMLHttpRequest()
  request.open('GET', URI + APIKEY)
  request.addEventListener('load', (event) => {
    if (event.target.status !== 200) {
      // エラーレスポンスのケース
    } else {
      if (event.target.data.weather[0].main === 'Sunny' || event.target.data.weather[0].main === 'Clear') {
      /*      weather.today_weather = 'Sunny'
        weather.today_weather_img = 'sunny.img' */
        var today = document.getElementById('today')
        today.className = 'wi wi-day-sunny'
      } else if (event.target.data.weather[0].main === 'Clouds') {
        weather.today_weather = 'Cloudy'
        weather.today_weather_img = 'cloudy.img'
      } else if (event.target.data.weather[0].main === 'Rain') {
        weather.today_weather = 'Rainny'
        weather.today_weather_img = 'Rainny.img'
      } else if (event.target.data.weather[0].main === 'Snow') {
        weather.today_weather = 'Snowy'
        weather.today_weather_img = 'Snowy.img'
      }
    }
  })
  request.addEventListener('error', () => {
  })
  request.send()
}
