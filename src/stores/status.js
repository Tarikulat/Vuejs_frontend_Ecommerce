// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";

export const useStatus = defineStore('status', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getStatus(){
      try{
        const res = await axiosInstance.get("/statuses");
        if (res.status === 200) {
           return res?.data?.result;
        }else{
            console.log('errors in Status');
        }
      }catch(error){
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