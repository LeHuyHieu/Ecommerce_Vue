<template lang="">
  <ul
    class="flex-column space-y w-3/12 space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0"
  >
    <li class="w-11/12">
      <router-link
        to="/profile"
        class="inline-flex hover:text-white items-center px-4 py-3 text-white bg-blue-700 rounded-lg w-full dark:bg-blue-600"
        aria-current="page"
      >
        <svg
          class="w-4 h-4 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
          />
        </svg>
        <span class="ml-2">Profile</span>
      </router-link>
    </li>
    <li class="w-11/12">
      <router-link
        to="/profile"
        class="inline-flex hover:text-gary-700 items-center px-4 py-3 text-gray-700 bg-gray-50 rounded-lg w-full dark:bg-gray-50"
        aria-current="page"
      >
        <svg
          class="w-4 h-4 text-gary-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
          />
        </svg>
        <span class="ml-2">Change Password</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {};
</script>
<style lang=""></style>
