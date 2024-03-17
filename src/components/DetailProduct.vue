<template lang="">
  <div class="py-10">
    <!-- component -->
    <section class="text-gray-700 body-font bg-white">
      <div class="container mx-auto">
        <div class="lg:w-11/12 mx-auto">
          <h2 class="text-3xl text-center sm:text-left font-semibold mb-5">Detail product</h2>
          <div class="flex flex-wrap px-5 sm:px-0">
            <div
              class="lg:w-5/12 p-10 w-full shadow-md rounded-md border border-gray-100"
            >
              <img
                alt="ecommerce"
                class="object-contain object-center w-full h-full"
                :src="product.url_image"
              />
            </div>
            <div class="lg:w-7/12 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {{ product.name }}
              </h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <span class="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                      ></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                      ></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                      ></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p class="leading-relaxed">
                {{ product.desc }}
              </p>
              <div
                class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"
              >
                <div class="flex">
                  <span class="mr-3">Color</span>
                  <button
                    class="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"
                    :style="{backgroundColor: product.color}"
                  ></button>
                </div>
              </div>
              <div class="block justify-between items-center sm:flex">
                <span class="title-font mb-4 inline-block sm:inline sm:mb-0 font-medium text-2xl text-gray-900"
                  >${{ $helpers.formatPrice(product.price) }}</span
                >
                <div class="flex sm:block flex-wrap items-center">
                  <input type="number" class="w-full sm:w-24 mr-2 mb-2 sm:mb-0 sm:w-20 rounded-md border border-gray-300 shadow text-center" v-model="quantity" min="1" />
                  <button
                    @click="addToCart(product)"
                    class="w-full sm:w-fit mb-2 sm:mb-0 shadow-md rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <font-awesome-icon icon="shopping-cart" /> Add to cart
                  </button>
                  <button
                    class="w-full shadow-md rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <font-awesome-icon icon="shopping-basket" /> Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ProductService from "@/services/ProductService";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CartService from "@/services/CartService";
// import { useStore } from "vuex"

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
library.add(faShoppingCart, faShoppingBasket);
export default {
  setup() {
    const product = ref({});
    const router = useRouter();
    // const store = useStore();
    const quantity = ref(1);
    const productId = router.currentRoute.value.params.id;

    const getProductData = async () => {
      try {
        const productData = await ProductService.get(productId);
        product.value = productData;
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const addToCart = async (cart) => {
      cart.quantity = quantity.value;
      CartService.addToCart(cart)
    }

    onMounted(() => {
      getProductData();
    });
    return {
      product,
      addToCart,
      quantity
    };
  },
};
</script>
<style lang=""></style>
