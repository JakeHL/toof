import Vue from 'vue'
import Electron from 'vue-electron'

Vue.use(Electron)
Vue.config.debug = true

import App from './App'

// Event hub
export const eventHub = new Vue();

const base = new Vue({
  ...App
});
base.$mount('#app')


