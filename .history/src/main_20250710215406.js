import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const app = createApp(App);


app.use(createPinia()) // registra o Pinia
app.mount('#app');
