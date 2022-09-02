<template>
  <div class="footer">
    <CurrentTrack />
    <PlayerControls></PlayerControls>
    <!-- <TheLoading /> -->
  </div>
</template>

<script>
import CurrentTrack from "./CurrentTrack.vue";
import PlayerControls from "./PlayerControls.vue";
// import TheLoading from "./TheLoading.vue";

export default {
  components: { CurrentTrack, PlayerControls },
};
</script>

<style scoped>
.footer {
  background-color: #181818;
  height: 100%;
  width: 100%;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}
</style>
