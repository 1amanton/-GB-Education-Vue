<template>
  <v-container>
    <v-row>

      <v-col>
        <div class="text-h5 text-sm-h3 mb-4">My Personal Costs</div>




        <v-dialog
            v-model="dialog"
            width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn v-on="on"
                   color="cyan"
                   dark
            >ADD NEW COST<v-icon>mdi-plus</v-icon></v-btn>
          </template>

          <CostsForm :dialog="dialog" @closeForm="closeForm"/>

        </v-dialog>


        <CostsList class="mt-6" :list="currentElements"/>

        <MyPagination
            :length="list.length"
            :currentPage="currentPage"
            :showElements="showElements"
            @changePage="changePage"
        />
      </v-col>

      <v-col>
        <div>
          <MyDiagram/>
        </div>
      </v-col>

    </v-row>
  </v-container>

</template>

<script>
import {mapGetters} from "vuex";
import CostsList from "@/components/CostsList";
import CostsForm from "@/components/CostsForm";
import MyPagination from "@/components/MyPagination";
import MyDiagram from "@/components/MyDiagramm";

export default {
  name: "DashboardView",
  components: {
    MyDiagram,
    MyPagination,
    CostsForm,
    CostsList
  },

  data() {
    return {

      dialog: false,
      currentPage: 1,
      showElements: 5
    }
  },

  computed:{
    ...mapGetters({
      list: "getPaymentList"
    }),

    currentElements() {
      return this.list.slice(this.showElements * (this.currentPage - 1), this.showElements * (this.currentPage - 1) + this.showElements)
    }
  },

  methods: {
    changePage(page) {
      console.log("CHANGE PAGE")
      this.currentPage = page
    },

    closeForm() {
      console.log("close from emit")
      this.dialog = false
    }
  },

  async created() {
    await this.$store.dispatch("fetchPaymentList")
  }
}
</script>

<style scoped>

</style>