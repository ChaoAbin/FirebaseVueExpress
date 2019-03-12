import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';

const FirebaseKey = require((process.env.NODE_ENV === 'development' ? './configs/dev/' : './configs/prod/') + "firebaseKey.json");
firebase.initializeApp(FirebaseKey);

Vue.config.productionTip = false;
let app = '';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
