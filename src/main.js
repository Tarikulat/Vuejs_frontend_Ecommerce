
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'
import './style.css'
import './template.js'

// skeleton css  show er jonno start
import "skeleton-screen-css";
// skeleton css  show er jonno end
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)


app.config.globalProperties.$filters = {
    currencySymbol(value) {
      // return "৳" + value.toLocaleString();
      return Math.round(value) ? "৳ " + value.toLocaleString() : "৳";
    },
    makeImagePath(img) {
      return import.meta.env.VITE_API_URL + "/" + img;
  },
    textShort(text, size) {
    if (!text) return "";
    text = text.toString();

    if (text.length <= size) {
      return text;
    }
    return text.substr(0, size) + "...";
  },

  productPrice(product){
    if (product.offer_price == 0) {
      return `<span>${this.currencySymbol(Math.round(product.mrp))}</span>`;
    }else {
      return `<del>${this.currencySymbol(Math.round(product.mrp))}</del> <span>${this.currencySymbol(Math.round(product.offer_price))}</span>`;
    }
  },
}

app.mount('#app')
