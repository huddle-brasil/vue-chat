import Vue from 'vue'
import App from './Chat.vue'

Vue.config.productionTip = false

const Bus = new Vue();

export default Bus;

new Vue({
  render: h => h(App),
}).$mount('#app')
