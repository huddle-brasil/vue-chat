<template>
    <div class="chat-messages">
        <!-- message-right é uma classe para definir o sendler da mensagem -->
        <div class="chat-message" v-for="(message, index) in messages" :key="index"> 
            <span class="message">
                {{ message }}
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        messages : {
            type : Array,
            required : true
        }
    },
    mounted(){
        let chatMessages = document.querySelector('.chat-messages');
        chatMessages.scrollTo(0, chatMessages.scrollHeight)
    }
}
</script>
<style lang="scss">

</style>
