// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useSlider = defineStore('slider', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    sliders: {},
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getData() {
      try {
          const res = await axiosInstance.get("/sliders");
        if (res.status === 200) {
            this.sliders = res.data

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