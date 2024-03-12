// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useProduct = defineStore("product", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    products: {},
    recentProducts: [],
    topProducts: [],
    featureProducts: [],
    loading: false,
  }),

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async getData(type = "", paginate_size = 0) {
      this.loading = true;
      try {
        const res = await axiosInstance.get(
          `/products?type=${type}&paginate_size=${paginate_size}`
        );
        if (res.status === 200) {
          this.featureProducts = res.data.result;
          if (type === "feature-product") {
          } else if (type === "top-product") {
            this.topProducts = res.data.result;
          } else if (type === "recent-product") {
            this.recentProducts = res.data.result;
          } else {
            this.products = res.data.result;
          }
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
      } finally {
        this.loading = false;
      }
    },

    async productById(id) {
      this.loading = true;
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        return res.data.data;
        
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      } finally {
        this.loading = false;
      }
    },
  },
});




// All Function  Code Is Here.....................................................................................................
