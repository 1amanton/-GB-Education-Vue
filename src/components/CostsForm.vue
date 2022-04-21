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
          <input type="text" id="pay__category"
                 v-model.trim="newCost.category"
          >
        </div>

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
export default {
  name: "CostsForm",
  props:["list"],
  data() {
    return {
      showForm: false,
      newCost: {
        desc: "",
        category:"",
        money: ""
      },
    }
  },
  computed: {
    getCurrentDate() {
      return new Intl.DateTimeFormat('en-GB').format(new Date())
    }

  },
  methods: {
    addNew() {
      const obj = {
        id: this.list.length +1,
        dateCreated: this.getCurrentDate,
        desc: this.newCost.desc,
        category: this.newCost.category,
        value: this.newCost.money
      }
      console.log(obj)
      this.$emit("addNewCost", obj)
    }
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
</style>