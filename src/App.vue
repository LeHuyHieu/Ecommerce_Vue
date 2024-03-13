<template>
  <div id="app">
    <div class="position-sticky menu-top">
      <nav class="navbar navbar-expand">
        <router-link to="/" class="logo">Limupa</router-link>
        <ul class="navbar-nav ml-auto" v-if="$store.state.user">
          <li class="nav-item">
            <router-link to="/list-product" class="nav-link"
              >List Product</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/add-product" class="nav-link"
              >Add Product</router-link
            >
          </li>
          <li class="nav-item">
            <button class="btn-auth active" @click="$store.dispatch('logout')">
              Logout
            </button>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="!$store.state.user">
          <li class="nav-item">
            <router-link class="btn-auth" to="/login">
              Login / SignUp
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <!-- NotificationGroup -->
    <NotificationGroup group="foo">
      <div class="notification-group center top">
        <div class="w-full max-w-sm">
          <Notification
            v-slot="{ notifications }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md"
              v-for="notification in notifications"
              :key="notification.id"
            >
              <div
                :class="[
                  notification.type === 'success'
                    ? 'bg-green-500'
                    : notification.type === 'info'
                    ? 'bg-blue-500'
                    : notification.type === 'warning'
                    ? 'bg-yellow-500'
                    : notification.type === 'error'
                    ? 'bg-red-500'
                    : '',
                  'flex items-center justify-center w-12',
                ]"
              >
                <img
                    v-if="notificationIcons.hasOwnProperty(notification.type)"
                    :src="notificationIcons[notification.type]"
                    class="w-6 h-6" :style="{ filter: 'invert(1)' }"
                    alt="Notification Icon"
                  />
              </div>

              <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                  <span
                    class="font-semibold"
                    :class="[
                      notification.type === 'success'
                        ? 'text-green-500'
                        : notification.type === 'info'
                        ? 'text-blue-500'
                        : notification.type === 'warning'
                        ? 'text-yellow-500'
                        : notification.type === 'error'
                        ? 'text-red-500'
                        : '',
                    ]"
                    >{{ notification.title }}</span
                  >
                  <p class="text-sm text-gray-600">{{ notification.text }}</p>
                </div>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>
    <!-- NotificationGroup -->
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  name: "app",
  setup() {
    const store = useStore();

    const notificationIcons = {
      success: require('@/assets/icon/done.svg'),
      info: require('@/assets/icon/info.svg'),
      warning: require('@/assets/icon/warning.svg'),
      error: require('@/assets/icon/error.svg')
    };

    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });

    return {
      user: store.state.user,
      notificationIcons,
    };
  },
};
</script>

<style scoped lang="css"></style>
