<template>
  <div v-if="showMenu" class="menu" :style="getStyles">
    <div v-for="item in items" :key="item.text" @click="onClick(item)" class="menu__item">
      {{item.text}}
    </div>

  </div>

</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      showMenu: true,
      items: [],
      xPos: 0,
      yPos: 0
    }
  },

  computed: {
    getStyles() {
      return {
        // top: `${this.xPos + 10}px`,
        left: `${this.yPos}px`,
        color: `white`
      }
    }
  },

  methods: {
    onClick(item) {
      item.action()
    },

    onShow({items, caller}) {
      this.showMenu = true
      this.items = items
      this.setPosition(caller)
    },

    onHide() {
      this.showMenu = false
      this.items = []
    },

    setPosition(caller) {
      console.log(caller.getBoundingClientRect())
      const pos = caller.getBoundingClientRect()
      this.xPos = pos.left
      this.yPos = pos.top
    }
  },

  mounted() {
    this.$contextMenu.EventBus.$on("show", this.onShow)
    this.$contextMenu.EventBus.$on("hide", this.onHide)
  },
  beforeDestroy() {
    this.$contextMenu.EventBus.$off("show", this.onShow)
    this.$contextMenu.EventBus.$off("hide", this.onHide)
  },



}

</script>

<style scoped lang="sass">
.menu
  position: absolute
  background-color: green
  padding: 8px
  &__item
    cursor: pointer
    padding: 4px
    border-bottom: 1px black solid

</style>