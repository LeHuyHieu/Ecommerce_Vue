<template lang="">
  <div class="checkout-page py-10">
    <div class="container mx-auto">
      <div class="lg:w-11/12 mx-auto">
        <div class="font-[sans-serif]">
          <div class="grid lg:grid-cols-3">
            <div class="lg:col-span-2 pr-10 bg-white overflow-x-auto">
              <div class="flex border-b pb-4">
                <h2 class="text-2xl font-semibold text-[#333] flex-1">
                  Order Information
                </h2>
              </div>
              <div class="px-2">
                <form @submit.prevent="orderSubmit">
                  <div
                    class="grid grid-cols-1 mt-5 gap-x-6 gap-y-4 sm:grid-cols-6"
                  >
                    <div class="sm:col-span-3">
                      <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Full name</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          autofocus
                          v-model="orderInfo.full_name"
                          placeholder="Enter full name"
                          class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Email</label
                      >
                      <div class="mt-2">
                        <input
                          type="email"
                          v-model="orderInfo.email"
                          placeholder="Enter email"
                          class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Address</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          v-model="orderInfo.address"
                          placeholder="Enter address"
                          class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Phone</label
                      >
                      <div class="mt-2">
                        <input
                          type="tel"
                          v-model="orderInfo.phone"
                          placeholder="Enter phone"
                          class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="col-span-full">
                      <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Note</label
                      >
                      <div class="mt-2">
                        <textarea
                          rows="5"
                          v-model="orderInfo.note"
                          placeholder="Enter note"
                          class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-span-full">
                      <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Payment</label
                      >
                      <div class="inline-flex items-center gap-x-3 mr-2">
                        <input
                          id="delivery"
                          checked
                          type="radio"
                          v-model="orderInfo.methods"
                          class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          for="delivery"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Payment on delivery</label
                        >
                      </div>
                    </div>
                    <div class="col-span-full">
                      <div class="text-center">
                        <button
                          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Order now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="bg-gray-50 p-10">
              <h3 class="text-xl font-semibold text-[#333] border-b pb-4">
                Summary
              </h3>
              <ul class="text-[#333] divide-y">
                <li
                  v-for="(item, index) in dataCheckout"
                  :key="index"
                  class="flex flex-wrap gap-4 text-md py-4"
                >
                  <div class="h-14">
                    <img
                      :src="item.url_image"
                      class="h-full w-full object-cover p-2 object-center"
                    />
                  </div>
                  <div>
                    <h4 class="font-bold text-wrap line-clamp-1 w-60 truncate">
                      {{ item.name }}, x{{ item.quantity }}
                    </h4>
                    <p class="inline-flex items-center">
                      Color:
                      <span
                        :style="{ backgroundColor: item.color }"
                        class="inline-block w-1 h-1 rounded-full p-2 border border-gray-200 ml-2"
                      ></span
                      >, Price:
                      ${{ $helpers.formatPrice(item.price * item.quantity) }}
                    </p>
                  </div>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Subtotal
                  <span class="ml-auto font-bold"
                    >${{ $helpers.formatPrice(total) }}</span
                  >
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Shipping <span class="ml-auto font-bold">$4,00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Tax <span class="ml-auto font-bold">$4,00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4 font-bold">
                  Total
                  <span class="ml-auto"
                    >${{ $helpers.formatPrice(total + 8) }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import OrderService from "@/services/OrderService";
import { useRouter } from "vue-router";
import CartService from "@/services/CartService";

import { notify } from "notiwind";
import AuthService from "@/services/AuthService";

export default {
  mounted() {
    this.getTotalPrice();
  },
  setup() {
    const total = ref(0);
    const orderInfo = ref({});
    const carts = CartService.getCart();
    const user = AuthService.getCurentUser();
    const dataCheckout = ref(
      JSON.parse(localStorage.getItem("list-checkout")) || []
    );

    const router = useRouter();

    const getTotalPrice = () => {
      dataCheckout.value.forEach((e) => {
        total.value += e.price * e.quantity;
      });
    };

    const orderSubmit = async () => {
      orderInfo.value.user_id = user.user_id;
      orderInfo.value.status = "Pending";
      orderInfo.value.orderItem = dataCheckout.value;
      try {
        await OrderService.create(orderInfo.value);
        for (let i = carts.length - 1; i >= 0; i--) {
          const cartItem = carts[i];
          const found = dataCheckout.value.some(item => item.key === cartItem.key);
          if (found) {
            CartService.removeCart(i);
          }
        }
        await CartService.getCart()
        notify({
          group: "foo",
          title: "Success",
          position: "top-center",
          type: "success",
          text: "Đặt hàng thành công.",
        }, 3000)
        await router.push('/')
      } catch (err) {
        console.log(err.message);
        notify({
          group: "foo",
          title: "Error",
          position: "top-center",
          type: "error",
          text: "Đặt hàng thất bại.",
        }, 3000)
      }
    };

    return {
      total,
      dataCheckout,
      orderInfo,
      getTotalPrice,
      orderSubmit,
    };
  },
};
</script>
<style lang=""></style>
