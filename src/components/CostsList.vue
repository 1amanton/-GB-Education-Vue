<template>
  <div class="cost">
    <div class="cost__item__title">
      <span class="cost__item__id">ID</span>
      <span class="cost__item__desc">DESCRIPTION</span>
      <span class="cost__item__date">DATE</span>
      <span class="cost__item__cat">CATEGORY</span>
      <span class="cost__item__money">$</span>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CostsList",
  props: {
    list: {
      type: Array,
      default: () => []
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
</style>