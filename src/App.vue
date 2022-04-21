<template>
  <div id="app">
    <span id="app-title">My Personal Costs</span>
    <div class="costs">
      <div class="costs__left">
        <CostsForm @addNewCost="addCostList" :list="costList"/>
        <CostsList :list="costList"/>
      </div>
      <CostsStats/>
    </div>
  </div>
</template>

<script>
import CostsList from './components/CostsList'
import CostsStats from './components/CostsStats'
import CostsForm from '@/components/CostsForm'

export default {
  name: 'App',
  components: {
    CostsList,
    CostsStats,
    CostsForm
  },
  data() {
    return {
      costList: []
    }
  },
  methods: {
    fetchData() {
      return [
        {
          id: 1,
          dateCreated: "21/04/2022",
          desc: "Завтрак",
          category: "Food",
          value: 199
        },
        {
          id: 2,
          dateCreated: "22/04/2022",
          desc: "Метро",
          category: "Transport",
          value: 49
        },
        {
          id: 3,
          dateCreated: "23/04/2022",
          desc: "Тренировка",
          category: "Sport",
          value: 99
        },
        {
          id: 4,
          dateCreated: "24/04/2022",
          desc: "Футболка",
          category: "Cloth",
          value: 129
        }
      ]
    },
    addCostList(obj) {
      console.log("clicked")
      this.costList.push(obj)
    }
  },
  created() {
    this.costList = this.fetchData()
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

#app-title
  font-size: 48px
  background-color: aquamarine
  display: block
  padding: 8px 0
  margin-bottom: 32px
  font-weight: bold
</style>
