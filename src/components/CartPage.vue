<template lang="">
  <div class="cart-page py-10">
    <div class="container mx-auto">
      <div class="lg:w-4/5 mx-auto">
        <div class="font-[sans-serif]">
          <div class="grid lg:grid-cols-3">
            <div class="lg:col-span-2 pr-10 bg-white overflow-x-auto">
              <div class="flex border-b pb-4">
                <h2 class="text-2xl font-semibold text-[#333] flex-1">
                  Shopping Cart
                </h2>
                <h3 class="text-xl font-semibold text-[#333]">1 Items</h3>
              </div>
              <div>
                <table class="mt-6 w-full border-collapse divide-y">
                  <thead class="whitespace-nowrap text-left">
                    <tr>
                      <th class="text-base text-[#333] p-4">Description</th>
                      <th class="text-base text-[#333] p-4">Quantity</th>
                      <th class="text-base text-[#333] p-4">Price</th>
                    </tr>
                  </thead>
                  <tbody class="whitespace-nowrap divide-y">
                    <tr>
                      <td class="py-6 px-4">
                        <div class="flex items-center gap-6 w-max">
                          <div class="h-36 shrink-0">
                            <img
                              src="https://readymadeui.com/images/product6.webp"
                              class="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <p class="text-md font-bold text-[#333]">
                              Black T-Shirt
                            </p>
                            <button
                              type="button"
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
                            value="1"
                            class="bg-transparent px-4 py-2 font-semibold text-[#333] w-11 border border-gray-100 text-md"
                          />
                          <button
                            type="button"
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
                        <h4 class="text-md font-bold text-[#333]">$18.5</h4>
                      </td>
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
                  Subtotal <span class="ml-auto font-bold">$37.00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Shipping <span class="ml-auto font-bold">$4.00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Tax <span class="ml-auto font-bold">$4.00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4 font-bold">
                  Total <span class="ml-auto">$45.00</span>
                </li>
              </ul>
              <button
                type="button"
                class="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded"
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
export default {};
</script>
<style lang=""></style>
