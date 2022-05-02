<template>
  <div id="app">

    <header>
      <router-link :to="{name: 'Dashboard', params: {page: '1'}}">Dashboard</router-link> /
      <router-link to="/settings">Settings</router-link> /
      <router-link to="/notfound">Not found</router-link>
    </header>
    <router-view/>
  </div>
</template>

<script>




export default {
  name: 'App',
  components: {

  },

  methods: {

  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

</style>
