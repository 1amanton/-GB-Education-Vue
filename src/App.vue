<template>
  <div id="app">

    <header>
      <router-link :to="{name: 'Dashboard', params: {page: '1'}}">Dashboard</router-link> /
      <router-link to="/settings">Settings</router-link> /
      <router-link to="/notfound">Not found</router-link>
    </header>

    <router-view/>

    <transition name="fade">
      <ModalForm :settings="settings" v-if="modalShow"/>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      settings: {

      },
      modalShow: false
    }
  },
  components: {
    ModalForm: () => import(/*webpackChunkName: "ModalForm" */"@/components/ModalForm")
  },

  methods: {
    onShow(data) {
      this.modalShow = true
      this.settings = data
      console.log(data)
    },

    onHide() {
      this.settings = {}
      this.modalShow = false
    }

  },

  mounted() {
    this.$modal.EventBus.$on("show", this.onShow)
    this.$modal.EventBus.$on("hide", this.onHide)
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("show", this.onShow)
    this.$modal.EventBus.$off("hide", this.onHide)
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

header
  padding: 32px
  & a
    font-weight: bold
    color: #2b6c9b
    &.router-link-exact-active
      color: green



.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0


</style>
