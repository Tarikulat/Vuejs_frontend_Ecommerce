// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useModal = defineStore('modal', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    isOpen: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
     toggleModal() {
        this.isOpen = !this.isOpen;
     },

     Modalclose() {
        this.isOpen = false;
     },

  },
  
  })
  // All Function  Code Is Here.....................................................................................................