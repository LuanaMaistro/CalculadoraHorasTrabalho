import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // Importando o router

const app = createApp(App);

app.use(router); // Usa o router na aplicação

app.mount('#app');
