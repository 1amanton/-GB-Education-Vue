<template>

  <div>
    <v-pagination
        v-model="page"
        :length=amount

        @next="onClick(page, 'next')"
        @previous="onClick(page, 'prev')"
        @input="onClick(page, 'INPUT PAGE')"


        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
    ></v-pagination>

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
  data() {
    return {
      page: 1
    }
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.showElements)
    }
  },

  methods:{

    onClick(page, tag) {
      console.log("CLICKED PAG",tag, page)
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