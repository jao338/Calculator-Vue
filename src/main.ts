import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router/router'
import './css/app.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
