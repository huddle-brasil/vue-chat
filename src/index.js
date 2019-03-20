import Vue from 'vue'
import Chat from "./Chat.vue"

const Components = {
    Chat
}

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
})

export default Components;