// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Weather from './Weather' // ここでimport書いてたら{{ W }} = OKが反映されてた

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  components: {
    App,
    Weather
  },
  template: '<App/>'
})
// 以下のnew Vueを残した状態だと{{W}}=OKが消えてた
/*
new Vue({
  el: '#weather',
  components: { Weather },
  template: '<Weather/>'
})
*/
