<template>
  <div class="nav">
    <div class="search-bar">
      <span class="material-symbols-outlined"> search </span>
      <input type="text" placeholder="Search for Artists, Songs" />
    </div>
    <div class="avatar">
      <a href="">
        <span class="material-symbols-outlined user"> account_circle </span>
        <span>{{ this.$store.state.userInfo.userName }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: none;
}
.search-bar {
  background-color: white;
  width: 30%;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.search-bar > input {
  border: none;
  height: 2rem;
  width: 100%;
}
.search-bar > input:focus {
  outline: none;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 125px;
  height: 35px;
  border-radius: 75px;
  background-color: black;
}
.avatar a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.user {
  font-size: 1.3rem;
  background-color: #282828;
  padding: 0.2rem;
  border-radius: 1rem;
  color: #c7c5c5;
}
</style>
