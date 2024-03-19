<template lang="">
  <div>
    <div
      :class="{ hidden: !show }"
      class="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <div class="pointer-events-auto w-screen max-w-md">
              <div
                class="flex h-full flex-col overflow-y-scroll no-scrollbar bg-white shadow-xl"
              >
                <div
                  class="flex-1 overflow-y-auto no-scrollbar px-4 py-6 sm:px-6"
                >
                  <div class="flex items-start justify-between">
                    <h2
                      class="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                    <div class="ml-3 flex h-7 items-center">
                      <button
                        @click="closeModal"
                        type="button"
                        class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Close panel</span>
                        <svg
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="mt-8">
                    <div class="flow-root">
                      <ul role="list" class="-my-6 divide-y divide-gray-200">
                        <li
                          class="flex py-6"
                          v-for="(product, index) in carts"
                          :key="index"
                        >
                          <div
                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                          >
                            <img
                              :src="product.url_image"
                              alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                              class="h-full w-full object-cover p-2 object-center"
                            />
                          </div>

                          <div class="ml-4 flex flex-1 flex-col">
                            <div>
                              <div
                                class="flex justify-between text-base font-medium text-gray-900"
                              >
                                <h3 class="line-clamp-1">
                                  <router-link
                                    :to="/detail-product/ + product.key"
                                    >{{ product.name }}</router-link
                                  >
                                </h3>
                                <p class="ml-4">
                                  ${{ $helpers.formatPrice(product.price) }}
                                </p>
                              </div>
                              <p
                                class="mt-1 text-sm text-gray-500 flex items-center"
                              >
                                Color:
                                <button
                                  class="w-2 h-2 ml-2 border rounded-full p-2"
                                  :style="{ backgroundColor: product.color }"
                                ></button>
                              </p>
                            </div>
                            <div
                              class="flex flex-1 items-end justify-between text-sm"
                            >
                              <p class="text-gray-500">
                                Qty {{ product.quantity }}
                              </p>

                              <div class="flex">
                                <button
                                  @click="removeCart(index)"
                                  type="button"
                                  class="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="flex py-6" v-if="carts.length == 0">
                          <p>Vui long them vao gio hang!</p>
                        </li>
                        <!-- More products... -->
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div
                    class="flex justify-between text-base font-medium text-gray-900"
                  >
                    <p>Subtotal</p>
                    <p>${{$helpers.formatPrice(totalCart)}}</p>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div
                    class="mt-6 flex items-center justify-between flex-wrap sm:flex-nowrap"
                  >
                    <router-link
                      to="/cart"
                      @click="closeModal"
                      class="inline-flex items-center w-full sm:w-1/2 mr-0 sm:mr-2 mb-3 sm:mb-0 hover:text-indigo-700 justify-center rounded-md border-2 border-indigo-700 bg-white-600 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-50 shadow-sm"
                      >View full cart</router-link
                    >
                    <button
                      @click="getItemCheckout"
                      class="inline-flex items-center w-full sm:w-1/2 ml-0 sm:ml-2 hover:text-white justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >Checkout</button>
                  </div>
                  <div
                    class="mt-6 flex justify-center text-center text-sm text-gray-500"
                  >
                    <p>
                      or
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
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
  props: {
    show: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  setup() {
    const store = useStore();
    const carts = ref(computed(() => store.state.carts));
    const totalCart = ref(computed(() => store.state.totalCart != 0 ? store.state.totalCart : CartService.updateTotalCart()));
    
    const updateCart = () => {
      carts.value = CartService.getCart();
      totalCart.value = CartService.updateTotalCart();
    };

    const removeCart = (index) => {
      CartService.removeCart(index);
      carts.value = CartService.getCart();
      totalCart.value = CartService.updateTotalCart();
    };

    const getItemCheckout = () => {
      localStorage.setItem('list-checkout', JSON.stringify(carts.value));
      router.push('/checkout')
    }

    onMounted(() => {
      updateCart();
    });

    return {
      removeCart,
      carts,
      totalCart,
      getItemCheckout,
    };
  },
};
</script>
<style lang=""></style>
