import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fontsource/poppins/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import './index.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
