<template>
  <div id="app">
    <span id="app-title">My Personal Costs</span>
    <div class="costs">
      <div class="costs__left">
        <CostsForm :list="list"/>
        <div id="total">Total costs : {{ getFPV }}</div>
        <CostsList :list="currentElements"/>
        <MyPagination
            :currentPage="currentPage" :showElements="showElements" :length="list.length"
            @changePage="changePage"
        />
      </div>
      <CostsStats/>
    </div>
  </div>
</template>

<script>
import CostsList from './components/CostsList'
import CostsStats from './components/CostsStats'
import MyPagination from './components/MyPagination'
import CostsForm from '@/components/CostsForm'
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    CostsList,
    CostsStats,
    CostsForm,
    MyPagination
  },
  data() {
    return {
      currentPage: 1,
      showElements: 5
    }
  },

  computed: {
    getFPV() {
      return this.$store.getters.getFullPaymentValue
    },
    ...mapGetters({
      list: "getPaymentList"
    }),

    currentElements() {
      return this.list.slice(this.showElements * (this.currentPage - 1), this.showElements * (this.currentPage - 1) + this.showElements)
    }
  },

  methods: {
    changePage(page) {
      this.currentPage = page
    }
  },
  async created() {
    await this.$store.dispatch("fetchPaymentList")
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

.costs
  display: flex
  justify-content: space-between
  width: 100%
  &__left
    width: 70%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

#app-title
  font-size: 48px
  background-color: aquamarine
  display: block
  padding: 8px 0
  margin-bottom: 32px
  font-weight: bold

#total
  margin-bottom: 16px
  font-weight: bold
  font-size: 20px
  border-bottom: 1px solid grey
</style>
