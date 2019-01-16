import Vue from 'vue'

var weather = new Vue({
  el: '#weather',
  data: {
    datetime_now: '',
    temp_now: '',
    temp_max_now: '',
    temp_min_now: '',
    weather_now: '',
    datetime_3h_later: '',
    temp_3h_later: '',
    temp_max_3h_later: '',
    temp_min_3h_later: '',
    weather_3h_later: '',
    datetime_6h_later: '',
    temp_6h_later: '',
    temp_max_6h_later: '',
    temp_min_6h_later: '',
    weather_6h_later: ''
  }
})

setInterval(getWeather, 3 * 60 * 60 * 1000)
getWeather()

function getWeather () {
  // const URI = 'http://api.openweathermap.org/data/2.5/weather?q=Fukuoka,jp&APPID='
  const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?'
  const LOCATION = 'Fukuoka-shi,jp'
  const UNITS = 'metric' // 温度(ケルビン→摂氏)
  const APIKEY = 'c9e54ab96b0f0ca6c19daa27c20460df'

  const request = new XMLHttpRequest()
  // request.responseType = 'json'
  request.open('GET', BASE_URL + 'q=' + LOCATION + '&units=' + UNITS + '&APPID=' + APIKEY)
  request.addEventListener('load', (event) => {
    if (event.target.status !== 200) {
      // エラーレスポンスのケース
      weather.W = event.target.status
    } else {
      // weather.W = event.target.status            // test用(200)
      var responseJSObj = JSON.parse(event.target.responseText)
      // weather.W = event.target.responseText // test用(レスポンスbody)
      // weather.W = responseJSObj.list[0].weather[0].main  // test用(天気部分)

      // --- 直近の情報を取得 ---
      // 時間を取得
      // var datetime = (responseJSObj.list[0].dt + (60 * 60 * 9)) * 1000 // +9時間(JST) → ミリ秒
      var datetime = responseJSObj.list[0].dt * 1000 // ミリ秒
      weather.datetime_now = formatDate(datetime)

      // 気温を取得
      weather.temp_now = 'Temp: ' + responseJSObj.list[0].main.temp
      weather.temp_max_now = 'max:  ' + responseJSObj.list[0].main.temp_max
      weather.temp_min_now = 'min:  ' + responseJSObj.list[0].main.temp_min

      // 天気を取得
      let [classNameNow, weatherNow] = checkWeather(responseJSObj.list[0])
      document.getElementById('now').className = classNameNow + 'main'
      weather.weather_now = weatherNow

      // --- 3H後の情報を取得 ---
      // 時間を取得
      datetime = responseJSObj.list[1].dt * 1000 // ミリ秒
      weather.datetime_3h_later = formatDate(datetime)

      // 気温を取得
      weather.temp_3h_later = 'Temp: ' + responseJSObj.list[1].main.temp
      weather.temp_max_3h_later = 'max:  ' + responseJSObj.list[1].main.temp_max
      weather.temp_min_3h_later = 'min:  ' + responseJSObj.list[1].main.temp_min

      // 天気を取得
      let [className3hLater, weather3hLater] = checkWeather(responseJSObj.list[1])
      document.getElementById('3hlater').className = className3hLater + 'sub'
      weather.weather_3h_later = weather3hLater

      // --- 6H後の情報を取得 ---
      // 時間を取得
      datetime = responseJSObj.list[2].dt * 1000 // ミリ秒
      weather.datetime_6h_later = formatDate(datetime)

      // 気温を取得
      weather.temp_6h_later = 'Temp: ' + responseJSObj.list[2].main.temp
      weather.temp_max_6h_later = 'max:  ' + responseJSObj.list[2].main.temp_max
      weather.temp_min_6h_later = 'min:  ' + responseJSObj.list[2].main.temp_min

      // 天気を取得
      let [className6hLater, weather6hLater] = checkWeather(responseJSObj.list[2])
      document.getElementById('6hlater').className = className6hLater + 'sub'
      weather.weather_6h_later = weather6hLater
    }
  })
  request.addEventListener('error', () => {
    weather.W = 'Network Error'
  })
  request.send()
};

/**
 * 日時の表示フォーマットを変更
 * @param {*} unixtime
 */
function formatDate (unixtime) {
  var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var jstDate = new Date(Number(unixtime))

  let year = jstDate.getFullYear()
  let month = jstDate.getMonth() + 1
  let day = jstDate.getDate()
  let hour = jstDate.getHours()
  let min = jstDate.getMinutes()
  let sec = jstDate.getSeconds()

  // 1桁の場合2桁表示にする
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  if (hour < 10) hour = '0' + hour
  if (min < 10) min = '0' + min
  if (sec < 10) sec = '0' + sec

  return (year + '/' + month + '/' + day + 'T' + hour + ':' + min + ':' + sec + ' ' + week[jstDate.getDay()])
};

/**
 * 天気を判定する
 * ※ weather iconを使用する場合は'wi wi-day-clowdy'などを使用
 * @param {*} weatherList
 */
function checkWeather (weatherList) {
  if (weatherList.weather[0].main === 'Sunny' || weatherList.weather[0].main === 'Clear') {
    return [ 'fas fa-sun fa', 'Sunny' ]
  } else if (weatherList.weather[0].main === 'Clouds') {
    return [ 'fas fa-cloud fa', 'Cloudy' ]
  } else if (weatherList.weather[0].main === 'Rain') {
    return [ 'fas fa-cloud-showers-heavy fa', 'Rainy' ]
  } else if (weatherList.weather[0].main === 'Snow') {
    return [ 'far fa-snowflake fa', 'Snow' ]
  } else {
    return [ 'far fa-question-circle', 'Other' ]
  }
};
