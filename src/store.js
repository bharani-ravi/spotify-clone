import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      userInfo: {},
      playlist: [],
      token: null,
      selectedPlaylistId: "4sdDSHV4ihyV86RrUjLTDH",
      selectedPlaylist: null,
      currentlyPlaying: null,
      playerState: false,
      item: null,
      discover_weekly: null,
      discover_weekly_items: null,
      isData: false,
    };
  },

  mutations: {
    setUser(state, payload) {
      state.userInfo = payload.text;
    },
    setToken(state, payload) {
      state.token = payload.text;
    },
    setPlaylist(state, payload) {
      state.playlist = payload;
    },
    setSelectedPlaylist(state, payload) {
      state.selectedPlaylist = payload;
    },
    setcurrentlyPlaying(state, payload) {
      state.currentlyPlaying = payload;
    },
    setPlayerState(state, payload) {
      state.playerState = payload;
    },
    setWeekplaylist(state, payload) {
      state.discover_weekly = payload.text;
      state.discover_weekly_items = payload.text.tracks.items;
    },
    setData(state, payload) {
      state.isData = payload;
    },
  },
  actions: {
    setPlaylist({ commit }, payload) {
      commit("setPlaylist", payload.text);
    },
  },
});

export default store;
