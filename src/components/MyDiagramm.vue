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
    <div>Total Costs: {{getFPV}} </div>
    <div>A C: {{this.availableCategoryList }} </div>
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
    ...mapGetters({
      list: "getPaymentList",
      categoryList: "getCategoryList",

      availableCategoryList: "getAvailableCategoryList",
      getCountCategory: "getCountCategory"
    })
  },
  watch: {
    availableCategoryList() {
      this.chartData.labels = this.availableCategoryList
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

    this.getB(this.list)

  },

  methods: {

    getB(list) {
      this.categoryList.forEach(category => {
        let eachCategory = list.reduce((items, payment) => {
          if(payment.category === category) {
            // console.log(category)
            items.push(payment)
          }
          return items
        }, [])

        console.log("eachCategory", eachCategory)
        console.log("eachCategory length", eachCategory.length)
        console.log("COUNT ARRAY", this.chartData.datasets[0].data)

        this.chartData.datasets[0].data.push(eachCategory.length)

      })
    },

  },

  mounted() {

  }
}
</script>
