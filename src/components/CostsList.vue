<template>
  <div class="cost">
    <div class="cost__item__title">
      <span class="cost__item__id">ID</span>
      <span class="cost__item__desc">DESCRIPTION</span>
      <span class="cost__item__date">DATE</span>
      <span class="cost__item__cat">CATEGORY</span>
      <span class="cost__item__money">$</span>
      <span class="cost__item__money">...</span>
    </div>

    <div class="cost__list">
      <div class="cost__item"
           v-for="(item,index) in list"
           :key="index"
      >
        <span>{{ item.id }}</span>
        <span>{{ item.desc }}</span>
        <span>{{ item.dateCreated }}</span>
        <span>{{ item.category }}</span>
        <span>{{ item.value }}</span>
        <span class="cursor" @click="onContextMenuClick($event, item)">...</span>
      </div>
      <transition name="fade">
        <ContextMenu/>
      </transition>
    </div>

  </div>
</template>

<script>
import ContextMenu from "@/components/ContextMenu";

export default {
  name: "CostsList",

  components:{ContextMenu},

  props: {
    list: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    editItem(item) {
      console.log("From edit item", item)
      this.$modal.show("addform", {title: "Edit Payment", component: "CostsForm", props: {item}})
      // this.$store.commit("addDataToPaymentList", item)

    },
    deleteItem(item) {
      console.log("From delete item", item)
      this.$store.commit("deleteDataFromPaymentList", item)
      this.$contextMenu.hide()

    },

    onContextMenuClick(event, item) {
      const items = [
        {text: "Edit", action: () => {this.editItem(item)}},
        {text: "Delete", action: () => {this.deleteItem(item)}}
      ]

      this.$contextMenu.show({event, items})

    }
  }
}
</script>

<style lang="sass" scoped>
.cost
  width: 100%
  &__list
    display: flex
    flex-direction: column
  &__item
    display: flex
    justify-content: space-between
    padding: 8px 0
    &:nth-child(odd)
      background-color: #919191
    &__title
      font-weight: bold
      width: 100%
      display: flex
      justify-content: space-between
      background-color: orange
      padding: 16px 0
      & span
        flex: 1
        text-align: center
    & span
      text-align: center
      flex: 1

.cursor
  cursor: pointer
</style>