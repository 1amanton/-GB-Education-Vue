<template>
  <v-card>
    <v-card-title class="text-h5 cyan">
      ADD NEW PAYMENT
    </v-card-title>

    <v-card-text class="mt-8">
      <form action="">

        <v-text-field
            label="Description"
            placeholder="Spend money on..."

            :rules="[v => v.length >= 4 || 'Min 4 characters']"
            outlined
            v-model.trim="newCost.desc"
        ></v-text-field>

        <v-text-field
            label="How many money $ ?"
            placeholder="Placeholder"
            type="number"
            hide-spin-buttons
            outlined
            v-model.trim.number="newCost.money"
        ></v-text-field>


        <v-select
            :items="categoryList"
            label="Category"
            outlined
        ></v-select>

      </form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="cyan"
          @click.prevent="addNew"
      >
        SAVE
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CostsForm",
  props:{
    values: Object,
    dialog: Boolean
  },
  data() {
    return {
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
      getPaymentList: "getPaymentList",
      getCountCategory: "getCountCategory"
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

      this.$emit("closeForm")

    },

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