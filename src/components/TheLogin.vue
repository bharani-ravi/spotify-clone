<template>
  <div class="login">
    <img
      src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
      alt=""
    />
    <button @click="handleClick">LOGIN WITH SPOTIFY</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clientId: "e9f242a776de472b9107a72044351960",
      redirectUrl: "http://localhost:8080/",
      apiUrl: "https://accounts.spotify.com/authorize",
      scopes: [
        "user-read-email",
        "user-read-private",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-position",
        "user-top-read",
      ],
    };
  },
  methods: {
    handleClick() {
      window.location.href = `${this.apiUrl}?client_id=${
        this.clientId
      }&redirect_uri=${this.redirectUrl}&scope=${this.scopes.join(
        "%20"
      )}&response_type=token&show_dialog=true`;
    },
  },
};
</script>
<style scoped>
.login {
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: black;
}
.login img {
  width: 100%;
}
.login button {
  padding: 20px;
  border-radius: 99px;
  background-color: #1db954;
  font-weight: 800;
  color: white;
  text-decoration: none;
}
</style>
