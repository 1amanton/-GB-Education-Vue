<template>
  <div>
    <h1>SETTINGS PAGE</h1>

    <button @click="openModalAuthForm">Auth Form</button>
    <hr>

    <button @click="goPage">go to page 3</button>
    <hr>

    <router-link :to="{
      name: 'AddPaymentForm',
      params: {
        section: 'payment',
        category: 'Food'
      },
      query:{
        value: 200
      }
    }">Food 200</router-link>
    <br>
    <router-link :to="{
      name: 'AddPaymentForm',
      params: {
        section: 'payment',
        category: 'Transport'
      },
      query:{
        value: 50
      }
    }">Transport 50</router-link>
    <br>
    <router-link :to="{
      name: 'AddPaymentForm',
      params: {
        section: 'payment',
        category: 'Entertainment'
      },
      query:{
        value: 2000
      }
    }">Entertainment 2000</router-link>

  </div>
</template>

<script>
export default {
  name: "MySettings",

  methods: {
    goPage() {
      this.$router.push({
        name: "Dashboard",
        params: {
          page: 3
        }
      })
    },

    openModalAuthForm() {
      this.$modal.show("auth", {title: "Autn Form", component: "AuthForm"})
    }
  }
}
</script>

<style scoped>

</style>