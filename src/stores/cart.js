// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useCart = defineStore("cart", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    cartItem: [],
    campaignId: 0,
    loading: false,
  }),

  persist: {
    paths: ["cartItem", "campaignId"],
  },

  getters: {
    totalPrice: (state) => {
      let price = 0;
      state.cartItem.map((el) => {
        const itemPrice = el["offer_price"] == 0 ? el["mrp"] : el["offer_price"];
        price += itemPrice * el["quantity"];
      });

      return Math.round(price);
    },

    cartItemCount: (state) => {
      let price = 0;
      state.cartItem.map((el) => {
        price += el["quantity"];
      });

      return price;
    },
  },

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async addToCart(product) {
      this.campaignId = product.campaign_id;
      this.loading = product.id;
      let item = product;

      if (this.cartItem.length > 0) {
        if (item.size_id) {
          let boolean = this.cartItem.some(
            (i) =>
              i.item_id === item.item_id &&
              i.size_id === item.size_id
          );
          if (boolean) {
            let index = this.cartItem.findIndex(
              (i) =>
                i.item_id === item.item_id &&
                i.size_id === item.size_id
            );
            this.cartItem[index]["quantity"] += item.quantity;
          } else {
            this.cartItem.push(item);
          }
        } else {
          let boolean = this.cartItem.some((i) => i.item_id === item.item_id);
          if (boolean) {
            let index = this.cartItem.findIndex((i) => i.item_id === item.item_id);
            this.cartItem[index]["quantity"] += item.quantity;
          } else {
            this.cartItem.push(item);
          }
        }
      } else {
        this.cartItem.push(item);
      }

      setTimeout(() => {
        this.loading = false;
      }, 1000);

    },

    async destroy(index) {
        this.cartItem.splice(index, 1);
    },

    async decrement(index) {
      if (this.cartItem.length > 0) {
        if (this.cartItem[index]["quantity"] !== 1) {
          this.cartItem[index]["quantity"] -= 1;
        }
      }
    },

    async removeAllItems() {
      // Assuming this.cartItems is your array
      this.cartItem.splice(0, this.cartItem.length);
    },
    async increment(index) {
      this.cartItem[index]["quantity"] += 1;
    },
  },
});
// All Function  Code Is Here.....................................................................................................
