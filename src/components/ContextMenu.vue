<template>
  <div class="abs" :style="getStyles">
    <div v-if="showMenu" class="menu">
      <div v-for="item in items" :key="item.text" @click="onClick(item)" class="menu__item">
        {{item.text}}
      </div>
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
        top: `${this.yPos - 64}px`,
        left: `${this.xPos + 72}px`,
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
.abs
  position: absolute
  clip-path: polygon(90% 0, 100% 10%, 100% 100%, 20% 100%, 10% 90%, 10% 10%, 0 0)
.menu
  background-color: darkgrey
  padding: 8px 8px 8px 16px
  &__item
    cursor: pointer
    padding: 4px
    border-bottom: 1px black solid
    font-weight: bold
    &:hover
      color: forestgreen

</style>