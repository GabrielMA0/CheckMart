import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { createPinia } from 'pinia'

const app = createApp(App);

app.use(createPinia())
app.mount('#app');
