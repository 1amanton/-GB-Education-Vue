<template>
  <div class="wrapper">
    <div class="header">{{ settings.title }}</div>

    <div class="content">
      <component
          :is="settings.component"
          :values="settings.props"/>
    </div>

    <div class="footer">
      <button @click="onClick">Close</button>
    </div>
    <br>

  </div>
</template>

<script>

export default {
  name: "ModalForm",
  components: {
    CostsForm: () => import(/*webpackChunkName: "NewPayment" */"@/components/CostsForm"),
    AuthForm: () => import(/*webpackChunkName: "Auth" */"@/components/AuthForm")},

  props: {
    settings: Object
  },

  methods: {
    onClick() {
      this.$modal.hide()
    }
  }
}
</script>

<style lang="sass" scoped>

.wrapper
  background-color: grey
  padding: 16px
  position: absolute
  top: 20%
  left: 30%

</style>