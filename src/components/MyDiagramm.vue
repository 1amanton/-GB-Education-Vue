<template>
  <div>
    <Doughnut
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />
    <v-row class="mt-8 light-green">
      <v-col :cols="3">#</v-col>
      <v-col :cols="3">Category</v-col>
      <v-col :cols="3">Total money</v-col>
      <v-col :cols="3">Counter</v-col>
    </v-row>

    <v-row class="monochrome" v-for="(item, index) in getCountCategory" :key="index">
      <v-col :cols="3">{{index + 1}}</v-col>
      <v-col :cols="3">{{item.title}}</v-col>
      <v-col :cols="3">{{item.value}} $</v-col>
      <v-col :cols="3">{{item.counter}}</v-col>
    </v-row>

    <v-row class="light-green lighten-1 font-weight-bold text-right">
      <v-col :cols="12">Total Costs: {{getFPV}} $</v-col>
    </v-row>
  </div>

</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
import {mapGetters} from "vuex";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'MyDiagram',
  components: {
    Doughnut
  },
  computed: {
    /**
     * two getters syntax
     */
    getFPV() {
      return this.$store.getters.getFullPaymentValue
    },
    getCategoryCount() {
      return this.getCountCategory.map(el => el.counter)
    },
    getCategoryAll() {
      return this.getCountCategory.map(el => el.title)
    },
    getCategoryMoney() {
      return this.getCountCategory.map(el => {
        return `${el.title } : ${el.value} $`
      })
    },
    ...mapGetters({
      list: "getPaymentList",
      getCountCategory: "getCountCategory"
    })
  },
  watch: {
    getCategoryAll() {
      this.chartData.labels = this.getCategoryAll
    },
    getCategoryCount() {
      this.chartData.datasets[0].data = this.getCategoryCount
    }

  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ['#ff8100', '#be34ce', '#00D8FF', '#76c720', '#DD1B16'],
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },



  async created() {
    console.log("created")
    await this.$store.dispatch("fetchCategoryList")
    await this.$store.dispatch("fetchPaymentList")
  },

  methods: {
  },

  mounted() {
  }
}
</script>
<style lang="sass" scoped>
.monochrome:nth-child(even)
  background-color: #919191
</style>
