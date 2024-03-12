// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useBrand = defineStore('brand', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    brands: {},
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getData() {
      try {
        const res = await axiosInstance.get("/brands");
        if (res.status === 200) {
            this.brands = res.data
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      }
    },

  },
  })
  // All Function  Code Is Here.....................................................................................................