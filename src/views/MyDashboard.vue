<template>
  <div id="dashboard">
    <span id="dashboard-title">My Personal Costs</span>
    <div class="costs">
      <div class="costs__left">

        <button @click="openModalForm">Add New Payment</button>

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
import {mapGetters} from "vuex";
import CostsList from "@/components/CostsList";
import CostsStats from "@/components/CostsStats";
import MyPagination from "@/components/MyPagination";

export default {
  name: "MyDashboard",

  components: {
    CostsList,
    CostsStats,
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
    },

    openModalForm() {
      this.$modal.show("addform", {title: "Add New Payment", component: "CostsForm"})
    }
  },

  async created() {
    await this.$store.dispatch("fetchPaymentList")
  },

  mounted() {
    if(!this.$route.params?.page || isNaN(this.$route.params.page)) return
    this.currentPage = Number(this.$route.params.page)
  }
}
</script>

<style lang="sass" scoped>
#dashboard
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

#dashboard-title
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

button
  background-color: aquamarine
  padding: 12px 16px
  font-weight: 700
  cursor: pointer
  margin-bottom: 64px
  &:hover
    background-color: #12d993

</style>