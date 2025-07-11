import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const app = createApp(App);

app.use(createPinia())
app.mount('#app');
