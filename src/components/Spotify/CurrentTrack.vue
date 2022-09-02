<template>
  <div class="cuurent-track" v-if="this.$store.state.currentlyPlaying">
    <div class="track">
      <div class="track-image">
        <img
          :src="this.$store.state.currentlyPlaying.text.image"
          alt="currentplaying"
        />
      </div>
    </div>
    <div class="track-info" v-if="this.$store.state.currentlyPlaying">
      <h4>{{ this.$store.state.currentlyPlaying.text.name }}</h4>
      <h6>
        {{ this.$store.state.currentlyPlaying.text.artists.join(", ") }}
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.getCurrentTrack();
  },
  methods: {
    async getCurrentTrack() {
      await this.axios
        .get(" https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data !== "") {
            const item = response.data.item;

            const currentPlaying = {
              id: item.id,
              name: item.name,
              artists: item.artists.map((artist) => artist.name),
              image: item.album.images[2].url,
            };
            this.$store.commit("setcurrentlyPlaying", {
              text: currentPlaying,
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.cuurent-track {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.track-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.track-info h4 {
  color: white;
}
.track-info h6 {
  color: #b3b3b3;
}
</style>
