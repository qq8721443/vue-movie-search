import * as Vue from 'vue';
import App from '~/App';
import router from '~/routes';
import store from '~/store';

const app = Vue.createApp(App)
app.use(router);
app.use(store);
app.mount('#app');
