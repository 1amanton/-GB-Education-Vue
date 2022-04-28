<template>
  <div :class="[$style.wrp]">
    <div @click="onClick(currentPage - 1)">-</div>

    <div
        v-for="i in amount"
        :key="i"
        :class="{[$style.active]: currentPage === i}"
        @click="onClick(i)"
    >{{ i }}
    </div>

    <div @click="onClick(currentPage + 1)">+</div>
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    length: Number,
    showElements: Number,
    currentPage: Number
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.showElements)
    }
  },
  methods:{
    onClick(page) {
      if(page < 1 || page > this.amount) {
        return
      }
      this.$emit("changePage", page)
    }
  }

}
</script>

<style module lang="sass">
.wrp
  display: flex
  & > div
    padding: 10px
    cursor: pointer
    &.active
      background-color: #ccc

</style>