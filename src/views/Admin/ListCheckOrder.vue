<template lang="">
  <div class="list-check-order p-10">
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Full name</th>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Phone</th>
              <th scope="col" class="px-6 py-3">Address</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th width="230px" scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(itemOrder, index) in listOrder" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{itemOrder.full_name}}
              </th>
              <td class="px-6 py-4">{{itemOrder.email}}</td>
              <td class="px-6 py-4">{{itemOrder.phone}}</td>
              <td class="px-6 py-4">{{itemOrder.address}}</td>
              <td class="px-6 py-4">{{itemOrder.status}}</td>
              <td class="px-6 py-4">
                <router-link :to="'/view-item-order/'+itemOrder.id" class="px-2 py-1 shadow-md ml-1 mb-1 rounded text-xs bg-gray-50">View</router-link>
                <button @click="updateStatus(itemOrder.id, index, 'Cancel')" class="px-2 py-1 shadow-md ml-1 mb-1 rounded text-xs bg-red-300 text-red-700" :class="['Delivered', 'Confirmed', 'Shipped', 'Cancel'].includes(itemOrder.status) ? 'hidden' : ''">Cancel</button>
                <button @click="updateStatus(itemOrder.id, index, 'Confirmed')" class="px-2 py-1 shadow-md ml-1 mb-1 rounded text-xs bg-blue-300 text-blue-700" :class="['Delivered', 'Shipped', 'Confirmed', 'Cancel'].includes(itemOrder.status) ? 'hidden' : ''">Confirmed</button>
                <button @click="updateStatus(itemOrder.id, index, 'Shipped')" class="px-2 py-1 shadow-md ml-1 mb-1 rounded text-xs bg-gray-300 text-gray-700" :class="['Delivered', 'Pending', 'Shipped', 'Cancel'].includes(itemOrder.status) ? 'hidden' : ''">Shipped</button>
                <button @click="updateStatus(itemOrder.id, index, 'Delivered')" class="px-2 py-1 shadow-md ml-1 mb-1 rounded text-xs bg-green-300 text-gren-700" :class="['Delivered', 'Pending', 'Confirmed', 'Cancel'].includes(itemOrder.status) ? 'hidden' : ''">Delivered</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import OrderService from "@/services/OrderService";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const listOrder = ref([]);

    const getAllOrders = async () => {
      try {
        const data = await OrderService.getAll();
        listOrder.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const updateStatus = async (id, index, status) => {
      listOrder.value[index].status = status; 
      await OrderService.update(id, {status: status})
    }

    onMounted(async () => {
      await getAllOrders();
    });

    return {
      listOrder,
      updateStatus,
    };
  },
};
</script>
<style lang=""></style>
