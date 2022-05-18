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

        <div class="cost__input">
          <label for="pay__money">How many money $ ?</label>
          <input type="number" id="pay__money"
                 v-model.trim.number="newCost.money"
          >
        </div>

        <button @click.prevent="addNew">SAVE</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CostsForm",
  props:{
    // list: Object,
    values: Object
  },
  data() {
    return {
      showForm: true,
      newCost: {
        desc: "",
        category:"",
        money: 0,
        dateCreated: ""
      },
    }
  },
  computed: {
    ...mapGetters({
      categoryList: "getCategoryList",
      getPaymentList: "getPaymentList"
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
        id: this.getRandomInt,
        dateCreated: this.getCurrentDate,
        desc: this.newCost.desc,
        category: this.newCost.category,
        value: this.newCost.money
      }

      if(this.getPaymentList.find(el => el.id === this.newCost.id)) {
        console.log("в листе есть такой уже")
        this.$modal.hide()
      } else {
        this.$store.commit("addDataToPaymentList", obj)
        this.$modal.hide()
      }

    }
  },

  watch: {
    newCost: {
      handler(newValue) {
        this.$store.commit("setChangeToPaymentList", newValue)
      },
      deep: true
    }
  },

  async created() {
    await this.$store.dispatch("fetchCategoryList")
  },

  mounted() {

    if(this.values?.item) {
      const {category, dateCreated, desc, value, id} = this.values?.item


      this.newCost.category = category
      this.newCost.dateCreated = dateCreated
      this.newCost.desc = desc
      this.newCost.money = value
      this.newCost.id = id

      const newObj = this.newCost

      this.$store.commit("setChangeToPaymentList", newObj)

      return
    }

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