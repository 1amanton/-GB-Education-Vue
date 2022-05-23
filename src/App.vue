<template>
  <v-app>

    <v-app-bar app
               flat
               class="d-flex justify-center"
               color="cyan lighten-3"
    >
      <v-btn to="/" class="mr-8">Dashboard</v-btn>
      <v-btn to="/settings">Settings</v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
      <ModalForm :settings="settings" v-if="modalShow"/>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    ModalForm: () => import(/*webpackChunkName: "ModalForm" */"@/components/ModalForm")
  },

  data: () => ({
    settings: {},
    modalShow: false
  }),
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
    this.$contextMenu.EventBus.$on("hide", this.onHide)
    this.$contextMenu.hide()
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("show", this.onShow)
    this.$modal.EventBus.$off("hide", this.onHide)
    this.$contextMenu.EventBus.$off("hide", this.onHide)
  }
};
</script>
