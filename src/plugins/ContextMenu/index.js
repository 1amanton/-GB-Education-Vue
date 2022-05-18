export default {
    install(Vue) {
        if(this.installed) {
            return
        }
        this.installed = true

        this.caller = null

        Vue.prototype.$contextMenu = {
            EventBus: new Vue(),

            show({event, items}){
                const caller = event.target
                if(caller !== this.caller) {
                    console.log(caller, this.caller)
                    this.caller = caller
                    this.EventBus.$emit("show", {items, caller})
                } else {
                    this.hide()
                }


                console.log(event, caller)

            },

            hide() {
                this.caller = null
                this.EventBus.$emit("hide")

            }
        }
    }
}