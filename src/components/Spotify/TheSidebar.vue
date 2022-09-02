<template>
  <div class="container">
    <div>
      <div class="top-links">
        <div class="logo">
          <img src="../.././assets/spotify.png" alt="spotify-logo" />
        </div>
        <ul class="top-links-ul">
          <li>
            <span class="material-symbols-outlined"> home </span>
            <span>Home</span>
          </li>
          <li>
            <span class="material-symbols-outlined"> search </span>
            <span>Search</span>
          </li>
          <li>
            <span class="material-symbols-outlined"> library_music </span>
            <span>Your Library</span>
          </li>
        </ul>
        <hr />
      </div>
      <div class="playlist">
        <h4>PLAYLISTS</h4>
        <ul
          v-for="playlist in this.$store.state.playlist"
          :key="playlist.id"
          class="playlist-ul"
        >
          <li>{{ playlist.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.getPlaylistData();
    this.getPlaylistData();
  },
  methods: {
    async getPlaylistData() {
      await this.axios
        .get(" https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const { items } = response.data;
          const playlists = items.map(({ name, id }) => {
            return { name, id };
          });
          console.log(playlists);
          this.$store.dispatch("setPlaylist", { text: playlists });
        });
    },
  },
};
</script>

<style scoped>
.container {
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.top-limks {
  display: flex;
  flex-direction: column;
}
.logo {
  text-align: center;
  margin: 1rem 0;
}
.logo img {
  max-inline-size: 80%;
  block-size: auto;
}
.top-links-ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
.top-links-ul > li {
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.top-links-ul > li:hover {
  color: white;
}
.playlist {
  height: 100%;
  overflow: hidden;
}
.playlist h4 {
  margin-left: 15px;
}
.playlist-ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
/* .playlist-ul ::-webkit-scrollbar {
  width: 0.7rem;
}

.playlist-ul ::-thumb {
  background-color: rgba(255, 255, 255, 0.6);
} */

.playlist-ul > li {
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.playlist-ul > li:hover {
  color: white;
}
</style>
