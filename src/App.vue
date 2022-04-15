<template>
  <div id="app">
    <CalculatorComponent/>
  </div>
</template>

<script>
import CalculatorComponent from "@/components/CalculatorComponent"

export default {
  components: {CalculatorComponent}
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box

#app
  font-size: 16px
</style>
