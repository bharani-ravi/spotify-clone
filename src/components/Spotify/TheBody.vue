<template>
  <div class="body" v-if="this.$store.state.selectedPlaylist">
    <div class="playlist">
      <div class="image">
        <img :src="this.$store.state.selectedPlaylist.text.image" alt="" />
      </div>
      <div class="details">
        <span class="type">PLAYLIST</span>
        <h1 class="title">
          {{ this.$store.state.selectedPlaylist.text.name }}
        </h1>
        <p class="description">
          {{ this.$store.state.selectedPlaylist.text.description }}
        </p>
      </div>
    </div>
    <div>
      <!-- <TheLoading></TheLoading> -->
    </div>
    <div class="list">
      <div class="header-row">
        <div class="col">
          <span>#</span>
        </div>
        <div class="col">
          <span>TITLE</span>
        </div>
        <div class="col">
          <span>ALBUM</span>
        </div>
        <div class="col">
          <span class="material-symbols-outlined"> schedule </span>
        </div>
      </div>
      <div
        class="tracks"
        v-for="(track, __, index) in this.$store.state.selectedPlaylist.text
          .tracks"
        :key="track.id"
      >
        <div class="row">
          <div class="col">
            <span>{{ index }}</span>
          </div>
          <div class="col detail">
            <div class="image">
              <img :src="track.image" alt="track" />
            </div>
            <div class="info">
              <span class="name">{{ track.name }}</span>
              <span>{{ track.artists }}</span>
            </div>
          </div>
          <div class="col">
            <span>{{ track.album }}</span>
          </div>
          <div class="col">
            <span v-bind="minSec(track.duration)">{{ dur }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TheLoading from "./TheLoading.vue";
export default {
  data() {
    return {
      minutes: null,
      seconds: null,
      dur: null,
    };
  },
  mounted() {
    this.getInitialPlaylist();
  },
  methods: {
    async getInitialPlaylist() {
      await this.axios
        .get(
          `https://api.spotify.com/v1/playlists/${this.$store.state.selectedPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const selectedPlaylist = {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description.startsWith("<a")
              ? ""
              : response.data.description,
            image: response.data.images[0].url,
            tracks: response.data.tracks.items.map(({ track }) => ({
              index: 0,
              id: track.id,
              name: track.name,
              artists: track.artists.map((artist) => artist.name),
              image: track.album.images[2].url,
              duration: track.duration_ms,
              album: track.album.name,
              context_uri: track.album.uri,
              track_number: track.track_number,
            })),
          };
          this.$store.commit("setSelectedPlaylist", { text: selectedPlaylist });
          // console.log(selectedPlaylist);
        });
    },
    minSec(ms) {
      // console.log(ms);
      this.minutes = Math.floor(ms / 60000);
      this.seconds = ((ms % 60000) / 1000).toFixed(0);
      this.dur = `${this.minutes}:${this.seconds}`;
    },
  },
};
</script>

<style scoped>
.playlist {
  margin: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}
.playlist img {
  height: 15rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 25px 50px -12px;
}
.details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #e0dede;
}
.title {
  color: white;
  font-size: 4rem;
}
.header-row {
  display: grid;
  grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
  color: #dddcdc;
  margin: 1rem 0 0 0;
  position: sticky;
  top: 15vh;
  padding: 1rem 3rem;
  transition: 0.3s ease-in-out;
}
.tracks {
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
}
.row {
  padding: 0.5rem 1rem;
  display: grid;
  grid-template-columns: 0.3fr 1.9fr 2fr 0.1fr;
  z-index: 100;
}
.row.row:hover {
  cursor: pointer;
  background-color: black;
  opacity: 0.8;
}
.col {
  display: flex;
  align-items: center;
  color: #dddcdc;
}
.col img {
  height: 40px;
}
.detail {
  display: flex;
  gap: 1rem;
}
.info {
  display: flex;
  flex-direction: column;
}
</style>
