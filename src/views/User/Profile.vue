<template lang="">
  <div class="profile py-10">
    <div class="container mx-auto">
      <div class="lg:w-11/12 mx-auto">
        <div class="md:flex">
          <MenuLeftProfile />
          <div
            class="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-9/12"
          >
            <div class="card">
              <form @submit.prevent="updateProfile">
                <div class="avatar text-left">
                  <input type="file" class="hidden" />
                  <label for="" class="flex items-center">
                    <img
                      :src="require('@/assets/logo.png')"
                      width="150px"
                      height="150px"
                      class="p-3 z-10 bg-white rounded-full inline-block shadow-md object-center object-contain"
                    />
                    <span
                      class="bg-blue-700 text-white px-4 ml-2 py-2 cursor-pointer rounded-md shadow-md"
                      >Chane Image</span
                    >
                  </label>
                </div>
                <div
                  class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-5"
                >
                  <div class="sm:col-span-3">
                    <label
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >First name</label
                    >
                    <div class="mt-2">
                      <input
                        type="text"
                        placeholder="Hieu"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Last name</label
                    >
                    <div class="mt-2">
                      <input
                        type="text"
                        placeholder="Le Huy"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div class="sm:col-span-3">
                    <label
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Phone number</label
                    >
                    <div class="mt-2">
                      <input
                        type="tel"
                        placeholder="Phone number: 0386208003"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        placeholder="Address: 50 hiep binh chanh, Tp Thu Duc"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div class="col-span-full">
                    <label
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Bio</label
                    >
                    <div class="mt-2">
                      <textarea
                        type="text"
                        rows="5"
                        placeholder="Bio"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <button class="bg-blue-700 text-white px-4 py-2 cursor-pointer rounded-md shadow-md">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MenuLeftProfile from "@/components/layouts/MenuLeftProfile.vue";
export default {
  components: { MenuLeftProfile },
};
</script>
<style lang="css">
.tranlatey-50-50 {
  transform: translateY(-50%);
}
</style>
