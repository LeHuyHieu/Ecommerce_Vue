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
                  <input type="file" @change="handleFileUpLoad" id="avatar" class="hidden" />
                  <label for="avatar" class="flex items-center">
                    <img
                      :src="userData.avatar ? userData.avatar : (imageUrl ? imageUrl : require('@/assets/logo.png'))"
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
                      >Full name</label
                    >
                    <div class="mt-2">
                      <input
                        type="text"
                        v-model="userData.name"
                        placeholder="Hieu"
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
                        v-model="userData.phone"
                        placeholder="Phone number: 0386208003"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div class="col-span-full">
                    <label
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Address</label
                    >
                    <div class="mt-2">
                      <input
                        type="text"
                        v-model="userData.address"
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
                        v-model="userData.bio"
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
import { onMounted, ref } from 'vue';
import AuthService from '@/services/AuthService';
import router from "@/router";
import { notify } from "notiwind"
import {
  deleteObject,
  ref as firebaseRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase";

export default {
  components: { MenuLeftProfile },
  setup() {
    const selectFile = ref(null);
    const imageUrl = ref(null); 
    const userData = ref({});
    const getUserData = ref(AuthService.getCurentUser());

    const fetchData = async () => {
      userData.value = await AuthService.getUser(getUserData.value.user_id);
      // console.log(userData.value);
    }
    
    const handleFileUpLoad = (e) => {
      const file = e.target.files[0];
      selectFile.value = file;

      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrl.value = event.target.result;
      };
      reader.readAsDataURL(file);
    };

    const deleteFile = async () => {
      try {
        const fileUrl = userData.value.avatar;
        const fileRef = firebaseRef(storage, fileUrl);
        await deleteObject(fileRef);
        console.log("delete file successfully");
      } catch (error) {
        console.error("error delete file:", error);
      }
    };

    const updateProfile = async () => {
      const userId = getUserData.value.user_id;
      const user = await AuthService.getUser(userId);
      console.log('key: ', user.id); 
      console.log('user id ', userId);
      try {
        if (selectFile.value) {
          await deleteFile();
          const timestamp = Date.now();
          const uniqueFileName = `${timestamp}_${selectFile.value.name}`;
          const storageRef = firebaseRef(storage,"avatars/" + uniqueFileName);
          await uploadBytes(storageRef, selectFile.value);
          console.log("Upload file successfully");
          const imageUrl = await getDownloadURL(storageRef);
          userData.value.avatar = imageUrl;
        }
        await AuthService.update(user.id, userData.value);
        console.log("Created new item successfully!");
        notify({
          group: "foo",
          title: "Update",
          position: "top-center", 
          type: "success",
          text: "Update profile successfully"
        }, 3000);
        router.push('/profile');
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(async () => {
      await fetchData();
    })

    return {
      userData,
      updateProfile,
      handleFileUpLoad,
      imageUrl
    }
  }
};
</script>
<style lang="css">
.tranlatey-50-50 {
  transform: translateY(-50%);
}
</style>
