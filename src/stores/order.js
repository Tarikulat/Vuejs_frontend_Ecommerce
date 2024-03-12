// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";
import { useCart } from '@/stores'; 
import router from "../router";


export const useOrder = defineStore('order', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    orderItems: [],
    orderLists: {},
    backendErrors: {},
    loading: false,
    }),

 
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
      async storeOrder(orderInfo) {
          try {
                const response = await axiosInstance.post('/orders',{
                    customer_name: orderInfo.name,
                    phone_number: orderInfo.phoneNumber,
                    address_details : orderInfo.address,
                    items: orderInfo.items,
                    delivery_gateway_id: orderInfo.delivery_gateway_id,
                    payment_gateway_id: orderInfo.payment_gateway_id,
                    district: orderInfo.district,
                    coupon_id: orderInfo.coupon_id,
                    // campaign_id: orderInfo.campaign_id,
                });

                console.log(response);

                if (response.status === 200) {
                    const cart = useCart();
                    cart.removeAllItems();

                    if (response.data.result) {
                        let url = response.data.result;
                        window.location.href = url;
                    } else {
                        router.push({ name: 'thankYou.page' });
                    }
                }else{
                  this.backendErrors = response.data.message
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false
            }                 
       }, 


       async getOrderList(){
        const response = await axiosInstance.get('/orders');
        if (response.status === 200) {
          this.orderLists = response.data;
        }else{
          console.log(response);
        }

       }
      

     },
  })
  // All Function  Code Is Here.....................................................................................................