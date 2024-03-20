<template lang="">
  <div class="view-item-order p-10">
    <div class="text-2xl text-center" v-if="orderData.length <= 0">Khong co data</div>
    <div>
      <div>
        <div class="mb-4">
          <p>Full name: {{ orderData.full_name }}</p>
          <p>Phone: {{ orderData.phone }}</p>
          <p>Email: {{ orderData.email }}</p>
          <p>Address: {{ orderData.address }}</p>
          <p>Note: {{ orderData.note }}</p>
        </div>
        <div class="list-table">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Product name</th>
                  <th scope="col" class="px-6 py-3">Color</th>
                  <th scope="col" class="px-6 py-3">Category</th>
                  <th scope="col" class="px-6 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, id) in orderData.orderItem"
                  :key="id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex items-center">
                      <img :src="item.url_image" class="h-16 mr-3" />
                      {{ item.name }}
                    </div>
                  </th>
                  <td class="px-6 py-4">
                    <button
                      class="w-2 h-2 rounded-full p-2"
                      :style="{ backgroundColor: item.color }"
                    ></button>
                  </td>
                  <td class="px-6 py-4">{{ item.category }}</td>
                  <td class="px-6 py-4">
                    ${{ $helpers.formatPrice(item.price) }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th colspan="4" class="text-right px-6 py-4">
                    Total: ${{$helpers.formatPrice(totalPrice(orderData.orderItem))}}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="pt-10" v-if="orderData.status !== 'Cancel'"> 
          <ol class="flex items-center">
            <li class="relative w-full mb-6">
              <div class="flex items-center">
                <div
                  class="z-10 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"
                >
                  <svg
                    class="w-2.5 h-2.5 text-blue-100 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </div>
                <div
                  class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"
                ></div>
              </div>
              <div class="mt-3">
                <h3 class="font-medium text-gray-900 dark:text-white">
                  Pending
                </h3>
              </div>
            </li>
            <li class="relative w-full mb-6">
              <div class="flex items-center">
                <div
                  class="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
                  :class="
                    ['Confirmed', 'Shipped', 'Delivered'].includes(
                      orderData.status
                    )
                      ? 'bg-blue-600'
                      : 'bg-gray-200'
                  "
                >
                  <svg
                    class="w-2.5 h-2.5"
                    :class="
                      ['Confirmed', 'Shipped', 'Delivered'].includes(
                        orderData.status
                      )
                        ? 'text-blue-100 dark:text-blue-300'
                        : 'text-gray-900 dark:text-white'
                    "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </div>
                <div
                  class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"
                ></div>
              </div>
              <div class="mt-3">
                <h3 class="font-medium text-gray-900 dark:text-white">
                  Confirmed
                </h3>
              </div>
            </li>
            <li class="relative w-full mb-6">
              <div class="flex items-center">
                <div
                  :class="
                    ['Shipped', 'Delivered'].includes(orderData.status)
                      ? 'bg-blue-600'
                      : 'bg-gray-200'
                  "
                  class="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
                >
                  <svg
                    class="w-2.5 h-2.5"
                    :class="
                      ['Shipped', 'Delivered'].includes(orderData.status)
                        ? 'text-blue-100 dark:text-blue-300'
                        : 'text-gray-900 dark:text-white'
                    "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </div>
                <div
                  class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"
                ></div>
              </div>
              <div class="mt-3">
                <h3 class="font-medium text-gray-900 dark:text-white">
                  Shipped
                </h3>
              </div>
            </li>
            <li class="relative w-full mb-6">
              <div class="flex items-center">
                <div
                  :class="
                    ['Delivered'].includes(orderData.status)
                      ? 'bg-blue-600'
                      : 'bg-gray-200'
                  "
                  class="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
                >
                  <svg
                    class="w-2.5 h-2.5"
                    :class="
                      ['Delivered'].includes(orderData.status)
                        ? 'text-blue-100 dark:text-blue-300'
                        : 'text-gray-900 dark:text-white'
                    "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </div>
              </div>
              <div class="mt-3">
                <h3 class="font-medium text-gray-900 dark:text-white">
                  Delivered
                </h3>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderService from '@/services/OrderService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const orderData = ref([]);
    const router = useRouter();

    const getOrderItem = async () => {
      const orderId = router.currentRoute.value.params.id; 
      orderData.value = await OrderService.getItem(orderId);
      console.log(orderData.value.data);
    }

    const totalPrice = (data) => {
      let total = 0;
      for (const key in data) {
        total += data[key].price * data[key].quantity;
      }
      return total;
    };

    onMounted(async () => {
      await getOrderItem();
    });

    return {
      orderData,
      totalPrice
    }
  }
};
</script>
<style lang=""></style>
