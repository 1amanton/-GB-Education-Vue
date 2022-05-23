<template>
  <v-container>
    <v-row class="amber">
      <v-col :cols="1">#</v-col>
      <v-col :cols="3">Date</v-col>
      <v-col :cols="3">Desc</v-col>
      <v-col :cols="2">Category</v-col>
      <v-col :cols="2">Money</v-col>
      <v-col :cols="1">Edit</v-col>
    </v-row>

    <v-row class="monochrome"
        v-for="(item,index) in list"
        :key="index"
    >
      <v-col :cols="1">{{ item.id }}</v-col>
      <v-col :cols="3">{{ item.dateCreated }}</v-col>
      <v-col :cols="3">{{ item.desc }}</v-col>
      <v-col :cols="2">{{ item.category }}</v-col>
      <v-col :cols="2">{{ item.value }}</v-col>
      <v-col :cols="1" class="text-center cursor"
             @click="onContextMenuClick($event, item)"
      >*</v-col>
    </v-row>


    <div class="cost">
      <div class="cost__list">

        <transition name="fade">
          <ContextMenu/>
        </transition>

      </div>
    </div>

  </v-container>
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
      // this.$store.commit("setAvailableCategoryList")


      this.$contextMenu.hide()

    },

    onContextMenuClick(event, item) {
      const items = [
        {text: "Edit", action: () => {this.editItem(item)}},
        {text: "Delete", action: () => {this.deleteItem(item)}}
      ]

      this.$contextMenu.show({event, items})

    }
  },
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



.monochrome:nth-child(odd)
  background-color: #919191
</style>