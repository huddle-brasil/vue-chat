<template>
    <div class="new-message" @click="actionButtonNew()">
        <div class="container-circle" v-if="counter > 0">
            <div class="circle-new-messages">
                <span class="new-message-counter">{{counter}}</span>
            </div>
        </div>
        <button class="btn-new-message">
            <img src="../assets/arrow-of-double.png" alt="" class="img-new-message">
        </button>
    </div>
</template>
<script>
import Bus from '../main.js'
export default {
    data(){
        return{
            counter : 0
        }
    },
    created(){
        Bus.$on('newMessage', this.countNewMessages)
    },
    destroyed(){
        Bus.$off('newMessage')
    },
    methods: {
        actionButtonNew(){
            this.$emit('scrollToBottom')
        },
        countNewMessages(){
            this.counter ++
        }
    }
}
</script>
<style lang="scss">
    
</style>
