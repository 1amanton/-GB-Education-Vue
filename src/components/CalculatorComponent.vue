<template>
  <div class="calculator">
    <span id="title">Calculator</span>

    <div class="operand">
      <div class="operand-item">
        <label for="operand-first">First operand:</label>
        <input type="number" checked
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

    <span class="error">{{ divideError }}</span>

    <div class="result">
      Result:<span id="result"> {{ result }}</span>
    </div>

    <div class="reset">
      <button @click="reset">RESET</button>
    </div>

    <div class="actions">
      <button
          @click="calculate()"
      >+</button>
      <button
          @click="calculate('-')"
      >-</button>
      <button
          @click="calculate('*')"
      >*</button>
      <button
          @click="calculate('/')"
      >/</button>
      <button
          @click="calculate('xy')"
      >x<sup>y</sup>
      </button>
      <button
          @click="calculate('//')"
      >//</button>
    </div>

    <div id="numbers-show">
      <input type="checkbox" name="" id="num-show" v-model="numbersVisibility">
      <label for="num-show">Show numbers keypad</label>
    </div>

    <div class="numbers" v-if="numbersVisibility">
      <div class="nums">
        <button
            v-for="(number,idx) in numbers"
            :key="idx"
            @click="numberClick(number)"
        >
          {{ number }}
        </button>

        <button id="backspace"
            @click="numbersDel"
        >&lArr;</button>
      </div>

      <div class="ops">
        <div class="radios">
          <div class="radios-item">
            <input checked type="radio" name="radio-operands" id="radio-first" value="radioFirst"
                   v-model="radioOperand"
            >
            <label for="radio-first">First Operand</label>
          </div>

          <div class="radios-item">
            <input type="radio" name="radio-operands" id="radio-second" value="radioSecond"
                   v-model="radioOperand"
            >
            <label for="radio-second">Second Operand</label>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "CalculatorComponent",
  data() {
    return {
      operandFirst: 0,
      operandSecond: 0,
      numArrFirst: [],
      numArrSecond: [],
      radioOperand: "radioFirst",
      result: 0,
      divideError: "",
      numbers: [1,2,3,4,5,6,7,8,9,0],
      numbersVisibility: false
    }
  },
  methods: {
    calculate(operation = "+") {
      this.divideError = ""
      switch (operation) {
        case "+" :
          this.getSum()
          break;
        case "-" :
          this.getSubtraction()
          break;
        case "*" :
          this.getMultiply()
          break;
        case "/" :
          this.getDivide()
          break;
        case "xy" :
          this.getPow()
          break;
        case "//" :
          this.getFloor()
          break;
      }
    },
    reset() {
      this.operandFirst = 0
      this.operandSecond = 0
      this.result = 0
      this.divideError = ""
      this.numArrFirst = []
      this.numArrSecond = []
    },

    numberClick(number) {
      if(this.radioOperand == "radioFirst") {
        this.numArrFirst.push(number)
        this.operandFirst = parseInt(this.numArrFirst.join(""))
      }

      if(this.radioOperand == "radioSecond") {
        this.numArrSecond.push(number)
        this.operandSecond = parseInt(this.numArrSecond.join(""))
      }
    },

    numbersDel() {
      if(this.radioOperand == "radioFirst") {
        this.numArrFirst = this.numArrFirst.slice(0, -1)
        this.operandFirst = parseInt(this.numArrFirst.join(""))
      }

      if(this.radioOperand == "radioSecond") {
        this.numArrSecond = this.numArrSecond.slice(0, -1)
        this.operandSecond = parseInt(this.numArrSecond.join(""))
      }
    },


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
      if(this.operandSecond == 0) {
        this.divideError = "Делить на 0 нельзя"
      } else {
        return this.result = this.operandFirst / this.operandSecond
      }
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
  margin-right: 0.5rem
  height: 30px
  width: 30px


.operand-item input
  margin-left: 1rem
  height: 50px
  width: 100px
  border-radius: 8px
  font-size: 2rem

.actions button
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

.nums button
  height: 60px
  width: 60px
  border-radius: 8px
  font-size: 1.5rem
  display: flex
  align-items: center
  justify-content: center
  background-color: #e3c69c
  font-weight: bold
  cursor: pointer
  &:hover
    background-color: #e0af7d

.reset button, #backspace
  padding: 1rem
  border-radius: 8px
  font-size: 1.5rem
  display: flex
  align-items: center
  justify-content: center
  background-color: #b0562d
  font-weight: bold
  cursor: pointer
  &:hover
    background-color: #c46032

.calculator
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 2rem
  font-size: 2rem
  background-color: #666
  padding: 2rem
  width: 800px
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

.error
  color: #a41515
  font-weight: bold

#numbers-show
  display: flex
  align-items: center

.numbers
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 1.5rem

.nums
  display: flex
  gap: 0.5rem

.radios
  display: flex
  gap: 3rem
  &-item
    display: flex
    align-items: center
</style>