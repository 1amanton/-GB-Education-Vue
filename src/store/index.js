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
    deleteDataFromPaymentList(state, payload) {
        state.paymentList = state.paymentList.filter(el => el.id !== payload.id)
    },
    setChangeToPaymentList(state, payload) {
        let findedEl = state.paymentList.find(el => el.id === payload.id)
        console.log("FINDED EL", findedEl, "CHANGED EL", payload)

        findedEl.value = payload.money
        findedEl.category = payload.category
        findedEl.desc = payload.desc
    },
    setCategoryList(state, payload) {
        state.categoryList = payload
    }
}

const getters = {
    getPaymentList: state => state.paymentList,
    getCategoryList: state => state.categoryList,

    getFullPaymentValue: state => {
        return state.paymentList.reduce((res, cur) => res + cur.value, 0)
    },

    getCountCategory: state => {
        const groupBy = (arr, property) => {
            return arr.reduce((items, obj) => {
                let key = obj[property]

                if (!items[key]) {
                    items[key] = {title: key, counter: 0, value: 0}
                }

                items[key].counter++
                items[key].value += obj.value
                return items
            },{})

        }
        let z = groupBy(state.paymentList, "category")

        let vls = Object.values(z)
        console.log(vls)

        return vls

    },

}

export default new Vuex.Store ({
    state: {
        paymentList: [],
        categoryList: [],
        availableCategoryList: []
    },
    mutations,
    actions: {
        fetchCategoryList({commit}) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(["Food", "Transport", "Sport", "Cloth", "Entertainment"])
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
                                desc: "Кино",
                                category: "Entertainment",
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
                            },
                            {
                                id: 17,
                                dateCreated: "22/04/2022",
                                desc: "Метро",
                                category: "Transport",
                                value: 49
                            },
                            {
                                id: 18,
                                dateCreated: "23/04/2022",
                                desc: "Тренировка",
                                category: "Sport",
                                value: 99
                            },
                            {
                                id: 19,
                                dateCreated: "23/04/2022",
                                desc: "Тренировка",
                                category: "Sport",
                                value: 99
                            },
                            {
                                id: 20,
                                dateCreated: "22/04/2022",
                                desc: "Кино",
                                category: "Entertainment",
                                value: 49
                            },
                            {
                                id: 21,
                                dateCreated: "22/04/2022",
                                desc: "Кино",
                                category: "Entertainment",
                                value: 49
                            },
                            {
                                id: 22,
                                dateCreated: "21/04/2022",
                                desc: "Завтрак",
                                category: "Food",
                                value: 199
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