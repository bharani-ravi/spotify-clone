<template>
  <the-login v-if="!token" />
  <the-spotify> </the-spotify>
</template>

<script>
import TheLogin from "./components/TheLogin.vue";
import TheSpotify from "./components/TheSpotify.vue";
export default {
  name: "App",
  components: { TheLogin, TheSpotify },
  data() {
    return {
      token: null,
    };
  },
  mounted() {
    const hash = window.location.hash;
    console.log(hash);
    if (hash) {
      this.token = hash.substring(1).split("&")[0].split("=")[1];
      console.log(this.token);
    }
    this.setToken();
  },
  methods: {
    setToken() {
      this.$store.commit("setToken", { text: this.token });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
