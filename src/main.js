import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import makeServer from './mocks/index';

makeServer();

createApp(App).use(router).use(createPinia()).mount('#app');
