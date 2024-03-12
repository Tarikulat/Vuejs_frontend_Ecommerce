// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useSetting = defineStore('setting', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getData(data = null) {
      try {
        const res = await axiosInstance.get("/settings",{params:{
            "key": data,
        }});
        if (res.status === 200) {
            return res.data.result
        }
      } catch (error) {
        if (error.response.data) {
          return error.response.data;
        }
      }
    },

  },
  })
  // All Function  Code Is Here.....................................................................................................