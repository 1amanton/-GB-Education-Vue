<template>
  <div class="cost__add">
    <button id="show" @click="showForm = !showForm">ADD NEW COST +</button>

    <div class="cost__form"
         v-if="showForm"
    >
      <form action="">
        <div class="cost__input">
          <label for="pay__desc">Description</label>
          <input type="text" id="pay__desc"
                 v-model.trim="newCost.desc"
          >
        </div>

        <div class="cost__input">
          <label for="pay__category">Category</label>
          <br>
          <select id="pay__category" v-model="newCost.category" v-if="categoryList">
            <option v-for="(category, idx) in categoryList"
                    :key="idx"
            > {{ category }}</option>
          </select>
        </div>

<!--        <div class="cost__input">-->
<!--          <label for="pay__category">Category</label>-->
<!--          <input type="text" id="pay__category"-->
<!--                 v-model.trim="newCost.category"-->
<!--          >-->
<!--        </div>-->

        <div class="cost__input">
          <label for="pay__money">How many money $ ?</label>
          <input type="number" id="pay__money"
                 v-model.trim.number="newCost.money"
          >
        </div>

        <button @click.prevent="addNew">ADD NEW</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CostsForm",
  props:["list"],
  data() {
    return {
      showForm: true,
      newCost: {
        desc: "",
        category:"",
        money: 0
      },
    }
  },
  computed: {
    ...mapGetters({
      categoryList: "getCategoryList",
    }),

    getCurrentDate() {
      return new Intl.DateTimeFormat('en-GB').format(new Date())
    },

    getRandomInt() {
     return  Math.round(Date.now() * Math.random())
    }

  },
  methods: {
    addNew() {
      const obj = {
        // id: this.list.length +1,
        id: this.getRandomInt,
        dateCreated: this.getCurrentDate,
        desc: this.newCost.desc,
        category: this.newCost.category,
        value: this.newCost.money
      }

      this.$store.commit("addDataToPaymentList", obj)
    }
  },

  async created() {
    await this.$store.dispatch("fetchCategoryList")
  },

  mounted() {

    const {category, section} = this.$route.params
    const {value} = this.$route.query

    if(!category || !section || !value) return

    this.newCost.category = category
    this.newCost.money = value
    this.addNew()


  }
}
</script>

<style lang="sass" scoped>
.cost__form
  box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.25)
  padding: 16px
  & form
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    text-align: start

.cost__input
    width: 200px
    margin-bottom: 16px

.cost__add
  width: 100%
  padding: 16px
  & button
    background-color: aquamarine
    padding: 12px 16px
    font-weight: 700
    margin-bottom: 16px
    cursor: pointer
    &:hover
      background-color: #12d993

#show
  margin-bottom: 32px

select
  width: 175px
</style>