import Vue from 'vue'
import App from './App.vue'
import lazyload from './modules/vue-lazyload';

Vue.config.productionTip = false

Vue.use(lazyload, {
  loading: 'http://localhost:3000/imgs/loading.gif',
  error: 'http://localhost:3000/imgs/404.jpg',
  preLoad: 1
});

new Vue({
  render: h => h(App),
}).$mount('#app')
