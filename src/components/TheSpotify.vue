<template>
  <div class="container">
    <div class="spotify-body">
      <the-sidebar></the-sidebar>
      <div class="body">
        <the-navbar></the-navbar>
        <div class="body-contents">
          <the-body></the-body>
        </div>
      </div>
    </div>
    <div class="spotify-footer">
      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import TheSidebar from "./Spotify/TheSidebar.vue";
import TheNavbar from "./Spotify/TheNavbar.vue";
import TheBody from "./Spotify/TheBody.vue";
import TheFooter from "./Spotify/TheFooter.vue";
export default {
  components: {
    TheSidebar,
    TheNavbar,
    TheBody,
    TheFooter,
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      await this.axios
        .get(" https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          const userInfo = {
            userId: response.data.id,
            userName: response.data.display_name,
          };
          console.log(userInfo);
          this.$store.commit("setUser", { text: userInfo });
          // this.$store.commit("setData", { text: true });
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
}
.spotify-body {
  display: grid;
  grid-template-columns: 15vw 85vw;
  height: 100%;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: rgb(32, 87, 100);
}
.body {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.body::-webkit-scrollbar {
  width: 0.7rem;
}
.body::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
