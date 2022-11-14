import { createApp } from 'vue'
import App from './App.vue'
import VSwatches from 'vue3-swatches'

const app = createApp(App)
app.use(VSwatches)
app.mount('#app')
