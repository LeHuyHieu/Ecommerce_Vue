<template lang="">
  <div class="cart-page py-10">
    <div class="container mx-auto">
      <div class="lg:w-11/12 mx-auto">
        <div class="font-[sans-serif]">
          <div class="grid lg:grid-cols-3">
            <div class="lg:col-span-2 pr-10 bg-white overflow-x-auto">
              <div class="flex border-b pb-4">
                <h2 class="text-2xl font-semibold text-[#333] flex-1">
                  Shopping Cart
                </h2>
                <h3 class="text-xl font-semibold text-[#333]">{{carts.length}} Items</h3>
              </div>
              <div class="px-2">
                <table class="mt-6 w-full border-collapse divide-y">
                  <thead class="whitespace-nowrap text-left">
                    <tr>
                      <th><input type="checkbox" @change="checkAll" checked id="checkoutAll" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /></th>
                      <th class="text-base text-[#333] p-4">Name</th>
                      <th class="text-base text-[#333] p-4">Quantity</th>
                      <th class="text-base text-[#333] p-4">Price</th>
                    </tr>
                  </thead>
                  <tbody class="whitespace-nowrap divide-y">
                    <tr v-for="(product, index) in carts" :key="index">
                      <td><input type="checkbox" :id="'checkoutItem'+index" @change="checkItem" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /></td>
                      <td class="py-6 px-4">
                        <div class="flex items-center gap-6 w-max">
                          <div class="h-20 shrink-0">
                            <img
                              :src="product.url_image"
                              class="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <p class="text-md font-bold text-[#333]">
                              <router-link :to="/detail-product/+product.key">{{product.name}}</router-link>
                            </p>
                            <button
                              type="button"
                              @click="removeCart(index)"
                              class="mt-4 font-semibold text-red-400 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="py-6 px-4">
                        <div class="flex divide-x border w-max">
                          <button
                            type="button"
                            @click="updateCartLess(index)"
                            class="bg-gray-100 px-4 py-2 font-semibold"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-3 fill-current"
                              viewBox="0 0 124 124"
                            >
                              <path
                                d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </button>
                          <input
                            type="text"
                            :value="product.quantity"
                            class="bg-transparent px-1 text-center py-2 font-semibold text-[#333] w-11 border border-gray-100 text-md"
                          />
                          <button
                            type="button"
                            @click="updateCartPlus(index)"
                            class="bg-gray-800 text-white px-4 py-2 font-semibold"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-3 fill-current"
                              viewBox="0 0 42 42"
                            >
                              <path
                                d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td class="py-6 px-4">
                        <h4 class="text-md font-bold text-[#333]">${{$helpers.formatPrice(product.price * product.quantity)}}</h4>
                      </td>
                    </tr>
                    <tr v-if="carts.length == 0">
                      <td colspan="3" class="py-10 text-center"><b class="text-2xl">Không có sản phẩm nào</b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="bg-gray-50 p-10">
              <h3 class="text-xl font-semibold text-[#333] border-b pb-4">
                Order Summary
              </h3>
              <ul class="text-[#333] divide-y mt-6">
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Subtotal <span class="ml-auto font-bold">${{$helpers.formatPrice(total)}}</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Shipping <span class="ml-auto font-bold">$4,00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Tax <span class="ml-auto font-bold">$4,00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4 font-bold">
                  Total <span class="ml-auto">${{$helpers.formatPrice(total + 8)}}</span>
                </li>
              </ul>
              <button
                @click="getItemCheckout"
                class="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:text-white inline-block text-center hover:bg-blue-700 text-white rounded"
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CartService from "@/services/CartService";
import { onMounted, computed, ref } from "vue";
import { useStore } from 'vuex';
import router from "@/router";

export default {
  data() {
    return {
      listItemCheckout: [],
    }
  },
  methods: {
    checkAll(event) {
      const isChecked = event.target.checked;
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        this.totalPrice();
      });
    },
    checkItem() {
      this.totalPrice();
    },
    getItemCheckout() {
      this.listItemCheckout = []
      this.carts.forEach((item, index) => {
        const checkbox = document.getElementById(`checkoutItem${index}`);
        if (checkbox.checked) {
          this.listItemCheckout.push(item);
        }
      });
      localStorage.setItem('list-checkout', JSON.stringify(this.listItemCheckout));
      router.push('/checkout')
    }
  },
  mounted() {
    this.totalPrice()
  },
  setup() {
    const store = useStore();
    const carts = ref(computed(() => store.state.carts));
    const total = ref(0);

    const totalPrice = () => {
      total.value = 0;
      carts.value.forEach((item, index) => {
        const checkbox = document.getElementById(`checkoutItem${index}`);
        if (checkbox.checked) {
          total.value += item.price * item.quantity;
        }
      });
    }

    const updateCart = () => {
      carts.value = CartService.getCart();
    };

    const updateCartPlus = (index) => {
      CartService.updateCartPlus(index)
      totalPrice()
    }

    const updateCartLess = (index) => {
      CartService.updateCartLess(index)
      totalPrice()
    }

    const removeCart = (index) => {
      CartService.removeCart(index);
      carts.value = CartService.getCart();
      totalPrice()
    };

    onMounted(() => {
      updateCart();
    });

    return {
      removeCart,
      updateCartPlus,
      updateCartLess,
      totalPrice,
      total,
      carts
    };
  }
};
</script>
<style lang=""></style>
