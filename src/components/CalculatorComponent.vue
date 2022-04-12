<template>
  <div class="calculator">
    <span id="title">Calculator</span>

    <div class="operand">
      <div class="operand-item">
        <label for="operand-first">First operand:</label>
        <input type="number"
               id="operand-first"
               v-model.number="operandFirst"
        >
      </div>

      <div class="operand-item">
        <label for="operand-second">Second operand:</label>
        <input type="number"
               id="operand-second"
               v-model.number="operandSecond"
        >
      </div>
    </div>

    <div class="actions">
      <button
          @click="getSum"
      >+</button>
      <button
          @click="getSubtraction"
      >-</button>
      <button
          @click="getMultiply"
      >*</button>
      <button
          @click="getDivide"
      >/</button>
      <button
          @click="getPow"
      >x<sup>y</sup>
      </button>
      <button
          @click="getFloor"
      >//</button>
    </div>

    <div class="result">
      Result:<span id="result"> {{ result }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalculatorComponent",
  data() {
    return {
      operandFirst: "",
      operandSecond: "",
      result: ""
    }
  },
  methods: {
    getSum() {
      return this.result = this.operandFirst + this.operandSecond
    },

    getSubtraction() {
      return this.result = this.operandFirst - this.operandSecond
    },

    getMultiply() {
      return this.result = this.operandFirst * this.operandSecond
    },

    getDivide() {
      return this.result = this.operandFirst / this.operandSecond
    },

    getPow() {
      return this.result = Math.pow(this.operandFirst, this.operandSecond)
    },

    getFloor() {
      return this.result = Math.floor(this.operandFirst / this.operandSecond)
    }
  }
}
</script>

<style lang="sass" scoped>
#title
  color: whitesmoke
  font-size: 3rem

input
  margin-left: 1rem
  height: 50px
  width: 75px
  border-radius: 8px
  font-size: 2rem

button
  height: 60px
  width: 60px
  border-radius: 8px
  font-size: 1.5rem
  display: flex
  align-items: center
  justify-content: center
  background-color: orange
  font-weight: bold
  cursor: pointer
  &:hover
    background-color: #e19700

.calculator
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 2rem
  font-size: 2rem
  background-color: #666
  padding: 2rem
  width: 700px
  border-radius: 8px
  margin: 0 auto

.operand
  display: flex
  gap: 3rem
  &-item
    display: flex
    align-items: center

.actions
  display: flex
  gap: 2rem

#result
  color: whitesmoke
  font-size: 2.5rem
</style>