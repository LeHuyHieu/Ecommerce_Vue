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
                <form @submit.prevent="changePassword">
                  <div
                    class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-5"
                  >
                    <div class="col-span-full">
                      <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Old Password</label
                      >
                      <div class="mt-2">
                        <input
                          v-model="password.old_password"
                          type="text"
                          placeholder="Enter Old Password"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="col-span-full">
                      <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >New Password</label
                      >
                      <div class="mt-2">
                        <input
                          v-model="password.new_password"
                          type="password"
                          placeholder="Enter New Password"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="col-span-full">
                      <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Confirm Password</label
                      >
                      <div class="mt-2">
                        <input
                          v-model="password.confirm_password"
                          type="password"
                          placeholder="Enter Confirm Password"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
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
  import AuthService from "@/services/AuthService";
  import { getAuth, updatePassword } from "firebase/auth";
  import { onMounted, ref, computed } from 'vue';  
  import bcrypt from 'bcryptjs';
  import { notify } from "notiwind";

  export default {
    components: { MenuLeftProfile },
    setup() {
      const old_user = AuthService.getCurentUser();
      let storedUser = localStorage.getItem('currentUser');
      const auth = getAuth();
      let user = ref(computed(() => auth.currentUser || (storedUser ? JSON.parse(storedUser) : null)));
      const password = ref({});
      
      onMounted(async () => {
        user.value = await auth.currentUser || (storedUser ? JSON.parse(storedUser) : null);
      })
      console.log(user.value);

      const changePassword = async () => {
        const salt = bcrypt.genSaltSync(10);//mã muối
        if (bcrypt.compareSync(password.value.old_password, old_user.password)) {
          console.log('password changed successfully');
          if (password.value.new_password === password.value.confirm_password) {
            await updatePassword(user.value, password.value.new_password).then(() => {
              console.log('update successful');
    
              AuthService.update(old_user.id, {password: bcrypt.hashSync(password.value.new_password, salt)});
              old_user.password = bcrypt.hashSync(password.value.new_password, salt);
              console.log(old_user);
              localStorage.setItem('user', JSON.stringify(old_user));
              password.value = {}

              notify(
                {
                    group: "foo",
                    title: "Info",
                    position: "top-center",
                    type: "info",
                    text: "Cập nhật mật khẩu thành công.",
                },
                3000
              );
            }).catch((error) => {
              console.error(error.message);
            });
          }else {
            notify(
              {
                  group: "foo",
                  title: "Warning",
                  position: "top-center",
                  type: "warning",
                  text: "Xác nhận mật khẩu không đúng.",
              },
              3000
            );
          }
        }else {
          notify(
              {
                  group: "foo",
                  title: "Warning",
                  position: "top-center",
                  type: "warning",
                  text: "Mật khẩu cũ sai.",
              },
              3000
          );
        }
      }

      return {
        changePassword,
        password
      }
    }
  };
  </script>
  <style lang="css">
  .tranlatey-50-50 {
    transform: translateY(-50%);
  }
  </style>
  