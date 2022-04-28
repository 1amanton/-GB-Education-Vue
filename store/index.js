import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

const mutations = {
    setPaymentList(state, payload) {
        state.paymentList = payload
    },
    addDataToPaymentList(state, payload) {
        state.paymentList.push(payload)
    },
    setCategoryList(state, payload) {
        state.categoryList = payload
    }
}

const getters = {
    getPaymentList: state => state.paymentList,
    getFullPaymentValue: state => {
        return state.paymentList.reduce((res, cur) => res + cur.value, 0)
    },
    getCategoryList: state => state.categoryList
}

export default new Vuex.Store ({
    state: {
        paymentList: [],
        categoryList: []
    },
    mutations,
    actions: {
        fetchCategoryList({commit}) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(["Food", "Transport", "Sport", "Cloth"])
                }, 1000)
            })
                .then(res => {
                    commit("setCategoryList", res)
                })
        },
        fetchPaymentList({commit}) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(
                        [
                            {
                                id: 1,
                                dateCreated: "21/04/2022",
                                desc: "Завтрак",
                                category: "Food",
                                value: 199
                            },
                            {
                                id: 2,
                                dateCreated: "22/04/2022",
                                desc: "Метро",
                                category: "Transport",
                                value: 49
                            },
                            {
                                id: 3,
                                dateCreated: "23/04/2022",
                                desc: "Тренировка",
                                category: "Sport",
                                value: 99
                            },
                            {
                                id: 4,
                                dateCreated: "24/04/2022",
                                desc: "Футболка",
                                category: "Cloth",
                                value: 129
                            },
                            {
                                id: 5,
                                dateCreated: "21/04/2022",
                                desc: "Завтрак",
                                category: "Food",
                                value: 199
                            },
                            {
                                id: 6,
                                dateCreated: "22/04/2022",
                                desc: "Метро",
                                category: "Transport",
                                value: 49
                            },
                            {
                                id: 7,
                                dateCreated: "23/04/2022",
                                desc: "Тренировка",
                                category: "Sport",
                                value: 99
                            },
                            {
                                id: 8,
                                dateCreated: "24/04/2022",
                                desc: "Футболка",
                                category: "Cloth",
                                value: 129
                            },
                            {
                                id: 9,
                                dateCreated: "21/04/2022",
                                desc: "Завтрак",
                                category: "Food",
                                value: 199
                            },
                            {
                                id: 10,
                                dateCreated: "22/04/2022",
                                desc: "Метро",
                                category: "Transport",
                                value: 49
                            },
                            {
                                id: 11,
                                dateCreated: "23/04/2022",
                                desc: "Тренировка",
                                category: "Sport",
                                value: 99
                            },
                            {
                                id: 12,
                                dateCreated: "24/04/2022",
                                desc: "Футболка",
                                category: "Cloth",
                                value: 129
                            },
                            {
                                id: 13,
                                dateCreated: "21/04/2022",
                                desc: "Завтрак",
                                category: "Food",
                                value: 199
                            },
                            {
                                id: 14,
                                dateCreated: "22/04/2022",
                                desc: "Метро",
                                category: "Transport",
                                value: 49
                            },
                            {
                                id: 15,
                                dateCreated: "23/04/2022",
                                desc: "Тренировка",
                                category: "Sport",
                                value: 99
                            },
                            {
                                id: 16,
                                dateCreated: "24/04/2022",
                                desc: "Футболка",
                                category: "Cloth",
                                value: 129
                            }
                        ]
                    )
                }, 500)
            })
                .then(res => {
                    commit("setPaymentList", res)
                })
        }
    },
    getters
})