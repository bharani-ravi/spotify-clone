<template>
  <div class="player-control">
    <div class="shuffle">
      <span class="material-symbols-outlined shuffle" @click="changePrevTrack">
        shuffle
      </span>
    </div>
    <div class="previous">
      <span class="material-symbols-outlined previous"> skip_previous </span>
    </div>
    <div class="state">
      <span
        class="material-symbols-outlined state"
        v-if="this.$store.state.playerSate"
      >
        play_circle
      </span>
      <span class="material-symbols-outlined state" v-else> pause_circle </span>
    </div>
    <div class="next">
      <span
        class="material-symbols-outlined next"
        @click="changeNextTrack('next', $event)"
      >
        skip_next
      </span>
    </div>
    <div class="repeat">
      <span class="material-symbols-outlined repeat"> repeat </span>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.changePrevTrack();
    this.changeNextTrack();
  },
  methods: {
    async changePrevTrack() {
      await this.axios.post(
        `https://api.spotify.com/v1/me/player/previous`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await this.axios
        .get("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response1) => {
          if (response1.data !== "") {
            const currentPlaying = {
              id: response1.data.item.id,
              name: response1.data.item.name,
              artists: response1.data.item.artists.map((artist) => artist.name),
              image: response1.data.item.album.images[2].url,
            };
            this.$store.commit("setcurrentlyPlaying", {
              text: currentPlaying,
            });
          }
        });
    },
    async changeNextTrack(message) {
      console.log(message);
      await this.axios.post(
        `https://api.spotify.com/v1/me/player/${message}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await this.axios
        .get("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response1) => {
          if (response1.data !== "") {
            const currentPlaying = {
              id: response1.data.item.id,
              name: response1.data.item.name,
              artists: response1.data.item.artists.map((artist) => artist.name),
              image: response1.data.item.album.images[2].url,
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
.player-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.material-symbols-outlined {
  color: #b3b3b3;
  transition: 0.2s ease-in-out;
}
.material-symbols-outlined:hover {
  color: white;
  transform: scale(1.2) !important;
  cursor: pointer;
}
.previous,
.state,
.next {
  font-size: 2rem;
}
.state {
  color: white;
}
.shuffle,
.repeat {
  color: green;
}
</style>
