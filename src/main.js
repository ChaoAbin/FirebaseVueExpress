import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const FirebaseKey = require((process.env.NODE_ENV === 'development' ? './configs/dev/' : './configs/prod/') + "firebaseKey.json");
firebase.initializeApp(FirebaseKey);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
let app = '';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App),
      mounted() {
        this.$http
        .get('./app/testConfig')
        .then(response => (this.info = response.data.bpi))
        .catch(error => console.log(error))
      }
    }).$mount('#app');
  }
});
