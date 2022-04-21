<template>
  <div class="round__wrapper">
    <div class="round"></div>
    <div class="categorys">
      <div class="categorys__item">
        <div class="categorys__color" id="food"></div>
        <span>Food</span>
      </div>

      <div class="categorys__item">
        <div class="categorys__color" id="cloth"></div>
        <span>Cloth</span>
      </div>

      <div class="categorys__item">
        <div class="categorys__color" id="transport"></div>
        <span>Transport</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "CostsStats"
}
</script>

<style lang="sass" scoped>

.round
  height: 400px
  width: 400px
  background-color: lightpink
  border-radius: 50%
  &__wrapper
    width: 40%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

.categorys
  margin-top: 16px
  display: flex
  flex-direction: column
  gap: 12px
  &__item
    display: flex
    align-items: center
    gap: 8px
  &__color
    width: 20px
    height: 20px
    border-radius: 50%

#food
  background-color: orange
#cloth
  background-color: red
#transport
  background-color: blue
</style>